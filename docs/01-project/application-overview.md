# APPLICATION OVERVIEW: nopCommerce v4.70

**Target Application:** nopCommerce Open-Source E-Commerce Platform  
**Architecture:** ASP.NET Core (.NET 8) / Micro-modular Architecture  
**Database Engine:** PostgreSQL 15 / Microsoft SQL Server  
**Client Interface:** Server-rendered HTML5 + Responsive CSS3 + AJAX Micro-Interactions  
**API Surface:** REST Web API + MVC Form Controller Endpoints  

---

## 1. System Architecture

nopCommerce is an enterprise-class, open-source e-commerce solution architected with an onion architecture pattern that enforces strict separation of concerns between core domain entities, data access services, web presentation layers, and administrative portals.

```
+-------------------------------------------------------------------------+
|                              PRESENTATION LAYER                         |
|  +-----------------------------------+  +----------------------------+  |
|  |     Public Storefront (Web)       |  |     Admin Console (/admin) |  |
|  |  (Catalog, Cart, Checkout, Auth)  |  | (Orders, Inventory, Users) |  |
|  +-----------------------------------+  +----------------------------+  |
+-------------------------------------------------------------------------+
                                    |
                                    v
+-------------------------------------------------------------------------+
|                               API LAYER                                 |
|  +-----------------------------------+  +----------------------------+  |
|  |  nopCommerce Web API (REST/JSON)  |  | AJAX Controller Endpoints  |  |
|  |  (Auth, Products, Cart, Orders)   |  | (/addproducttocart, search)| |
|  +-----------------------------------+  +----------------------------+  |
+-------------------------------------------------------------------------+
                                    |
                                    v
+-------------------------------------------------------------------------+
|                             BUSINESS LOGIC                              |
|  - Customer Service       - Order Processing      - Catalog Service     |
|  - Discount Engine        - Shipping Calculation  - Tax Calculation     |
+-------------------------------------------------------------------------+
                                    |
                                    v
+-------------------------------------------------------------------------+
|                            DATA ACCESS LAYER                            |
|             Entity Framework Core / LinqToDB Object Relational          |
+-------------------------------------------------------------------------+
                                    |
                                    v
+-------------------------------------------------------------------------+
|                             PERSISTENCE                                 |
|                    PostgreSQL 15 Relational Database                    |
+-------------------------------------------------------------------------+
```

---

## 2. Core Functional Modules Under Test

### 2.1 Customer & Identity Management
- **Registration (`/register`):** Multi-field registration supporting Gender, First Name, Last Name, Email, Username (optional), Company, Newsletter opt-in, Password with complexity validation, and Password confirmation.
- **Authentication (`/login`):** Customer login with Email/Username, Password, "Remember Me" cookie persistence, and Forgot Password recovery flow (`/passwordrecovery`).
- **Customer Portal (`/customer/info`):**
  - Personal Information & profile updates.
  - Address Book (`/customer/addresses`): Multiple shipping/billing addresses with country, state, city, address line, phone.
  - Order History (`/order/history`): Tabular listing of past orders with Order #, Date, Status, Total, and PDF Invoice download.
  - Change Password (`/customer/changepassword`).

### 2.2 Product Catalog & Search
- **Taxonomy & Navigation:** Top-level categories (Computers, Electronics, Apparel, Digital downloads, Books, Jewelry, Gift Cards) and nested subcategories.
- **Search Engine (`/search`):** Real-time auto-suggest dropdown, keyword search in product names and descriptions, advanced filtering by category, manufacturer, and price range.
- **Category Browsing:**
  - Sorting: Position, Name (A to Z / Z to A), Price (Low to High / High to Low), Created on.
  - Display Size: Page size selector (3, 6, 9, 12, 18 per page).
  - View Modes: Grid view vs List view.
  - Specification & Price attribute filtering.

### 2.3 Product Details Page (PDP)
- Product overview with Title, Short Description, Full Description, SKU, and Stock Availability badge ("In stock" / "Out of stock").
- Pricing matrix: Base Price, Old Price (strikethrough discount), and Tier Pricing tables.
- Dynamic Product Attributes:
  - Dropdown lists (e.g., RAM size: 8GB, 16GB, 32GB).
  - Radio button groups (e.g., Processor: 2.2 GHz, 2.5 GHz).
  - Color squares with visual highlight on selection.
  - Date pickers for rental/service products.
  - Dynamic price recalculation based on selected attributes.
- Actions: Add to Cart, Add to Wishlist, Add to Compare List, Email a Friend, Product Reviews submission.

### 2.4 Shopping Cart & Wishlist
- **Shopping Cart (`/cart`):**
  - Itemized table with product thumbnail, name, selected attribute specs, unit price, editable quantity input, and calculated subtotal.
  - Update Cart button triggering AJAX quantity recalculation.
  - Remove checkbox / delete button per line item.
  - Discount Coupon Code input with real-time validation and error/success alerts.
  - Gift Card Code redemption.
  - Estimate Shipping popup with country/zip calculation.
  - Mandatory "I agree with the terms of service" checkbox gating checkout initiation.
- **Wishlist (`/wishlist`):**
  - Dedicated persistent list per customer with unique shareable public URL.
  - Bulk "Add to Cart" transfer from wishlist.

### 2.5 Multi-Step One-Page Checkout (`/checkout`)
1. **Billing Address:** Selection of existing saved address or entry of a new address.
2. **Shipping Address:** Optional "Pick up in store" toggle, or selection of destination address.
3. **Shipping Method:** Selection of available shipping providers (Ground, Next Day Air, 2nd Day Air) with dynamic shipping cost additions.
4. **Payment Method:** Check / Money Order, Credit Card, Cash On Delivery (COD), Purchase Order.
5. **Payment Information:** Payment-specific instructions or credit card input fields (Cardholder, Card Number, Expiration, CVV).
6. **Confirm Order:** Comprehensive order review showing Billing Info, Shipping Info, Shipping Method, Payment Method, Item list with attributes, Subtotal, Shipping fee, Tax, and Final Total.
7. **Order Completed:** Confirmation page with unique Order Number and link to Order Details.

### 2.6 Administration Backoffice (`/admin`)
- **Dashboard:** Executive analytics displaying Orders count, Pending returns, Registered customers count, Low stock product alerts, Order totals chart, and Latest Orders table.
- **Catalog Management:**
  - Product List (`/Admin/Product/List`): Search by product name, category, vendor, published status.
  - Add / Edit Product: Name, SKU, Price, Cost, Inventory quantity, Min stock quantity, Published toggle.
- **Sales & Orders (`/Admin/Order/List`):**
  - Filter orders by Start/End Date, Order Status (Pending, Processing, Complete, Cancelled), Payment Status (Pending, Authorized, Paid, Refunded), Shipping Status (Not yet shipped, Shipped, Delivered).
  - Order Details: Full order line items, billing/shipping address, customer notes, change order status button, issue refund.
- **Customer Management (`/Admin/Customer/List`):**
  - Customer directory search, role assignment (Administrators, Forum Moderators, Registered, Guests, Vendors).

---

## 3. Database Architecture (PostgreSQL Schema)

The persistence layer uses relational tables with normalized relational integrity:

| Table Name | Description | Key Columns |
|:---|:---|:---|
| `Customer` | Registered and guest user records | `Id`, `CustomerGuid`, `Email`, `Active`, `CreatedOnUtc` |
| `CustomerRole` | Role definitions | `Id`, `Name`, `SystemName`, `Active` |
| `Customer_CustomerRole_Mapping` | Many-to-many relationship | `Customer_Id`, `CustomerRole_Id` |
| `Product` | Product catalog catalog entity | `Id`, `Name`, `Sku`, `Price`, `StockQuantity`, `Published` |
| `Category` | Category taxonomy tree | `Id`, `Name`, `Description`, `ParentCategoryId`, `Published` |
| `Product_Category_Mapping` | Catalog to category assignment | `Id`, `ProductId`, `CategoryId`, `IsFeaturedProduct` |
| `ShoppingCartItem` | Active items in customer cart/wishlist | `Id`, `CustomerId`, `ProductId`, `Quantity`, `ShoppingCartTypeId` |
| `Order` | Finalized order transactions | `Id`, `OrderGuid`, `CustomerId`, `OrderStatusId`, `OrderTotal` |
| `OrderItem` | Line items belonging to an order | `Id`, `OrderId`, `ProductId`, `UnitPriceInclTax`, `Quantity` |
| `Address` | Shipping and billing address records | `Id`, `FirstName`, `LastName`, `Email`, `Address1`, `City` |
| `Discount` | Promotional discount definitions | `Id`, `Name`, `DiscountPercentage`, `CouponCode`, `IsActive` |

---

## 4. Test Environment Strategy

| Environment | Purpose | Target URL | Database |
|:---|:---|:---|:---|
| **Local Staging Mock** | Rapid developer & CI zero-dependency execution | `http://localhost:5001` | In-memory relational state + SQLite/Mock |
| **Local Docker AUT** | Full containerized microservice validation | `http://localhost:5000` | PostgreSQL 15 Container |
| **Public Staging / Demo** | External integration & live acceptance smoke checks | `https://demo.nopcommerce.com` | Staging SQL Cluster |
