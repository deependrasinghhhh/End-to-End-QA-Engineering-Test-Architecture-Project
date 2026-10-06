import { test as baseTest, expect } from '@playwright/test';
import { HomePage } from '../pages/home.page';
import { LoginPage } from '../pages/login.page';
import { RegisterPage } from '../pages/register.page';
import { CategoryPage } from '../pages/category.page';
import { ProductDetailsPage } from '../pages/product-details.page';
import { CartPage } from '../pages/cart.page';
import { CheckoutPage } from '../pages/checkout.page';
import { CustomerInfoPage } from '../pages/customer-info.page';
import { OrderHistoryPage } from '../pages/order-history.page';
import { WishlistPage } from '../pages/wishlist.page';
import { AdminLoginPage } from '../pages/admin/admin-login.page';
import { AdminDashboardPage } from '../pages/admin/admin-dashboard.page';
import { AdminProductsPage } from '../pages/admin/admin-products.page';
import { AdminOrdersPage } from '../pages/admin/admin-orders.page';

type NopCommerceFixtures = {
  resetSimulatorState: void;
  homePage: HomePage;
  loginPage: LoginPage;
  registerPage: RegisterPage;
  categoryPage: CategoryPage;
  productDetailsPage: ProductDetailsPage;
  cartPage: CartPage;
  checkoutPage: CheckoutPage;
  customerInfoPage: CustomerInfoPage;
  orderHistoryPage: OrderHistoryPage;
  wishlistPage: WishlistPage;
  adminLoginPage: AdminLoginPage;
  adminDashboardPage: AdminDashboardPage;
  adminProductsPage: AdminProductsPage;
  adminOrdersPage: AdminOrdersPage;
};

export const test = baseTest.extend<NopCommerceFixtures>({
  resetSimulatorState: [async ({ request, baseURL }, use) => {
    try {
      const targetUrl = baseURL || 'http://localhost:5001';
      await request.post(`${targetUrl}/api/test/reset`);
    } catch {
      // Graceful fallback if reset endpoint is not reachable/disabled
    }
    await use();
  }, { auto: true }],
  homePage: async ({ page }, use) => {
    await use(new HomePage(page));
  },
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  registerPage: async ({ page }, use) => {
    await use(new RegisterPage(page));
  },
  categoryPage: async ({ page }, use) => {
    await use(new CategoryPage(page));
  },
  productDetailsPage: async ({ page }, use) => {
    await use(new ProductDetailsPage(page));
  },
  cartPage: async ({ page }, use) => {
    await use(new CartPage(page));
  },
  checkoutPage: async ({ page }, use) => {
    await use(new CheckoutPage(page));
  },
  customerInfoPage: async ({ page }, use) => {
    await use(new CustomerInfoPage(page));
  },
  orderHistoryPage: async ({ page }, use) => {
    await use(new OrderHistoryPage(page));
  },
  wishlistPage: async ({ page }, use) => {
    await use(new WishlistPage(page));
  },
  adminLoginPage: async ({ page }, use) => {
    await use(new AdminLoginPage(page));
  },
  adminDashboardPage: async ({ page }, use) => {
    await use(new AdminDashboardPage(page));
  },
  adminProductsPage: async ({ page }, use) => {
    await use(new AdminProductsPage(page));
  },
  adminOrdersPage: async ({ page }, use) => {
    await use(new AdminOrdersPage(page));
  }
});

export { expect };
