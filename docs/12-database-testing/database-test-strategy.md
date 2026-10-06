# Manual SQL Validation Query Library & Schema Reference

> **Status:** Manual SQL Query Reference / Optional Learning Asset  
> **CI Execution:** Not executed in CI  
> **AUT Relation:** The default AUT (`automation/staging-aut/server.js`) is an in-memory Node/Express staging simulator with no active PostgreSQL connection. These queries are maintained as a portfolio reference library for manual database inspection and optional Docker experiments.

---

## 1. Purpose & Scope

In enterprise e-commerce testing, database validation ensures that data asserted at the UI and API layers correctly reflects underlying relational constraints, referential integrity, and business calculations.

This directory and the `database/` folder provide a **curated library of manual SQL validation queries** demonstrating:
- Relational schema validation concepts (Primary Keys, Foreign Key cascades, nullability).
- E-commerce financial integrity calculations (`OrderTotal = SubTotal + Tax + Shipping - Discounts`).
- Inventory tracking audits (`InitialStock - SoldQuantity = CurrentStock`).
- Verification queries intended for manual execution via DBeaver or `psql` during database inspection sessions.

---

## 2. Core Validation Dimensions

### 1. Relational Integrity & Schema Constraints
- **Primary Key Uniqueness:** Ensuring sequence integrity on tables (`Customer`, `Product`, `Order`, `OrderItem`).
- **Referential Integrity:** Checking for orphaned records between `Order` and `OrderItem`.
- **Field Precision:** Verifying decimal precision for currency amounts (`decimal(18,4)`) and timestamps.

### 2. E-Commerce Business Calculation Verification
- **Order Total Verification:**
  ```sql
  SELECT 
      o.id AS order_id,
      o.customer_email,
      o.subtotal,
      o.tax,
      o.shipping,
      o.order_total,
      (o.subtotal + o.tax + o.shipping) AS expected_total
  FROM "Order" o
  WHERE o.id = 1042;
  ```
- **Stock Depletion Auditing:**
  ```sql
  SELECT id, name, stock_quantity, published 
  FROM "Product" 
  WHERE sku = 'COMP_CUST';
  ```

---

## 3. Repository SQL Organization

All SQL query assets are organized under `database/`:

```text
database/
├── queries/
│   ├── 01_customer_verification.sql   # Customer registration & address lookup
│   ├── 02_order_and_items.sql         # Order totals, line items, and payment status
│   ├── 03_inventory_tracking.sql      # Stock reservation queries
│   ├── 04_discount_and_cart.sql       # Shopping cart items and coupon queries
│   └── 05_admin_audit_logs.sql        # Security activity and audit queries
├── validation/
│   ├── db-ui-consistency.sql          # Cross-layer sanity query examples
│   └── integrity-checks.sql           # Orphan record checks and null constraint validations
└── test-data/
    ├── seed-customers.sql             # Reference customer data schema
    ├── seed-products.sql              # Reference product baseline
    └── cleanup.sql                    # Teardown script examples
```

---

## 4. Execution Guidance

1. **Manual Inspection Only:** Run these queries manually using a database client such as DBeaver, pgAdmin, or command-line `psql` when connected to an experimental PostgreSQL instance (such as the optional `docker compose up postgresql-qa` stack).
2. **Not Automated in Playwright:** Automated Playwright and CI runs intentionally do not execute direct SQL commands because the default simulator uses deterministic in-memory state.
