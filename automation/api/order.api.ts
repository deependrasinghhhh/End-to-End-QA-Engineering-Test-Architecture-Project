import { APIRequestContext, APIResponse } from '@playwright/test';

export class OrderApi {
  readonly request: APIRequestContext;

  constructor(request: APIRequestContext) {
    this.request = request;
  }

  async createOrder(payload?: any): Promise<APIResponse> {
    return await this.request.post('/api/checkout/orders', {
      data: payload || {}
    });
  }

  async getOrderById(id: number): Promise<APIResponse> {
    return await this.request.get(`/api/orders/${id}`);
  }

  async getAdminOrders(adminToken?: string): Promise<APIResponse> {
    const headers = adminToken ? { Authorization: `Bearer ${adminToken}` } : {};
    return await this.request.get('/api/admin/orders', { headers });
  }

  async updateOrderStatus(id: number, status: string): Promise<APIResponse> {
    return await this.request.patch(`/api/admin/orders/${id}/status`, {
      data: { status }
    });
  }
}
