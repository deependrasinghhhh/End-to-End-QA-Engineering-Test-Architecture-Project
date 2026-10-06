# QA Automation & Test Architecture Portfolio Project
### Playwright + TypeScript Test Automation & STLC Artifacts for a Local Staging Simulator

[![Playwright Tests](https://img.shields.io/badge/Playwright-50%20Tests%20Passing-brightgreen?logo=playwright)](automation/)
[![Browser Scope](https://img.shields.io/badge/CI%20Browser-Chromium-blue?logo=googlechrome)](playwright.config.ts)
[![A11y Checks](https://img.shields.io/badge/Accessibility-axe--core%20(5%20Pages)-blue?logo=w3c)](accessibility/)
[![API Validation](https://img.shields.io/badge/API-Playwright%20%2B%20Ajv-orange?logo=postman)](automation/tests/api/)
[![CI Pipeline](https://img.shields.io/badge/CI-GitHub%20Actions-2088FF?logo=githubactions)](.github/workflows/ci.yml)
[![License](https://img.shields.io/badge/License-MIT-green)](LICENSE)

---

## 1. Project Overview & Explicit Project Boundary

> **A Playwright + TypeScript QA automation portfolio project testing a deterministic, nopCommerce-inspired local staging simulator. It demonstrates QA test design, UI/API automation, accessibility checks, CI, and supporting QA artifacts. It is not a production certification or a claim of testing upstream nopCommerce.**

### Purpose & Scope
This repository demonstrates professional Quality Assurance (QA) and Software Development Engineer in Test (SDET) engineering practices across the Software Testing Life Cycle (STLC). It showcases:
- **Test Strategy & Design:** Requirements decomposition, risk-based prioritization, and a machine-searchable Requirements Traceability Matrix (RTM).
- **Modern Test Automation:** Playwright with TypeScript utilizing the Page Object Model (POM), custom fixtures, and deterministic test isolation.
- **API Contract Validation:** REST API automated tests with Ajv JSON Schema validation.
- **Accessibility Quality Gates:** Automated `@axe-core/playwright` audits across five core simulator routes.
- **Continuous Integration:** GitHub Actions pipeline executing linting (`eslint`), static typing (`tsc --noEmit`), and Chromium test suites on every pull request and push.
- **Supporting QA Artifacts:** Standardized templates for test planning, defect tracking, root cause analysis, release readiness reviews, and test closure.

---

## 2. Evidence Matrix

To maintain technical honesty and interview credibility, this matrix explicitly distinguishes implemented, automated, and CI-verified capabilities from exploratory or template assets:

| Capability | Implementation | CI Execution | Retained Evidence |
|:---|:---:|:---:|:---|
| **Playwright Chromium Suite** | Yes (50 tests) | Yes | GitHub Actions run artifacts (`reports/junit.xml`, HTML report) |
| **API Simulator Checks** | Yes (8 tests) | Yes | Playwright API test runs with Ajv schema validation |
| **axe-core Accessibility** | Yes (5 tests) | Yes | Automated scans failing only on critical/serious violations |
| **PostgreSQL Validation** | Query library only | No | Reference SQL queries under `database/` |
| **k6 Performance Tests** | Scripts only | No | Standalone k6 JavaScript scripts under `performance/k6/` |
| **Docker Upstream nopCommerce** | Experimental | No | Reference compose file (`docker/docker-compose.yml`) |
| **Jenkins Pipeline** | Pipeline definition | No | Reference declarative `jenkins/Jenkinsfile` |
| **Manual Test Cases** | Design templates | No | Markdown & CSV test specifications in `docs/06-test-cases/` |

---

## 3. Application Under Test (AUT) — Architecture & Isolation

The default AUT for all automated tests in this repository is the **in-memory local staging simulator** located at:
```text
automation/staging-aut/server.js
```

### Staging Simulator Architecture
- **Runtime:** Express.js running on `http://localhost:5001`.
- **Fidelity:** Replicates e-commerce DOM structure, CSS class names, product catalog schemas, cart mutations, multi-step checkout accordions, and REST endpoints.
- **Test Isolation Mechanism:** To prevent state contamination across tests, the simulator extracts state into a factory function (`createInitialState()`) and exposes a reset endpoint (`POST /api/test/reset`) enabled via `ALLOW_TEST_RESET=true`.
- **Automatic Lifecycle:** Configured in `playwright.config.ts` via Playwright's `webServer`, automatically booting the simulator and resetting state before each test via `automation/fixtures/test.fixture.ts`.

> [!NOTE]
> The upstream containerized nopCommerce v4.70 + PostgreSQL Docker stack (`docker/`) is an optional reference environment and is not the target of the automated test suite or CI.

---

## 4. Test Automation Suite (50 Playwright Tests)

The repository currently defines **exactly 50 Playwright tests** running on **Chromium**:

```text
automation/
├── tests/
│   ├── smoke/
│   │   └── smoke.spec.ts              # 8 tests: Core availability, navigation, backoffice login
│   ├── regression/
│   │   ├── auth.spec.ts               # 7 tests: Registration validation, login boundaries, recovery
│   │   ├── catalog.spec.ts            # 5 tests: Category links, sorting, auto-suggest, empty search
│   │   ├── cart.spec.ts               # 5 tests: Cart table, qty updates, totals, coupons, item removal
│   │   └── checkout.spec.ts           # 2 tests: Terms of service gating, multi-step checkout
│   ├── critical/
│   │   └── critical-paths.spec.ts     # 3 tests: Guest checkout, customer order audit, admin status progression
│   ├── customer/
│   │   └── customer-account.spec.ts   # 3 tests: Profile update, address book, order history
│   ├── admin/
│   │   ├── admin-catalog.spec.ts      # 2 tests: Admin catalog search and empty state
│   │   └── admin-orders.spec.ts       # 2 tests: Order status filtering, unauthorized access guard
│   └── api/
│       └── api-customer-order.spec.ts # 8 tests: Simulator REST contracts with Ajv JSON Schema validation
accessibility/
└── tests/
    └── accessibility.spec.ts          # 5 tests: axe-core audits (Homepage, Login, PDP, Cart, Register)
```

**Total Automated Tests:** **50**

---

## 5. Continuous Integration (CI) Workflow

Automated testing is orchestrated via GitHub Actions ([`.github/workflows/ci.yml`](.github/workflows/ci.yml)):

```text
GitHub Push / Pull Request (main, develop)
                     ↓
          1. Checkout Repository
                     ↓
          2. Setup Node.js 20 LTS
                     ↓
          3. Install Dependencies (npm ci)
                     ↓
          4. Run ESLint (npm run lint)
                     ↓
          5. Run TypeScript Check (npm run typecheck)
                     ↓
          6. Install Playwright Chromium (npx playwright install --with-deps chromium)
                     ↓
          7. Run 50 Playwright Tests (npx playwright test --project=chromium)
             (Simulator booted automatically with ALLOW_TEST_RESET=true)
                     ↓
          8. Upload CI Artifacts (JUnit XML & Playwright HTML Report)
```

CI test execution results and reports are retained as downloadable artifacts in each GitHub Actions run.

---

## 6. How to Run Locally

### Prerequisites
- Node.js (v18 or higher)
- npm (v9 or higher)
- Git

### 1. Installation
```bash
git clone https://github.com/deependrasinghhhh/End-to-End-QA-Engineering-Test-Architecture-Project.git
cd End-to-End-QA-Engineering-Test-Architecture-Project
npm install
npx playwright install chromium
```

### 2. Static Code Verification
```bash
# Run ESLint across TypeScript codebase
npm run lint

# Run strict TypeScript typecheck (tsc --noEmit)
npm run typecheck
```

### 3. Run Automated Tests
```bash
# Run all 50 Playwright tests against Chromium (headless)
npm test

# Run specific functional suites
npm run test:smoke          # 8 Smoke tests
npm run test:regression     # 19 Regression tests
npm run test:critical       # 3 Critical end-to-end paths
npm run test:api            # 8 API contract tests with Ajv
npm run test:a11y           # 5 axe-core accessibility tests

# Run in headed mode for visual observation
npm run test:headed
```

*(Note: Playwright's `webServer` automatically starts the local staging simulator on port 5001 before running tests.)*

---

## 7. Supporting QA Artifacts & Documentation Map

The `docs/` directory documents the full STLC process using structured industry-standard templates:

| Directory | Scope & Focus | Nature of Asset |
|:---|:---|:---|
| [`docs/01-project/`](docs/01-project/) | Project Charter & Application Overview | Project boundary definition & scope |
| [`docs/02-requirements/`](docs/02-requirements/) | Business & Functional Requirements (REQ-*) | Requirements baseline |
| [`docs/03-test-strategy/`](docs/03-test-strategy/) | Master QA Test Strategy & Testing Pyramid | Architecture & risk model |
| [`docs/04-test-plan/`](docs/04-test-plan/) | Test Plan Specification | Scope, entry/exit criteria, schedules |
| [`docs/05-test-scenarios/`](docs/05-test-scenarios/) | High-level test scenarios | Scenario breakdown |
| [`docs/06-test-cases/`](docs/06-test-cases/) | Master test case repository (Markdown & CSV) | 50 automated tests + manual test designs |
| [`docs/07-rtm/`](docs/07-rtm/) | Requirements Traceability Matrix | Bidirectional traceability (50 automated tests mapped) |
| [`docs/08-test-data/`](docs/08-test-data/) | Test Data Management Strategy | Static fixtures & dynamic generators |
| [`docs/09-test-execution/`](docs/09-test-execution/) | Test Execution Cycle Reports | Structured execution reporting templates |
| [`docs/10-defects/`](docs/10-defects/) | Defect Log & Root Cause Analysis | Simulated local-staging defect case studies & 5-Whys |
| [`docs/11-api-testing/`](docs/11-api-testing/) | API Test Strategy | REST endpoint documentation & contract strategy |
| [`docs/12-database-testing/`](docs/12-database-testing/) | Manual SQL Validation Library | Curated reference SQL queries for manual inspection |
| [`docs/13-automation/`](docs/13-automation/) | Automation Architecture & POM Guide | Framework design and fixture usage |
| [`docs/14-performance/`](docs/14-performance/) | Performance Strategy & k6 Benchmark Template | Standalone k6 load, stress, and soak scripting profiles |
| [`docs/15-accessibility/`](docs/15-accessibility/) | Automated A11y Report & WCAG Checklist | Automated axe-core results + manual checklist template |
| [`docs/16-release/`](docs/16-release/) | Release Readiness Checklist Template | Governance checklist template (no fake sign-offs) |
| [`docs/17-test-closure/`](docs/17-test-closure/) | Test Closure Report Template | Test closure template and testware inventory |

---

## 8. Author & Contact

- **QA Engineer / SDET:** Deependra Singh
- **Focus Areas:** Web Automation (Playwright, TypeScript), API Contract Testing, Test Architecture, Accessibility Gates, CI/CD Workflows.
- **License:** [MIT License](LICENSE)
