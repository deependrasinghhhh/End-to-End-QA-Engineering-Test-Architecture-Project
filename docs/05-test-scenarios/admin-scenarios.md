# TEST SCENARIOS: ADMINISTRATION BACKOFFICE (ADM)

**Modules:** Admin Authentication, Dashboard, Catalog Management, Sales & Orders  
**Specification References:** `REQ-ADM-001` through `REQ-ADM-007`  

---

| Scenario ID | Requirement ID | Type | Scenario Description | Expected Outcome |
|:---|:---|:---:|:---|:---|
| **SCEN-ADM-001** | REQ-ADM-001 | Security | Direct unauthenticated access to `/admin` | User redirected to login screen or presented with 403 Forbidden |
| **SCEN-ADM-002** | REQ-ADM-001 | Positive | Authenticate with valid Administrator credentials | Admin dashboard loads with sidebar navigation and operational widgets |
| **SCEN-ADM-003** | REQ-ADM-002 | Positive | Inspect dashboard business KPI metrics | Orders count, Registered customers, and Low stock alerts render correctly |
| **SCEN-ADM-004** | REQ-ADM-003 | Positive | Search products in `/Admin/Product/List` by name and category | Matching product rows populate data table |
| **SCEN-ADM-005** | REQ-ADM-004 | Positive | Update product price and inventory stock quantity | Product record updated; changes immediately reflect on public storefront |
| **SCEN-ADM-006** | REQ-ADM-005 | Positive | Filter orders in `/Admin/Order/List` by Order Status (Pending, Complete) | Order list filters accurately to match selected status |
| **SCEN-ADM-007** | REQ-ADM-006 | Business | Change order status from "Pending" $\rightarrow$ "Processing" $\rightarrow$ "Complete" | Status transitions successfully; audit log updated; customer portal reflects status |
| **SCEN-ADM-008** | REQ-ADM-006 | Business | Cancel an active order | Order status transitions to "Cancelled"; stock quantities are restored |
| **SCEN-ADM-009** | REQ-ADM-007 | Positive | Search customer directory by email | Matching customer record found with role labels (Registered, Admin) |
| **SCEN-ADM-010** | REQ-ADM-007 | Security | Verify non-admin customer account cannot access admin endpoints | Access rejected with authorization failure |
