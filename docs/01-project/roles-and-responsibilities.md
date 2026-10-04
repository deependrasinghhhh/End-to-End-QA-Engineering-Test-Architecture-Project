# QA ROLES AND RESPONSIBILITIES

**Project:** nopCommerce v4.70 QA Organization  
**Framework Version:** 1.0.0  
**Effective Date:** October 2026  

---

## 1. QA Team Organizational Hierarchy

The Quality Assurance practice operates as an autonomous, high-rigor engineering discipline embedded alongside Product Management and Software Development.

```
                  +-----------------------------------+
                  |           QA Lead /               |
                  |         Test Architect            |
                  +-----------------+-----------------+
                                    |
            +-----------------------+-----------------------+
            |                                               |
+-----------v-----------+                       +-----------v-----------+
|      Senior SDET      |                       |    Senior Functional  |
|  (Automation & CI/CD) |                       |        QA Lead        |
+-----------+-----------+                       +-----------+-----------+
            |                                               |
+-----------v-----------+                       +-----------v-----------+
| Playwright Automation |                       | Test Cases, Scenarios |
| API & Perf Engineering|                       | Manual, Defect Triage |
+-----------------------+                       +-----------------------+
```

---

## 2. Role Definitions & Expectations

### 2.1 QA Lead / Test Architect
- **Mission:** Defines the overarching QA strategy, governance, test methodologies, and quality metrics across the SDLC.
- **Key Responsibilities:**
  - Author and approve the **Master Test Strategy** and **Release Test Plans**.
  - Establish Quality Gates (Entry/Exit Criteria) for all promotion stages.
  - Architect the test automation framework for scalability, maintainability, and zero flakiness.
  - Champion testability requirements with Development Architects and Product Managers.
  - Author formal **QA Sign-Off** and **Test Closure** reports for executive stakeholders.

### 2.2 Senior SDET (Software Development Engineer in Test)
- **Mission:** Implements high-performance, robust test automation infrastructure and CI/CD pipelines.
- **Key Responsibilities:**
  - Build and maintain the **Playwright + TypeScript** Page Object Model (POM) framework.
  - Develop automated regression, critical path, API, and accessibility test suites.
  - Integrate test execution into Jenkins pipelines and GitHub Actions workflows.
  - Implement k6 performance scripts and analyze throughput, latency, and resource bottlenecks.
  - Eliminate flaky tests through deterministic waiting, isolated test fixtures, and synthetic data generation.

### 2.3 Senior Functional QA Engineer
- **Mission:** Drives meticulous requirement analysis, test design, exploratory testing, and defect advocacy.
- **Key Responsibilities:**
  - Decompose user stories and functional specifications into granular **Test Scenarios** and **Test Cases**.
  - Maintain the bidirectional **Requirement Traceability Matrix (RTM)**.
  - Execute manual exploratory testing, cross-browser visual validation, and edge-case verification.
  - Log high-clarity defect reports in Jira with reproducible steps, environment details, logs, and screenshots.
  - Perform defect retesting, regression verification, and root-cause analysis (RCA).

### 2.4 DevOps / Infrastructure Collaborator
- **Mission:** Ensures dedicated, stable, reproducible test environments and CI runner agents.
- **Key Responsibilities:**
  - Maintain Docker Compose configurations and PostgreSQL test databases.
  - Provide isolated Jenkins agent executors with Node.js and container runtimes.
  - Ensure zero access bottlenecks to network endpoints and secrets management.

---

## 3. Detailed RACI Governance Matrix

| QA Activity / Deliverable | QA Architect | Senior SDET | Functional QA | Dev Lead | Product Owner |
|:---|:---:|:---:|:---:|:---:|:---:|
| **Project Charter & Strategy** | **A** | C | C | C | I |
| **Requirement Review & Ambiguity Resolution** | C | C | **R** | C | **A** |
| **Test Scenarios & Test Cases Creation** | C | C | **R / A** | C | I |
| **RTM Maintenance** | I | C | **R / A** | I | I |
| **Automation Framework Architecture** | **A** | **R** | I | C | I |
| **Playwright Test Script Implementation** | I | **R / A** | C | I | I |
| **API Automated Testing (Playwright/Postman)** | I | **R / A** | C | C | I |
| **PostgreSQL Database Verification** | C | **R** | **R** | C | I |
| **Axe-core Accessibility Testing** | C | **R / A** | C | I | I |
| **k6 Performance Benchmark Testing** | C | **R / A** | I | C | I |
| **Jenkins CI/CD Pipeline Implementation** | C | **R / A** | I | C | I |
| **Manual Execution & Exploratory Cycles** | I | I | **R / A** | I | I |
| **Defect Triage & Verification** | C | C | **R / A** | **R** | C |
| **Release Candidate Certification** | **A** | C | C | C | **A** |
| **Formal QA Sign-Off Decision** | **A** | C | C | C | C |
| **Test Closure & Retrospective** | **A** | C | C | C | I |

*Legend: R = Responsible for doing, A = Accountable for completion, C = Consulted for expertise, I = Informed of progress*
