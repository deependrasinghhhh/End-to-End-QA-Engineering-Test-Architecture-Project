# Performance Test Strategy & Workload Profiles

> **Target Tool:** k6 by Grafana Labs (`performance/k6/`)  
> **Target Environment:** Local staging simulator (`automation/staging-aut/server.js`)  
> **Status:** Performance scripting library for local and staging benchmark evaluations.

---

## 1. Strategy Overview

The performance testing suite provides lightweight load, stress, and soak scripting examples targeting core e-commerce endpoints.

Testing is codified using JavaScript scripts in `performance/k6/` designed to run locally against the staging simulator on port 5001.

---

## 2. Defined Workload Profiles

The scripts model four distinct traffic patterns:

### 1. Smoke Performance (`performance/k6/smoke-perf.js`)
- **Profile:** 5 Virtual Users (VUs) for 10 seconds.
- **Scope:** GET `/`, GET `/api/catalog/products`, GET `/api/catalog/search?q=computer`.
- **Objective:** Quick sanity check of simulator response readiness.

### 2. Catalog Browsing Load (`performance/k6/load-test-catalog.js`)
- **Profile:** Ramp to 10 VUs (5s), hold at 25 VUs (15s), ramp down to 0 VUs (5s).
- **Scope:** Category page navigation (`/computers`, `/desktops`).
- **Objective:** Evaluates response times under moderate concurrent category queries.

### 3. Authentication Stress (`performance/k6/stress-test-login.js`)
- **Profile:** Ramp to 20 VUs (5s), spike to 50 VUs (10s), ramp down to 0 VUs (5s).
- **Scope:** POST `/api/auth/login`.
- **Objective:** Evaluates authentication endpoint throughput under concurrent login spikes.

### 4. Cart Soak / Endurance (`performance/k6/soak-test-cart.js`)
- **Profile:** Ramp to 10 VUs (5s), sustained 10 VUs for 20s, ramp down to 0 VUs (5s).
- **Scope:** POST `/api/cart/items`.
- **Objective:** Validates session and cart addition stability over sustained iterations.

---

## 3. How to Run Scripts

```bash
# Smoke test (5 VUs, 10s)
npm run perf:k6

# Catalog load test
k6 run performance/k6/load-test-catalog.js

# Login stress test
k6 run performance/k6/stress-test-login.js

# Cart soak test
k6 run performance/k6/soak-test-cart.js
```
