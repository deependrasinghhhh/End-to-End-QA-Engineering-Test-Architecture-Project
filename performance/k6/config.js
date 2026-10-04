// k6 Shared Configuration & Performance SLAs

export const config = {
  baseUrl: __ENV.BASE_URL || 'http://localhost:5001',
  apiBaseUrl: (__ENV.BASE_URL || 'http://localhost:5001') + '/api',
  headers: {
    'Content-Type': 'application/json',
    'User-Agent': 'k6-load-testing-agent/1.0'
  },
  thresholds: {
    http_req_duration: ['p(95)<500'], // 95% of requests must complete below 500ms
    http_req_failed: ['rate<0.01']     // Error rate must be less than 1%
  }
};
