# API Automated Test Execution Results & Schema Validation

> **Scope:** Playwright API Integration Suite (`automation/tests/api/api-customer-order.spec.ts`)  
> **Target Host:** Local staging simulator (`http://localhost:5001`)  
> **Schema Validator:** Ajv (JSON Schema Draft-07)  
> **Status:** Automated CI Execution via GitHub Actions

---

## 1. Playwright Automated API Test Suite (8 Tests)

The repository codifies 8 automated API contract and functional tests in `automation/tests/api/api-customer-order.spec.ts`:

| Test ID | Endpoint | Method | Scenario Description & Contract Check | Status in CI |
|:---|:---|:---:|:---|:---:|
| **API-01** | `/api/auth/login` | POST | Valid credentials return token and user object matching `auth.schema.json` | **PASS** |
| **API-02** | `/api/auth/login` | POST | Invalid password returns 401 with `{ success: false, message: 'Invalid credentials' }` | **PASS** |
| **API-03** | `/api/auth/register` | POST | Valid registration returns 201; missing required parameters returns 400 | **PASS** |
| **API-04** | `/api/catalog/products` | GET | Returns product array with non-empty items and positive pricing | **PASS** |
| **API-05** | `/api/catalog/products/:id` | GET | Returns product matching `product.schema.json`; invalid ID returns 404 | **PASS** |
| **API-06** | `/api/cart/items` | CRUD | Full lifecycle: add item (201), fetch cart (200), update quantity (200), delete item (200) | **PASS** |
| **API-07** | `/api/checkout/orders` | POST | Creates order, clears cart, and validates response against `order.schema.json` | **PASS** |
| **API-08** | `/api/admin/orders` | GET | Enforces admin authorization: rejects customer token and missing header with 403 | **PASS** |

---

## 2. JSON Schema Contract Validation Architecture

API tests enforce contract conformity using `Ajv` against versioned JSON schemas in `automation/schemas/`:

```typescript
import Ajv from 'ajv';
import authSchema from '../../schemas/auth.schema.json';
import productSchema from '../../schemas/product.schema.json';
import orderSchema from '../../schemas/order.schema.json';

const ajv = new Ajv({ strict: false });
const validateAuth = ajv.compile(authSchema);
const validateProduct = ajv.compile(productSchema);
const validateOrder = ajv.compile(orderSchema);
```

When API endpoints mutate or respond with unexpected types, schema validation fails immediately in CI before UI regression runs.

---

## 3. Supplementary Postman Asset

The repository also includes a supplementary Postman collection for manual and exploratory testing:
- Collection: `api/postman/nopcommerce-api-collection.json`
- Environment: `api/postman/nopcommerce-local.environment.json`

Can be executed manually via Newman if installed:
```bash
npx newman run api/postman/nopcommerce-api-collection.json -e api/postman/nopcommerce-local.environment.json
```
