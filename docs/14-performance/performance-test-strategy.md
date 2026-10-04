# Performance Test Strategy & Non-Functional SLOs

## 1. Strategy Overview
The Performance Testing Strategy for nopCommerce v4.70 verifies the throughput, responsiveness, scalability, and system resource stability under expected and peak e-commerce traffic conditions.

Testing is executed using **k6** by Grafana Labs (`performance/k6/`), chosen for its developer-friendly JavaScript/TypeScript scripting, minimal memory footprint, and native CI/CD integration.

---

## 2. Service Level Objectives (SLOs) & Non-Functional Requirements

| Metric | Target Threshold | Critical Failure Threshold |
| :--- | :---: | :---: |
| **Catalog Browsing (p95)** | < 300 ms | > 600 ms |
| **Search Queries (p95)** | < 400 ms | > 800 ms |
| **Cart Operations (p95)** | < 350 ms | > 700 ms |
| **Checkout Submission (p95)** | < 500 ms | > 1,200 ms |
| **Overall HTTP Error Rate** | < 0.5% | > 1.0% |
| **System Throughput** | >= 100 RPS | < 50 RPS |
| **CPU Utilization (Web Server)**| < 70% | > 85% |
| **Memory Growth (2h Soak)** | Steady (no leaks) | > 20% Unreclaimed |

---

## 3. Performance Test Profiles & Scenarios

The suite includes four distinct workload models implemented under `performance/k6/`:

### 1. Smoke Performance Test (`smoke-perf.js`)
- **Objective:** Verify scripts execute without errors and establish minimal load baseline.
- **Profile:** 1-5 Virtual Users (VUs) for 1 minute.
- **Gate:** 100% requests succeed with p95 < 200ms.

### 2. Load Test — Catalog & Browsing (`load-test-catalog.js`)
- **Objective:** Simulate typical sustained peak daily shopping activity.
- **Profile:** Ramp up to 50 VUs over 2 minutes, hold at 50 VUs for 5 minutes, ramp down over 1 minute.
- **User Journey:** Homepage -> Category Navigation -> Product Details -> Search.

### 3. Stress Test — Authentication & Checkout (`stress-test-login.js`)
- **Objective:** Identify the application breaking point and test graceful degradation under traffic surges (e.g. Flash Sales, Black Friday).
- **Profile:** Ramp up from 10 to 150 VUs in stages.
- **User Journey:** Customer Login -> Add Item to Cart -> Checkout API Call.

### 4. Soak / Endurance Test (`soak-test-cart.js`)
- **Objective:** Detect memory leaks, unclosed database connection pools, or cache degradation over extended durations.
- **Profile:** Constant 25 VUs sustained over 2 to 4 hours.

---

## 4. Execution Commands

```bash
# Run Smoke Performance Test
k6 run performance/k6/smoke-perf.js

# Run Standard Load Test with HTML Summary Export
k6 run performance/k6/load-test-catalog.js

# Run Stress Test with InfluxDB / Datadog Metrics Streaming
k6 run --out json=reports/k6-metrics.json performance/k6/stress-test-login.js
```

---

## 5. Monitoring & Infrastructure Telemetry
During performance test execution, the following infrastructure layers are actively monitored:
- **Application Process:** Node.js / .NET Core runtime CPU, heap memory, garbage collection pauses.
- **PostgreSQL Database:** Active connections (`pg_stat_activity`), cache hit ratio (`pg_stat_database`), locks, and slow queries.
- **Operating System:** Docker host CPU, memory, network I/O, disk I/O.
