import { test, expect } from '../../fixtures/test.fixture';
import { TestDataGenerator } from '../../utils/test-data-generator';

test.describe('Smoke Test Suite - Core User & Admin Workflows', () => {

  test('SMOKE-01: Storefront availability & featured catalog display @smoke', async ({ homePage }) => {
    await homePage.open();
    await expect(homePage.welcomeTitle).toBeVisible();
    await expect(homePage.featuredProducts.first()).toBeVisible();
    const count = await homePage.featuredProducts.count();
    expect(count).toBeGreaterThanOrEqual(2);
  });

  test('SMOKE-02: Header product search execution @smoke', async ({ homePage, page }) => {
    await homePage.open();
    await homePage.header.searchFor('computer');
    await expect(page).toHaveURL(/.*search\?q=computer/);
    const results = page.locator('.product-item');
    await expect(results.first()).toBeVisible();
  });

  test('SMOKE-03: Product details page & dynamic price calculation @smoke', async ({ productDetailsPage }) => {
    await productDetailsPage.openBuildComputer();
    await expect(productDetailsPage.title).toHaveText('Build your own computer');
    await expect(productDetailsPage.stockStatus).toHaveText('In stock');
    
    // Select Fast Processor (+$100) and verify price updates
    await productDetailsPage.selectProcessor('2');
    const priceText = await productDetailsPage.getPrice();
    expect(priceText).toContain('1,200');
  });

  test('SMOKE-04: Add product to cart & verify notification banner @smoke', async ({ productDetailsPage, homePage }) => {
    await productDetailsPage.openBuildComputer();
    await productDetailsPage.addToCart();
    
    const notification = await productDetailsPage.waitForNotification();
    expect(notification).toContain('The product has been added to your shopping cart');
    
    const count = await homePage.header.getCartCount();
    expect(count).toBeGreaterThanOrEqual(1);
  });

  test('SMOKE-05: Shopping cart inspection & checkout terms gating @smoke', async ({ homePage, cartPage }) => {
    await homePage.open();
    await homePage.addProductToCart(1);
    await homePage.waitForNotification();

    await cartPage.open();
    const items = await cartPage.getLineItemCount();
    expect(items).toBeGreaterThanOrEqual(1);

    // Terms of service validation
    await cartPage.acceptNextDialog();
    await cartPage.proceedToCheckout(false);
  });

  test('SMOKE-06: End-to-End Guest Checkout & Order Number generation @smoke @critical', async ({ homePage, checkoutPage, page }) => {
    await homePage.open();
    await homePage.addProductToCart(1);
    await homePage.waitForNotification();

    await checkoutPage.open();
    await checkoutPage.completeFullCheckout();
    
    await expect(page).toHaveURL(/.*checkout\/completed\/.*/);
    await expect(checkoutPage.orderCompletedTitle).toHaveText('Your order has been successfully processed!');
    const orderNumber = await checkoutPage.getConfirmedOrderNumber();
    expect(orderNumber).toMatch(/Order number:\s*\d+/);
  });

  test('SMOKE-07: Customer authentication & session logout @smoke @customer', async ({ loginPage, homePage, page }) => {
    await loginPage.open();
    await loginPage.login('customer@nopqa.local', 'TestPassword123!');
    await expect(homePage.header.myAccountLink).toBeVisible();
    
    // Logout
    await homePage.header.logoutLink.click();
    await expect(homePage.header.loginLink).toBeVisible();
  });

  test('SMOKE-08: Admin Backoffice login & dashboard KPIs @smoke @admin', async ({ adminLoginPage, adminDashboardPage }) => {
    await adminLoginPage.open();
    await adminLoginPage.login('admin@nopqa.local', 'AdminPassword123!');
    await expect(adminDashboardPage.ordersKpiCard).toBeVisible();
    await expect(adminDashboardPage.customersKpiCard).toBeVisible();
  });

});
