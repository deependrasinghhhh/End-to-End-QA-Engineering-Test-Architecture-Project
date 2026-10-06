# QA Test Plan Specification: Staging Simulator Quality Engineering

> **Project Description:**  
> A Playwright + TypeScript QA automation portfolio project testing a deterministic, nopCommerce-inspired local staging simulator. It demonstrates QA test design, UI/API automation, accessibility checks, CI, and supporting QA artifacts. It is not a production certification or a claim of testing upstream nopCommerce.

---

## 1. Scope & Modules Under Test

This Test Plan operationalizes the Master Test Strategy for validating the local staging simulator (`automation/staging-aut/server.js`) on port 5001.

### 1.1 In-Scope Functional Modules
- **Module 1 (M01):** Customer Account & Authentication (Registration, Login, Password Recovery, Profile, Address Book).
- **Module 2 (M02):** Product Catalog & Taxonomy (Categories, Subcategories, Sorting).
- **Module 3 (M03):** Search & Discovery (Header search, auto-suggest, empty search query handling).
- **Module 4 (M04):** Product Details & Attributes (Dynamic pricing, stock status, configure computer).
- **Module 5 (M05):** Shopping Cart (Line items, quantity modification, coupons, item deletion).
- **Module 6 (M06):** Checkout Flow (Terms of service gating, multi-step accordion wizard, order submission).
- **Module 7 (M07):** Order History & Invoices (Order list, order details, PDF invoice trigger).
- **Module 8 (M08):** Administration Console (Dashboard KPIs, product search, order status management, authorization checks).
- **Module 9 (M09):** API Layer (REST contracts for Auth, Catalog, Cart, and Orders with Ajv validation).
- **Module 10 (M10):** Accessibility Audit (Automated axe-core checks on 5 routes for critical/serious violations).

---

## 2. Test Execution Approach & Automation Baseline

- **Automated Tests:** 50 Playwright tests defined in `automation/tests/` and `accessibility/tests/`.
- **Target Browser Engine:** Chromium (headless in CI, headed locally via `npm run test:headed`).
- **CI Orchestration:** GitHub Actions (`.github/workflows/ci.yml`) executing on every PR and push.
- **Test Isolation:** Dedicated reset fixture calling `POST /api/test/reset` before each test.

---

## 3. Test Deliverables Map

| Deliverable Asset | Location | Status |
|:---|:---|:---|
| **Test Strategy** | `docs/03-test-strategy/test-strategy.md` | Active architectural guide |
| **Test Case Repository** | `docs/06-test-cases/test-case-suite.md` | 50 automated tests + manual test designs |
| **Requirements Traceability** | `docs/07-rtm/requirement-traceability-matrix.md` | Bidirectional RTM mapping |
| **Automated Test Code** | `automation/tests/`, `accessibility/tests/` | 50 executable Playwright specs |
| **Execution Reports** | CI Artifacts (`reports/junit.xml`, HTML) | Retained per CI run |
| **Defect Case Studies & RCA** | `docs/10-defects/` | Simulated local-staging defect examples |
| **Release Readiness Template** | `docs/16-release/qa-sign-off.md` | Governance template without fake claims |
| **Test Closure Template** | `docs/17-test-closure/test-closure-report.md` | STLC closure documentation |

---

## 4. Risks & Mitigations

| Risk | Likelihood | Impact | Mitigation Strategy |
|:---|:---:|:---:|:---|
| Cross-test state bleeding in shared server | High | High | Implemented state factory & auto-reset fixture before each test |
| Response contract drift | Medium | Medium | Added Ajv JSON Schema validation to API test suite |
| Flaky timing on dynamic web elements | Low | Medium | Strict reliance on Playwright auto-waiting assertions |
