import { Page, Locator } from '@playwright/test';
import { BasePage } from './base.page';

export class CustomerInfoPage extends BasePage {
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly emailInput: Locator;
  readonly companyInput: Locator;
  readonly saveButton: Locator;
  readonly successNotification: Locator;

  constructor(page: Page) {
    super(page);
    this.firstNameInput = page.locator('#FirstName');
    this.lastNameInput = page.locator('#LastName');
    this.emailInput = page.locator('#Email');
    this.companyInput = page.locator('#Company');
    this.saveButton = page.locator('#save-info-button');
    this.successNotification = page.locator('.notifications .bar-notification.success');
  }

  async open(): Promise<void> {
    await this.navigate('/customer/info');
  }

  async updateProfile(firstName: string, lastName: string, company: string): Promise<void> {
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.companyInput.fill(company);
    await this.saveButton.click();
  }
}
