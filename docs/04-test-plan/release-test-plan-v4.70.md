# RELEASE TEST PLAN: nopCommerce v4.70

**Release ID:** REL-2026.Q4-v4.70  
**Target Build:** v4.70.0-rc3  
**Document ID:** PLAN-NOP-4.70  
**Version:** 1.0.0  
**Author:** QA Lead  
**Target Deployment Date:** October 2026  

---

## 1. Scope & Modules Under Test

This Release Test Plan operationalizes the Master Test Strategy for the certification of **nopCommerce v4.70**.

### 1.1 In-Scope Modules for Certification
- **Module 1 (M01):** Customer Account & Authentication (Registration, Login, Password Recovery, Profile, Address Book).
- **Module 2 (M02):** Product Catalog & Taxonomy (Categories, Subcategories, Grid/List, Filters, Sort).
- **Module 3 (M03):** Search & Navigation (Header search suggest, Advanced search, Empty state).
- **Module 4 (M04):** Product Details & Attributes (Dynamic pricing, Stock indicator, Quantity validation, Reviews).
- **Module 5 (M05):** Cart & Wishlist (Line items, Quantity adjustment, Discount coupon codes, Gift cards, Terms acceptance).
- **Module 6 (M06):** Checkout & Payment (One-page accordion checkout, Billing, Shipping, Shipping method, Payment method, Payment info, Order confirmation).
- **Module 7 (M07):** Order History & Invoices (Order list, Order details, Re-order, PDF invoice).
- **Module 8 (M08):** Administration Console (Dashboard KPIs, Product CRUD, Stock updates, Order management & status transitions).
- **Module 9 (M09):** API Layer (REST contracts for Auth, Catalog, Cart, and Orders).
- **Module 10 (M10):** Database Integrity (PostgreSQL data consistency, FK relationships, inventory decrements).

---

## 2. Release Schedule & Milestone Dates

```
+-------------------------------------------------------------------------------+
| Oct 01: Build Handoff & Environment Seed                                      |
| Oct 02 - 03: Smoke Testing & Initial Exploratory Pass                         |
| Oct 04 - 06: Test Execution Cycle 1 (Full Test Suite + API + DB)              |
| Oct 07: Defect Retesting & Bug Fix Verification                               |
| Oct 08 - 09: Test Execution Cycle 2 (Regression + Cross-Browser + a11y + k6)  |
| Oct 10: Release Candidate Certification & QA Sign-Off                         |
| Oct 11: Production Deployment & Post-Deployment Verification (PDV)           |
+-------------------------------------------------------------------------------+
```

---

## 3. Resource Allocation & Environment

### 3.1 Test Team
- **QA Lead / Architect:** Strategy, Test Plan, Sign-Off, Defect Triage (100% allocation).
- **Senior SDET:** Playwright Automation, API Testing, Performance & Accessibility (100% allocation).
- **Senior Functional QA:** Manual Execution, Edge Case Exploratory, Defect Retesting (100% allocation).

### 3.2 Environments
- **Primary Execution Environment:** QA Staging (`http://localhost:5001`) with PostgreSQL persistence.
- **Dockerized AUT Cluster:** `docker/docker-compose.yml` (nopCommerce + Postgres 15).
- **CI/CD Automation Agent:** Jenkins Pipeline Executor (Node.js 22 runtime, headless Chromium).

---

## 4. Test Deliverables

1. **Test Specification Artifacts:**
   - Functional & Non-Functional Requirements Documents (`docs/02-requirements/`)
   - Test Scenarios (`docs/05-test-scenarios/`)
   - Master Test Case Suite (`docs/06-test-cases/test-case-suite.md` and `test-cases.csv`)
   - Requirement Traceability Matrix (`docs/07-rtm/`)
2. **Automation & Technical Codebase:**
   - Playwright + TypeScript POM Framework (`automation/`)
   - Postman Collection & Environment (`api/postman/`)
   - PostgreSQL Database Test Scripts (`database/`)
   - k6 Performance Test Scripts (`performance/k6/`)
   - Jenkinsfile Pipeline Definition (`jenkins/Jenkinsfile`)
3. **Execution & Release Reports:**
   - Test Execution Cycle Logs (`docs/09-test-execution/`)
   - Defect Reports & Root Cause Analysis (`docs/10-defects/`)
   - Accessibility Audit Report (`docs/15-accessibility/`)
   - Performance Benchmark Report (`docs/14-performance/`)
   - Formal QA Sign-Off Certificate (`docs/16-release/qa-sign-off.md`)
   - Test Closure Report (`docs/17-test-closure/`)

---

## 5. Release Exit Criteria

| Metric | Target Goal | Mandatory / Non-Mandatory |
|:---|:---:|:---:|
| Test Case Execution Rate | 100% | Mandatory |
| Test Case Pass Rate | $\ge 96\%$ | Mandatory |
| P0 / P1 Open Defects | 0 | Mandatory |
| P2 Open Defects | $\le 2$ with documented workaround | Mandatory |
| Automated Smoke Pass Rate | 100% | Mandatory |
| Automated Regression Pass Rate | $\ge 98\%$ | Mandatory |
| Automated a11y WCAG 2.1 AA Violations | 0 Critical / Serious | Mandatory |
| k6 95th Percentile Response Time | $< 500$ ms | Mandatory |
