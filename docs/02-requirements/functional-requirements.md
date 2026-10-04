# FUNCTIONAL REQUIREMENTS DOCUMENT (FRD)

**Project:** nopCommerce v4.70 Platform Validation  
**Document ID:** FRD-NOP-4.70  
**Version:** 1.0.0  
**Status:** Approved  
**Author:** Senior QA Lead / Test Architect  
**Date:** October 2026  

---

## 1. Authentication & Customer Management (AUTH)

| Requirement ID | Module | Title | Description & Acceptance Criteria | Priority |
|:---|:---|:---|:---|:---:|
| **REQ-AUTH-001** | Auth | Customer Registration | The system shall allow new users to register by providing Gender, First Name, Last Name, valid unique Email, and Password with Confirmation. <br>• Password must be at least 6 characters.<br>• Duplicate email addresses must trigger validation error: "The specified email already exists". | High |
| **REQ-AUTH-002** | Auth | Customer Login | Registered users shall be able to log in using valid email and password. Successful authentication redirects the user to the homepage or return URL with session cookie. | High |
| **REQ-AUTH-003** | Auth | Invalid Login Handling | Submitting invalid email or password must display: "Login was unsuccessful. Please correct the errors and try again. No customer account found" or "The credentials provided are incorrect". | High |
| **REQ-AUTH-004** | Auth | Remember Me Persistence | Checking "Remember me?" must persist authentication state across browser session restarts via persistent auth cookie. | Medium |
| **REQ-AUTH-005** | Auth | Password Recovery | Users shall be able to request a password recovery email by providing their registered email address at `/passwordrecovery`. | Medium |
| **REQ-AUTH-006** | Customer | Customer Profile Management | Authenticated users shall be able to view and update their personal information (Name, Email, Company, Gender) at `/customer/info`. | Medium |
| **REQ-AUTH-007** | Customer | Customer Address Book | Users shall be able to add, edit, and delete multiple addresses (Country, State, City, Address 1, Zip, Phone) at `/customer/addresses`. | High |
| **REQ-AUTH-008** | Customer | Change Password | Users shall be able to update their password by verifying their old password and providing a new matching password. | High |
| **REQ-AUTH-009** | Auth | User Logout | Clicking "Log out" shall invalidate the active session token, clear the auth cookie, and update header links to show "Log in" and "Register". | High |

---

## 2. Product Catalog & Navigation (CAT)

| Requirement ID | Module | Title | Description & Acceptance Criteria | Priority |
|:---|:---|:---|:---|:---:|
| **REQ-CAT-001** | Catalog | Category Navigation | The top menu shall display all active root categories (Computers, Electronics, Apparel, Digital downloads, Books, Jewelry, Gift Cards) and expand subcategories on hover/click. | High |
| **REQ-CAT-002** | Catalog | Category Grid Display | Navigating to a category page shall display category title, breadcrumb trail, and product cards with image, title, review rating, and price. | High |
| **REQ-CAT-003** | Catalog | Product Sorting | Users shall be able to sort category products by: Position, Name: A to Z, Name: Z to A, Price: Low to High, Price: High to Low, Created on. | Medium |
| **REQ-CAT-004** | Catalog | Pagination Controls | When products exceed page size, pagination controls shall display (Previous, 1, 2..., Next), updating the URL and product grid deterministically. | Medium |
| **REQ-CAT-005** | Catalog | View Mode Switching | Users shall be able to toggle between "Grid" and "List" display modes, maintaining sort and page state. | Low |
| **REQ-CAT-006** | Catalog | Price Filtering | Category pages shall support price range filtering, updating the displayed products to match the selected bracket. | Medium |

---

## 3. Search & Product Discovery (SRCH)

| Requirement ID | Module | Title | Description & Acceptance Criteria | Priority |
|:---|:---|:---|:---|:---:|
| **REQ-SRCH-001** | Search | Header Instant Search | Entering text into the header search bar shall display an AJAX auto-suggest list showing matching product names and thumbnail images. | High |
| **REQ-SRCH-002** | Search | Keyword Search Execution | Submitting a search query shall navigate to `/search?q={query}` and display all matching products. | High |
| **REQ-SRCH-003** | Search | Advanced Search Filters | Advanced search shall allow filtering by Category, "Automatically search subcategories", Manufacturer, Price Range, and "In product descriptions". | Medium |
| **REQ-SRCH-004** | Search | Zero-Result Handling | When no products match the query, the system shall display: "No products were found that matched your criteria." | Medium |

---

## 4. Product Details Page (PDP)

| Requirement ID | Module | Title | Description & Acceptance Criteria | Priority |
|:---|:---|:---|:---|:---:|
| **REQ-PDP-001** | PDP | Product Information Display | The product details page shall display: Product Title, Short Description, Full Description, SKU, Manufacturer, Stock Status, and Price. | High |
| **REQ-PDP-002** | PDP | Dynamic Attribute Selection | Products with attributes (RAM, HDD, Processor, Color squares) shall update displayed price in real time when selections change. | High |
| **REQ-PDP-003** | PDP | Stock Availability Indication | Products in stock shall display "In stock"; out-of-stock items shall display "Out of stock" and disable the Add to Cart button. | High |
| **REQ-PDP-004** | PDP | Quantity Input & Validation | Users shall specify an item quantity $\ge 1$. Negative numbers, 0, or non-numeric input must be rejected with validation feedback. | High |
| **REQ-PDP-005** | PDP | Add to Cart Feedback | Clicking "Add to cart" shall trigger a top notification bar: "The product has been added to your shopping cart" and increment the cart badge count. | High |
| **REQ-PDP-006** | PDP | Add to Wishlist | Clicking "Add to wishlist" shall add the product and increment the wishlist header badge count without navigating away. | Medium |
| **REQ-PDP-007** | PDP | Product Comparison | Clicking "Add to compare list" shall add the product to the comparison tray at `/compareproducts`. | Low |

---

## 5. Shopping Cart & Wishlist (CART / WSH)

| Requirement ID | Module | Title | Description & Acceptance Criteria | Priority |
|:---|:---|:---|:---|:---:|
| **REQ-CART-001** | Cart | Itemized Cart Table | `/cart` shall display an itemized table with thumbnail, product name, selected attributes, unit price, quantity input, and total line price. | High |
| **REQ-CART-002** | Cart | Quantity Update & Recalculation | Modifying a quantity and clicking "Update shopping cart" shall recalculate item total, subtotal, tax, and order total. | High |
| **REQ-CART-003** | Cart | Line Item Removal | Checking the "Remove" box or clicking remove button shall remove the product line item and update totals. | High |
| **REQ-CART-004** | Cart | Discount Coupon Application | Applying a valid coupon code (e.g. `DISCOUNT10`) shall apply the deduction to Order Total. Invalid codes shall display: "The coupon code was not found or is invalid". | High |
| **REQ-CART-005** | Cart | Gift Card Code Application | Applying a valid gift card shall deduct balance. Invalid card code displays error: "The coupon code you entered couldn't be applied to your order". | Medium |
| **REQ-CART-006** | Cart | Terms of Service Validation | Clicking "Checkout" without checking "I agree with the terms of service" shall trigger warning modal: "Please accept the terms of service before checkout". | High |
| **REQ-CART-007** | Cart | Empty Cart State | When all items are removed, `/cart` shall display: "Your Shopping Cart is empty!" and suppress checkout buttons. | Medium |
| **REQ-WSH-001** | Wishlist | Wishlist Management & Transfer | `/wishlist` shall list all saved items. Checking an item and clicking "Add to cart" shall transfer the item from wishlist to shopping cart. | Medium |

---

## 6. Checkout & Order Placement (CHK)

| Requirement ID | Module | Title | Description & Acceptance Criteria | Priority |
|:---|:---|:---|:---|:---:|
| **REQ-CHK-001** | Checkout | One-Page Checkout Orchestration | `/checkout` shall guide the customer sequentially through Billing, Shipping, Shipping Method, Payment Method, Payment Info, and Order Confirmation. | Critical |
| **REQ-CHK-002** | Checkout | Billing Address Step | Customer selects saved billing address or inputs new address (First Name, Last Name, Email, Country, State, City, Address 1, Zip, Phone). | High |
| **REQ-CHK-003** | Checkout | Shipping Address Selection | Customer selects destination address or checks "In-Store Pickup" (which bypasses shipping address & methods). | High |
| **REQ-CHK-004** | Checkout | Shipping Method Selection | Customer selects shipping rate (Ground, Next Day Air, 2nd Day Air), updating the shipping fee in order summary. | High |
| **REQ-CHK-005** | Checkout | Payment Method Selection | Customer selects payment method: Check / Money Order, Credit Card, or Cash On Delivery (COD). | High |
| **REQ-CHK-006** | Checkout | Payment Information Entry | If Credit Card is selected, customer inputs Cardholder Name, Card Number, Expiration Date, and CVV with client/server validation. | High |
| **REQ-CHK-007** | Checkout | Order Confirmation Review | The Confirm Order accordion step displays full order summary, addresses, shipping method, payment method, tax, and order total. | Critical |
| **REQ-CHK-008** | Checkout | Order Finalization & Confirmation | Clicking "Confirm" submits the transaction, decrements catalog inventory, clears active cart items, and displays "Your order has been successfully processed!" with unique Order Number. | Critical |

---

## 7. Customer Order History & Invoices (ORD)

| Requirement ID | Module | Title | Description & Acceptance Criteria | Priority |
|:---|:---|:---|:---|:---:|
| **REQ-ORD-001** | Orders | Order History Listing | Authenticated customers shall view past orders at `/order/history` showing Order #, Date, Status (Pending, Processing, Complete), and Order Total. | High |
| **REQ-ORD-002** | Orders | Order Details View | Clicking "Details" opens `/orderdetails/{id}` showing line items, shipping address, billing address, and payment method. | High |
| **REQ-ORD-003** | Orders | PDF Invoice Download | Customer can click "PDF Invoice" on order details to download a formatted PDF invoice file. | Medium |
| **REQ-ORD-004** | Orders | Re-Order Capability | Clicking "Re-order" shall clone previous order line items into active shopping cart and navigate to `/cart`. | Medium |

---

## 8. Administration Backoffice (ADM)

| Requirement ID | Module | Title | Description & Acceptance Criteria | Priority |
|:---|:---|:---|:---|:---:|
| **REQ-ADM-001** | Admin | Admin Authentication | Accessing `/admin` requires valid administrator credentials. Unauthorized users are blocked with 403 Forbidden or redirected to login. | Critical |
| **REQ-ADM-002** | Admin | Dashboard KPI Metrics | `/admin` dashboard displays key business widgets: Orders count, Pending returns, Registered customers count, and Low stock warnings. | High |
| **REQ-ADM-003** | Admin | Product Catalog Search | `/Admin/Product/List` supports searching products by name, category, warehouse, and published status. | High |
| **REQ-ADM-004** | Admin | Product Inventory Update | Admin can update product price, stock quantity, and published state, reflecting immediately on public storefront. | Critical |
| **REQ-ADM-005** | Admin | Order Management List | `/Admin/Order/List` displays orders with filters for date range, order status, payment status, and shipping status. | Critical |
| **REQ-ADM-006** | Admin | Order Status Transition | Admin can transition order status from "Pending" $\rightarrow$ "Processing" $\rightarrow$ "Complete" or "Cancelled". | Critical |
| **REQ-ADM-007** | Admin | Customer Management | Admin can search customers, view registered emails, and modify role permissions (Administrators, Registered). | High |
