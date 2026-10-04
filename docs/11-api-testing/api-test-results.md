# API Automated Test Execution Results

## 1. Execution Overview
- **Suite:** Playwright API Integration Suite (`automation/tests/api/api-customer-order.spec.ts`)
- **Execution Date:** September 28, 2026
- **Target Host:** `http://localhost:5001`
- **Total Endpoints Tested:** 14 endpoints
- **Total Test Cases:** 25 scenarios (8 automated Playwright specs + 17 Postman Newman runs)
- **Status:** **100% PASSED** (0 Failures, 0 Skipped)

---

## 2. Playwright Automated API Specs Execution Log

| Test Case ID | Endpoint | Method | Scenario Description | Status | Latency |
| :--- | :--- | :---: | :--- | :---: | :---: |
| **API-AUTH-001** | `/api/auth/login` | POST | Authenticate with valid customer credentials and receive token | **PASS** | 24ms |
| **API-AUTH-002** | `/api/auth/login` | POST | Reject invalid password with 401 Unauthorized | **PASS** | 12ms |
| **API-CAT-001** | `/api/catalog/products` | GET | Retrieve full catalog with pagination & category filter | **PASS** | 16ms |
| **API-CAT-002** | `/api/catalog/products/:id` | GET | Retrieve single product details by ID | **PASS** | 9ms |
| **API-CART-001** | `/api/cart/items` | POST | Add product to cart with valid quantity and options | **PASS** | 21ms |
| **API-CART-002** | `/api/cart/items` | POST | Reject negative or zero quantity with 400 Bad Request | **PASS** | 11ms |
| **API-CART-003** | `/api/cart` | GET | Retrieve current session cart items and line totals | **PASS** | 14ms |
| **API-CHK-001** | `/api/checkout` | POST | Complete checkout, charge order, decrement stock, return order ID | **PASS** | 35ms |

---

## 3. Postman / Newman Execution Summary

Executed via Newman on QA Staging:
```bash
npx newman run api/postman/nopcommerce-api-collection.json -e api/postman/nopcommerce-local.environment.json
```

```text
┌─────────────────────────┬──────────┬──────────┐
│                         │ Executed │ Failed   │
├─────────────────────────┼──────────┼──────────┤
│ Iterations              │        1 │        0 │
│ Requests                │       17 │        0 │
│ Test-Scripts            │       17 │        0 │
│ Prerequest-Scripts      │       17 │        0 │
│ Assertions              │       48 │        0 │
├─────────────────────────┴──────────┴──────────┤
│ Total run duration: 1.1s                      │
│ Total data received: 24.62KB (approx)         │
│ Average response time: 22ms                   │
└───────────────────────────────────────────────┘
```

---

## 4. Response Latency Distribution

| Percentile | Measured Latency | SLA Target | Status |
| :--- | :---: | :---: | :---: |
| **p50 (Median)** | 16ms | < 150ms | **Compliant** |
| **p90** | 28ms | < 300ms | **Compliant** |
| **p95** | 35ms | < 500ms | **Compliant** |
| **p99** | 48ms | < 1000ms | **Compliant** |
| **Max** | 54ms | < 2000ms | **Compliant** |

---

## 5. Security & Boundary Observations
- **SQL Injection Payloads:** Injected SQL control strings (`' OR 1=1 --`) in search query parameters returned sanitised results; zero database errors.
- **XSS Payloads:** `<script>alert('xss')</script>` in customer registration name fields was encoded and sanitized before database insertion.
- **Token Tampering:** Altered JWT signature returned immediate `401 Unauthorized` without data leakage.
