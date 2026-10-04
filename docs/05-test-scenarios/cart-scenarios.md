# TEST SCENARIOS: SHOPPING CART & WISHLIST (CART / WSH)

**Modules:** Shopping Cart, Mini-Cart, Wishlist  
**Specification References:** `REQ-CART-001` through `REQ-CART-007`, `REQ-WSH-001`  

---

| Scenario ID | Requirement ID | Type | Scenario Description | Expected Outcome |
|:---|:---|:---:|:---|:---|
| **SCEN-CART-001** | REQ-CART-001 | Positive | View shopping cart with multiple products | Cart table displays all added items with correct unit price, qty, and total |
| **SCEN-CART-002** | REQ-CART-002 | Positive | Update line item quantity (e.g. from 1 to 3) | Line item total and order subtotal recalculate accurately |
| **SCEN-CART-003** | REQ-CART-003 | Positive | Remove single item from shopping cart via remove checkbox/button | Line item is deleted, cart counter decrements, totals update |
| **SCEN-CART-004** | REQ-CART-004 | Positive | Apply valid discount coupon code (e.g. `DISCOUNT10`) | Discount line item appears in order summary, total is reduced accordingly |
| **SCEN-CART-005** | REQ-CART-004 | Negative | Apply invalid or expired discount coupon code | Error message displays: "The coupon code was not found or is invalid" |
| **SCEN-CART-006** | REQ-CART-005 | Negative | Apply invalid gift card code | Error message displays: "The coupon code you entered couldn't be applied..." |
| **SCEN-CART-007** | REQ-CART-006 | Validation | Click Checkout button without accepting Terms of Service | Warning alert dialog: "Please accept the terms of service before checkout" |
| **SCEN-CART-008** | REQ-CART-006 | Positive | Check Terms of Service and click Checkout button | User progresses to `/checkout` without error |
| **SCEN-CART-009** | REQ-CART-007 | Positive | Remove all items from cart | Cart renders empty state: "Your Shopping Cart is empty!" |
| **SCEN-WSH-001**  | REQ-WSH-001  | Positive | Add item to wishlist, navigate to `/wishlist`, and transfer to cart | Item transferred to shopping cart, removed from wishlist |
