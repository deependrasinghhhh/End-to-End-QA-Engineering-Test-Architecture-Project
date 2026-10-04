# JENKINS CI/CD QUALITY PIPELINE

This directory contains the continuous integration and test automation pipeline architecture for validating **nopCommerce v4.70**.

---

## 1. Pipeline Architecture

The pipeline executes the standardized STLC promotion stages:

```text
GitHub Push / PR / Nightly Schedule
                ↓
           [Checkout]
                ↓
      [Install Dependencies]
   (Node.js 22 + Chromium)
                ↓
    [Environment Preparation]
   (Healthcheck & DB Baseline)
                ↓
           [API Tests]
       (@api status & schema)
                ↓
          [Smoke Tests]
      (@smoke critical flows)
                ↓
        [Regression Tests]
     (@regression full suite)
                ↓
      [Accessibility Checks]
   (axe-core WCAG 2.1 Level AA)
                ↓
       [Generate Reports]
      (JUnit XML + Allure)
                ↓
       [Publish Artifacts]
                ↓
     BUILD PASS / QUALITY GATE
```

---

## 2. Credentials Setup in Jenkins Credentials Store

Configure the following credentials in **Jenkins $\rightarrow$ Manage Jenkins $\rightarrow$ Credentials**:

| Credential ID | Type | Description |
|:---|:---|:---|
| `NOP_BASE_URL` | Secret Text | Target test environment URL (`http://localhost:5001` or Staging) |
| `JIRA_BASE_URL` | Secret Text | Atlassian Jira workspace URL (`https://your-org.atlassian.net`) |
| `JIRA_API_TOKEN` | Secret Text | Jira REST API token for defect linking and test execution update |
| `XRAY_CLIENT_ID` | Secret Text | Xray Cloud Client ID |
| `XRAY_CLIENT_SECRET` | Secret Text | Xray Cloud Client Secret |
| `BROWSERSTACK_USERNAME` | Secret Text | (Optional) Cloud cross-browser username |
| `BROWSERSTACK_ACCESS_KEY` | Secret Text | (Optional) Cloud cross-browser access key |

---

## 3. Required Jenkins Plugins

- **Pipeline Plugin** (Workflow Aggregator)
- **NodeJS Plugin** (Configured with Node 20+ / 22+)
- **HTML Publisher Plugin** (For Playwright HTML Reports)
- **JUnit Plugin** (For machine-readable test analytics)
- **Allure Jenkins Plugin** (For interactive Allure dashboards)
- **AnsiColor Plugin** (For terminal color output)
