# Automated Accessibility (A11y) Audit Report

> **Standard Scope:** Automated axe-core checks run on five local-simulator pages and fail only on critical or serious violations.  
> **Tooling:** `@axe-core/playwright` (v4.10.1)  
> **Test Target:** Local staging simulator (`automation/staging-aut/server.js`)  
> **Test Spec:** `accessibility/tests/accessibility.spec.ts`

---

## 1. Executive Summary

This report documents the automated accessibility inspection configured in the Playwright test suite using axe-core.

- **Automated Scope:** Evaluates 5 specific local simulator routes for WCAG 2.1 Level A and AA rules using `@axe-core/playwright`.
- **Pass / Fail Threshold:** Tests pass when zero `critical` or `serious` impact violations are detected by axe-core.
- **Clarification:** This automated check does **not** constitute formal WCAG certification, Section 508 certification, or comprehensive manual screen reader/assistive technology audit.

---

## 2. Automated Axe-Core Audit Results

The automated checks are codified in `accessibility/tests/accessibility.spec.ts` and executed via:

```bash
npm run test:a11y
```

### Audited Pages & Automated Test Cases

| Test ID | Page / Route | Viewport | axe-core Filter | Status |
|:---|:---|:---|:---|:---|
| **A11Y-01** | Homepage (`/`) | Desktop Chromium | Critical / Serious | **PASS** (0 critical/serious violations) |
| **A11Y-02** | Customer Login (`/login`) | Desktop Chromium | Critical / Serious | **PASS** (0 critical/serious violations) |
| **A11Y-03** | Product Details (`/build-your-own-computer`) | Desktop Chromium | Critical / Serious | **PASS** (0 critical/serious violations) |
| **A11Y-04** | Shopping Cart (`/cart`) | Desktop Chromium | Critical / Serious | **PASS** (0 critical/serious violations) |
| **A11Y-05** | Customer Registration (`/register`) | Desktop Chromium | Critical / Serious | **PASS** (0 critical/serious violations) |

---

## 3. Discovered Simulator Markup Considerations

During initial simulator testing, two common markup issues were identified and addressed in the local template generator:

1. **Color Contrast:** Button styles were adjusted to maintain at least 4.5:1 text-to-background contrast for standard body text.
2. **Form Labels:** Form controls (e.g. quantity and search inputs) include explicit `<label>` or `aria-label` attributes.

---

## 4. Manual Accessibility Assessment Notice

Comprehensive accessibility auditing requires extensive human testing with screen readers (NVDA, JAWS, VoiceOver), keyboard focus navigation audits, and cognitive walkthroughs. In this portfolio project:
- Screen-reader and manual keyboard evaluations are defined as an **example manual checklist template** in `wcag-compliance-matrix.md`.
- Criteria not covered by the 5 automated axe-core specs are marked **Not assessed**.
