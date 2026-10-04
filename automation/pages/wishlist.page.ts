import { Page, Locator } from '@playwright/test';
import { BasePage } from './base.page';

export class WishlistPage extends BasePage {
  readonly wishlistTable: Locator;
  readonly wishlistRows: Locator;
  readonly addToCartCheckboxes: Locator;
  readonly addToCartButton: Locator;
  readonly emptyWishlistMessage: Locator;

  constructor(page: Page) {
    super(page);
    this.wishlistTable = page.locator('table.cart');
    this.wishlistRows = page.locator('table.cart tbody tr');
    this.addToCartCheckboxes = page.locator('input[name="addtocart"]');
    this.addToCartButton = page.locator('button.wishlist-add-to-cart-button');
    this.emptyWishlistMessage = page.locator('.wishlist-page .no-data');
  }

  async open(): Promise<void> {
    await this.navigate('/wishlist');
  }

  async transferToCart(): Promise<void> {
    await this.addToCartButton.click();
  }
}
