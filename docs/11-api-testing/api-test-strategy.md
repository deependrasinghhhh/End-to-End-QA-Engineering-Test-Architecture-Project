# API Test Strategy & Automation Architecture

## 1. Strategy Overview
The API Testing Strategy for nopCommerce v4.70 verifies the contract integrity, functional correctness, authentication security, and latency resilience of the underlying backend REST and JSON services.

Testing is bifurcated into two mutually reinforcing layers:
1. **Automated CI/CD Execution:** Driven by Playwright `APIRequestContext` in TypeScript (`automation/api/`), integrated directly into the test suite and CI pipelines.
2. **Manual & Exploratory Investigation:** Governed by a structured Postman Collection (`api/postman/nopcommerce-api-collection.json`) with environment configurations for local staging, QA, and pre-production.

---

## 2. Testing Pyramid & API Boundary

```text
       /  UI End-to-End  \      (50 Automated UI Specs)
      /-------------------\
     /   API Test Layer    \    (25 Playwright API Tests + Postman)
    /-----------------------\
   /   Unit & Contract Tests \  (Backend Service Layer)
  /---------------------------\
```

### Why API Testing is Prioritized
- **Speed:** API tests execute in ~1.8 seconds vs 24 seconds for full browser UI tests.
- **Root-Cause Isolation:** Bypasses UI rendering flaws, immediately identifying whether failures originate in business logic or presentation.
- **Contract Verification:** Guarantees that frontend, mobile, and third-party consumers receive predictable JSON schemas.

---

## 3. Scope of API Verification

| Module / Domain | Base Endpoint | Key Operations |
| :--- | :--- | :--- |
| **Authentication & Tokens** | `/api/auth` | Login, token issuance, credential validation, logout |
| **Product Catalog** | `/api/catalog` | Product listing, category trees, product details, search |
| **Cart & Session** | `/api/cart` | Add item, get cart, update quantity, remove item, clear cart |
| **Checkout & Fulfillment**| `/api/checkout` | Process checkout, payment method validation, shipping rates |
| **Orders & History** | `/api/orders` | Customer order history, order lookup by ID |
| **Admin Operations** | `/api/admin` | Product creation, stock updates, order status lifecycle |

---

## 4. Test Types & Assertions Framework

Every API test adheres to the following assertions checklist:

1. **HTTP Status Codes:**
   - 200 OK for successful retrieval/update
   - 201 Created for resource generation
   - 400 Bad Request for malformed payloads / business validation failures
   - 401 Unauthorized for missing / invalid Bearer tokens
   - 403 Forbidden for insufficient permissions (e.g. non-admin accessing admin API)
   - 404 Not Found for non-existent resources
2. **Response Headers:**
   - `Content-Type: application/json; charset=utf-8`
   - Cache control and security headers (CORS, HSTS)
3. **JSON Schema Compliance:**
   - Data types (string, integer, boolean, array)
   - Mandatory vs. optional properties
4. **Data Consistency & Round-Trip:**
   - Create resource via API -> Retrieve via API -> Verify DB row directly
5. **Boundary & Negative Cases:**
   - Negative quantities, SQL injection strings, oversized strings, null values
6. **Performance & Latency:**
   - Single request response time SLA: < 250ms under normal load

---

## 5. Playwright API Client Implementation (`automation/api/`)

The framework encapsulates API operations in strongly typed TypeScript classes:

```typescript
// Example: Cart API Client
export class CartApiClient {
  constructor(private request: APIRequestContext) {}

  async getCart(): Promise<APIResponse> {
    return this.request.get('/api/cart');
  }

  async addItem(productId: number, quantity: number, customerEmail?: string): Promise<APIResponse> {
    return this.request.post('/api/cart/items', {
      data: { productId, quantity, customerEmail }
    });
  }
}
```

---

## 6. Postman Collection Architecture

The Postman suite (`api/postman/nopcommerce-api-collection.json`) includes:
- **Pre-request Scripts:** Dynamic timestamp and UUID generation, test email creation.
- **Tests Scripts:** Automated assertions on status code, response time (< 500ms), and schema matching.
- **Collection Runner / Newman:** Can be executed via CLI:
  ```bash
  npx newman run api/postman/nopcommerce-api-collection.json -e api/postman/nopcommerce-local.environment.json
  ```
