# TEST DATA STRATEGY

**Project:** nopCommerce v4.70 Enterprise E-Commerce  
**Document ID:** TDS-NOP-4.70  
**Version:** 1.0.0  
**Security Classification:** Non-Production Sensitive  

---

## 1. Objectives & Principles

Effective QA execution requires predictable, repeatable, and isolated test data. The test data strategy balances two critical requirements:
1. **Deterministic Static Baseline:** Pre-seeded customer accounts, product catalogs, discount codes, and category structures to support rapid smoke tests and performance tests.
2. **Dynamic Synthetic Data:** Timestamped or randomized test records generated on-the-fly (e.g. `user_${Date.now()}@nopqa.local`) for registration, order placement, and address books to guarantee complete parallel test isolation without collision.

---

## 2. Test Data Categories & Repositories

| Category | File Path | Usage & Purpose | Management Strategy |
|:---|:---|:---|:---|
| **Users & Roles** | `automation/test-data/users.json` | Customer (`customer@nopqa.local`), Admin (`admin@nopqa.local`), invalid/edge cases | Static pre-seeded accounts |
| **Catalog & Products** | `automation/test-data/products.json` | Hardware, laptops, configurable attributes, discount codes | Static baseline products |
| **Checkout & Payments** | `automation/test-data/checkout-data.json` | Shipping methods (Ground, Next Day Air), test credit cards | Sandbox test card numbers |
| **Addresses** | `automation/test-data/addresses.json` | Default billing & alternative shipping addresses | Verified valid postal addresses |
| **Database Seed** | `database/test-data/seed-customers.sql` | SQL fixtures for direct PostgreSQL table population | Idempotent INSERT ON CONFLICT DO NOTHING |
| **Dynamic Generator** | `automation/utils/test-data-generator.ts` | Dynamic user creation, randomized emails, unique orders | Runtime synthetic generator |

---

## 3. Data Privacy & Compliance Guardrails

1. **Zero Real PII (Personally Identifiable Information):** Under no circumstances is production customer data restored or copied into testing environments without strict anonymization.
2. **Safe Test Credentials:** All test accounts use simulated domain suffixes (`@nopqa.local`, `@test.com`).
3. **Credit Card Sanitization:** Only standard card simulator numbers (e.g. Visa `4111 1111 1111 1111`) are permitted; all live processor API endpoints are redirected to test mode.
4. **Environment Isolation:** Database credentials are provided via `.env` variables and never committed to Git.
