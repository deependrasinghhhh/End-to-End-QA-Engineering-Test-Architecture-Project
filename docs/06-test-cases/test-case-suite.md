# Master Test Case Suite & Design Repository

> **Project:** nopCommerce-Inspired QA Automation & Test Architecture Portfolio  
> **Automation Baseline:** Exactly 50 Playwright tests currently defined and executed in CI against Chromium.  
> **Repository Scope:** 50 automated tests implemented in code; remaining test cases documented as manual test design procedures and planned candidate scenarios.

---

## 1. Test Suite Distribution by Module

| Module | Documented Cases | Automated Count | Manual / Planned | Automation Spec Location |
|:---|:---:|:---:|:---:|:---|
| **Smoke Suite (SMK)** | 8 | 8 | 0 | `automation/tests/smoke/smoke.spec.ts` |
| **Authentication & Registration (AUTH)** | 25 | 7 | 18 | `automation/tests/regression/auth.spec.ts` |
| **Product Catalog & Navigation (CAT)** | 20 | 5 | 15 | `automation/tests/regression/catalog.spec.ts` |
| **Shopping Cart & Coupons (CART)** | 25 | 5 | 20 | `automation/tests/regression/cart.spec.ts` |
| **Checkout Flow (CHK)** | 25 | 2 | 23 | `automation/tests/regression/checkout.spec.ts` |
| **Critical End-to-End Paths (CRIT)** | 3 | 3 | 0 | `automation/tests/critical/critical-paths.spec.ts` |
| **Customer Portal & Orders (CUST)** | 18 | 3 | 15 | `automation/tests/customer/customer-account.spec.ts` |
| **Administration Backoffice (ADM)** | 20 | 4 | 16 | `automation/tests/admin/` |
| **API Contract Validation (API)** | 15 | 8 | 7 | `automation/tests/api/api-customer-order.spec.ts` |
| **Accessibility Audit (A11Y)** | 6 | 5 | 1 | `accessibility/tests/accessibility.spec.ts` |
| **Database Query Library (DB)** | 10 | 0 | 10 | `database/` (Manual SQL library) |
| **Performance Benchmark Scripts (PERF)**| 4 | 0 | 4 | `performance/k6/` (k6 standalone scripts) |
| **TOTAL** | **179** | **50** | **129** | **50 Playwright Tests Automated** |

---

## 2. Test Execution Context

- **Automated Tests (50):** Executed via `npm test` against the local staging simulator (`automation/staging-aut/server.js`) on port 5001 using Chromium. Pass status is continuously verified by GitHub Actions.
- **Manual / Planned Cases:** Authored in Gherkin / tabular format as test case design artifacts for exploratory and human verification. Not executed in CI.

---

## 3. Test Priority & Design Categorization

- **P0 (Critical Smoke Gates):** 8 automated tests (`@smoke`) gating baseline storefront and backoffice health.
- **P1 (Core Functional Paths):** Customer checkout, registration, cart modifications, and API contract validations.
- **P2 (Regression & Boundary):** Negative authentication scenarios, coupon validations, catalog sorting, and empty state assertions.
- **P3 (Exploratory / Manual Reference):** Extended catalog combinations, payment gateway integrations, and multi-hour soak benchmarks.
