# Test Execution Cycle 1 Report — Sprint 42 (Build v4.70-b108)

## 1. Executive Summary
- **Execution Cycle:** Cycle 1 (Initial Functional & Integration Execution)
- **Target Application:** nopCommerce Enterprise Storefront & Admin Portal
- **Target Build:** v4.70-b108 (Release Candidate 1 Pre-release)
- **Execution Window:** September 14, 2026 – September 20, 2026
- **Test Lead:** Senior QA Lead / Test Architect
- **Environment:** Dedicated QA Staging Environment (`http://qa-staging.nopcommerce.local:5001`)
- **Cycle Objective:** Execute full Smoke, Critical Path, and Functional suites (Manual + Automation) across Storefront, Admin, API, and Database layers to establish baseline stability and uncover defects.

---

## 2. Execution Metrics & Status Summary

### Overall Test Case Execution Breakdown
| Suite / Module | Total Test Cases | Executed | Passed | Failed | Blocked | Pass Rate (%) |
| :--- | :---: | :---: | :---: | :---: | :---: | :---: |
| **Authentication & Registration** | 28 | 28 | 25 | 3 | 0 | 89.2% |
| **Product Catalog & Search** | 35 | 35 | 33 | 2 | 0 | 94.3% |
| **Shopping Cart & Wishlist** | 32 | 32 | 27 | 4 | 1 | 84.4% |
| **Checkout & Payments** | 38 | 38 | 31 | 5 | 2 | 81.6% |
| **Customer Account Management** | 24 | 24 | 22 | 2 | 0 | 91.7% |
| **Admin Catalog Management** | 22 | 22 | 20 | 2 | 0 | 90.9% |
| **Admin Order & Customer Mgmt** | 20 | 20 | 19 | 1 | 0 | 95.0% |
| **Accessibility (WCAG 2.1 AA)** | 10 | 10 | 8 | 2 | 0 | 80.0% |
| **API Endpoints (Playwright + Postman)** | 25 | 25 | 23 | 2 | 0 | 92.0% |
| **Database Integrity Checks** | 12 | 12 | 11 | 1 | 0 | 91.7% |
| **TOTAL** | **226** | **226** | **199** | **22** | **3** | **88.1%** |

### Execution Progress
```text
Total Test Cases: 226
[==================================================] 100% Executed
Passed:  199 (88.1%)
Failed:   22 (9.7%)
Blocked:   3 (1.3%)
```

---

## 3. Automation vs. Manual Execution Split

| Execution Layer | Executed | Passed | Failed | Blocked | Automation % |
| :--- | :---: | :---: | :---: | :---: | :---: |
| **Automated (Playwright Test)** | 50 | 44 | 6 | 0 | 22.1% of Total |
| **Manual Execution (Xray / Jira)** | 176 | 155 | 16 | 3 | 77.9% of Total |
| **TOTAL** | **226** | **199** | **22** | **3** | **100.0%** |

---

## 4. Key Defects Identified During Cycle 1

The following critical defects were logged during Cycle 1 execution and escalated to engineering:

| Defect Key | Summary | Severity | Priority | Module | Status |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **BUG-A11Y-001** | Primary CTA buttons fail WCAG AA color contrast (2.35:1 vs required 4.5:1) | Major | High | UI / Theme | Open |
| **BUG-CART-001** | Cart quantity update POST request triggers 404 when multiple items present | Critical | Blocker | Cart | Open |
| **BUG-CHK-001** | State/Province dropdown does not re-populate on country switch in Checkout step 1 | Critical | High | Checkout | Open |
| **BUG-CHK-002** | Credit Card expiration year dropdown allows past years on legacy browser rendering | Major | Medium | Checkout | Open |
| **BUG-AUTH-001** | Password reset token does not invalidate after first successful usage | Critical | Blocker | Security | Open |
| **BUG-CAT-001** | Price slider filter fails to update product list on WebKit / Safari iOS viewport | Major | Medium | Catalog | Open |
| **BUG-DB-001** | Guest checkout customer record orphans billing address foreign key on cancellation | Major | Medium | Database | Open |

---

## 5. Blocked Test Cases & Dependencies

| Test Case ID | Test Case Title | Blocking Defect | Root Cause / Impact |
| :--- | :--- | :--- | :--- |
| **TC-CHK-024** | Verify credit card authorization with 3D Secure 2.0 sandbox gateway | `BUG-CHK-001` | Unable to reach Payment Info step due to state dropdown block |
| **TC-CHK-025** | Verify purchase order payment flow with purchase order number | `BUG-CHK-001` | Blocked at shipping address selection |
| **TC-CART-019** | Verify automated quantity recalculation upon promo voucher application | `BUG-CART-001` | Cart quantity update fails with HTTP 404 |

---

## 6. Environment & Configuration Observations
- **Database Latency:** PostgreSQL query execution averaged 14ms for transactional reads; no deadlocks observed.
- **Mock Services:** Sandbox payment gateway mock experienced 2 timeouts on September 16, resulting in temporary test suspension. Resumed after mock server container restart.
- **Docker Footprint:** Dockerized staging environment held at 1.4 GB RAM utilization across Web, DB, and Redis instances.

---

## 7. Cycle 1 Conclusion & Exit Criteria Status
- **Exit Criteria Status:** **NOT MET (Release Blocked)**
- **Reason:**
  1. 2 Blocker/Critical defects (`BUG-CART-001`, `BUG-AUTH-001`) remain open.
  2. 3 Test cases blocked from completion.
  3. Cycle 1 Pass Rate is 88.1% (Target: >= 95% with 0 Blocker/Critical bugs).
- **Next Steps:**
  - Complete engineering bug fix handoff for Sprint 43.
  - Deploy patched build `v4.70-b112` to QA Staging.
  - Initiate **Cycle 2 (Regression & Defect Retest)**.
