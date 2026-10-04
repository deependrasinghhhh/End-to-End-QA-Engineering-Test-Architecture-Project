import { Page, Locator } from '@playwright/test';
import { BasePage } from './base.page';

export class ProductDetailsPage extends BasePage {
  readonly title: Locator;
  readonly shortDescription: Locator;
  readonly fullDescription: Locator;
  readonly sku: Locator;
  readonly stockStatus: Locator;
  readonly priceValue: Locator;
  readonly processorDropdown: Locator;
  readonly ramDropdown: Locator;
  readonly hdd400Radio: Locator;
  readonly osWin10Radio: Locator;
  readonly softwareCheckbox: Locator;
  readonly quantityInput: Locator;
  readonly addToCartButton: Locator;
  readonly addToWishlistButton: Locator;
  readonly addToCompareButton: Locator;

  constructor(page: Page) {
    super(page);
    this.title = page.locator('#product-title');
    this.shortDescription = page.locator('.short-description');
    this.fullDescription = page.locator('.full-description');
    this.sku = page.locator('.sku .value');
    this.stockStatus = page.locator('.stock .value');
    this.priceValue = page.locator('#price-value-1');
    this.processorDropdown = page.locator('#product_attribute_1');
    this.ramDropdown = page.locator('#product_attribute_2');
    this.hdd400Radio = page.locator('#product_attribute_3_7');
    this.osWin10Radio = page.locator('#product_attribute_4_9');
    this.softwareCheckbox = page.locator('#product_attribute_5_10');
    this.quantityInput = page.locator('input.qty-input');
    this.addToCartButton = page.locator('#add-to-cart-button-1');
    this.addToWishlistButton = page.locator('#add-to-wishlist-button-1');
    this.addToCompareButton = page.locator('.add-to-compare-list-button');
  }

  async openBuildComputer(): Promise<void> {
    await this.navigate('/build-your-own-computer');
  }

  async selectProcessor(value: string): Promise<void> {
    await this.processorDropdown.selectOption(value);
  }

  async selectRam(value: string): Promise<void> {
    await this.ramDropdown.selectOption(value);
  }

  async setQuantity(qty: number): Promise<void> {
    await this.quantityInput.fill(qty.toString());
  }

  async addToCart(): Promise<void> {
    await this.addToCartButton.click();
  }

  async addToWishlist(): Promise<void> {
    await this.addToWishlistButton.click();
  }

  async getPrice(): Promise<string> {
    return (await this.priceValue.innerText()).trim();
  }
}
