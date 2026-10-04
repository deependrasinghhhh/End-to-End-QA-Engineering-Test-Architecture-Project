import { APIRequestContext, APIResponse } from '@playwright/test';

export class AuthApi {
  readonly request: APIRequestContext;

  constructor(request: APIRequestContext) {
    this.request = request;
  }

  async login(payload: { email: string; password: string }): Promise<APIResponse> {
    return await this.request.post('/api/auth/login', { data: payload });
  }

  async register(payload: { firstName: string; lastName: string; email: string; password: string }): Promise<APIResponse> {
    return await this.request.post('/api/auth/register', { data: payload });
  }
}
