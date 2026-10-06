import { defineConfig, devices } from '@playwright/test';
import * as dotenv from 'dotenv';
import * as path from 'path';

// Load environment variables from .env
dotenv.config({ path: path.resolve(__dirname, '.env') });

// Allow Firefox and WebKit on Windows without strict host DLL validation
process.env.PLAYWRIGHT_SKIP_VALIDATE_HOST_REQUIREMENTS = 'true';

const BASE_URL = process.env.BASE_URL || 'http://localhost:5001';

export default defineConfig({
  testDir: '.',
  testMatch: [
    'automation/tests/**/*.spec.ts',
    'accessibility/tests/**/*.spec.ts'
  ],
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : (parseInt(process.env.RETRIES || '1')),
  workers: 1,
  timeout: parseInt(process.env.DEFAULT_TIMEOUT || '30000'),
  expect: {
    timeout: parseInt(process.env.EXPECT_TIMEOUT || '10000')
  },
  
  reporter: [
    ['list'],
    ['html', { outputFolder: 'reports/playwright-html', open: 'never' }],
    ['junit', { outputFile: 'reports/junit.xml' }],
    ['allure-playwright', { outputFolder: 'allure-results' }]
  ],

  use: {
    baseURL: BASE_URL,
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    actionTimeout: parseInt(process.env.ACTION_TIMEOUT || '15000'),
    navigationTimeout: 30000,
    headless: process.env.HEADLESS !== 'false',
    launchOptions: {
      slowMo: process.env.SLOWMO ? parseInt(process.env.SLOWMO, 10) : 0
    }
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] }
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] }
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] }
    },
    {
      name: 'Mobile Chrome',
      use: { ...devices['Pixel 7'] }
    },
    {
      name: 'msedge',
      use: { ...devices['Desktop Edge'], channel: 'msedge' }
    },
    {
      name: 'chrome',
      use: { ...devices['Desktop Chrome'], channel: 'chrome' }
    }
  ],

  // Automatically spin up the local staging AUT if not already running on port 5001
  webServer: {
    command: 'node automation/staging-aut/server.js',
    url: 'http://localhost:5001',
    reuseExistingServer: true,
    timeout: 120000,
    env: {
      ALLOW_TEST_RESET: 'true'
    }
  }
});
