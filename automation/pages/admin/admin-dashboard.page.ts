import { Page, Locator } from '@playwright/test';
import { BasePage } from '../base.page';

export class AdminDashboardPage extends BasePage {
  readonly ordersKpiCard: Locator;
  readonly customersKpiCard: Locator;
  readonly productsKpiCard: Locator;
  readonly productsMenuLink: Locator;
  readonly ordersMenuLink: Locator;

  constructor(page: Page) {
    super(page);
    this.ordersKpiCard = page.locator('#card-orders');
    this.customersKpiCard = page.locator('#card-customers');
    this.productsKpiCard = page.locator('#card-products');
    this.productsMenuLink = page.locator('a[href="/Admin/Product/List"]');
    this.ordersMenuLink = page.locator('a[href="/Admin/Order/List"]');
  }

  async open(): Promise<void> {
    await this.navigate('/admin/dashboard');
  }
}
