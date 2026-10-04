import { Page, Locator } from '@playwright/test';
import { BasePage } from '../base.page';

export class AdminProductsPage extends BasePage {
  readonly searchInput: Locator;
  readonly searchButton: Locator;
  readonly productRows: Locator;

  constructor(page: Page) {
    super(page);
    this.searchInput = page.locator('#SearchProductName');
    this.searchButton = page.locator('#search-products');
    this.productRows = page.locator('#products-grid tbody tr');
  }

  async open(): Promise<void> {
    await this.navigate('/Admin/Product/List');
  }

  async searchProduct(name: string): Promise<void> {
    await this.searchInput.fill(name);
    await this.searchButton.click();
  }

  async getRowCount(): Promise<number> {
    return await this.productRows.count();
  }
}
