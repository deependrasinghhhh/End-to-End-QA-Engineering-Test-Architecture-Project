import { Page, Locator } from '@playwright/test';
import { BasePage } from '../base.page';

export class AdminLoginPage extends BasePage {
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;

  constructor(page: Page) {
    super(page);
    this.emailInput = page.locator('#Email');
    this.passwordInput = page.locator('#Password');
    this.loginButton = page.locator('button.login-button');
  }

  async open(): Promise<void> {
    await this.navigate('/admin/login');
  }

  async login(email: string = 'admin@nopqa.local', password: string = 'AdminPassword123!'): Promise<void> {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }
}
