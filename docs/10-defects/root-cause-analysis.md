# Root Cause Analysis (RCA) — Simulated Defect Case Studies

> **Document Type:** Quality Engineering Process Artifact  
> **Classification:** Educational RCA Case Studies based on Simulated Local Staging Issues  
> **Purpose:** Demonstrates post-mortem investigative methodologies (5-Whys, Ishikawa/Fishbone Diagrams, CAPA plans).

---

## 1. Purpose & Methodology

Root Cause Analysis (RCA) is a structured problem-solving approach aimed at identifying the fundamental breakdown in process, tooling, or design that allowed a defect to manifest and escape detection.

This document illustrates two representative RCA case studies from local staging simulator quality engineering.

---

## 2. RCA Case Study #1: DEF-SIM-001 (WCAG AA Color Contrast Failure)

### Defect Overview
- **Defect ID:** `DEF-SIM-001`
- **Severity:** Major (S2)
- **Impact:** Low contrast impairs text legibility for users with vision deficiencies.

### 5-Whys Analysis
1. **Why did the primary button fail the accessibility audit?**  
   The contrast ratio between button text (`#ffffff`) and background (`#4ab2f1`) was `2.35:1`, below the WCAG AA threshold of `4.5:1`.
2. **Why was `#4ab2f1` selected?**  
   The color was selected for visual aesthetic without running an automated contrast check.
3. **Why did implementation proceed without contrast testing?**  
   CSS tokens were authored without pre-commit accessibility linting.
4. **Why did the code review miss the contrast issue?**  
   Manual PR review checklists focused on functional logic rather than design token accessibility.
5. **Why was accessibility testing performed late?**  
   Accessibility checks were not shifted left into automated CI test gates.

### Root Cause
Lack of automated accessibility checks in early development and CI pipelines.

### Corrective & Preventive Action (CAPA)
| Action Item | Role | Status |
|:---|:---|:---:|
| Update primary button CSS variable to `#1565c0` (`4.72:1` contrast ratio) | Frontend / QA | **Completed** |
| Codify automated `@axe-core/playwright` checks in CI pipeline | SDET | **Completed** |
| Add accessibility checklists to test design phase | QA Lead | **Completed** |

---

## 3. RCA Case Study #2: DEF-SIM-002 (Cart Form POST Route 404)

### Defect Overview
- **Defect ID:** `DEF-SIM-002`
- **Severity:** Blocker (S1)
- **Impact:** Submitting cart form changes resulted in 404 unhandled route errors.

### Ishikawa (Fishbone) Diagram

```text
Engineering / People               Process / Governance
        │                                  │
        ├─ Route handler missed            ├─ Controller routes not verified
        │  for form POST method            │  in unit test suite
        │                                  │
        └─ Focus on GET rendering only     └─ Integration tested only via AJAX
                                              rather than HTML form POST
                                              ───────────► DEF-SIM-002
        ┌─ Missing app.post('/cart')       ┌─ Router contract divergence
        │  in server routing table         │  between UI form and backend
        │                                  │
        └─ No automated schema check       └─ Incomplete boundary testing
Technology / Architecture          Measurement / Testing
```

### Root Cause
Staging controller provided only `GET /cart` for rendering, omitting the complementary `POST /cart` endpoint required by standard HTML form submission.

### Corrective & Preventive Action (CAPA)
| Action Item | Role | Status |
|:---|:---|:---:|
| Implement `app.post('/cart')` route handler with proper redirects in `server.js` | Backend / SDET | **Completed** |
| Add automated regression test `CART-REG-02` in Playwright suite | SDET | **Completed** |
| Implement test reset fixture `resetSimulatorState` to ensure clean cart state | SDET | **Completed** |
