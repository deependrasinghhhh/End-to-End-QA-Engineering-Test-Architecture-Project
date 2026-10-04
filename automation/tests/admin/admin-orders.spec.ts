import { test, expect } from '../../fixtures/test.fixture';

test.describe('Admin Backoffice Order Management Suite', () => {

  test.beforeEach(async ({ adminLoginPage }) => {
    await adminLoginPage.open();
    await adminLoginPage.login('admin@nopqa.local', 'AdminPassword123!');
  });

  test('ADM-ORD-01: Admin order list filtering by status @admin', async ({ adminOrdersPage }) => {
    await adminOrdersPage.open();
    await adminOrdersPage.filterByStatus('Complete');
    const rows = await adminOrdersPage.getOrderRowCount();
    expect(rows).toBeGreaterThanOrEqual(1);
  });

  test('ADM-ORD-02: Non-admin users cannot access admin console @admin @security', async ({ page }) => {
    // Navigate without admin credentials
    await page.goto('/admin/login');
    await page.locator('#Email').fill('customer@nopqa.local');
    await page.locator('#Password').fill('TestPassword123!');
    await page.locator('button.login-button').click();

    // Verify rejected
    const error = page.locator('.error');
    await expect(error).toBeVisible();
    await expect(error).toHaveText('Invalid administrator credentials');
  });

});
