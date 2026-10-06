import { test, expect } from '../../fixtures/test.fixture';

test.describe('Checkout Flow & Validation Regression Suite', () => {

  test.beforeEach(async ({ homePage }) => {
    await homePage.open();
    await homePage.addProductToCart(1);
    await homePage.waitForNotification();
  });

  test('CHK-REG-01: Terms of service required prior to checkout @regression', async ({ cartPage, page }) => {
    await cartPage.open();
    let dialogMessage = '';
    page.once('dialog', async dialog => {
      dialogMessage = dialog.message();
      await dialog.accept();
    });
    await cartPage.checkoutButton.click();
    expect(dialogMessage).toBe('Please accept the terms of service before checkout');
    await expect(page).toHaveURL(/.*cart/);
  });

  test('CHK-REG-02: Multi-step accordion navigation from Billing through Confirm @regression', async ({
    checkoutPage,
    cartPage,
    page
  }) => {
    await checkoutPage.open();
    await expect(checkoutPage.billingStep).toBeVisible();

    // Fill Billing Step
    await checkoutPage.fillBillingAddress();
    await expect(checkoutPage.shippingStep).toHaveClass(/active/);

    // Shipping step
    await checkoutPage.selectShippingAddress();
    await expect(checkoutPage.shippingMethodStep).toHaveClass(/active/);

    // Shipping method
    await checkoutPage.selectShippingMethod('Ground');
    await expect(checkoutPage.paymentMethodStep).toHaveClass(/active/);

    // Payment method
    await checkoutPage.selectPaymentMethod('Check');
    await expect(checkoutPage.paymentInfoStep).toHaveClass(/active/);

    // Payment Info
    await checkoutPage.confirmPaymentInfo();
    await expect(checkoutPage.confirmOrderStep).toHaveClass(/active/);

    // Confirm order
    await checkoutPage.confirmOrder();
    await expect(page).toHaveURL(/.*checkout\/completed\/.*/);

    // Verify order completion confirmation and order number
    const completedMsg = page.locator('.order-completed .title');
    await expect(completedMsg).toBeVisible();
    await expect(completedMsg).toHaveText('Your order has been successfully processed!');
    const orderNumberEl = page.locator('.order-number');
    await expect(orderNumberEl).toBeVisible();
    await expect(orderNumberEl).toContainText('Order number:');

    // Verify post-checkout cart cleanup
    await cartPage.open();
    await expect(cartPage.emptyCartMessage).toBeVisible();
    await expect(cartPage.emptyCartMessage).toHaveText('Your Shopping Cart is empty!');
  });

});
