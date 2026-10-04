# TEST SCENARIOS: CUSTOMER PORTAL & ORDERS (CUST / ORD)

**Modules:** Customer Account Information, Address Book, Order History  
**Specification References:** `REQ-AUTH-006` through `REQ-AUTH-008`, `REQ-ORD-001` through `REQ-ORD-004`  

---

| Scenario ID | Requirement ID | Type | Scenario Description | Expected Outcome |
|:---|:---|:---:|:---|:---|
| **SCEN-CUST-001** | REQ-AUTH-006 | Positive | Update customer First Name, Last Name, and Company in `/customer/info` | Changes persist, success message displayed: "The customer info has been updated successfully." |
| **SCEN-CUST-002** | REQ-AUTH-007 | Positive | Add new address to address book at `/customer/addresses` | New address saved and listed with Edit and Delete action buttons |
| **SCEN-CUST-003** | REQ-AUTH-007 | Positive | Delete an address from address book | Address is removed after confirming browser prompt |
| **SCEN-CUST-004** | REQ-AUTH-008 | Positive | Change account password providing valid current and new passwords | Password updated, notification indicates password changed successfully |
| **SCEN-CUST-005** | REQ-AUTH-008 | Negative | Change password providing incorrect current password | Error displayed: "Old password doesn't match" |
| **SCEN-ORD-001**  | REQ-ORD-001  | Positive | View customer order history table at `/order/history` | Orders listed chronologically with Order #, Date, Status, and Total |
| **SCEN-ORD-002**  | REQ-ORD-002  | Positive | View details for a specific order | Order details page displays accurate line items, addresses, payment status |
| **SCEN-ORD-003**  | REQ-ORD-003  | Functional | Download PDF invoice for completed order | PDF file downloaded with correct HTTP headers (`application/pdf`) |
| **SCEN-ORD-004**  | REQ-ORD-004  | Functional | Click "Re-order" on completed order | Items added back into active shopping cart, user navigated to `/cart` |
