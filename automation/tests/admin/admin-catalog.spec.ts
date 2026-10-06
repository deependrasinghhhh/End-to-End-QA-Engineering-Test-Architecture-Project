import { testAsAdmin as test, expect } from '../../fixtures/auth.fixture';

test.describe('Admin Backoffice Catalog Management Suite', () => {

  test('ADM-CAT-01: Admin product catalog search by product name @admin', async ({ adminProductsPage }) => {
    await adminProductsPage.open();
    await adminProductsPage.searchProduct('Build your own computer');
    const rowCount = await adminProductsPage.getRowCount();
    expect(rowCount).toBeGreaterThanOrEqual(1);
  });

  test('ADM-CAT-02: Admin product catalog search with non-existent keyword @admin', async ({ adminProductsPage, page }) => {
    await adminProductsPage.open();
    await adminProductsPage.searchProduct('NoSuchItemXYZ999');
    const emptyCell = page.locator('.dataTables_empty');
    await expect(emptyCell).toBeVisible();
    await expect(emptyCell).toHaveText('No data available in table');
  });

});
