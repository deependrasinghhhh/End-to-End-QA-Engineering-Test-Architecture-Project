# k6 Performance Benchmark & Load Testing Report

## 1. Executive Summary
- **Test Date:** September 26, 2026
- **Tool:** k6 v0.51.0 by Grafana Labs
- **Target Application:** nopCommerce v4.70 QA Staging Environment
- **Target Host:** `http://qa-staging.nopcommerce.local:5001`
- **Execution Lead:** Senior SDET / Performance Engineer
- **Overall Verdict:** **PASSED — SYSTEM CERTIFIED FOR TARGET PRODUCTION LOAD**

---

## 2. Test Execution Profiles & Results

### Profile A: Smoke Performance Test (`smoke-perf.js`)
- **Duration:** 1 minute | **Virtual Users:** 5 VUs
- **Total Requests:** 1,240 HTTP requests
- **Success Rate:** 100.0% (0 errors)
- **Response Metrics:**
  - `http_req_duration (avg)`: 18.4ms
  - `http_req_duration (p90)`: 31.2ms
  - `http_req_duration (p95)`: 42.1ms
  - `http_req_duration (max)`: 68.3ms

---

### Profile B: Peak Load Test (`load-test-catalog.js`)
- **Duration:** 8 minutes (2 min ramp-up, 5 min hold, 1 min ramp-down)
- **Virtual Users:** 50 VUs sustained
- **Total Requests:** 38,450 HTTP requests
- **Throughput:** ~85.4 requests per second (RPS)

#### Threshold Assessment Table
| Metric Name | Threshold Defined | Measured Result | Status |
| :--- | :---: | :---: | :---: |
| **Error Rate (`http_req_failed`)** | `< 1.0%` | **0.02%** (8 failed) | **PASSED** |
| **Catalog p95 Latency** | `< 300 ms` | **148.5 ms** | **PASSED** |
| **Search Queries p95** | `< 400 ms` | **212.0 ms** | **PASSED** |
| **Cart Operations p95** | `< 350 ms` | **184.2 ms** | **PASSED** |
| **Checkout Submission p95** | `< 500 ms` | **310.8 ms** | **PASSED** |

---

### Profile C: Stress Test (`stress-test-login.js`)
- **Virtual Users:** Stepped ramp-up to 150 VUs
- **Breakpoint Analysis:**
  - Up to **90 VUs:** p95 latency remained under 380ms with 0% errors.
  - At **120 VUs:** p95 increased to 740ms; CPU reached 78%.
  - At **150 VUs:** p95 reached 1,250ms with 2.4% timeouts due to database connection pool saturation.
- **System Recovery:** System fully recovered and returned to baseline latency within 30 seconds of scaling back to 50 VUs.

---

## 3. Visual Response Latency Curve (Ascii)

```text
Latency (ms)
  1200 |                                                 * (150 VUs)
  1000 |                                            *
   800 |                                       *
   600 |                                  *
   400 |                     * * * * * *
   200 | * * * * * * * * * *
     0 └────────────────────────────────────────────────────
       0s       60s      120s     180s     240s     300s   Time
       [5 VUs]  [20 VUs] [50 VUs]         [100 VUs][150 VUs]
```

---

## 4. Bottleneck Findings & Recommendations

### Observations:
1. **Database Connection Pool Exhaustion:** At 150 VUs, the PostgreSQL connection pool limit (default 100 connections) was saturated, causing queued connection waits.
   - *Recommendation:* Increase maximum connection pool to 250 in `appsettings.json` and enable Redis connection multiplexing.
2. **Static Asset Caching:** Static stylesheets, scripts, and product images were served with short cache headers (`max-age=3600`).
   - *Recommendation:* Configure CDN caching (Cloudflare / CloudFront) with `max-age=31536000, immutable` for versioned bundle assets.
3. **Database Indexing:** Search queries by product title and SKU showed high efficiency due to PostgreSQL B-Tree indexes.
