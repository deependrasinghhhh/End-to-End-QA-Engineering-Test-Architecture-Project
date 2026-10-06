import * as dotenv from 'dotenv';
import * as path from 'path';

// Ensure .env is loaded
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

export const ENV = {
  BASE_URL: process.env.BASE_URL || 'http://localhost:5001',
  CI: process.env.CI === 'true',
  HEADLESS: process.env.HEADLESS !== 'false',
  DEFAULT_TIMEOUT: parseInt(process.env.DEFAULT_TIMEOUT || '30000', 10),
  EXPECT_TIMEOUT: parseInt(process.env.EXPECT_TIMEOUT || '10000', 10),
  ACTION_TIMEOUT: parseInt(process.env.ACTION_TIMEOUT || '15000', 10),
  RETRIES: process.env.CI ? 2 : parseInt(process.env.RETRIES || '1', 10),
  ADMIN_USER: {
    email: process.env.QA_ADMIN_EMAIL || process.env.ADMIN_EMAIL || 'admin@nopqa.local',
    password: process.env.QA_ADMIN_PASSWORD || process.env.ADMIN_PASSWORD || 'AdminPassword123!'
  },
  DEFAULT_CUSTOMER: {
    email: process.env.QA_CUSTOMER_EMAIL || process.env.CUSTOMER_EMAIL || 'customer@nopqa.local',
    password: process.env.QA_CUSTOMER_PASSWORD || process.env.CUSTOMER_PASSWORD || 'TestPassword123!'
  }
};
