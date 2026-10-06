# Jenkins CI Pipeline (Optional Local Example)

> **Status:** Optional Reference Pipeline Definition  
> **Target Environment:** Local staging simulator (`automation/staging-aut/server.js`)  
> **Browser Scope:** Chromium only  
> **Execution Status:** Declarative pipeline definition provided as a CI/CD reference. Default automated verification runs via GitHub Actions.

---

## 1. Overview & Purpose

The `Jenkinsfile` in this directory provides a reference declarative Jenkins pipeline definition demonstrating how the Playwright Chromium test suites can be orchestrated in a self-hosted or local Jenkins controller.

- It is an **optional reference** and is not the primary verified CI gate for this repository.
- GitHub Actions (`.github/workflows/ci.yml`) is the active CI runner for pull requests and main branch builds.
- It targets the deterministic local staging simulator on port 5001.

---

## 2. Actual Pipeline Stages

The declarative pipeline in `jenkins/Jenkinsfile` defines the following sequential stages:

```text
Jenkins Agent Trigger
         ↓
  1. [Checkout]
         ↓
  2. [Install Dependencies] (npm install + npx playwright install chromium)
         ↓
  3. [Environment Preparation] (Echo target BASE_URL)
         ↓
  4. [API Tests] (playwright test --grep @api --project=chromium)
         ↓
  5. [Smoke Tests] (playwright test --grep @smoke --project=chromium)
         ↓
  6. [Regression Tests] (playwright test --grep @regression --project=chromium)
         ↓
  7. [Accessibility Checks] (axe-core audit on 5 pages, Chromium only)
         ↓
  8. [Generate Reports] (reports/junit.xml)
         ↓
  9. [Post Actions] (Archive reports/** and JUnit results)
```

---

## 3. Scope Boundaries & Honest Disclosures

- **Browser Scope:** The pipeline runs tests against **Chromium only**. Cross-browser matrices (Firefox, WebKit, Mobile) are not configured in this pipeline.
- **Reporting:** Uses standard JUnit XML test results archiving. Third-party Allure server publishing is not configured.
- **Integrations:** Jira, Xray, Slack/Teams notifications, and remote cloud device grids are not wired into this pipeline definition.
- **AUT Dependency:** Requires the staging simulator running on `http://localhost:5001` or managed as a background step.
