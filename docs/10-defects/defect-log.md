# Simulated Local-Staging Defect Log & Examples

> **Classification:** Simulated Local-Staging Defect Examples  
> **Purpose:** Demonstrates industry-standard QA defect documentation, severity/priority triage, bug lifecycle tracking, and verification workflows.  
> **Note:** These defect reports represent simulated scenarios and exercises developed for the local staging simulator (`automation/staging-aut/server.js`), not defects in upstream nopCommerce.

---

## 1. Defect Summary Table

| Defect Key | Summary | Severity | Priority | Target Component | Status |
|:---|:---|:---:|:---:|:---|:---:|
| **DEF-SIM-001** | Primary CTA button fails WCAG 2.1 AA color contrast threshold | Major (S2) | High (P2) | Storefront UI / Theme | **CLOSED / VERIFIED** |
| **DEF-SIM-002** | Form POST `/cart` quantity update triggers 404 when route unbound | Blocker (S1) | Urgent (P1) | Shopping Cart Router | **CLOSED / VERIFIED** |
| **DEF-SIM-003** | Terms of service checkbox unvalidated on form submit | Critical (S1) | High (P1) | Checkout Validation | **CLOSED / VERIFIED** |
| **DEF-SIM-004** | Search dropdown input loses event binding on dynamic DOM reload | Minor (S3) | Medium (P3) | Catalog Search | **CLOSED / VERIFIED** |
| **DEF-SIM-005** | Cart coupon discount not cleared when invalid coupon applied | Major (S2) | Medium (P2) | Cart Discount Engine | **CLOSED / VERIFIED** |

---

## 2. Detailed Defect Examples

### Defect 1: DEF-SIM-001 (Automated axe-core A11y Finding)
- **Ticket ID:** `DEF-SIM-001`
- **Component:** Storefront — Theme / Accessibility
- **Summary:** Primary Call-To-Action buttons fail WCAG 2.1 Level AA color contrast requirement
- **Severity:** Major (S2) | **Priority:** High (P2)
- **Automated Test Linked:** `accessibility/tests/accessibility.spec.ts` (`A11Y-01`)
- **Description:**
  Automated axe-core scan on `http://localhost:5001/` flagged rule `color-contrast`.
  The primary button `.button-1` used background `#4ab2f1` with text `#ffffff`, yielding contrast ratio `2.35:1`. WCAG 2.1 AA mandates a minimum contrast of `4.5:1` for regular text.
- **Root Cause:** Hardcoded CSS variable `--primary-color` lacked contrast verification against white text.
- **Fix Applied:** Changed primary color token to `#1565c0` (yielding `4.72:1` contrast ratio) in `styles.css`.
- **Verification:** Re-ran `npm run test:a11y`; all 5 WCAG AA page checks passed with 0 violations.
- **Status:** **CLOSED / VERIFIED**

---

### Defect 2: DEF-SIM-002 (Cart Form Submission Route Handling)
- **Ticket ID:** `DEF-SIM-002`
- **Component:** Storefront — Shopping Cart
- **Summary:** Submitting cart quantity update form triggers HTTP 404 Not Found error
- **Severity:** Blocker (S1) | **Priority:** Urgent (P1)
- **Automated Test Linked:** `automation/tests/regression/cart.spec.ts` (`CART-REG-02`)
- **Description:**
  When a user modifies item quantity in the cart table and clicks "Update shopping cart", the browser submits `POST /cart`. The application returned `404 Cannot POST /cart` because only `GET /cart` was bound in the router.
- **Root Cause:** Missing `app.post('/cart')` route handler in the staging controller.
- **Fix Applied:** Implemented POST handler in `server.js` accepting form data, updating quantity, recalculating totals, and redirecting with HTTP 302 back to `/cart`.
- **Verification:** Automated spec `cart.spec.ts` executes `updateItemQuantity(0, 3)` and asserts updated quantity (`3`) and subtotal (`$3600.00`).
- **Status:** **CLOSED / VERIFIED**

---

### Defect 3: DEF-SIM-003 (Checkout Terms of Service Gating)
- **Ticket ID:** `DEF-SIM-003`
- **Component:** Storefront — Checkout
- **Summary:** Checkout button proceeded to payment without verifying terms of service checkbox
- **Severity:** Critical (S1) | **Priority:** High (P1)
- **Automated Test Linked:** `automation/tests/regression/checkout.spec.ts` (`CHK-REG-01`)
- **Description:**
  Clicking Checkout without checking `#termsofservice` allowed navigation into checkout flow without warning dialog.
- **Root Cause:** Client-side form submit handler was missing validation check on checkbox state.
- **Fix Applied:** Added conditional dialog alert in `storefront.js` preventing transition if checkbox is unchecked.
- **Verification:** Automated spec `checkout.spec.ts` verifies dialog displays "Please accept the terms of service before checkout" and page remains on `/cart`.
- **Status:** **CLOSED / VERIFIED**
