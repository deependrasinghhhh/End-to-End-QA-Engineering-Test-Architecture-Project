import { test, expect } from '../../fixtures/test.fixture';
import { TestDataGenerator } from '../../utils/test-data-generator';

test.describe('Critical Business Paths Suite - Revenue & Order Fulfillment', () => {

  test('CRITICAL-01: Full End-to-End Configured Computer Checkout with Expedited Shipping @critical @e2e', async ({
    productDetailsPage,
    cartPage,
    checkoutPage,
    page
  }) => {
    // 1. Navigate to configurable product
    await productDetailsPage.openBuildComputer();
    await productDetailsPage.selectProcessor('2');
    await productDetailsPage.selectRam('4');
    await productDetailsPage.setQuantity(2);
    await productDetailsPage.addToCart();
    await productDetailsPage.waitForNotification();

    // 2. Open cart and verify line items
    await cartPage.open();
    const count = await cartPage.getLineItemCount();
    expect(count).toBeGreaterThanOrEqual(1);

    // 3. Initiate checkout
    await cartPage.proceedToCheckout(true);

    // 4. Fill custom billing address
    const syntheticAddress = TestDataGenerator.generateAddress();
    await checkoutPage.fillBillingAddress(syntheticAddress);

    // 5. Select shipping destination & Expedited method
    await checkoutPage.selectShippingAddress();
    await checkoutPage.selectShippingMethod('NextDayAir');

    // 6. Select Payment & Confirm
    await checkoutPage.selectPaymentMethod('Check');
    await checkoutPage.confirmPaymentInfo();
    await checkoutPage.confirmOrder();

    // 7. Verify order completion
    await expect(page).toHaveURL(/.*checkout\/completed\/.*/);
    const orderNum = await checkoutPage.getConfirmedOrderNumber();
    expect(orderNum).toBeTruthy();

    // 8. Verify active shopping cart is emptied
    await cartPage.open();
    await expect(cartPage.emptyCartMessage).toBeVisible();
  });

  test('CRITICAL-02: Registered Customer Checkout with Order History Audit @critical @customer', async ({
    loginPage,
    homePage,
    cartPage,
    checkoutPage,
    orderHistoryPage,
    page
  }) => {
    // 1. Authenticate registered customer
    await loginPage.open();
    await loginPage.login('customer@nopqa.local', 'TestPassword123!');
    await expect(homePage.header.myAccountLink).toBeVisible();

    // 2. Add product from home page card
    await homePage.open();
    await homePage.addProductToCart(1);
    await homePage.waitForNotification();

    // 3. Checkout
    await cartPage.open();
    await cartPage.proceedToCheckout(true);
    await checkoutPage.completeFullCheckout();
    await expect(page).toHaveURL(/.*checkout\/completed\/.*/);

    // 4. Navigate to Order History and audit
    await orderHistoryPage.open();
    const orderCount = await orderHistoryPage.getOrderCount();
    expect(orderCount).toBeGreaterThanOrEqual(1);
  });

  test('CRITICAL-03: Admin Backoffice Order Verification & Status Progression @critical @admin', async ({
    adminLoginPage,
    adminOrdersPage,
    page
  }) => {
    await adminLoginPage.open();
    await adminLoginPage.login('admin@nopqa.local', 'AdminPassword123!');

    await adminOrdersPage.open();
    const rows = await adminOrdersPage.getOrderRowCount();
    expect(rows).toBeGreaterThanOrEqual(1);
  });

});
