# Root Cause Analysis (RCA) — Critical Defects

## 1. Purpose & Scope
This Root Cause Analysis (RCA) document provides formal post-mortem evaluations of critical and major defects identified during the nopCommerce v4.70 test cycles. The purpose is to identify systemic vulnerabilities in code development, architecture, code review, or requirements definition to prevent defect recurrence.

---

## 2. RCA #1: Defect BUG-A11Y-001 (WCAG AA Color Contrast Failure)

### Defect Overview
- **Defect ID:** `BUG-A11Y-001`
- **Severity:** Major (S2)
- **Impact:** Visually impaired users or users in bright ambient light cannot distinguish button labels, causing WCAG 2.1 AA compliance failure and legal/brand liability.

### 5-Whys Analysis
1. **Why did the primary button fail the accessibility audit?**
   The contrast ratio between the text (`#ffffff`) and the button background (`#4ab2f1`) was `2.35:1`, below the minimum WCAG AA threshold of `4.5:1`.
2. **Why was `#4ab2f1` selected for the button background?**
   The UI designer chose `#4ab2f1` based on brand aesthetic palette without running an automated contrast check.
3. **Why did the developer implement the color without testing contrast?**
   The developer followed the design token specs directly in CSS and assumed the design file had passed contrast review.
4. **Why was contrast not validated during the pull request review?**
   The PR review checklist lacked an automated accessibility linting step or contrast gate.
5. **Why was accessibility testing only performed at the end of the sprint?**
   Accessibility testing was traditionally treated as a manual post-regression activity rather than shifted left into CI/CD.

### Root Cause
Absence of automated accessibility testing in the pre-commit and CI pull request pipeline, combined with lack of contrast verification during UX token definition.

### Preventive & Corrective Actions
| Action Item | Owner | Target Date | Status |
| :--- | :--- | :--- | :--- |
| Update CSS theme variable `--primary-color` to `#1565c0` (4.72:1 contrast) | Frontend Dev | Sprint 43 | **Completed** |
| Integrate `@axe-core/playwright` automated checks into CI pipeline | Senior SDET | Sprint 43 | **Completed** |
| Add WCAG contrast check gate in Figma design system library | UX Lead | Sprint 44 | In Progress |

---

## 3. RCA #2: Defect BUG-CART-001 (Cart Quantity POST Request Returns 404)

### Defect Overview
- **Defect ID:** `BUG-CART-001`
- **Severity:** Blocker (S1)
- **Impact:** Customers attempting to update cart quantities or remove items using form submission receive HTTP 404 errors, causing total checkout abandonment.

### Ishikawa (Fishbone) Diagram

```text
People                             Process
  │                                  │
  ├─ Junior Dev overlooked           ├─ Controller routes not verified
  │  HTML form POST method           │  in unit test suite
  │                                  │
  └─ Lack of pair programming        └─ API endpoint tested in isolation
                                        without HTML form binding
                                        ───────────► BUG-CART-001
  ┌─ Missing route handler           ┌─ Mock server divergence
  │  for app.post('/cart')           │  from production nopCommerce
  │                                  │
  └─ Client-side AJAX fallback       └─ No contract validation between
     masked missing server route        frontend form action and backend
  │                                  │
Technology                         Environment
```

### 5-Whys Analysis
1. **Why did the user receive an HTTP 404 error on cart update?**
   The server returned `Cannot POST /cart` because no handler was bound to that path.
2. **Why was there no handler for `POST /cart`?**
   The backend developer had only implemented the JSON API route `/api/cart/update-item` and assumed the storefront only used AJAX fetch calls.
3. **Why did the storefront use an HTML form POST instead of fetch?**
   nopCommerce uses standard progressive-enhancement HTML forms for cart quantity submission (`<form action="/cart" method="post">`).
4. **Why was this discrepancy not caught during API integration tests?**
   API integration tests only targeted the REST endpoints directly (`POST /api/cart/items`), not the MVC form route.
5. **Why did unit tests pass?**
   Unit tests verified the CartService business logic, but integration tests did not exercise the MVC route binding.

### Root Cause
Architectural disconnect between REST API test suites and standard MVC server-side form endpoints, combined with lack of an automated end-to-end form submission test.

### Preventive & Corrective Actions
| Action Item | Owner | Target Date | Status |
| :--- | :--- | :--- | :--- |
| Implement `app.post('/cart')` route handler in controller | Backend Dev | Sprint 42 | **Completed** |
| Add comprehensive Playwright POM test for cart form update | SDET | Sprint 42 | **Completed** |
| Expand integration test suite to include all MVC form endpoints | QA Lead | Sprint 43 | **Completed** |
