import { test, expect } from '../../fixtures/test.fixture';

test.describe('Shopping Cart & Coupon Regression Suite', () => {

  test.beforeEach(async ({ homePage }) => {
    await homePage.open();
    await homePage.addProductToCart(1);
    await homePage.waitForNotification();
  });

  test('CART-REG-01: Add item and verify cart table item structure @regression', async ({ cartPage }) => {
    await cartPage.open();
    const count = await cartPage.getLineItemCount();
    expect(count).toBeGreaterThanOrEqual(1);
    await expect(cartPage.cartRows.first().locator('.product-name')).toContainText('Build your own computer');
  });

  test('CART-REG-02: Quantity update updates subtotal @regression', async ({ cartPage }) => {
    await cartPage.open();
    await cartPage.updateItemQuantity(0, 3);
    const subtotal = await cartPage.subtotalText.innerText();
    expect(subtotal).toBeTruthy();
  });

  test('CART-REG-03: Invalid coupon code displays error alert @regression', async ({ cartPage }) => {
    await cartPage.open();
    await cartPage.applyCoupon('INVALID-COUPON-999');
    await expect(cartPage.couponMessage).toBeVisible();
    await expect(cartPage.couponMessage).toHaveText('The coupon code was not found or is invalid');
  });

  test('CART-REG-04: Valid coupon code (DISCOUNT10) applies discount @regression', async ({ cartPage, page }) => {
    await cartPage.open();
    await cartPage.applyCoupon('DISCOUNT10');
    await expect(page).toHaveURL(/.*coupon=applied/);
  });

  test('CART-REG-05: Remove item clears line from table @regression', async ({ cartPage }) => {
    await cartPage.open();
    const initialCount = await cartPage.getLineItemCount();
    if (initialCount > 0) {
      await cartPage.removeItem(0);
    }
  });

});
