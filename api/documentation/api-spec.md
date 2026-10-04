# REST API SPECIFICATION: nopCommerce v4.70

**Specification Version:** OpenAPI 3.0.3 Compatible  
**Base URL:** `http://localhost:5001/api`  
**Authentication Scheme:** Bearer Token (JWT)  
**Content-Type:** `application/json`  

---

## 1. Authentication Endpoints

### 1.1 POST `/api/auth/login`
- **Description:** Authenticates customer or admin credentials and generates a bearer token.
- **Request Body:**
  ```json
  {
    "email": "customer@nopqa.local",
    "password": "TestPassword123!"
  }
  ```
- **Responses:**
  - `200 OK`:
    ```json
    {
      "success": true,
      "token": "jwt-mock-token-1-1728080000000",
      "user": {
        "id": 1,
        "email": "customer@nopqa.local",
        "firstName": "Alex",
        "lastName": "Mercer",
        "roles": ["Registered"]
      }
    }
    ```
  - `401 Unauthorized`:
    ```json
    {
      "success": false,
      "message": "Invalid credentials"
    }
    ```

### 1.2 POST `/api/auth/register`
- **Description:** Creates a new customer account.
- **Request Body:**
  ```json
  {
    "firstName": "Alex",
    "lastName": "Mercer",
    "email": "alex.new@nopqa.local",
    "password": "TestPassword123!"
  }
  ```
- **Responses:**
  - `201 Created`:
    ```json
    {
      "success": true,
      "customerId": 3,
      "token": "jwt-mock-token-3"
    }
    ```
  - `409 Conflict`:
    ```json
    {
      "success": false,
      "message": "The specified email already exists"
    }
    ```

---

## 2. Product Catalog Endpoints

### 2.1 GET `/api/catalog/products`
- **Description:** Returns the list of all published catalog products.
- **Response:** `200 OK` (Array of product objects).

### 2.2 GET `/api/catalog/products/:id`
- **Description:** Returns detailed specifications for a single product.
- **Responses:**
  - `200 OK`: Product JSON object with `id`, `name`, `sku`, `price`, `stockQuantity`.
  - `404 Not Found`: `{"error": "Product not found"}`.

### 2.3 GET `/api/catalog/search?q={query}`
- **Description:** Searches catalog by keyword in title and short description.
- **Query Parameter:** `q` (string, required).
- **Response:** `200 OK` (Matching products array).

---

## 3. Shopping Cart Endpoints

### 3.1 GET `/api/cart`
- **Description:** Retrieves the active shopping cart items, calculated subtotal, and tax.
- **Response:** `200 OK` (`items`, `subtotal`, `tax`, `total`).

### 3.2 POST `/api/cart/items`
- **Description:** Adds an item to the shopping cart.
- **Request Body:** `{"productId": 1, "quantity": 2}`
- **Response:** `201 Created`.

### 3.3 PUT `/api/cart/items/:id`
- **Description:** Modifies quantity of an existing cart item.
- **Request Body:** `{"quantity": 5}`
- **Response:** `200 OK`.

### 3.4 DELETE `/api/cart/items/:id`
- **Description:** Deletes a line item from the shopping cart.
- **Response:** `200 OK` or `204 No Content`.

---

## 4. Checkout & Orders Endpoints

### 4.1 POST `/api/checkout/orders`
- **Description:** Finalizes the active cart into a confirmed order.
- **Request Body:** `{"shippingMethod": "Ground", "paymentMethod": "Check / Money Order"}`
- **Response:** `201 Created` (`id`, `orderNumber`, `status: "Pending"`).

### 4.2 GET `/api/orders/:id`
- **Description:** Retrieves detailed line items and shipping breakdown for an order.
- **Response:** `200 OK`.

### 4.3 GET `/api/admin/orders`
- **Description:** Backoffice administrative orders audit list (Requires Admin Bearer Token).
- **Headers:** `Authorization: Bearer <admin-token>`
- **Responses:**
  - `200 OK`: Array of all system orders.
  - `403 Forbidden`: `{"error": "Forbidden: Admin access required"}`.
