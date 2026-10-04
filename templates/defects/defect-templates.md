# Defect Reporting Standards & Lifecycle Templates

This document details the defect reporting standards, bug logging checklist, and state diagram definitions for defect triage and tracking.

---

## 1. Professional Bug Report Standard Checklist

Before submitting a defect ticket to Jira, the reporting QA engineer must verify:
- [ ] **Is the issue reproducible?** (Document exact reproduction rate, e.g. 5/5 or 3/10).
- [ ] **Is the title concise and descriptive?** Must follow format: `[Component] - [What broke] - [Condition / Impact]`.
- [ ] **Are prerequisites clearly stated?** (User state, database rows, session parameters).
- [ ] **Are reproduction steps numbered and unambiguous?** Avoid generic phrasing like "Try to checkout".
- [ ] **Are Expected and Actual results explicitly separated?** Reference business requirement IDs (`REQ-*`).
- [ ] **Are relevant artifacts attached?**
  - Screenshots highlighting the defect.
  - Video screen recording (`.webm` or `.mp4`).
  - Browser console logs (`Ctrl+Shift+J`).
  - Network request/response payload HAR capture.

---

## 2. Standard Defect Report Template

```markdown
### Summary
[Storefront - Cart] Quantity update form submission returns HTTP 404 Not Found

### Environment
- **Environment:** QA Staging (`http://qa-staging.nopcommerce.local:5001`)
- **Build Tag:** `v4.70-b108`
- **Client:** Google Chrome Version 129.0.6668.70 (Official Build) (64-bit)
- **OS:** Microsoft Windows 11 Enterprise (23H2)

### User / System Preconditions
- User is logged in as registered customer `qa.customer@example.com`.
- Shopping cart contains at least 1 item: "Build your own computer" (Product ID: 1, Quantity: 1).
- Cart URL: `http://qa-staging.nopcommerce.local:5001/cart`.

### Step-by-Step Instructions to Reproduce
1. Navigate to `http://qa-staging.nopcommerce.local:5001/cart`.
2. Locate the quantity input element (`input[name="itemquantity1"]`).
3. Clear the input value and enter `3`.
4. Click the "Update shopping cart" button (`button[name="updatecart"]`).

### Expected Behavior
- The form should submit a `POST /cart` request to the server.
- The server should process the new quantity (3), update line items, recalculate totals ($3,600.00), and redirect back to `/cart`.
- The user should see the updated quantity in the table and "(3)" in the header cart badge.
*(Reference: REQ-CART-002, Acceptance Criteria AC-02)*

### Actual Behavior
- The browser submits the form and displays an unhandled error page:
  `Cannot POST /cart` with status code `404 Not Found`.
- The cart item quantity is not updated in the database.

### Severity & Priority Justification
- **Severity:** S1 - Blocker. Prevents customers from modifying shopping cart contents or removing items via form submission, causing direct revenue loss.
- **Priority:** P1 - Urgent. Must be remediated immediately in Sprint 42.

### Traceability
- **Requirement:** `REQ-CART-002`
- **Test Case:** `TC-CART-004`

### Attachments & Evidence
- **Screenshot:** `cart_404_error.png`
- **Network Log:** `POST /cart -> 404 (Not Found)`
- **Server Log:** `Route [POST /cart] not registered in Express/MVC router`
```

---

## 3. Defect Lifecycle State Transitions

| Current State | Permitted Next States | Trigger Event / Action | Authorized Role |
| :--- | :--- | :--- | :--- |
| **New** | Open, Rejected, Duplicate | Triage review confirms validity or redundancy | QA Lead / Triage Team |
| **Open** | In Progress | Developer begins code investigation and remediation | Developer |
| **In Progress** | Fixed, Cannot Reproduce, Wont Fix | Developer commits fix to branch or disputes issue | Developer / Tech Lead |
| **Fixed** | Ready for Retest | CI build deployed to Staging environment | Release / DevOps |
| **Ready for Retest** | Retest | QA begins verification against deployed build | QA Engineer |
| **Retest** | Closed, Reopened | QA verifies fix passes (Closed) or still fails (Reopened) | QA Engineer / Lead |
| **Reopened** | In Progress | Developer resumes remediation with new test failure notes | Developer |
| **Closed** | — | Final terminal state; ticket archived | QA Lead |
