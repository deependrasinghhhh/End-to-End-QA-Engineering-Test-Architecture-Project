import { testAsCustomer as test, expect } from '../../fixtures/auth.fixture';

test.describe('Customer Account Management Suite', () => {

  test('CUST-01: Update customer profile information @customer', async ({ customerInfoPage }) => {
    await customerInfoPage.open();
    await customerInfoPage.updateProfile('Alex', 'Mercer', 'QA Engineering Labs');
    await expect(customerInfoPage.successNotification).toBeVisible();
    await expect(customerInfoPage.successNotification).toHaveText('The customer info has been updated successfully.');
  });

  test('CUST-02: Manage Address Book and add new address @customer', async ({ page }) => {
    await page.goto('/customer/addresses');
    const addButton = page.locator('button.add-address-button');
    await expect(addButton).toBeVisible();
    await addButton.click();

    await page.locator('#new-address-modal input[name="FirstName"]').fill('Alex');
    await page.locator('#new-address-modal input[name="LastName"]').fill('Mercer');
    await page.locator('#new-address-modal input[name="City"]').fill('Buffalo');
    await page.locator('#new-address-modal input[name="Address1"]').fill('200 Delaware Ave');
    await page.locator('#new-address-modal input[name="Zip"]').fill('14202');
    await page.locator('#new-address-modal button').click();

    await expect(page).toHaveURL(/.*customer\/addresses/);
    const addressItems = page.locator('.address-item');
    expect(await addressItems.count()).toBeGreaterThanOrEqual(1);
  });

  test('CUST-03: View order history and order details @customer', async ({ orderHistoryPage, page }) => {
    await orderHistoryPage.open();
    const count = await orderHistoryPage.getOrderCount();
    expect(count).toBeGreaterThanOrEqual(1);

    await orderHistoryPage.viewFirstOrderDetails();
    await expect(page).toHaveURL(/.*orderdetails\/.*/);
    const pdfButton = page.locator('a.pdf-order-button');
    await expect(pdfButton).toBeVisible();
  });

});
