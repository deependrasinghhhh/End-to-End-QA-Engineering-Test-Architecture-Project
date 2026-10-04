import { test as base } from './test.fixture';

export const testAsCustomer = base.extend<{ authenticatedPage: void }>({
  authenticatedPage: async ({ homePage, loginPage }, use) => {
    await loginPage.open();
    await loginPage.login('customer@nopqa.local', 'TestPassword123!');
    await use();
  }
});

export const testAsAdmin = base.extend<{ adminAuthenticatedPage: void }>({
  adminAuthenticatedPage: async ({ adminLoginPage }, use) => {
    await adminLoginPage.open();
    await adminLoginPage.login('admin@nopqa.local', 'AdminPassword123!');
    await use();
  }
});
