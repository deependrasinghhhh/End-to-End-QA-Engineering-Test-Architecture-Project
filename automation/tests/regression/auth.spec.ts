import { test, expect } from '../../fixtures/test.fixture';
import { TestDataGenerator } from '../../utils/test-data-generator';

test.describe('Authentication & Security Regression Suite', () => {

  test('AUTH-REG-01: Successful customer registration with valid mandatory data @regression @customer', async ({ registerPage }) => {
    await registerPage.open();
    const user = TestDataGenerator.generateUser();
    await registerPage.register(user);
    const msg = await registerPage.getResultMessage();
    expect(msg).toContain('Your registration completed');
  });

  test('AUTH-REG-02: Prevent duplicate registration with existing email @regression', async ({ registerPage }) => {
    await registerPage.open();
    await registerPage.register({
      gender: 'M',
      firstName: 'Existing',
      lastName: 'User',
      email: 'customer@nopqa.local',
      password: 'TestPassword123!'
    });
    const error = await registerPage.getValidationErrors();
    expect(error).toContain('The specified email already exists');
  });

  test('AUTH-REG-03: Mismatched password and confirm password validation @regression', async ({ registerPage }) => {
    await registerPage.open();
    await registerPage.register({
      gender: 'F',
      firstName: 'Mismatch',
      lastName: 'Tester',
      email: TestDataGenerator.generateEmail('mismatch'),
      password: 'Password123!',
      confirmPassword: 'DifferentPassword456!'
    });
    const error = await registerPage.getValidationErrors();
    expect(error).toContain('The password and confirmation password do not match.');
  });

  test('AUTH-REG-04: Password minimum length boundary validation (< 6 chars) @regression', async ({ registerPage }) => {
    await registerPage.open();
    await registerPage.register({
      gender: 'M',
      firstName: 'Short',
      lastName: 'Pass',
      email: TestDataGenerator.generateEmail('short'),
      password: '12345',
      confirmPassword: '12345'
    });
    const error = await registerPage.getValidationErrors();
    expect(error).toContain('The password must have at least 6 characters');
  });

  test('AUTH-REG-05: Login with non-existent email fails gracefully @regression', async ({ loginPage }) => {
    await loginPage.open();
    await loginPage.login('unregistered_ghost_999@test.local', 'SomePassword123!');
    const error = await loginPage.getErrorMessage();
    expect(error).toContain('No customer account found');
  });

  test('AUTH-REG-06: Login with incorrect password fails @regression', async ({ loginPage }) => {
    await loginPage.open();
    await loginPage.login('customer@nopqa.local', 'WrongPassword999!');
    const error = await loginPage.getErrorMessage();
    expect(error).toContain('The credentials provided are incorrect');
  });

  test('AUTH-REG-07: Password recovery request for valid email @regression', async ({ page }) => {
    await page.goto('/passwordrecovery');
    await page.locator('#Email').fill('customer@nopqa.local');
    await page.locator('button.password-recovery-button').click();
    const result = page.locator('p.result');
    await expect(result).toHaveText('Email with instructions has been sent to you.');
  });

});
