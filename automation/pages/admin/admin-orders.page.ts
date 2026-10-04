import { Page, Locator } from '@playwright/test';
import { BasePage } from '../base.page';

export class AdminOrdersPage extends BasePage {
  readonly statusDropdown: Locator;
  readonly orderRows: Locator;

  constructor(page: Page) {
    super(page);
    this.statusDropdown = page.locator('#OrderStatusId');
    this.orderRows = page.locator('#orders-grid tbody tr');
  }

  async open(): Promise<void> {
    await this.navigate('/Admin/Order/List');
  }

  async filterByStatus(status: 'Pending' | 'Processing' | 'Complete' | 'Cancelled'): Promise<void> {
    await this.navigate(`/Admin/Order/List?OrderStatusId=${status}`);
  }

  async getOrderRowCount(): Promise<number> {
    return await this.orderRows.count();
  }
}
