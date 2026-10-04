# TEST SCENARIOS: PRODUCT CATALOG & SEARCH (CAT / SRCH / PDP)

**Modules:** Catalog Taxonomy, Search Engine, Product Details Page  
**Specification References:** `REQ-CAT-001` through `REQ-CAT-006`, `REQ-SRCH-001` through `REQ-SRCH-004`, `REQ-PDP-001` through `REQ-PDP-007`  

---

| Scenario ID | Requirement ID | Type | Scenario Description | Expected Outcome |
|:---|:---|:---:|:---|:---|
| **SCEN-CAT-001** | REQ-CAT-001 | Positive | Hover and click through multi-level category navigation | Subcategories open smoothly, clicking navigates to correct category URL |
| **SCEN-CAT-002** | REQ-CAT-002 | Positive | Category product grid rendering and breadcrumb hierarchy | Breadcrumbs accurately trace category root, products display title, price, rating |
| **SCEN-CAT-003** | REQ-CAT-003 | Functional | Sort category products by "Price: Low to High" and "Price: High to Low" | Product order updates strictly in numerical ascending / descending order |
| **SCEN-CAT-004** | REQ-CAT-003 | Functional | Sort category products by "Name: A to Z" and "Name: Z to A" | Product order updates alphabetically |
| **SCEN-CAT-005** | REQ-CAT-004 | Functional | Navigate across pagination pages (Page 1 $\rightarrow$ Page 2) | Second page loads corresponding products; URL updates with query param |
| **SCEN-CAT-006** | REQ-CAT-005 | Functional | Switch display mode from Grid View to List View | Layout dynamically switches while preserving filtered product set |
| **SCEN-SRCH-001**| REQ-SRCH-001 | Positive | Type partial keyword into header search input (e.g. "comput") | Auto-suggest dropdown pops up with matching product titles and images |
| **SCEN-SRCH-002**| REQ-SRCH-002 | Positive | Execute full search submission with valid keyword | Results page displays all relevant products matching keyword |
| **SCEN-SRCH-003**| REQ-SRCH-004 | Negative | Search with non-existent keyword or special characters | "No products were found that matched your criteria." displayed gracefully |
| **SCEN-PDP-001** | REQ-PDP-001 | Positive | View product details page for configurable product | Title, SKU, full description, price, stock status, and attributes visible |
| **SCEN-PDP-002** | REQ-PDP-002 | Business | Toggle product attribute (e.g. RAM 8GB $\rightarrow$ 16GB, HDD 500GB) | Product price recalculates dynamically on page |
| **SCEN-PDP-003** | REQ-PDP-003 | Boundary | Verify Out of Stock product presentation | "Out of stock" indicator shown, "Add to cart" button disabled or hidden |
| **SCEN-PDP-004** | REQ-PDP-004 | Validation | Enter invalid product quantity (0, negative number, non-digit) | Submission blocked with validation error: "Quantity should be positive" |
| **SCEN-PDP-005** | REQ-PDP-005 | Positive | Click "Add to cart" with valid selections | Top green notification bar displayed, cart badge count increments by selected qty |
