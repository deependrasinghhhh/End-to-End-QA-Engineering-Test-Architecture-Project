import { Page, Locator } from '@playwright/test';
import { BasePage } from './base.page';

export class OrderHistoryPage extends BasePage {
  readonly orderItems: Locator;
  readonly firstOrderNumber: Locator;
  readonly firstOrderDetailsBtn: Locator;

  constructor(page: Page) {
    super(page);
    this.orderItems = page.locator('.order-list .order-item');
    this.firstOrderNumber = page.locator('.order-list .order-item .title strong').first();
    this.firstOrderDetailsBtn = page.locator('.order-list .order-item a.order-details-button').first();
  }

  async open(): Promise<void> {
    await this.navigate('/order/history');
  }

  async getOrderCount(): Promise<number> {
    return await this.orderItems.count();
  }

  async viewFirstOrderDetails(): Promise<void> {
    await this.firstOrderDetailsBtn.click();
  }
}
