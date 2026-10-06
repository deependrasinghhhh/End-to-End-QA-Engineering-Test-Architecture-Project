# DBeaver Database Validation & Inspection Guide

> **Status:** Manual Tool Reference Guide (Optional Environment)  
> **Target:** Experimental PostgreSQL instance (e.g. `docker compose up postgresql-qa`)  
> **Note:** Automated Playwright runs test against the in-memory simulator and do not require DBeaver or PostgreSQL.

## 1. Introduction
This guide instructs QA Engineers and SDETs on configuring **DBeaver Community Edition** to inspect, validate, and debug relational data in the nopCommerce PostgreSQL staging and local test environments.

---

## 2. DBeaver Connection Configuration

### Step-by-Step Setup:
1. Open DBeaver and select **Database -> New Database Connection**.
2. Select **PostgreSQL** from the list of drivers.
3. Configure the connection parameters (sourced from your local `.env`):
   - **Host:** `localhost` (or Docker container IP / QA Staging DNS)
   - **Port:** `5432`
   - **Database:** `nopcommerce`
   - **Authentication:** `Database Native`
   - **Username:** `nop_qa` (or read-only role `nop_qa_reader`)
   - **Password:** Sourced from secure `.env`
4. Click **Test Connection** to confirm connectivity.
5. In the **Connection Settings -> General** tab, set the Connection Type to **QA / Staging** to enable visual color-coding (avoids accidental production changes).

---

## 3. Standard Verification Workflows

### Workflow 1: Customer Registration Verification
After executing `TC-AUTH-001` (Customer Registration) via UI or API:
1. Open SQL Editor in DBeaver (`Ctrl + Enter`).
2. Run query:
   ```sql
   SELECT id, email, username, active, deleted, created_on_utc
   FROM "Customer"
   WHERE email = 'qa.tester.auto@example.com';
   ```
3. **Verify:**
   - Record exists with exact email.
   - `active` column is `TRUE` (or `1`).
   - `deleted` column is `FALSE`.
   - `created_on_utc` corresponds to test execution timestamp.

---

### Workflow 2: Order & Inventory Reconciliation
After executing `TC-CHK-001` (Complete End-to-End Order):
1. Execute query to retrieve latest order and child items:
   ```sql
   SELECT
       o.id AS order_id,
       o.order_total,
       o.order_status_id,
       o.payment_status_id,
       oi.product_id,
       oi.quantity,
       oi.unit_price_incl_tax,
       p.name AS product_name,
       p.stock_quantity
   FROM "Order" o
   JOIN "OrderItem" oi ON o.id = oi.order_id
   JOIN "Product" p ON oi.product_id = p.id
   WHERE o.customer_email = 'qa.customer@example.com'
   ORDER BY o.id DESC LIMIT 1;
   ```
2. **Verify:**
   - `order_status_id = 30` (Complete) or `10` (Pending depending on payment method).
   - `payment_status_id = 30` (Paid).
   - `stock_quantity` equals `initial_stock - oi.quantity`.
   - `order_total` equals sum of line items + tax + shipping.

---

### Workflow 3: Data Integrity & Orphan Record Audit
Run the scheduled data integrity query script `database/validation/integrity-checks.sql`:
```sql
-- Check 1: Orphaned Order Items without parent Order
SELECT oi.id, oi.order_id
FROM "OrderItem" oi
LEFT JOIN "Order" o ON oi.order_id = o.id
WHERE o.id IS NULL;

-- Check 2: Orphaned Addresses
SELECT oba.id, oba.order_id
FROM "OrderBillingAddress" oba
LEFT JOIN "Order" o ON oba.order_id = o.id
WHERE o.id IS NULL;

-- Check 3: Negative Stock Anomalies
SELECT id, name, stock_quantity
FROM "Product"
WHERE stock_quantity < 0;
```
**Expected Result:** 0 rows returned for all checks.

---

## 4. Query Plan Analysis (Performance Troubleshooting)
If an API or UI page experiences latency > 500ms:
1. Prefix the query with `EXPLAIN ANALYZE`:
   ```sql
   EXPLAIN ANALYZE
   SELECT * FROM "Product"
   WHERE published = TRUE AND deleted = FALSE
   ORDER BY created_on_utc DESC;
   ```
2. Inspect the execution tree:
   - Identify **Seq Scan** (Sequential Table Scan) vs **Index Scan**.
   - If Seq Scan appears on large tables (> 50k rows), flag ticket to backend team for index creation.
