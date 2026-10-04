# MASTER TEST STRATEGY

**Project Name:** nopCommerce v4.70 Enterprise Quality Engineering  
**Document ID:** STRAT-NOP-4.70  
**Version:** 1.0.0  
**Author:** QA Lead & Test Architect  
**Classification:** Internal Quality Standard  

---

## 1. Introduction & Strategy Objectives

This Master Test Strategy establishes the overarching engineering principles, verification methodologies, and governance gates for testing nopCommerce v4.70. Our objective is to ensure that software delivered into production satisfies all functional requirements, maintains data integrity across persistence layers, complies with accessibility mandates, and exhibits high reliability under operational workloads.

---

## 2. Test Levels & Testing Pyramid

We adhere to the disciplined agile testing pyramid to maximize defect detection velocity while minimizing execution feedback cycles:

```
               / \
              /   \
             / E2E \          <-- 15% (Playwright Full User Journeys)
            /-------\
           /   API   \        <-- 30% (Playwright APIRequestContext + Postman)
          /-----------\
         / Integration \      <-- 25% (DB Integrity, Component State)
        /---------------\
       /      Unit       \    <-- 30% (Underlying Dev Tests / Core Logic)
      +-------------------+
```

1. **System & E2E Testing (UI):** Automated with Playwright + TypeScript using the Page Object Model (POM), validating full end-to-end customer and administrative journeys.
2. **API & Contract Testing:** Direct REST validation via Playwright `request` fixture and Postman collections, verifying payload schemas, response codes, and business validations without UI overhead.
3. **Database & Data Layer Testing:** SQL scripts executed against PostgreSQL 15, asserting table row consistency, foreign key cascades, and inventory decrements.
4. **Non-Functional Testing:** Axe-core for automated accessibility audits, k6 for API load and latency benchmarks, and cross-browser execution on Chromium, Firefox, and WebKit.

---

## 3. Test Types Defined

| Test Type | Objective | Frequency / Trigger | Automation Tool |
|:---|:---|:---|:---:|
| **Build Verification (Smoke)** | Validate fundamental build health & core critical paths | Every commit / PR / Deploy | Playwright (`@smoke`) |
| **Functional Regression** | Ensure new changes have not broken existing capabilities | Nightly / Pre-Release | Playwright (`@regression`) |
| **Critical Business Paths** | Full end-to-end purchasing and order fulfillment flows | Pre-deployment & Staging | Playwright (`@critical`) |
| **API Contract Validation** | Validate HTTP status, JSON schema, and payload rules | CI Pipeline stage | Playwright API / Postman |
| **Database Integrity** | Validate data consistency across UI, API, and DB | Scheduled regression / Post-order | PostgreSQL / DBeaver |
| **Accessibility (a11y)** | Ensure WCAG 2.1 Level AA compliance on key views | CI Pipeline stage | `@axe-core/playwright` |
| **Performance Benchmark** | Measure API p95 latency and concurrent user capacity | Sprint hardening cycle | k6 |
| **Cross-Browser** | Verify layout and behavior parity across browsers | Pre-release regression | Playwright Multi-Project |
| **Exploratory & Edge Cases** | Unscripted human testing focused on edge scenarios | Sprint execution | Jira Defect Tracking |

---

## 4. Test Environment Strategy

```
+--------------------+      +--------------------+      +--------------------+
|  DEVELOPER / LOCAL | ---> |     QA STAGING     | ---> |     PRODUCTION     |
| Local Mock / Docker|      | Isolated AUT + DB  |      | Production Staging |
| Zero network lag   |      | CI/CD Target       |      | Release Validation |
+--------------------+      +--------------------+      +--------------------+
```

All tests support execution against parameterized `BASE_URL` targets via `.env`:
- Local Staging AUT (`http://localhost:5001`)
- Dockerized nopCommerce container (`http://localhost:5000`)
- Public / Staging instances (`https://demo.nopcommerce.com`)

---

## 5. Quality Gates: Entry, Exit, Suspension & Resumption Criteria

### 5.1 Entry Criteria for Testing Cycle
- [x] Code build deployed successfully to the target test environment.
- [x] Release notes detailing included user stories, fixes, and configuration changes provided.
- [x] PostgreSQL database seeded with consistent test data.
- [x] Smoke test suite passes with 100% success rate.

### 5.2 Exit Criteria for Release Sign-Off
- [x] 100% of planned test cases executed.
- [x] Overall test pass rate $\ge 95\%$.
- [x] Zero open P0 (Blocker) or P1 (Critical) defects.
- [x] All P2 (Major) defects have approved business workarounds or deferred waivers.
- [x] 100% of automated smoke and critical path tests passing in CI.
- [x] Accessibility audit displays 0 critical/serious WCAG violations.
- [x] Performance test verifies API p95 response time $\le 500$ ms.
- [x] Formal QA Sign-Off document signed by QA Architect and Engineering Lead.

### 5.3 Suspension Criteria
- Testing shall be suspended if $> 30\%$ of smoke tests fail, the test environment becomes unresponsive, or blocking defects prevent progress across core checkout/catalog modules.

### 5.4 Resumption Criteria
- Testing shall resume once Development deploys a remediated build and the automated Smoke suite successfully re-passes.

---

## 6. Defect Management & Severity Matrix

Defects are managed in Jira with the following severity definitions:

| Severity | Definition | SLA for Remediation | Release Impact |
|:---:|:---|:---:|:---:|
| **P0 - Blocker** | System crash, severe data corruption, inability to place orders, security vulnerability. | 4 hours | Blocks Release |
| **P1 - Critical** | Major functionality failure with no workaround (e.g., payment gateway failure). | 24 hours | Blocks Release |
| **P2 - Major** | Important feature malfunction with an acceptable workaround. | 3-5 days | Requires Waiver |
| **P3 - Minor** | Non-critical functional glitch, UI misalignment, minor text typo. | Next Sprint | Non-blocking |

---

## 7. Automation Engineering Strategy

1. **Architecture:** Page Object Model (POM) separating locator selectors and page actions from test logic.
2. **Determinism:** Zero use of arbitrary `page.waitForTimeout()`; all interactions rely on Playwright auto-waiting locators and explicit assertions (`expect(locator).toBeVisible()`).
3. **Data Isolation:** Dynamic test data generators creating unique emails and addresses to avoid test cross-talk.
4. **State Reuse:** Playwright storage state fixtures to preserve authentication across tests where login is not the test target.
5. **Continuous Reporting:** HTML Reports, Allure annotations, and JUnit XML outputs produced natively for CI consumption.
