import { test, expect } from '@playwright/test';
import { AuthApi } from '../../api/auth.api';
import { ProductApi } from '../../api/product.api';
import { CartApi } from '../../api/cart.api';
import { OrderApi } from '../../api/order.api';
import { TestDataGenerator } from '../../utils/test-data-generator';

test.describe('API Contract & Functional Validation Suite @api', () => {

  test('API-01: POST /api/auth/login with valid credentials returns 200 and token', async ({ request }) => {
    const authApi = new AuthApi(request);
    const response = await authApi.login({
      email: 'customer@nopqa.local',
      password: 'TestPassword123!'
    });

    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body.success).toBe(true);
    expect(body.token).toBeTruthy();
    expect(body.user.email).toBe('customer@nopqa.local');
  });

  test('API-02: POST /api/auth/login with invalid password returns 401 Unauthorized', async ({ request }) => {
    const authApi = new AuthApi(request);
    const response = await authApi.login({
      email: 'customer@nopqa.local',
      password: 'WrongPassword999!'
    });

    expect(response.status()).toBe(401);
    const body = await response.json();
    expect(body.success).toBe(false);
    expect(body.message).toBe('Invalid credentials');
  });

  test('API-03: POST /api/auth/register creates new customer account', async ({ request }) => {
    const authApi = new AuthApi(request);
    const email = TestDataGenerator.generateEmail('api_customer');
    const response = await authApi.register({
      firstName: 'API',
      lastName: 'Tester',
      email: email,
      password: 'TestPassword123!'
    });

    expect(response.status()).toBe(201);
    const body = await response.json();
    expect(body.success).toBe(true);
    expect(body.customerId).toBeTruthy();
  });

  test('API-04: GET /api/catalog/products returns product array', async ({ request }) => {
    const productApi = new ProductApi(request);
    const response = await productApi.getAllProducts();

    expect(response.status()).toBe(200);
    const products = await response.json();
    expect(Array.isArray(products)).toBe(true);
    expect(products.length).toBeGreaterThanOrEqual(1);
    expect(products[0]).toHaveProperty('id');
    expect(products[0]).toHaveProperty('price');
  });

  test('API-05: GET /api/catalog/products/:id returns specific product', async ({ request }) => {
    const productApi = new ProductApi(request);
    const response = await productApi.getProductById(1);

    expect(response.status()).toBe(200);
    const product = await response.json();
    expect(product.id).toBe(1);
    expect(product.name).toBe('Build your own computer');
  });

  test('API-06: Shopping Cart Endpoints (POST / PUT / GET / DELETE)', async ({ request }) => {
    const cartApi = new CartApi(request);

    // 1. Add item
    const addRes = await cartApi.addItem(1, 2);
    expect(addRes.status()).toBe(201);
    const addedItem = await addRes.json();
    expect(addedItem.productId).toBe(1);

    // 2. Get Cart
    const getRes = await cartApi.getCart();
    expect(getRes.status()).toBe(200);
    const cart = await getRes.json();
    expect(cart.items.length).toBeGreaterThanOrEqual(1);

    // 3. Update quantity
    const updateRes = await cartApi.updateItemQuantity(addedItem.id, 5);
    expect(updateRes.status()).toBe(200);
    const updated = await updateRes.json();
    expect(updated.quantity).toBe(5);

    // 4. Delete item
    const delRes = await cartApi.deleteItem(addedItem.id);
    expect(delRes.status()).toBe(200);
  });

  test('API-07: POST /api/checkout/orders places order and returns order details', async ({ request }) => {
    const orderApi = new OrderApi(request);
    const response = await orderApi.createOrder({
      shippingMethod: 'Ground',
      paymentMethod: 'Check / Money Order'
    });

    expect(response.status()).toBe(201);
    const order = await response.json();
    expect(order.id).toBeTruthy();
    expect(order.orderNumber).toMatch(/ORD-\d+/);
    expect(order.status).toBe('Pending');
  });

  test('API-08: GET /api/admin/orders without admin authorization returns 403 Forbidden', async ({ request }) => {
    const orderApi = new OrderApi(request);
    const response = await orderApi.getAdminOrders('standard-customer-token');
    expect(response.status()).toBe(403);
    const body = await response.json();
    expect(body.error).toContain('Forbidden');
  });

});
