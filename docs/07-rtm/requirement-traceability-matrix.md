# Requirement Traceability Matrix (RTM)

> **Project:** nopCommerce-Inspired QA Automation & Test Architecture Portfolio  
> **Document ID:** `RTM-NOP-4.70`  
> **Automation Baseline:** Exactly 50 Playwright tests currently defined and executed against Chromium in CI.  
> **Status:** Traceability matrix distinguishing genuinely automated tests from manual / planned test case designs.

---

## 1. Traceability Hierarchy & Status Legend

- **Automated (`spec-file`):** Genuinely implemented and executed in Playwright test suite (`npm test`). Pass status reflects real retained execution runs in CI.
- **Manual / Planned:** Authored test case procedures and exploratory designs maintained for manual testing. Marked `Not executed in CI` unless an explicit manual execution log is retained.

---

## 2. Genuinely Automated Test Traceability (50 Playwright Tests)

| Req ID | Requirement Summary | Test Case ID | Test Title & Spec File | Automation Status | CI Status |
|:---|:---|:---|:---|:---:|:---:|
| **REQ-SMK-001** | Storefront & Catalog Availability | `TC-SMK-001` | `SMOKE-01: Storefront availability & featured catalog display` (`smoke.spec.ts`) | Automated | **PASS** |
| **REQ-SMK-002** | Header Search Availability | `TC-SMK-002` | `SMOKE-02: Header product search execution` (`smoke.spec.ts`) | Automated | **PASS** |
| **REQ-SMK-003** | Product Details & Pricing | `TC-SMK-003` | `SMOKE-03: Product details page & dynamic price calculation` (`smoke.spec.ts`) | Automated | **PASS** |
| **REQ-SMK-004** | Cart Add & Notification Banner | `TC-SMK-004` | `SMOKE-04: Add product to cart & verify notification banner` (`smoke.spec.ts`) | Automated | **PASS** |
| **REQ-SMK-005** | Cart Inspection & Terms Gating | `TC-SMK-005` | `SMOKE-05: Shopping cart inspection & checkout terms gating` (`smoke.spec.ts`) | Automated | **PASS** |
| **REQ-SMK-006** | Guest Checkout & Order Number | `TC-SMK-006` | `SMOKE-06: End-to-End Guest Checkout & Order Number generation` (`smoke.spec.ts`) | Automated | **PASS** |
| **REQ-SMK-007** | Session Authentication & Logout | `TC-SMK-007` | `SMOKE-07: Customer authentication & session logout` (`smoke.spec.ts`) | Automated | **PASS** |
| **REQ-SMK-008** | Admin Backoffice Dashboard KPIs | `TC-SMK-008` | `SMOKE-08: Admin Backoffice login & dashboard KPIs` (`smoke.spec.ts`) | Automated | **PASS** |
| **REQ-AUTH-001** | Mandatory Registration Fields | `TC-AUTH-001` | `AUTH-REG-01: Successful customer registration with valid mandatory data` (`auth.spec.ts`) | Automated | **PASS** |
| **REQ-AUTH-001** | Duplicate Email Prevention | `TC-AUTH-002` | `AUTH-REG-02: Prevent duplicate registration with existing email` (`auth.spec.ts`) | Automated | **PASS** |
| **REQ-AUTH-001** | Password Mismatch Validation | `TC-AUTH-003` | `AUTH-REG-03: Mismatched password and confirm password validation` (`auth.spec.ts`) | Automated | **PASS** |
| **REQ-AUTH-001** | Password Minimum Length Boundary | `TC-AUTH-004` | `AUTH-REG-04: Password minimum length boundary validation` (`auth.spec.ts`) | Automated | **PASS** |
| **REQ-AUTH-002** | Invalid Customer Email Login | `TC-AUTH-005` | `AUTH-REG-05: Login with non-existent email fails gracefully` (`auth.spec.ts`) | Automated | **PASS** |
| **REQ-AUTH-002** | Invalid Customer Password Login | `TC-AUTH-006` | `AUTH-REG-06: Login with incorrect password fails` (`auth.spec.ts`) | Automated | **PASS** |
| **REQ-AUTH-004** | Password Recovery Request | `TC-AUTH-007` | `AUTH-REG-07: Password recovery request for valid email` (`auth.spec.ts`) | Automated | **PASS** |
| **REQ-CAT-001** | Top Nav Categories & Subcategories| `TC-CAT-001` | `CAT-REG-01: Top navigation menu category and subcategory links` (`catalog.spec.ts`) | Automated | **PASS** |
| **REQ-CAT-002** | Category Sorting Price Low to High| `TC-CAT-002` | `CAT-REG-02: Category products sorting by Price: Low to High` (`catalog.spec.ts`) | Automated | **PASS** |
| **REQ-CAT-002** | Category Sorting Name A to Z | `TC-CAT-003` | `CAT-REG-03: Category products sorting by Name: A to Z` (`catalog.spec.ts`) | Automated | **PASS** |
| **REQ-SRCH-001** | Auto-Suggest Search Dropdown | `TC-CAT-004` | `CAT-REG-04: Search auto-suggest dropdown functionality` (`catalog.spec.ts`) | Automated | **PASS** |
| **REQ-SRCH-002** | Empty Search Query Handling | `TC-CAT-005` | `CAT-REG-05: Non-existent search query returns graceful empty state` (`catalog.spec.ts`) | Automated | **PASS** |
| **REQ-CART-001** | Cart Table Structure & Item Data | `TC-CART-001` | `CART-REG-01: Add item and verify cart table item structure` (`cart.spec.ts`) | Automated | **PASS** |
| **REQ-CART-002** | Quantity Update Recalculates Total| `TC-CART-002` | `CART-REG-02: Quantity update updates subtotal` (`cart.spec.ts`) | Automated | **PASS** |
| **REQ-CART-003** | Invalid Coupon Code Validation | `TC-CART-003` | `CART-REG-03: Invalid coupon code displays error alert` (`cart.spec.ts`) | Automated | **PASS** |
| **REQ-CART-003** | Valid Coupon Discount Application | `TC-CART-004` | `CART-REG-04: Valid coupon code (DISCOUNT10) applies discount` (`cart.spec.ts`) | Automated | **PASS** |
| **REQ-CART-004** | Line Item Removal from Cart | `TC-CART-005` | `CART-REG-05: Remove item clears line from table` (`cart.spec.ts`) | Automated | **PASS** |
| **REQ-CHK-001** | Terms of Service Gating | `TC-CHK-001` | `CHK-REG-01: Terms of service required prior to checkout` (`checkout.spec.ts`) | Automated | **PASS** |
| **REQ-CHK-002** | Multi-Step Accordion Flow | `TC-CHK-002` | `CHK-REG-02: Multi-step accordion navigation from Billing through Confirm` (`checkout.spec.ts`) | Automated | **PASS** |
| **REQ-E2E-001** | Full Configured Computer Checkout | `TC-CRIT-001` | `CRITICAL-01: Full End-to-End Configured Computer Checkout with Expedited Shipping` (`critical-paths.spec.ts`) | Automated | **PASS** |
| **REQ-E2E-002** | Registered Customer Order Audit | `TC-CRIT-002` | `CRITICAL-02: Registered Customer Checkout with Order History Audit` (`critical-paths.spec.ts`) | Automated | **PASS** |
| **REQ-E2E-003** | Backoffice Order Status Lifecycle| `TC-CRIT-003` | `CRITICAL-03: Admin Backoffice Order Verification & Status Progression` (`critical-paths.spec.ts`) | Automated | **PASS** |
| **REQ-CUST-001** | Customer Profile Info Update | `TC-CUST-001` | `CUST-01: Update customer profile information` (`customer-account.spec.ts`) | Automated | **PASS** |
| **REQ-CUST-002** | Customer Address Book Management | `TC-CUST-002` | `CUST-02: Manage Address Book and add new address` (`customer-account.spec.ts`) | Automated | **PASS** |
| **REQ-CUST-003** | Order History & Invoice Inspection| `TC-CUST-003` | `CUST-03: View order history and order details` (`customer-account.spec.ts`) | Automated | **PASS** |
| **REQ-ADM-001** | Admin Product Catalog Search | `TC-ADM-001` | `ADM-CAT-01: Admin product catalog search by product name` (`admin-catalog.spec.ts`) | Automated | **PASS** |
| **REQ-ADM-001** | Non-Existent Admin Catalog Search | `TC-ADM-002` | `ADM-CAT-02: Admin product catalog search with non-existent keyword` (`admin-catalog.spec.ts`) | Automated | **PASS** |
| **REQ-ADM-002** | Admin Order List Filter by Status | `TC-ADM-003` | `ADM-ORD-01: Admin order list filtering by status` (`admin-orders.spec.ts`) | Automated | **PASS** |
| **REQ-ADM-003** | Admin Console Unauthorized Guard | `TC-ADM-004` | `ADM-ORD-02: Non-admin users cannot access admin console` (`admin-orders.spec.ts`) | Automated | **PASS** |
| **REQ-API-001** | POST /api/auth/login Token Schema | `TC-API-001` | `API-01: [Simulator Contract] POST /api/auth/login validates schema and returns token` (`api-customer-order.spec.ts`) | Automated | **PASS** |
| **REQ-API-001** | POST /api/auth/login Bad Password | `TC-API-002` | `API-02: [Simulator Contract] POST /api/auth/login negative validation with invalid password` (`api-customer-order.spec.ts`) | Automated | **PASS** |
| **REQ-API-002** | POST /api/auth/register Validation| `TC-API-003` | `API-03: [Simulator Contract] POST /api/auth/register creates account and validates required parameters` (`api-customer-order.spec.ts`) | Automated | **PASS** |
| **REQ-API-003** | GET /api/catalog/products Array | `TC-API-004` | `API-04: [Simulator Contract] GET /api/catalog/products returns product array with valid pricing` (`api-customer-order.spec.ts`) | Automated | **PASS** |
| **REQ-API-003** | GET /api/catalog/products/:id | `TC-API-005` | `API-05: [Simulator Contract] GET /api/catalog/products/:id validates schema and handles invalid ID` (`api-customer-order.spec.ts`) | Automated | **PASS** |
| **REQ-API-004** | Cart API CRUD Operations | `TC-API-006` | `API-06: [Simulator Contract] Shopping Cart Endpoints (POST / PUT / GET / DELETE)` (`api-customer-order.spec.ts`) | Automated | **PASS** |
| **REQ-API-005** | POST /api/checkout/orders Schema | `TC-API-007` | `API-07: [Simulator Contract] POST /api/checkout/orders places order and validates schema` (`api-customer-order.spec.ts`) | Automated | **PASS** |
| **REQ-API-006** | GET /api/admin/orders Forbidden | `TC-API-008` | `API-08: [Simulator Contract] GET /api/admin/orders enforces authorization` (`api-customer-order.spec.ts`) | Automated | **PASS** |
| **REQ-A11Y-001** | Homepage axe-core Audit | `TC-A11Y-001` | `A11Y-01: Homepage WCAG 2.1 AA audit` (`accessibility.spec.ts`) | Automated | **PASS** |
| **REQ-A11Y-002** | Login Page axe-core Audit | `TC-A11Y-002` | `A11Y-02: Customer Login Page WCAG 2.1 AA audit` (`accessibility.spec.ts`) | Automated | **PASS** |
| **REQ-A11Y-003** | Product Details axe-core Audit | `TC-A11Y-003` | `A11Y-03: Product Details Page WCAG 2.1 AA audit` (`accessibility.spec.ts`) | Automated | **PASS** |
| **REQ-A11Y-004** | Shopping Cart axe-core Audit | `TC-A11Y-004` | `A11Y-04: Shopping Cart Page WCAG 2.1 AA audit` (`accessibility.spec.ts`) | Automated | **PASS** |
| **REQ-A11Y-005** | Registration Page axe-core Audit | `TC-A11Y-005` | `A11Y-05: Customer Registration Page WCAG 2.1 AA audit` (`accessibility.spec.ts`) | Automated | **PASS** |

---

## 3. Manual / Non-Automated Test Cases (Representative Sample)

The following test case designs represent manual and planned exploratory procedures. They are **not executed in CI** and are marked `Manual / Not executed in CI`:

| Req ID | Requirement Summary | Test Case ID | Test Title | Type | Status |
|:---|:---|:---|:---|:---:|:---:|
| **REQ-AUTH-003** | Captcha verification after multiple failed logins | `TC-AUTH-012` | Verify CAPTCHA appears after 5 failed login attempts | Manual / Security | Not executed in CI |
| **REQ-AUTH-004** | Password recovery token expiration (24h) | `TC-AUTH-014` | Verify password recovery token expires after 24 hours | Manual / Security | Not executed in CI |
| **REQ-CAT-005** | Product attribute combinations pricing | `TC-CAT-012` | Verify complex RAM/HDD combination pricing logic | Manual / Functional | Not executed in CI |
| **REQ-CHK-004** | Credit card payment gateway 3DS auth | `TC-CHK-015` | Verify external 3DS authentication redirection | Manual / Third-party | Not executed in CI |
| **REQ-DB-001** | Database orphan cleanup on customer delete | `TC-DB-001` | Verify cascading soft-delete on customer records | Manual / SQL | Not executed in CI |
| **REQ-NFR-001** | Screen reader navigation with NVDA | `TC-A11Y-010` | Manual NVDA screen reader journey through checkout | Manual / A11y | Not executed in CI |
