# Jira Ticket Templates — nopCommerce QA Engineering

This directory contains standardized, production-grade templates for Jira issue types used across the QA and development lifecycles.

---

## 1. Epic Template (`epic-template.md`)

```markdown
## Epic Name
[MODULE] - [Feature / Domain Name] (e.g. CART - Multi-Tier Discount & Promotions Engine)

## Business Goal & Context
What is the core business objective and rationale behind this epic?
(e.g., Enable merchants to configure multi-currency tiered coupon codes to increase holiday conversion rates by 15%.)

## Scope
### In-Scope
- User capability 1
- Admin configuration capability 2
- API endpoints for third-party consumers

### Out-of-Scope
- Real-time physical POS synchronization (planned for v4.80)

## Target Milestone / Release
- **Target Release:** v4.70.0
- **Planned Sprint:** Sprint 42 - Sprint 43

## Key Stakeholders
- **Product Owner:** [Name]
- **Dev Lead:** [Name]
- **QA Lead:** [Name]

## Child Stories & Linked Requirements
- [ ] REQ-CART-001 / STORY-101: Cart promotion code application
- [ ] REQ-CART-002 / STORY-102: Tiered volume discount rules
- [ ] REQ-CART-003 / STORY-103: Admin coupon usage limit enforcement
```

---

## 2. User Story Template (`story-template.md`)

```markdown
## Story Summary
As a [Persona / User Role],
I want to [Action / Capability],
So that [Benefit / Business Value].

*Example:*
As a Registered Customer,
I want to save multiple delivery addresses in my account address book,
So that I can quickly select different shipping destinations during checkout.

## Business Requirements & Rules
- Max 10 saved addresses per account.
- One address must always be designated as the "Default Shipping Address".
- Address validation must require: Country, State/Province, City, Zip, Address Line 1.

## Acceptance Criteria (Gherkin Format)

### Scenario 1: Successfully save new shipping address
Given the customer is logged into their account
And navigates to the "Addresses" section
When they click "Add new address"
And enter valid address details:
  | Field | Value |
  | First name | John |
  | Last name | Doe |
  | Country | United States |
  | State | New York |
  | City | New York |
  | Address 1 | 450 Lexington Ave |
  | Zip code | 10017 |
And click "Save"
Then a success notification "The new address has been added successfully" should display
And the new address should appear in the address list.

### Scenario 2: Validate mandatory fields
Given the customer is on the "Add new address" form
When they submit the form with empty fields
Then inline error indicators must appear on: First Name, Last Name, City, Address 1, Zip.

## Definition of Done (DoD)
- [ ] Backend logic implemented and unit tests passing (>85% coverage).
- [ ] UI implemented matching Figma design tokens.
- [ ] Test cases created in Xray and linked to this Story.
- [ ] Automated Playwright tests written and passing in CI.
- [ ] Accessibility scan confirms 0 WCAG 2.1 AA violations.
- [ ] Code reviewed, approved, and merged to `develop` branch.
- [ ] QA verification passed on QA Staging.
```

---

## 3. Bug Ticket Template (`bug-ticket-template.md`)

```markdown
## Bug Summary
[Component] - [Clear description of what broke and under what condition]
*Example:* [Checkout] - State/Province dropdown does not re-populate on Country change

## Environment Details
- **Environment:** QA Staging (`qa-staging.nopcommerce.local:5001`)
- **Build / Release:** `v4.70-b112`
- **Browser & OS:** Chrome 129 / Windows 11
- **User Role:** Registered Customer / Guest

## Preconditions
1. Customer has at least 1 item in the shopping cart.
2. Customer is on the One-Page Checkout page at Step 1 (Billing Address).

## Steps to Reproduce
1. Navigate to `/cart` and click "Checkout".
2. Select "New Address" from the billing address dropdown.
3. In the "Country" dropdown, select "United States". Observe state options.
4. Now toggle "Country" to "Canada".
5. Click on the "State / province" dropdown.

## Expected Result
The "State / province" dropdown should dynamically refresh via AJAX and list Canadian provinces (Ontario, Quebec, British Columbia, etc.).

## Actual Result
The dropdown remains frozen with US states. Selecting a state triggers a backend validation error "State is not valid for the selected country".

## Severity & Priority
- **Severity:** S1 - Blocker (Blocks Canadian users from completing checkout)
- **Priority:** P1 - High (Must fix before RC2)

## Traceability
- **Linked Requirement:** REQ-CHECKOUT-001
- **Linked Test Case:** TC-CHK-003
- **Reproducibility:** 100% (5/5 attempts)

## Attachments
- Video recording: `state_dropdown_failure.webm`
- Console error log: `TypeError: Cannot read properties of undefined (reading 'regions')`
- Network HAR capture: `checkout_network_trace.har`
```

---

## 4. Technical QA Task Template (`task-template.md`)

```markdown
## Task Summary
[QA Task] - [Short descriptive title]
*Example:* [Automation] - Implement Page Object and Smoke Spec for Admin Product Management

## Objective & Scope
Detail the engineering work to be accomplished.
(e.g., Create `AdminProductsPage` POM class in `automation/pages/admin/admin-products.page.ts` with methods to search, filter by category, and add new product entries.)

## Technical Acceptance Criteria
- [ ] Page object class encapsulates all product management locators using role-based selectors.
- [ ] Test spec `automation/tests/admin/admin-catalog.spec.ts` covers product creation and table search.
- [ ] Spec runs cleanly in Chromium, Firefox, and WebKit in headless mode.
- [ ] Spec tagged with `@admin` and `@regression`.
- [ ] All assertions use Playwright web-first assertions (`await expect(locator).toBeVisible()`).

## Dependencies
- Pre-requisite: Admin login session fixture (`auth.fixture.ts`).
```
