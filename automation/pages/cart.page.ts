import { Page, Locator } from '@playwright/test';
import { BasePage } from './base.page';

export class CartPage extends BasePage {
  readonly emptyCartMessage: Locator;
  readonly cartTable: Locator;
  readonly cartRows: Locator;
  readonly updateCartButton: Locator;
  readonly continueShoppingButton: Locator;
  readonly couponInput: Locator;
  readonly applyCouponButton: Locator;
  readonly couponMessage: Locator;
  readonly termsOfServiceCheckbox: Locator;
  readonly checkoutButton: Locator;
  readonly subtotalText: Locator;
  readonly orderTotalText: Locator;

  constructor(page: Page) {
    super(page);
    this.emptyCartMessage = page.locator('.order-summary-content .no-data');
    this.cartTable = page.locator('table.cart');
    this.cartRows = page.locator('table.cart tbody tr');
    this.updateCartButton = page.locator('#updatecart');
    this.continueShoppingButton = page.locator('a.continue-shopping-button');
    this.couponInput = page.locator('#discountcouponcode');
    this.applyCouponButton = page.locator('#applydiscountcouponcode');
    this.couponMessage = page.locator('#coupon-message');
    this.termsOfServiceCheckbox = page.locator('#termsofservice');
    this.checkoutButton = page.locator('#checkout');
    this.subtotalText = page.locator('.order-subtotal .value-summary');
    this.orderTotalText = page.locator('.order-total .value-summary');
  }

  async open(): Promise<void> {
    await this.navigate('/cart');
  }

  async getLineItemCount(): Promise<number> {
    if (await this.emptyCartMessage.isVisible()) return 0;
    return await this.cartRows.count();
  }

  async updateItemQuantity(rowIndex: number, qty: number): Promise<void> {
    const input = this.cartRows.nth(rowIndex).locator('.qty-input');
    await input.fill(qty.toString());
    await input.dispatchEvent('change');
    await this.updateCartButton.click();
    await this.page.waitForLoadState('domcontentloaded');
  }

  async removeItem(rowIndex: number): Promise<void> {
    const removeBtn = this.cartRows.nth(rowIndex).locator('.remove-btn');
    await removeBtn.click();
  }

  async applyCoupon(code: string): Promise<void> {
    await this.couponInput.fill(code);
    await this.applyCouponButton.click();
  }

  async proceedToCheckout(acceptTerms: boolean = true): Promise<void> {
    if (acceptTerms) {
      await this.termsOfServiceCheckbox.check();
    }
    await this.checkoutButton.click();
  }
}
