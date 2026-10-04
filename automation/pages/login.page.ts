import { Page, Locator } from '@playwright/test';
import { BasePage } from './base.page';

export class LoginPage extends BasePage {
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly rememberMeCheckbox: Locator;
  readonly loginButton: Locator;
  readonly registerButton: Locator;
  readonly forgotPasswordLink: Locator;
  readonly errorMessage: Locator;

  constructor(page: Page) {
    super(page);
    this.emailInput = page.locator('#Email');
    this.passwordInput = page.locator('#Password');
    this.rememberMeCheckbox = page.locator('#RememberMe');
    this.loginButton = page.locator('button.login-button');
    this.registerButton = page.locator('a.register-button');
    this.forgotPasswordLink = page.locator('a[href="/passwordrecovery"]');
    this.errorMessage = page.locator('.validation-summary-errors, .message-error');
  }

  async open(): Promise<void> {
    await this.navigate('/login');
  }

  async login(email: string, password: string, rememberMe: boolean = false): Promise<void> {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    if (rememberMe) {
      await this.rememberMeCheckbox.check();
    }
    await this.loginButton.click();
  }

  async getErrorMessage(): Promise<string> {
    return await this.errorMessage.innerText();
  }
}
