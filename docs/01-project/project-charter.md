# QA Project Charter: Test Architecture & Automation Portfolio

> **Project Description:**  
> A Playwright + TypeScript QA automation portfolio project testing a deterministic, nopCommerce-inspired local staging simulator. It demonstrates QA test design, UI/API automation, accessibility checks, CI, and supporting QA artifacts. It is not a production certification or a claim of testing upstream nopCommerce.

---

## 1. Executive Summary

This Project Charter outlines the Quality Assurance (QA) and Software Development Engineer in Test (SDET) architecture designed to validate a high-fidelity local staging simulator.

The repository demonstrates the end-to-end QA engineering lifecycle:
- Requirement decomposition into testable criteria.
- Playwright + TypeScript test automation utilizing the Page Object Model (POM).
- REST API contract validation using Ajv schema checking.
- Automated accessibility audits using `@axe-core/playwright`.
- Continuous integration pipelines via GitHub Actions.
- Supporting governance artifacts (RTM, defect tracking, RCA, and closure reports).

---

## 2. Core Execution Targets & Boundaries

| Dimension | Default Active Scope | Supplementary / Experimental Scope |
|:---|:---|:---|
| **Application Under Test (AUT)** | `automation/staging-aut/server.js` (Deterministic Node.js staging simulator on port 5001) | Upstream nopCommerce v4.70 container stack in `docker/` (Reference only) |
| **Test Automation Suite** | Exactly 50 Playwright tests running on Chromium | Multi-browser matrices (configured in config for local trials) |
| **CI Runner** | GitHub Actions (`.github/workflows/ci.yml`) | Jenkins declarative pipeline (`jenkins/Jenkinsfile` as local example) |
| **API Contract Validation** | Playwright `APIRequestContext` + Ajv JSON Schema validation | Postman collection (`api/postman/`) |
| **Database Testing** | In-memory simulator state factory and reset mechanism | Manual SQL validation library (`database/`) for PostgreSQL inspection |
| **Performance Testing** | Standalone k6 scripts for local benchmarking (`performance/k6/`) | Production capacity certification (Out of Scope) |

---

## 3. Scope Boundaries

### 3.1 In-Scope (Implemented & Automated)
1. **Automated Storefront Flows:** Customer registration, authentication, product browsing, cart modifications, and multi-step checkout.
2. **Automated Backoffice Flows:** Admin authentication, order listing, status transitions, and authorization guards.
3. **API Contract Verification:** Login tokens, customer registration parameters, catalog search, cart item CRUD, and order placements.
4. **Accessibility Audits:** Automated axe-core scans across 5 simulator routes for critical and serious violations.
5. **Deterministic Test Isolation:** Simulator state reset before each test via `POST /api/test/reset`.

### 3.2 Out-of-Scope (Disclaimed)
- Production deployment sign-off or commercial release certification.
- Claims of testing or certifying live upstream nopCommerce servers.
- Automated live PostgreSQL / ACID validation within default CI runs.
- Third-party live payment gateway transactions.
