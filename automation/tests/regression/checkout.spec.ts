import { test, expect } from '../../fixtures/test.fixture';

test.describe('Checkout Flow & Validation Regression Suite', () => {

  test.beforeEach(async ({ homePage }) => {
    await homePage.open();
    await homePage.addProductToCart(1);
    await homePage.waitForNotification();
  });

  test('CHK-REG-01: Terms of service required prior to checkout @regression', async ({ cartPage }) => {
    await cartPage.open();
    await cartPage.acceptNextDialog();
    await cartPage.proceedToCheckout(false);
  });

  test('CHK-REG-02: Multi-step accordion navigation from Billing through Confirm @regression', async ({
    checkoutPage,
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

    // Confirm
    await checkoutPage.confirmOrder();
    await expect(page).toHaveURL(/.*checkout\/completed\/.*/);
  });

});
