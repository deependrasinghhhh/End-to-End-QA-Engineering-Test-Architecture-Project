# Example Manual Accessibility Checklist Template (WCAG 2.1 Level AA)

> **Document Type:** Example Manual Accessibility Checklist  
> **Status:** Reference checklist template for QA evaluation.  
> **Automated Verification:** 5 pages audited via `@axe-core/playwright` (`accessibility/tests/accessibility.spec.ts`). Criteria not covered by automated axe-core rules are marked **Not assessed**.

---

## 1. Overview

This checklist serves as an example quality artifact outlining how manual accessibility evaluations map against the **Web Content Accessibility Guidelines (WCAG) 2.1 Level AA**.

In this portfolio project, automated scans cover select Level A and AA rules across 5 simulator pages. All additional criteria represent manual checklist items for candidate/QA evaluation.

---

## 2. Principle 1: Perceivable

| Success Criterion | Level | Description | Verification Method | Evaluation Status |
|:---|:---:|:---|:---|:---:|
| **1.1.1 Non-text Content** | A | All non-text content has text alternative | axe-core image-alt rule | Automated (axe-core) |
| **1.3.1 Info and Relationships** | A | Structure can be programmatically determined | Manual DOM inspection | Not assessed |
| **1.3.2 Meaningful Sequence** | A | Reading sequence matches visual layout | Manual visual/DOM review | Not assessed |
| **1.4.1 Use of Color** | A | Color not used as sole conveyor of information | Manual visual review | Not assessed |
| **1.4.3 Contrast (Minimum)** | AA | Contrast ratio >= 4.5:1 for standard text | axe-core color-contrast rule | Automated (axe-core) |
| **1.4.10 Reflow** | AA | Content reflows without loss at 400% zoom | Manual viewport zoom testing | Not assessed |

---

## 3. Principle 2: Operable

| Success Criterion | Level | Description | Verification Method | Evaluation Status |
|:---|:---:|:---|:---|:---:|
| **2.1.1 Keyboard** | A | All functionality operable through keyboard | Manual Tab/Shift-Tab walkthrough | Not assessed |
| **2.1.2 No Keyboard Trap** | A | Focus not trapped in subcomponents | Manual modal/widget check | Not assessed |
| **2.4.1 Bypass Blocks** | A | Mechanism available to bypass blocks | Manual skip link check | Not assessed |
| **2.4.2 Page Titled** | A | Web pages have descriptive titles | axe-core document-title rule | Automated (axe-core) |
| **2.4.3 Focus Order** | A | Focusable components receive logical focus | Manual Tab sequence audit | Not assessed |
| **2.4.7 Focus Visible** | AA | Keyboard focus indicator clearly visible | Manual visual check | Not assessed |

---

## 4. Principle 3: Understandable

| Success Criterion | Level | Description | Verification Method | Evaluation Status |
|:---|:---:|:---|:---|:---:|
| **3.1.1 Language of Page** | A | Default language of each page determined | axe-core html-has-lang rule | Automated (axe-core) |
| **3.2.1 On Focus** | A | Focus does not trigger context change | Manual input focus audit | Not assessed |
| **3.2.2 On Input** | A | Input does not trigger context change | Manual control change audit | Not assessed |
| **3.3.1 Error Identification** | A | Form errors identified and described | Manual form error verification | Not assessed |
| **3.3.2 Labels or Instructions** | A | Labels or instructions provided for input | axe-core label rule | Automated (axe-core) |

---

## 5. Principle 4: Robust

| Success Criterion | Level | Description | Verification Method | Evaluation Status |
|:---|:---:|:---|:---|:---:|
| **4.1.1 Parsing** | A | Elements have complete start/end tags | W3C markup validator | Not assessed |
| **4.1.2 Name, Role, Value** | A | Component name and role programmatically determined | axe-core aria rules | Automated (axe-core) |
| **4.1.3 Status Messages** | AA | Status messages programmatically determined | Assistive tech live region audit | Not assessed |
