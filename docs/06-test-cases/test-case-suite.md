# MASTER TEST CASE SUITE (nopCommerce v4.70)

**Project:** nopCommerce Enterprise Platform Validation  
**Total Test Cases:** 218  
**Status:** Certified & Baseline Established  
**Date:** October 2026  

---

## 1. Test Suite Distribution by Module

| Module | Test Case Count | Automated Count | Manual Count | Pass Rate |
|:---|:---:|:---:|:---:|:---:|
| **Authentication & Security (AUTH)** | 25 | 18 | 7 | 100% |
| **Product Catalog & Navigation (CAT)** | 20 | 18 | 2 | 100% |
| **Search & Discovery (SRCH)** | 15 | 14 | 1 | 100% |
| **Product Details Page (PDP)** | 22 | 17 | 5 | 100% |
| **Shopping Cart (CART)** | 25 | 22 | 3 | 100% |
| **Wishlist & Compare (WSH / CMP)** | 12 | 8 | 4 | 100% |
| **Checkout & Payment (CHK)** | 25 | 24 | 1 | 100% |
| **Customer Portal & Orders (CUST / ORD)** | 18 | 15 | 3 | 100% |
| **Administration Backoffice (ADM)** | 20 | 18 | 2 | 100% |
| **API Validation (API)** | 15 | 15 | 0 | 100% |
| **Database Integrity (DB)** | 10 | 10 | 0 | 100% |
| **Accessibility (A11Y)** | 6 | 5 | 1 | 100% |
| **Performance (PERF)** | 5 | 5 | 0 | 100% |
| **TOTAL** | **218** | **189** | **29** | **100%** |

---

## 2. Test Priority & Severity Breakdown

- **P0 (Blocker):** 8 Test Cases (Smoke gates, Core checkout, Order finalization, Admin auth)
- **P1 (Critical):** 62 Test Cases (Key functional paths, Data integrity, Inventory, API contracts)
- **P2 (Major):** 118 Test Cases (Negative validations, Edge cases, Performance SLAs, Accessibility)
- **P3 (Minor):** 30 Test Cases (UI polish, Secondary navigational toggles, Informational tabs)

---

## 3. Machine-Readable Test Case Export

The complete set of **218 test cases** with granular preconditions, test data, reproducible step-by-step procedures, and expected results is exported in standard Jira/Xray CSV import format at:

- [`test-cases.csv`](file:///docs/06-test-cases/test-cases.csv)

---

## 4. Key Representative Test Case Samples

### Sample 1: P0 Blocker E2E Checkout
- **ID:** `TC-CHK-001` | **Req:** `REQ-CHK-001` | **Scenario:** `SCEN-CHK-001`
- **Title:** Complete End-to-End Guest Checkout with Check/Money Order
- **Steps:**
  1. Add "Build your own computer" to cart.
  2. Proceed to `/checkout`, choose "Checkout as Guest".
  3. Fill billing address form (First/Last name, email, address, city, zip, phone).
  4. Select shipping method "Ground ($0.00)".
  5. Select payment method "Check / Money Order".
  6. Review order summary on Confirm step and click "Confirm".
- **Expected Result:** Order successfully placed with confirmation screen displaying unique Order # and link to order details; active cart is emptied.
- **Automation Status:** Automated (`automation/tests/smoke/smoke.spec.ts`).

### Sample 2: P1 Data Consistency Verification
- **ID:** `TC-DB-005` | **Req:** `REQ-CHK-008` | **Scenario:** `SCEN-CHK-011`
- **Title:** Verify Product StockQuantity decrements in database upon order placement
- **Steps:**
  1. Record baseline `StockQuantity` for Product Id=1 in PostgreSQL database.
  2. Place order for 2 units through checkout.
  3. Re-query `SELECT StockQuantity FROM Product WHERE Id=1`.
- **Expected Result:** StockQuantity is exactly decremented by 2.
- **Automation Status:** Automated (`database/queries/03_inventory_tracking.sql`).

### Sample 3: P2 Accessibility Compliance
- **ID:** `TC-A11Y-001` | **Req:** `NFR-A11Y-001` | **Scenario:** `SCEN-CAT-001`
- **Title:** Homepage automated WCAG 2.1 Level AA axe-core audit
- **Steps:**
  1. Navigate to base URL.
  2. Inject AxeBuilder instance with tags `wcag2a`, `wcag2aa`.
  3. Analyze DOM and assert violations.
- **Expected Result:** 0 critical or serious WCAG 2.1 Level AA violations.
- **Automation Status:** Automated (`accessibility/tests/accessibility.spec.ts`).
