import { Page, Locator, expect } from '@playwright/test';

export abstract class BasePage {
  readonly page: Page;
  readonly notificationBar: Locator;
  readonly notificationContent: Locator;
  readonly notificationCloseBtn: Locator;

  constructor(page: Page) {
    this.page = page;
    this.notificationBar = page.locator('#bar-notification');
    this.notificationContent = page.locator('#bar-notification .content');
    this.notificationCloseBtn = page.locator('#bar-notification .close');
  }

  async navigate(path: string = '/'): Promise<void> {
    await this.page.goto(path, { waitUntil: 'domcontentloaded' });
  }

  async getPageTitle(): Promise<string> {
    return await this.page.title();
  }

  async waitForNotification(): Promise<string> {
    await expect(this.notificationBar).toBeVisible({ timeout: 10000 });
    const text = await this.notificationContent.innerText();
    return text.trim();
  }

  async closeNotification(): Promise<void> {
    if (await this.notificationBar.isVisible()) {
      await this.notificationCloseBtn.click();
      await expect(this.notificationBar).toBeHidden();
    }
  }

  async acceptNextDialog(): Promise<void> {
    this.page.once('dialog', async dialog => {
      await dialog.accept();
    });
  }
}
