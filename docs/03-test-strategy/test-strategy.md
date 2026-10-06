# Master QA Test Strategy

> **Project Description:**  
> A Playwright + TypeScript QA automation portfolio project testing a deterministic, nopCommerce-inspired local staging simulator. It demonstrates QA test design, UI/API automation, accessibility checks, CI, and supporting QA artifacts. It is not a production certification or a claim of testing upstream nopCommerce.

---

## 1. Strategy Objectives & Scope

This Master Test Strategy establishes the engineering principles, verification methodologies, and quality gates demonstrated in this portfolio repository.

Our objective is to showcase:
- Deterministic, zero-flakiness end-to-end web automation using Playwright + TypeScript.
- REST API contract testing with Ajv schema validation.
- Automated accessibility audits using axe-core on critical routes.
- CI pipeline integration via GitHub Actions.
- Industry-standard QA documentation templates (RTM, Defect logs, RCA, and Test Closure).

---

## 2. Test Architecture & Testing Pyramid

The project structures testing across distinct layers:

```text
               / \
              /   \
             / E2E \         <-- 37 UI Playwright Tests (Smoke, Regression, Critical)
            /-------\
           /   API   \       <-- 8 API Contract Tests (Playwright APIRequestContext + Ajv)
          /-----------\
         /    A11y     \     <-- 5 Automated axe-core audits (WCAG 2.1 AA)
        /---------------\
       / Manual Queries  \   <-- Reference SQL query library (database/)
      +-------------------+
```

1. **System & E2E Testing (UI):** 37 tests automated with Playwright + TypeScript using the Page Object Model (POM), validating customer and administrative journeys on the local staging simulator.
2. **API Contract Testing:** 8 tests validating status codes, request parameters, and response structures compiled against Ajv JSON Schemas.
3. **Automated Accessibility Testing:** 5 tests executing `@axe-core/playwright` audits across five core simulator routes.
4. **Manual SQL Validation Library:** Reference SQL queries under `database/` demonstrating manual data inspection and relational schema audits.

---

## 3. Test Automation Suite Distribution (50 Tests)

| Suite / Module | Tag | Test Count | Spec Location |
|:---|:---|:---:|:---|
| **Smoke Suite** | `@smoke` | 8 | `automation/tests/smoke/smoke.spec.ts` |
| **Regression Suite** | `@regression` | 19 | `automation/tests/regression/` |
| **Critical End-to-End Paths** | `@critical` | 3 | `automation/tests/critical/critical-paths.spec.ts` |
| **Customer Portal** | `@customer` | 3 | `automation/tests/customer/customer-account.spec.ts` |
| **Admin Backoffice** | `@admin` | 4 | `automation/tests/admin/` |
| **API Contract Validation** | `@api` | 8 | `automation/tests/api/api-customer-order.spec.ts` |
| **Accessibility Audit** | `@a11y` | 5 | `accessibility/tests/accessibility.spec.ts` |
| **TOTAL AUTOMATED TESTS** | — | **50** | **Chromium execution via GitHub Actions** |

---

## 4. Test Environment Architecture

- **Primary AUT:** `automation/staging-aut/server.js` running on `http://localhost:5001`.
  - In-memory state initialized via `createInitialState()`.
  - State reset endpoint `POST /api/test/reset` enabled via `ALLOW_TEST_RESET=true`.
  - Automated auto-fixture `resetSimulatorState` executes before every test to guarantee test isolation.
- **Optional Reference Environment:** Containerized stack in `docker/docker-compose.yml` (nopCommerce 4.70 + PostgreSQL 15). Not executed in CI.

---

## 5. Quality Gates & Release Readiness (Template Framework)

In an enterprise environment, quality gates govern promotion across environments:

1. **Build Gate:** `npm run lint` and `npm run typecheck` pass with 0 errors.
2. **Smoke Gate:** 100% of `@smoke` tests pass (< 15 seconds execution time).
3. **Regression Gate:** 100% of defined Playwright tests pass against Chromium in CI.
4. **Accessibility Gate:** Zero critical or serious axe-core violations on audited routes.
5. **Defect Triage Gate:** Zero open Blocker (S1) or Critical defects.

---

## 6. Automation Engineering Standards

1. **Page Object Model (POM):** Locators and page operations encapsulated in reusable classes under `automation/pages/`.
2. **Web-First Assertions:** Use Playwright's auto-retrying assertions (`await expect(locator).toBeVisible()`) exclusively; avoid arbitrary fixed sleeps.
3. **Fixture-Driven Isolation:** Test fixtures in `automation/fixtures/` handle authenticated browser state and simulator reset.
4. **Machine-Readable Reports:** Produces JUnit XML (`reports/junit.xml`) and HTML reports retained as CI artifacts.
