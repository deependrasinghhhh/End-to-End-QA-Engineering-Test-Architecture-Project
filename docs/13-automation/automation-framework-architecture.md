# Playwright + TypeScript Test Automation Framework Architecture

## 1. Architectural Vision & Principles
The automation framework is engineered as an enterprise-grade, maintainable, resilient testing system following the **Page Object Model (POM)** pattern, modular fixtures, decoupled test data, and comprehensive multi-layer reporting.

### Core Architectural Principles:
1. **Single Responsibility Principle (SRP):** Page objects handle element interaction and locator definitions; test specs handle assertions and workflow sequences.
2. **Deterministic Execution:** No arbitrary `sleep` or hard-coded timeouts (`waitForTimeout`). Playwright's auto-waiting web-first assertions guarantee stability.
3. **Resilient Locators:** Locators prioritize user-facing roles and labels (`getByRole`, `getByLabel`, `getByPlaceholder`, `getByTestId`), avoiding brittle deep-nested CSS and absolute XPaths.
4. **Environment Portability:** Supports local development, Docker containers, staging environments, and CI/CD without code modification via `.env` configuration.
5. **Multi-Channel Coverage:** UI Storefront, Admin Portal, REST APIs, and accessibility checks (`axe-core`) coexist harmoniously within the same runner.

---

## 2. Directory Layout & Module Responsibilities

```text
automation/
│
├── tests/                           # Test Specifications (Behavioral assertions)
│   ├── smoke/                      # Quick sanity checks (@smoke)
│   ├── regression/                 # Deep feature testing (@regression)
│   ├── critical/                   # End-to-end checkout & admin (@critical)
│   ├── customer/                   # Customer account lifecycle (@customer)
│   ├── admin/                      # Admin catalog and order processing (@admin)
│   └── api/                        # REST API contracts & validation (@api)
│
├── pages/                          # Page Object Models (Encapsulating UI logic)
│   ├── base.page.ts                # Shared base class (navigation, logging, common locators)
│   ├── home.page.ts                # Homepage hero, featured products, categories
│   ├── login.page.ts               # Login form, validation messages, credentials
│   ├── register.page.ts            # Registration form, account creation
│   ├── category.page.ts            # Category listing, filters, sorting
│   ├── product-details.page.ts     # Attributes, quantity, add to cart/wishlist
│   ├── cart.page.ts                # Cart table, quantity update, coupon code, checkout button
│   ├── checkout.page.ts            # One-page checkout multi-step wizard
│   ├── customer-info.page.ts       # Customer profile, address book
│   ├── order-history.page.ts       # Order listing, reorder, view order details
│   ├── wishlist.page.ts            # Wishlist management and transfer to cart
│   └── admin/                      # Admin Portal Page Objects
│       ├── admin-login.page.ts     # Admin credentials entry
│       ├── admin-dashboard.page.ts # Admin metrics, navigation sidebar
│       ├── admin-products.page.ts  # Product table, add product modal/form
│       └── admin-orders.page.ts    # Order search, change status, fulfillment
│
├── components/                     # Reusable UI Components across multiple pages
│   └── header.component.ts         # Top bar, search input, cart badge, navigation menu
│
├── fixtures/                       # Custom Playwright test extensions
│   ├── test.fixture.ts             # Injected Page Objects fixture
│   └── auth.fixture.ts             # Pre-authenticated customer and admin browser contexts
│
├── api/                            # Strongly typed REST API client classes
│   ├── auth.api.ts
│   ├── product.api.ts
│   ├── cart.api.ts
│   └── order.api.ts
│
├── utils/                          # Common Utilities
│   ├── test-data-generator.ts      # Dynamic emails, addresses, names (Faker / random)
│   ├── logger.ts                   # Structured timestamped console logging
│   └── db-helper.ts                # PostgreSQL direct client query utility
│
├── test-data/                      # Static deterministic test data fixtures (JSON)
│   ├── users.json
│   ├── products.json
│   ├── checkout-data.json
│   └── addresses.json
│
├── playwright.config.ts            # Master Playwright configuration file
├── tsconfig.json                   # TypeScript compiler options and path aliases
└── package.json                    # Dependencies and npm scripts
```

---

## 3. Dependency Injection & Custom Fixture Pattern

Instead of instantiating Page Objects inside every test manually, custom fixtures (`automation/fixtures/test.fixture.ts`) inject pre-initialized pages directly into test parameters:

```typescript
import { test as base } from '@playwright/test';
import { HomePage } from '../pages/home.page';
import { LoginPage } from '../pages/login.page';
import { CartPage } from '../pages/cart.page';
import { CheckoutPage } from '../pages/checkout.page';

type Pages = {
  homePage: HomePage;
  loginPage: LoginPage;
  cartPage: CartPage;
  checkoutPage: CheckoutPage;
};

export const test = base.extend<Pages>({
  homePage: async ({ page }, use) => {
    await use(new HomePage(page));
  },
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  cartPage: async ({ page }, use) => {
    await use(new CartPage(page));
  },
  checkoutPage: async ({ page }, use) => {
    await use(new CheckoutPage(page));
  },
});

export { expect } from '@playwright/test';
```

---

## 4. Test Execution Commands & Tagging Convention

The framework uses descriptive `@tag` decorators on tests to allow granular execution:

```bash
# Execute Smoke Suite
npx playwright test --grep "@smoke"

# Execute Critical Path E2E Suite
npx playwright test --grep "@critical"

# Execute Regression Suite
npx playwright test --grep "@regression"

# Execute Specific Browser Projects
npx playwright test --project=chromium
npx playwright test --project=firefox
npx playwright test --project=webkit

# Execute API Suite Only
npx playwright test automation/tests/api/

# Run Accessibility Audits
npx playwright test accessibility/
```

---

## 5. Artifacts, Tracing & Reporting Strategy
- **Video & Screenshots:** Configured to record `on-first-retry` and capture screenshots `only-on-failure` to preserve disk space during passing CI runs.
- **Trace Viewer:** Recorded on failure, providing full DOM snapshot inspection, network payloads, and console logs.
- **Reporting Matrix:**
  1. **Console List Reporter:** Immediate real-time terminal output during execution.
  2. **Playwright HTML Report:** Self-contained interactive report with search and trace links (`reports/playwright/index.html`).
  3. **JUnit XML:** Machine-readable test execution report (`reports/junit.xml`) consumed by Jenkins and GitHub Actions.
  4. **Allure Report:** Rich historical trends and severity breakdown (`allure-results/`).
