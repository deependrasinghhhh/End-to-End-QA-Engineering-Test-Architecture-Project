import http from 'k6/http';
import { check, sleep } from 'k6';
import { config } from './config.js';

export const options = {
  stages: [
    { duration: '5s', target: 10 },
    { duration: '20s', target: 10 }, // Sustained soak load
    { duration: '5s', target: 0 }
  ],
  thresholds: {
    http_req_duration: ['p(95)<400'],
    http_req_failed: ['rate<0.005']
  }
};

export default function () {
  // Add item to cart
  const payload = JSON.stringify({ productId: 1, quantity: 1 });
  const addRes = http.post(`${config.apiBaseUrl}/cart/items`, payload, {
    headers: config.headers
  });

  check(addRes, {
    'Cart item added': (r) => r.status === 201
  });

  // Query cart
  const getRes = http.get(`${config.apiBaseUrl}/cart`);
  check(getRes, {
    'Cart returns 200': (r) => r.status === 200
  });

  sleep(1);
}
