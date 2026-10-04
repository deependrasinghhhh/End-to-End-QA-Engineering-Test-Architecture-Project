# TEST SCENARIOS: CHECKOUT & PAYMENT (CHK)

**Module:** One-Page Accordion Checkout & Payment  
**Specification References:** `REQ-CHK-001` through `REQ-CHK-008`  

---

| Scenario ID | Requirement ID | Type | Scenario Description | Expected Outcome |
|:---|:---|:---:|:---|:---|
| **SCEN-CHK-001** | REQ-CHK-001 | Positive | Complete full guest checkout flow with Check/Money Order | Order created, unique Order # displayed, order status set to Pending |
| **SCEN-CHK-002** | REQ-CHK-001 | Positive | Complete registered customer checkout with saved address | Saved address auto-populates, checkout advances through steps seamlessly |
| **SCEN-CHK-003** | REQ-CHK-002 | Validation | Submit billing address step with mandatory fields blank | Required field error messages displayed on empty inputs |
| **SCEN-CHK-004** | REQ-CHK-003 | Functional | Select "In-Store Pickup" option on shipping address step | Shipping address and shipping method steps are skipped |
| **SCEN-CHK-005** | REQ-CHK-004 | Functional | Select "Next Day Air" shipping method | Shipping fee in order summary updates to reflect expedited rate |
| **SCEN-CHK-006** | REQ-CHK-005 | Functional | Select "Credit Card" payment method | Credit card payment information form expands dynamically |
| **SCEN-CHK-007** | REQ-CHK-006 | Positive | Enter valid test credit card details and proceed | Form passes client validation and advances to Confirm Order step |
| **SCEN-CHK-008** | REQ-CHK-006 | Negative | Enter invalid credit card number or expired date | Inline validation error indicates invalid card or expiration error |
| **SCEN-CHK-009** | REQ-CHK-007 | Integrity | Verify order summary totals on Confirm step before submission | Subtotal, shipping, tax, and order total mathematically reconcile with items |
| **SCEN-CHK-010** | REQ-CHK-008 | Positive | Click "Confirm" to finalize order | Transaction successfully recorded, order ID generated, cart cleared |
| **SCEN-CHK-011** | REQ-CHK-008 | Integration | Verify stock decrement after order confirmation | Catalog inventory reflects minus purchased quantity |
| **SCEN-CHK-012** | REQ-CHK-008 | Integration | Verify order presence in customer order history | Newly created order appears at top of customer `/order/history` list |
