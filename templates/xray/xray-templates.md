# Xray for Jira Test Management Templates

This document details the standardized templates for Xray issue types in Jira for managing tests, preconditions, test sets, and test executions.

---

## 1. Xray Test Issue Template (`xray-manual-test-template.md`)

```markdown
## Issue Type: Test
- **Test Type:** Manual (or Cucumber / Generic for Automated)
- **Key:** `TEST-CART-004`
- **Summary:** Verify shopping cart quantity update and line total recalculation
- **Component:** Storefront - Cart
- **Requirement Link:** `REQ-CART-002`

### Preconditions (Linked Xray Precondition: `PRE-CART-001`)
1. User has navigated to the storefront.
2. At least one configurable product (e.g., "Build your own computer") exists in the cart with quantity = 1.
3. Cart Subtotal equals $1,200.00.

### Step-by-Step Test Specification
| Step # | Action (Step) | Data | Expected Result |
| :---: | :--- | :--- | :--- |
| **1** | Navigate to the shopping cart page (`/cart`) | URL: `/cart` | Shopping cart table renders containing product row with quantity field showing "1". |
| **2** | Double-click the quantity input field and enter a new quantity | New Quantity: `3` | Quantity field value updates to "3". |
| **3** | Click the "Update shopping cart" button | Button: `name="updatecart"` | Page reloads or updates via AJAX; line total updates to $3,600.00 ($1,200.00 * 3); top header cart counter updates to "(3)". |
| **4** | Inspect database or refresh page | — | Quantity persists as 3 across full page reload. |
```

---

## 2. Xray Test Set Template (`xray-test-set-template.md`)

```markdown
## Issue Type: Test Set
- **Key:** `SET-REGRESSION-CORE`
- **Summary:** Core E-Commerce Regression Test Set — Release v4.70
- **Description:**
  A curated collection of high-priority manual and automated tests representing the critical functional baseline of the storefront and admin operations.

### Tests Included in Test Set:
1. `TEST-AUTH-001`: Customer account registration with unique email
2. `TEST-AUTH-002`: Customer login with valid credentials
3. `TEST-CAT-001`: Homepage featured categories navigation
4. `TEST-CAT-002`: Product catalog keyword search with auto-suggest
5. `TEST-CART-001`: Add simple product to shopping cart
6. `TEST-CART-004`: Update cart item quantity and recalculate subtotal
7. `TEST-CHK-001`: End-to-end guest one-page checkout with credit card
8. `TEST-ADMIN-001`: Admin login and dashboard metric rendering
9. `TEST-ADMIN-002`: Admin product creation and storefront catalog sync
```

---

## 3. Xray Precondition Template (`xray-precondition-template.md`)

```markdown
## Issue Type: Precondition
- **Key:** `PRE-AUTH-CUSTOMER`
- **Summary:** Customer Account Exists with Confirmed Status and Active Address
- **Precondition Type:** Manual

### Condition Definition
The database must contain an active customer record with:
- **Email:** `qa.customer@example.com`
- **Password:** Predefined test password hashed with PBKDF2/SHA256
- **Status:** `Active = TRUE`, `Deleted = FALSE`
- **Address Book:** At least 1 verified United States billing & shipping address.
- **Cart State:** Empty cart (`/cart` displays "Your Shopping Cart is empty!").
```

---

## 4. Xray Test Execution Template (`xray-test-execution-template.md`)

```markdown
## Issue Type: Test Execution
- **Key:** `EXEC-SPRINT43-REGRESSION`
- **Summary:** Sprint 43 Full Regression Execution — Build v4.70-b112
- **Fix Version:** `v4.70.0`
- **Environment:** `QA-Staging-PostgreSQL`
- **Revision / Commit:** `git:commit#a4f89d2`

### Execution Details
- **Assigned Tester:** Senior QA Lead
- **Execution Start:** 2026-09-22 09:00:00 EST
- **Execution Finish:** 2026-09-28 17:30:00 EST

### Test Runs Status Table
| Test Key | Summary | Type | Executed By | Status | Linked Defects |
| :--- | :--- | :---: | :---: | :---: | :---: |
| `TEST-AUTH-001` | Customer account registration | Automated | Playwright Runner | **PASS** | — |
| `TEST-AUTH-002` | Customer login with valid credentials | Automated | Playwright Runner | **PASS** | — |
| `TEST-CART-004` | Update cart item quantity | Automated | Playwright Runner | **PASS** | Verified fix `BUG-CART-001` |
| `TEST-CHK-003` | State dropdown dynamic refresh | Manual | QA Tester | **PASS** | Verified fix `BUG-CHK-001` |
| `TEST-A11Y-001` | Primary CTA color contrast audit | Automated | axe-core Runner | **PASS** | Verified fix `BUG-A11Y-001` |

### Overall Execution Summary
- **Total Tests:** 226
- **Passed:** 226 (100.0%)
- **Failed:** 0 (0.0%)
- **Blocked:** 0 (0.0%)
- **Final Verdict:** **PASSED**
```
