import { Page, Locator } from '@playwright/test';
import { BasePage } from './base.page';

export class CategoryPage extends BasePage {
  readonly title: Locator;
  readonly breadcrumb: Locator;
  readonly sortDropdown: Locator;
  readonly pageSizeDropdown: Locator;
  readonly gridViewIcon: Locator;
  readonly listViewIcon: Locator;
  readonly productItems: Locator;

  constructor(page: Page) {
    super(page);
    this.title = page.locator('.page-title h1');
    this.breadcrumb = page.locator('.breadcrumb');
    this.sortDropdown = page.locator('#products-orderby');
    this.pageSizeDropdown = page.locator('#products-pagesize');
    this.gridViewIcon = page.locator('.viewmode-icon.grid');
    this.listViewIcon = page.locator('.viewmode-icon.list');
    this.productItems = page.locator('.item-grid .product-item');
  }

  async openDesktops(): Promise<void> {
    await this.navigate('/desktops');
  }

  async sortBy(value: '0' | '5' | '10' | '11'): Promise<void> {
    await this.navigate(`/desktops?orderby=${value}`);
  }

  async getProductCount(): Promise<number> {
    return await this.productItems.count();
  }

  async getProductTitles(): Promise<string[]> {
    return await this.productItems.locator('.product-title a').allInnerTexts();
  }

  async getProductPrices(): Promise<number[]> {
    const raw = await this.productItems.locator('.price.actual-price').allInnerTexts();
    return raw.map(p => parseFloat(p.replace(/[^0-9.]/g, '')));
  }
}
