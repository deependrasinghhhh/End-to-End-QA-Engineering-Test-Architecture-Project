# Example k6 Performance Benchmark Execution Template

> **Document Type:** Benchmark Results Template  
> **Target Environment:** Local staging simulator (`automation/staging-aut/server.js`)  
> **Status:** Template / Reference Benchmark Schema. A local benchmark run does **not** constitute production-capacity certification.

---

## 1. Execution Metadata Template

When executing a performance run with k6, populate the following execution metadata:

| Field | Required Value / Description | Example Value |
|:---|:---|:---|
| **Command Used** | Exact CLI command executed | `k6 run performance/k6/smoke-perf.js --summary-export=reports/k6-summary.json` |
| **Commit SHA** | Git commit tested | `a1b2c3d` |
| **Target Environment** | Host URL and hardware profile | `http://localhost:5001` (Node.js staging simulator) |
| **k6 Version** | Version of k6 runner | `k6 v0.51.0` |
| **Execution Timestamp** | ISO UTC Date and Time | `2026-10-06T15:30:00Z` |
| **Raw Summary Artifact** | Link or path to raw k6 summary JSON | `reports/k6-summary.json` |

---

## 2. Workload Profiles Defined in Repository

The performance test scripts in `performance/k6/` are configured with the following actual parameters:

| Profile Script | Workload Configuration | Target Endpoint(s) | Defined Threshold |
|:---|:---|:---|:---|
| **`smoke-perf.js`** | 5 VUs for 10 seconds | Storefront homepage, products API, search API | `http_req_duration: p(95)<500ms`, `rate<0.01` |
| **`load-test-catalog.js`** | Stages: 10 VUs (5s) -> peaks at 25 VUs (15s) -> 0 VUs (5s) | Category catalog browsing | `http_req_duration: p(95)<450ms`, `rate<0.005` |
| **`stress-test-login.js`** | Stages: 20 VUs (5s) -> peaks at 50 VUs (10s) -> 0 VUs (5s) | POST `/api/auth/login` | `http_req_duration: p(95)<600ms`, `rate<0.01` |
| **`soak-test-cart.js`** | Stages: 10 VUs (5s) -> sustained 10 VUs for 20s -> 0 VUs (5s) | POST `/api/cart/items` | `http_req_duration: p(95)<400ms`, `rate<0.005` |

---

## 3. Results Recording Template Table

Populate this section with observed values from `summary.json` after running a test:

```text
================================================================================
EXECUTION SUMMARY TEMPLATE
================================================================================
Script Executed:       performance/k6/[script-name].js
VUs Max:               [N]
Total Duration:        [N]s
Total Requests:        [N]
Throughput:            [N] req/s
HTTP Failure Rate:     [N]%

Latency Metrics:
  - Avg:               [N] ms
  - p90:               [N] ms
  - p95:               [N] ms
  - Max:               [N] ms

Threshold Status:
  - http_req_duration: [PASS / FAIL]
  - http_req_failed:   [PASS / FAIL]
================================================================================
```

---

## 4. Engineering Notice

> [!NOTE]
> Metrics gathered against the local Node.js simulator measure local script sanity and simulator endpoint latency. They do not represent or certify upstream nopCommerce or production infrastructure capacity.
