# Database Test Strategy & Data Integrity Framework

## 1. Executive Summary
The Database Test Strategy for nopCommerce v4.70 establishes end-to-end validation across the three-tier architectural boundary:
```text
UI Form / Action ──► REST / MVC API ──► PostgreSQL Relational Database
```
Direct database testing ensures that UI and API operations accurately persist, modify, and delete relational data according to business rules without data loss, field truncation, foreign key orphanhood, or concurrency race conditions.

---

## 2. Core Validation Dimensions

### 1. Data Integrity & Constraints
- **Primary Key Uniqueness:** Auto-incrementing sequences on `Customer`, `Product`, `Order`, `OrderItem`.
- **Foreign Key Cascades:** `Order` -> `OrderItem` and `Order` -> `OrderBillingAddress` must enforce referential integrity.
- **Nullability & Default Values:** Enforce non-nullable constraints on critical columns (e.g. `Email`, `Price`, `OrderStatusId`).
- **Data Types & Sizes:** Verify string lengths, decimal precision for currency (`decimal(18,4)`), and UTC timestamps.

### 2. ACID Transactional Integrity
- **Atomicity:** When an order is placed, both `Order` and `OrderItem` records must be created simultaneously, and stock must decrement. If credit card authorization fails, all operations must roll back completely.
- **Consistency:** Inventory stock quantity cannot drop below 0 if backorders are disabled.
- **Isolation:** Multiple simultaneous checkout transactions must not double-decrement the same inventory unit.
- **Durability:** Committed transactions persist through database crashes or restarts.

### 3. Business Rule Verifications via SQL
- **Price Calculation:** `OrderTotal = SubTotal + Tax + Shipping - Discounts`.
- **Stock Depletion:** `InitialStock - SoldQuantity = CurrentStock`.
- **Soft Deletion vs Hard Deletion:** Verify whether deleted products or customers are marked with `Deleted = TRUE` rather than dropped from the database.

---

## 3. Database Layer Repository Structure

The test repository organizes all database artifacts under `database/`:
```text
database/
├── queries/
│   ├── 01_customer_verification.sql   # Customer registration & address verification
│   ├── 02_order_and_items.sql         # Order totals, line items, and payment status
│   ├── 03_inventory_tracking.sql      # Stock reservation and decrementing
│   ├── 04_discount_and_cart.sql       # Shopping cart items and coupon logic
│   └── 05_admin_audit_logs.sql        # Security activity and admin audit trails
├── validation/
│   ├── db-ui-consistency.sql          # Cross-layer sanity queries
│   └── integrity-checks.sql           # Orphan record checks and null constraint validations
└── test-data/
    ├── seed-customers.sql             # Deterministic customer test accounts
    ├── seed-products.sql              # Clean product catalog baseline
    └── cleanup.sql                    # Post-test cycle teardown scripts
```

---

## 4. Test Fixture & TypeScript Helper Integration

The automation framework integrates a direct database query helper (`automation/utils/db-helper.ts`) using the `pg` client:

```typescript
import { DatabaseHelper } from '../utils/db-helper';

// In automated test spec:
const db = new DatabaseHelper();
const order = await db.query(
  'SELECT id, order_total, order_status_id FROM "Order" WHERE customer_email = $1 ORDER BY id DESC LIMIT 1',
  [customerEmail]
);
expect(order.rows[0].order_total).toBe('1200.00');
expect(order.rows[0].order_status_id).toBe(30); // Complete
```

---

## 5. Security & Credential Isolation Policy
- **Zero Credentials in Git:** The database connection string is never committed.
- **Environment Configuration:** Database credentials are read exclusively from environment variables:
  ```env
  DB_HOST=localhost
  DB_PORT=5432
  DB_NAME=nopcommerce
  DB_USER=nop_qa
  DB_PASSWORD=your_secure_password_here
  ```
- **Read-Only Inspection Roles:** QA engineers and DBeaver manual inspectors use dedicated read-only credentials (`nop_qa_reader`) for exploratory validation to avoid accidental data mutation in staging.
