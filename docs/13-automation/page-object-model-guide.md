# Page Object Model (POM) Design Guide & Best Practices

## 1. Overview
The Page Object Model (POM) is an architectural design pattern in automated testing that creates an abstraction layer between test scripts and web UI code. Each web page or functional component is represented by a TypeScript class encapsulating locators and interaction methods.

---

## 2. Page Object Structure & Standards

### Standard Page Class Anatomy
Every Page Object in `automation/pages/` must adhere to this blueprint:

```typescript
import { Page, Locator } from '@playwright/test';
import { BasePage } from './base.page';

export class LoginPage extends BasePage {
  // 1. Encapsulated Locators (readonly)
  private readonly emailInput: Locator;
  private readonly passwordInput: Locator;
  private readonly loginButton: Locator;
  private readonly errorMessage: Locator;

  // 2. Constructor initializing locators using user-centric selectors
  constructor(page: Page) {
    super(page);
    this.emailInput = page.locator('#Email');
    this.passwordInput = page.locator('#Password');
    this.loginButton = page.getByRole('button', { name: 'Log in' });
    this.errorMessage = page.locator('.message-error');
  }

  // 3. Navigation method
  async navigate(): Promise<void> {
    await this.goto('/login');
    await this.waitForPageLoad();
  }

  // 4. Action methods (chainable or business-flow oriented)
  async login(email: string, pass: string): Promise<void> {
    this.logger.info(`Attempting login with email: ${email}`);
    await this.emailInput.fill(email);
    await this.passwordInput.fill(pass);
    await this.loginButton.click();
  }

  // 5. Verification / State query methods
  async getErrorMessage(): Promise<string> {
    return (await this.errorMessage.textContent()) || '';
  }
}
```

---

## 3. Mandatory Coding Standards & Guidelines

### Do's
- **Extend `BasePage`:** Always inherit common navigation, logging, and auto-waiting utilities.
- **Use Web-First Locators:** Prioritize `page.getByRole()`, `page.getByLabel()`, and `page.getByText()`.
- **Return Action Results or Other Pages:** If an action transitions the browser to another page, consider returning the new Page Object or keeping methods focused.
- **Keep Assertions in Specs:** Page Objects should perform actions and query state; assertions (`expect(...)`) belong inside the test specs (`*.spec.ts`).

### Don'ts
- **NO Arbitrary Sleep:** Never use `await page.waitForTimeout(...)`. Playwright automatically waits for elements to be visible, stable, and clickable.
- **NO Hardcoded Locators in Specs:** Never invoke `page.locator(...)` or `page.click('...')` directly in test files.
- **NO Monolithic Classes:** Decompose pages with shared elements (e.g. Header, Footer, Sidebar) into reusable component objects in `automation/components/`.

---

## 4. Component Object Model (COM)

When a UI element appears across multiple pages (e.g., the top navigation bar, search input, cart badge), encapsulate it in a Component Object:

```typescript
// automation/components/header.component.ts
export class HeaderComponent {
  private readonly searchInput: Locator;
  private readonly searchButton: Locator;
  private readonly cartLink: Locator;

  constructor(private page: Page) {
    this.searchInput = page.locator('#small-searchterms');
    this.searchButton = page.getByRole('button', { name: 'Search' });
    this.cartLink = page.locator('#topcartlink');
  }

  async searchProduct(term: string): Promise<void> {
    await this.searchInput.fill(term);
    await this.searchButton.click();
  }

  async getCartCount(): Promise<number> {
    const text = await this.cartLink.innerText();
    const match = text.match(/\((\d+)\)/);
    return match ? parseInt(match[1], 10) : 0;
  }
}
```

Page Objects can then compose this component:
```typescript
export class HomePage extends BasePage {
  readonly header: HeaderComponent;

  constructor(page: Page) {
    super(page);
    this.header = new HeaderComponent(page);
  }
}
```
