import { test as base, expect } from './test.fixture';
import { ENV } from '../config/environment';

export const testAsCustomer = base.extend<{ authenticatedCustomer: void }>({
  authenticatedCustomer: [async ({ loginPage }, use) => {
    await loginPage.open();
    await loginPage.login(ENV.DEFAULT_CUSTOMER.email, ENV.DEFAULT_CUSTOMER.password);
    await use();
  }, { auto: true }]
});

export const testAsAdmin = base.extend<{ authenticatedAdmin: void }>({
  authenticatedAdmin: [async ({ adminLoginPage }, use) => {
    await adminLoginPage.open();
    await adminLoginPage.login(ENV.ADMIN_USER.email, ENV.ADMIN_USER.password);
    await use();
  }, { auto: true }]
});

export { expect };
