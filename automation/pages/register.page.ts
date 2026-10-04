import { Page, Locator } from '@playwright/test';
import { BasePage } from './base.page';

export interface RegistrationData {
  gender?: 'M' | 'F';
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword?: string;
  company?: string;
  newsletter?: boolean;
}

export class RegisterPage extends BasePage {
  readonly genderMaleRadio: Locator;
  readonly genderFemaleRadio: Locator;
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly emailInput: Locator;
  readonly companyInput: Locator;
  readonly newsletterCheckbox: Locator;
  readonly passwordInput: Locator;
  readonly confirmPasswordInput: Locator;
  readonly registerButton: Locator;
  readonly resultMessage: Locator;
  readonly continueButton: Locator;
  readonly validationErrors: Locator;

  constructor(page: Page) {
    super(page);
    this.genderMaleRadio = page.locator('#gender-male');
    this.genderFemaleRadio = page.locator('#gender-female');
    this.firstNameInput = page.locator('#FirstName');
    this.lastNameInput = page.locator('#LastName');
    this.emailInput = page.locator('#Email');
    this.companyInput = page.locator('#Company');
    this.newsletterCheckbox = page.locator('#Newsletter');
    this.passwordInput = page.locator('#Password');
    this.confirmPasswordInput = page.locator('#ConfirmPassword');
    this.registerButton = page.locator('#register-button');
    this.resultMessage = page.locator('.registration-result-page .result');
    this.continueButton = page.locator('a.register-continue-button');
    this.validationErrors = page.locator('.validation-summary-errors, .field-validation-error');
  }

  async open(): Promise<void> {
    await this.navigate('/register');
  }

  async register(data: RegistrationData): Promise<void> {
    if (data.gender === 'F') {
      await this.genderFemaleRadio.check();
    } else {
      await this.genderMaleRadio.check();
    }

    await this.firstNameInput.fill(data.firstName);
    await this.lastNameInput.fill(data.lastName);
    await this.emailInput.fill(data.email);
    if (data.company) await this.companyInput.fill(data.company);
    
    await this.passwordInput.fill(data.password);
    await this.confirmPasswordInput.fill(data.confirmPassword !== undefined ? data.confirmPassword : data.password);

    await this.registerButton.click();
  }

  async getResultMessage(): Promise<string> {
    return await this.resultMessage.innerText();
  }

  async getValidationErrors(): Promise<string> {
    return await this.validationErrors.innerText();
  }
}
