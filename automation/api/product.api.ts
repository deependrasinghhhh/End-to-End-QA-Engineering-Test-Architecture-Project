import { APIRequestContext, APIResponse } from '@playwright/test';

export class ProductApi {
  readonly request: APIRequestContext;

  constructor(request: APIRequestContext) {
    this.request = request;
  }

  async getAllProducts(): Promise<APIResponse> {
    return await this.request.get('/api/catalog/products');
  }

  async getProductById(id: number): Promise<APIResponse> {
    return await this.request.get(`/api/catalog/products/${id}`);
  }

  async searchProducts(query: string): Promise<APIResponse> {
    return await this.request.get(`/api/catalog/search?q=${encodeURIComponent(query)}`);
  }
}
