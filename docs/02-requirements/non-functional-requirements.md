# NON-FUNCTIONAL REQUIREMENTS (NFR)

**Project:** nopCommerce v4.70 Quality Engineering Specification  
**Document ID:** NFR-NOP-4.70  
**Version:** 1.0.0  
**Status:** Approved  

---

## 1. Performance & Scalability (PERF)

| Requirement ID | Area | Criteria / SLA | Verification Tool |
|:---|:---|:---|:---:|
| **NFR-PERF-001** | Page Load Time | Under normal load (10-25 concurrent users), 95% of storefront pages must render DOM in $\le 1.2$ seconds. | k6 / DevTools |
| **NFR-PERF-002** | API Response SLA | Critical business APIs (`/api/cart`, `/api/checkout`, `/api/auth`) must respond with p95 latency $\le 450$ ms. | k6 Load Test |
| **NFR-PERF-003** | Concurrency Throughput | The system must handle up to 50 Virtual Users (VU) browsing simultaneously without HTTP 5xx errors ($< 0.1\%$ error rate). | k6 Stress Test |
| **NFR-PERF-004** | Database Query Latency | Core relational joins (Order + OrderItems + Customer) must execute in $\le 80$ ms in PostgreSQL. | PostgreSQL `EXPLAIN ANALYZE` |

---

## 2. Accessibility & Universal Usability (A11Y)

| Requirement ID | Area | Criteria / SLA | Verification Tool |
|:---|:---|:---|:---:|
| **NFR-A11Y-001** | WCAG 2.1 Level AA | Zero critical or serious accessibility violations on Homepage, Login, Catalog, Cart, and Checkout pages. | `@axe-core/playwright` |
| **NFR-A11Y-002** | Keyboard Navigation | All interactive components (menus, cart quantity, modals, checkout accordions) must be accessible via `Tab` / `Enter` / `Esc`. | Playwright Keyboard API |
| **NFR-A11Y-003** | Form Accessibility | All form inputs (Registration, Checkout billing/shipping, Payment CC) must have explicit `<label>` or `aria-label`. | axe-core rule `label` |
| **NFR-A11Y-004** | Color Contrast | Text and interactive elements must satisfy minimum color contrast ratio of 4.5:1 for normal text and 3:1 for large text. | axe-core rule `color-contrast` |

---

## 3. Cross-Browser & Cross-Device Compatibility (COMPAT)

| Requirement ID | Browser / Device | Target Viewport | Rendering Engine |
|:---|:---|:---|:---|
| **NFR-CMP-001** | Google Chrome / Chromium | 1920x1080 (Desktop) | Blink |
| **NFR-CMP-002** | Mozilla Firefox | 1920x1080 (Desktop) | Gecko |
| **NFR-CMP-003** | Apple Safari / WebKit | 1920x1080 (Desktop) | WebKit |
| **NFR-CMP-004** | Mobile Browser (Emulated) | 390x844 (iPhone 13 / Pixel 7) | Mobile WebKit / Chromium |

---

## 4. Security & Compliance (SEC)

| Requirement ID | Area | Specification |
|:---|:---|:---|
| **NFR-SEC-001** | Password Storage | Passwords must be hashed using salt + PBKDF2/SHA-512 before storage in PostgreSQL `Customer` table. |
| **NFR-SEC-002** | Session Security | Auth cookies must enforce `HttpOnly`, `SameSite=Lax`, and `Secure` flags. |
| **NFR-SEC-003** | Sensitive Data Masking | Credit card numbers must never be logged or stored in plain text; CVV must not be retained in database. |
| **NFR-SEC-004** | Input Sanitization | All input fields must be protected against SQL Injection (parameterized queries) and Cross-Site Scripting (XSS). |
