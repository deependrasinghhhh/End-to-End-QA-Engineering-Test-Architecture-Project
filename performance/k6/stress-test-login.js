import http from 'k6/http';
import { check, sleep } from 'k6';
import { config } from './config.js';

export const options = {
  stages: [
    { duration: '5s', target: 20 },
    { duration: '10s', target: 50 }, // Stress spike to 50 concurrent login attempts
    { duration: '5s', target: 0 }
  ],
  thresholds: {
    http_req_duration: ['p(95)<600'],
    http_req_failed: ['rate<0.01']
  }
};

export default function () {
  const payload = JSON.stringify({
    email: 'customer@nopqa.local',
    password: 'TestPassword123!'
  });

  const res = http.post(`${config.apiBaseUrl}/auth/login`, payload, {
    headers: config.headers
  });

  check(res, {
    'Login returns 200': (r) => r.status === 200,
    'Auth token is returned': (r) => JSON.parse(r.body).token !== undefined
  });

  sleep(0.5);
}
