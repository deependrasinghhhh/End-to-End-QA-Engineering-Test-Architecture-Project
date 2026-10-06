import { test, expect } from '../../fixtures/test.fixture';
import { AuthApi } from '../../api/auth.api';
import { ProductApi } from '../../api/product.api';
import { CartApi } from '../../api/cart.api';
import { OrderApi } from '../../api/order.api';
import { TestDataGenerator } from '../../utils/test-data-generator';
import Ajv from 'ajv';
import authSchema from '../../schemas/auth.schema.json';
import productSchema from '../../schemas/product.schema.json';
import orderSchema from '../../schemas/order.schema.json';

const ajv = new Ajv({ strict: false });
ajv.addFormat('email', () => true);
const validateAuth = ajv.compile(authSchema);
const validateProduct = ajv.compile(productSchema);
const validateOrder = ajv.compile(orderSchema);

test.describe('API Contract & Functional Validation Suite @api', () => {

  test('API-01: [Simulator Contract] POST /api/auth/login validates schema and returns token', async ({ request }) => {
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

    // JSON Schema contract validation via Ajv
    const isValidSchema = validateAuth(body);
    expect(isValidSchema).toBe(true);
  });

  test('API-02: [Simulator Contract] POST /api/auth/login negative validation with invalid password', async ({ request }) => {
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

  test('API-03: [Simulator Contract] POST /api/auth/register creates account and validates required parameters', async ({ request }) => {
    const authApi = new AuthApi(request);
    const email = TestDataGenerator.generateEmail('api_customer');
    
    // 1. Valid registration
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

    // 2. Negative validation: missing required fields
    const invalidRes = await request.post('/api/auth/register', {
      data: { email: 'incomplete@nopqa.local' }
    });
    expect(invalidRes.status()).toBe(400);
    const invalidBody = await invalidRes.json();
    expect(invalidBody.message).toContain('Missing required');
  });

  test('API-04: [Simulator Contract] GET /api/catalog/products returns product array with valid pricing', async ({ request }) => {
    const productApi = new ProductApi(request);
    const response = await productApi.getAllProducts();

    expect(response.status()).toBe(200);
    const products = await response.json();
    expect(Array.isArray(products)).toBe(true);
    expect(products.length).toBeGreaterThanOrEqual(1);
    expect(products[0]).toHaveProperty('id');
    expect(products[0].price).toBeGreaterThan(0);
  });

  test('API-05: [Simulator Contract] GET /api/catalog/products/:id validates schema and handles invalid ID', async ({ request }) => {
    const productApi = new ProductApi(request);

    // 1. Valid product schema validation
    const response = await productApi.getProductById(1);
    expect(response.status()).toBe(200);
    const product = await response.json();
    expect(product.id).toBe(1);
    expect(product.name).toBe('Build your own computer');

    const isValidSchema = validateProduct(product);
    expect(isValidSchema).toBe(true);

    // 2. Negative validation: non-existent product ID
    const notFoundRes = await productApi.getProductById(9999);
    expect(notFoundRes.status()).toBe(404);
    const errBody = await notFoundRes.json();
    expect(errBody.error).toBe('Product not found');
  });

  test('API-06: [Simulator Contract] Shopping Cart Endpoints (POST / PUT / GET / DELETE)', async ({ request }) => {
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

  test('API-07: [Simulator Contract] POST /api/checkout/orders places order and validates schema', async ({ request }) => {
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
    expect(order.total).toBeGreaterThan(0);

    // JSON Schema contract validation via Ajv
    const isValidSchema = validateOrder(order);
    expect(isValidSchema).toBe(true);
  });

  test('API-08: [Simulator Contract] GET /api/admin/orders enforces authorization and rejects unauthenticated/unauthorized access', async ({ request }) => {
    const orderApi = new OrderApi(request);

    // 1. Unauthorized request with customer token
    const customerResponse = await orderApi.getAdminOrders('standard-customer-token');
    expect(customerResponse.status()).toBe(403);
    const body = await customerResponse.json();
    expect(body.error).toContain('Forbidden');

    // 2. Unauthorized request without header
    const noHeaderRes = await request.get('/api/admin/orders');
    expect(noHeaderRes.status()).toBe(403);
  });

});
