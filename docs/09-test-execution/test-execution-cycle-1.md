# Example QA Test Execution Cycle Report Template — Cycle 1

> **Document Type:** Execution Report Template / STLC Artifact  
> **Status:** Example Quality Engineering Report Template. Demonstrates structured execution cycle reporting without fabricated historical claims.

---

## 1. Cycle Overview Template

| Field | Description / Template Variable | Example Context |
|:---|:---|:---|
| **Cycle Identifier** | Execution cycle number | Cycle 1 (Baseline & Initial Verification) |
| **Application Under Test** | Tested application | nopCommerce-inspired local staging simulator |
| **Environment** | Target host | `http://localhost:5001` (Node.js staging simulator) |
| **Execution Window** | Duration of test cycle | Sprint Test Execution Window |
| **Lead / Author** | QA Lead / SDET | QA Engineer |

---

## 2. Test Execution Tracking Matrix (Template Format)

In a typical multi-cycle STLC execution, the QA team aggregates results across functional areas:

| Module / Test Suite | Test Cases Planned | Executed | Passed | Failed | Blocked | Pass Rate (%) |
|:---|:---:|:---:|:---:|:---:|:---:|:---:|
| **Authentication & Registration** | [N] | [N] | [N] | [N] | [N] | [%] |
| **Product Catalog & Search** | [N] | [N] | [N] | [N] | [N] | [%] |
| **Shopping Cart & Coupons** | [N] | [N] | [N] | [N] | [N] | [%] |
| **Checkout & Payments** | [N] | [N] | [N] | [N] | [N] | [%] |
| **Customer Account Management** | [N] | [N] | [N] | [N] | [N] | [%] |
| **Admin Backoffice Portals** | [N] | [N] | [N] | [N] | [N] | [%] |
| **API Contract Suite** | [N] | [N] | [N] | [N] | [N] | [%] |
| **Accessibility Audit** | [N] | [N] | [N] | [N] | [N] | [%] |
| **CYCLE TOTAL** | **[Total]** | **[Exec]** | **[Pass]** | **[Fail]** | **[Block]** | **[%]** |

---

## 3. Automation Layer Status

In this repository:
- **50 automated Playwright tests** are active and executed via `npm test` against Chromium.
- Automated tests produce machine-readable artifacts: `reports/junit.xml` and Playwright HTML reports.
- Manual test cases defined in `docs/06-test-cases/` represent non-automated test case designs and exploratory test procedures.

---

## 4. Defect Logging Format During Execution

When tests fail during a cycle, defects are recorded in the defect log using the standardized schema:

```text
Defect ID:          [DEF-001]
Summary:            [Concise defect description]
Severity:           [Blocker / Critical / Major / Minor]
Steps to Reproduce: [1, 2, 3...]
Expected Result:    [Acceptance criteria statement]
Actual Result:      [Observed software behavior]
Root Cause Layer:   [Frontend DOM / API Handler / State Logic]
Target Build:       [Build/Commit SHA]
```
