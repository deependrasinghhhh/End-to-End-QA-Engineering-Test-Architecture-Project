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
    await expect(cartPage.cartRows.first().locator('.product-unit-price')).toHaveText('$1200.00');
    await expect(cartPage.cartRows.first().locator('.qty-input')).toHaveValue('1');
    await expect(cartPage.cartRows.first().locator('.product-subtotal')).toHaveText('$1200.00');
  });

  test('CART-REG-02: Quantity update updates subtotal @regression', async ({ cartPage }) => {
    await cartPage.open();
    await cartPage.updateItemQuantity(0, 3);
    await expect(cartPage.cartRows.first().locator('.qty-input')).toHaveValue('3');
    await expect(cartPage.cartRows.first().locator('.product-subtotal')).toHaveText('$3600.00');
    await expect(cartPage.subtotalText).toHaveText('$3600.00');
    await expect(cartPage.orderTotalText).toContainText('$3888.00');
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
    const discountRow = page.locator('.order-discount .value-summary');
    await expect(discountRow).toBeVisible();
    await expect(discountRow).toHaveText('-$120.00');
  });

  test('CART-REG-05: Remove item clears line from table @regression', async ({ cartPage }) => {
    await cartPage.open();
    const initialCount = await cartPage.getLineItemCount();
    expect(initialCount).toBeGreaterThanOrEqual(1);
    await cartPage.removeItem(0);
    await expect(cartPage.emptyCartMessage).toBeVisible();
    await expect(cartPage.emptyCartMessage).toHaveText('Your Shopping Cart is empty!');
    const finalCount = await cartPage.getLineItemCount();
    expect(finalCount).toBe(0);
  });

});
