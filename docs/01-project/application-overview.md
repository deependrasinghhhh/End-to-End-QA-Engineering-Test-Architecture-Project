# Application Overview: Staging Simulator & Reference Model

> **Project Description:**  
> A Playwright + TypeScript QA automation portfolio project testing a deterministic, nopCommerce-inspired local staging simulator. It demonstrates QA test design, UI/API automation, accessibility checks, CI, and supporting QA artifacts. It is not a production certification or a claim of testing upstream nopCommerce.

---

## 1. Primary Application Under Test (AUT)

The default target for automated tests in this repository is the **high-fidelity local staging simulator**:
- **Location:** `automation/staging-aut/server.js`
- **Default Port:** `5001`
- **Architecture:** Node.js + Express.js application designed specifically for reliable, deterministic test automation.
- **State Management:** In-memory state initialized via `createInitialState()`, with a dedicated test isolation endpoint (`POST /api/test/reset`) enabled via `ALLOW_TEST_RESET=true`.
- **DOM & API Fidelity:** Emulates nopCommerce e-commerce markup, CSS classes, element IDs, form POST interactions, and REST API endpoints.

```text
Playwright Test Runner
         │
         ▼ (HTTP :5001)
┌──────────────────────────────────────────────────────────┐
│         Local Staging Simulator (Express.js)             │
│                                                          │
│  Storefront Routes:           API Endpoints:             │
│  - GET /                      - POST /api/auth/login     │
│  - GET /login, /register      - POST /api/auth/register  │
│  - GET /computers, /desktops  - GET  /api/catalog/search │
│  - GET /cart                  - CRUD /api/cart/items     │
│  - GET /checkout              - POST /api/checkout/orders│
│  - GET /admin/*               - POST /api/test/reset     │
│                                                          │
│  State Factory (createInitialState) & Reset Engine       │
└──────────────────────────────────────────────────────────┘
```

---

## 2. Core Functional Modules Covered by Automation

### 2.1 Customer & Identity Management
- **Registration (`/register`):** Form validations including required fields, email formatting, password length, and duplicate email prevention.
- **Authentication (`/login`):** Email and password authentication with negative scenario validation (non-existent email, bad password).
- **Customer Account Area (`/customer/info`, `/customer/addresses`, `/order/history`):** Profile details updating, address book management, and order history inspection.

### 2.2 Product Catalog & Search
- **Category Navigation (`/computers`, `/desktops`, `/notebooks`):** Hierarchy navigation and category sorting (Name A-Z, Price Low-High).
- **Search (`/search`):** Search input, auto-suggest dropdown display, and empty search query handling.
- **Product Details (`/build-your-own-computer`):** Pricing, specifications, and add-to-cart interactions.

### 2.3 Shopping Cart & Checkout
- **Cart Management (`/cart`):** Add to cart, quantity modifications, subtotal calculation, coupon discounts (`DISCOUNT10`), and item removal.
- **One-Page Checkout (`/checkout`):** Terms of service validation gating, multi-step accordion transitions (Billing $\rightarrow$ Shipping $\rightarrow$ Payment $\rightarrow$ Confirm), and post-checkout cart cleanup.

### 2.4 Administration Backoffice
- **Admin Dashboard (`/admin`):** Administrator login, KPI inspection cards, product catalog search, order filtering, and unauthorized access guards.

---

## 3. Optional Reference: Upstream nopCommerce Stack

The repository includes an optional Docker Compose configuration (`docker/docker-compose.yml`) referencing:
- Official nopCommerce container (`nopcommerce/nopcommerce:4.70.0`)
- PostgreSQL 15 database container (`postgres:15-alpine`)

This container stack is maintained as an exploratory reference configuration. It is **not** executed by the automated CI pipeline or used as the default test target.
