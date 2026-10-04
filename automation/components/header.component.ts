import { Page, Locator } from '@playwright/test';

export class HeaderComponent {
  readonly page: Page;
  readonly registerLink: Locator;
  readonly loginLink: Locator;
  readonly logoutLink: Locator;
  readonly myAccountLink: Locator;
  readonly wishlistLink: Locator;
  readonly wishlistCount: Locator;
  readonly cartLink: Locator;
  readonly cartCount: Locator;
  readonly currencySelect: Locator;
  readonly searchInput: Locator;
  readonly searchButton: Locator;
  readonly autocompleteList: Locator;
  readonly logo: Locator;

  constructor(page: Page) {
    this.page = page;
    this.registerLink = page.locator('a.ico-register');
    this.loginLink = page.locator('a.ico-login');
    this.logoutLink = page.locator('a.ico-logout');
    this.myAccountLink = page.locator('a.ico-account');
    this.wishlistLink = page.locator('a.ico-wishlist');
    this.wishlistCount = page.locator('.wishlist-qty');
    this.cartLink = page.locator('a.ico-cart');
    this.cartCount = page.locator('.cart-qty');
    this.currencySelect = page.locator('#customerCurrency');
    this.searchInput = page.locator('#small-searchterms');
    this.searchButton = page.locator('.search-box-button');
    this.autocompleteList = page.locator('#search-autocomplete-list');
    this.logo = page.locator('.header-logo a');
  }

  async searchFor(query: string): Promise<void> {
    await this.searchInput.fill(query);
    await this.searchButton.click();
  }

  async typeSearch(query: string): Promise<void> {
    await this.searchInput.fill(query);
  }

  async getCartCount(): Promise<number> {
    const text = await this.cartCount.innerText();
    const match = text.match(/\((\d+)\)/);
    return match ? parseInt(match[1]) : 0;
  }

  async getWishlistCount(): Promise<number> {
    const text = await this.wishlistCount.innerText();
    const match = text.match(/\((\d+)\)/);
    return match ? parseInt(match[1]) : 0;
  }
}
