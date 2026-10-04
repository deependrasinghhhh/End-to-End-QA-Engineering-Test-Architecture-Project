import { Page, Locator } from '@playwright/test';
import { BasePage } from './base.page';
import { HeaderComponent } from '../components/header.component';

export class HomePage extends BasePage {
  readonly header: HeaderComponent;
  readonly featuredProducts: Locator;
  readonly welcomeTitle: Locator;

  constructor(page: Page) {
    super(page);
    this.header = new HeaderComponent(page);
    this.featuredProducts = page.locator('.home-page-product-grid .product-item');
    this.welcomeTitle = page.locator('.slide-content h1');
  }

  async open(): Promise<void> {
    await this.navigate('/');
  }

  async addProductToCart(productId: number): Promise<void> {
    const item = this.page.locator(`.product-item[data-productid="${productId}"]`);
    await item.locator('.product-box-add-to-cart-button').click();
  }

  async addProductToWishlist(productId: number): Promise<void> {
    const item = this.page.locator(`.product-item[data-productid="${productId}"]`);
    await item.locator('.add-to-wishlist-button').click();
  }
}
