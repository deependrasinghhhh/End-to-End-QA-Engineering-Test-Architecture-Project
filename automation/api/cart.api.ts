import { APIRequestContext, APIResponse } from '@playwright/test';

export class CartApi {
  readonly request: APIRequestContext;

  constructor(request: APIRequestContext) {
    this.request = request;
  }

  async getCart(): Promise<APIResponse> {
    return await this.request.get('/api/cart');
  }

  async addItem(productId: number, quantity: number = 1): Promise<APIResponse> {
    return await this.request.post('/api/cart/items', {
      data: { productId, quantity }
    });
  }

  async updateItemQuantity(itemId: number, quantity: number): Promise<APIResponse> {
    return await this.request.put(`/api/cart/items/${itemId}`, {
      data: { quantity }
    });
  }

  async deleteItem(itemId: number): Promise<APIResponse> {
    return await this.request.delete(`/api/cart/items/${itemId}`);
  }
}
