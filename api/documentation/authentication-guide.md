# API AUTHENTICATION & TESTING GUIDE

**Security Standard:** Bearer Token Authentication (JWT Pattern)  
**Target Architecture:** nopCommerce Web API  

---

## 1. Authentication Lifecycle

```
Client (Playwright / Postman)                     API Server
           |                                          |
           |---- 1. POST /api/auth/login ------------>| (Validates credentials)
           |<--- 2. HTTP 200 { token: "jwt..." } -----|
           |                                          |
           |---- 3. GET /api/cart ------------------->|
           |        Header: Authorization: Bearer ... | (Validates token)
           |<--- 4. HTTP 200 { items: [...] } --------|
```

---

## 2. Using Authentication in Playwright APIRequestContext

In Playwright tests, authentication tokens can be passed via the `extraHTTPHeaders` option or injected directly into individual calls:

```typescript
import { test, expect } from '@playwright/test';

test('Authenticated API call example', async ({ request }) => {
  // 1. Obtain token
  const authRes = await request.post('/api/auth/login', {
    data: {
      email: 'customer@nopqa.local',
      password: 'TestPassword123!'
    }
  });
  const { token } = await authRes.json();

  // 2. Reuse token in subsequent API requests
  const cartRes = await request.get('/api/cart', {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  expect(cartRes.status()).toBe(200);
});
```

---

## 3. Postman Pre-Request & Test Scripts

In the Postman collection, the `POST /api/auth/login` request includes a post-response test script that automatically extracts and stores the token into the Postman environment:

```javascript
// Postman Test Script
pm.test("Status code is 200", function () {
    pm.response.to.have.status(200);
});

var json = pm.response.json();
if (json.token) {
    pm.environment.set("AUTH_TOKEN", json.token);
    console.log("AUTH_TOKEN successfully set in environment");
}
```

Subsequent requests in the collection reference `{{AUTH_TOKEN}}` in the Authorization header.
