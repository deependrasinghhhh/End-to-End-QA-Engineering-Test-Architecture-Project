import http from 'k6/http';
import { check, sleep } from 'k6';
import { config } from './config.js';

export const options = {
  stages: [
    { duration: '5s', target: 10 },  // Ramp-up to 10 VUs
    { duration: '15s', target: 25 }, // Steady load at 25 VUs
    { duration: '5s', target: 0 }    // Ramp-down
  ],
  thresholds: {
    http_req_duration: ['p(95)<450'],
    http_req_failed: ['rate<0.005']
  }
};

export default function () {
  const categories = ['computers', 'desktops'];
  const cat = categories[Math.floor(Math.random() * categories.length)];

  // Category page
  const resCat = http.get(`${config.baseUrl}/${cat}`);
  check(resCat, {
    'Category page loads with 200': (r) => r.status === 200
  });

  // Product Details
  const resPdp = http.get(`${config.baseUrl}/build-your-own-computer`);
  check(resPdp, {
    'PDP loads with 200': (r) => r.status === 200,
    'Price rendered': (r) => r.body.includes('$1,200.00')
  });

  // Autocomplete API
  const resAuto = http.get(`${config.baseUrl}/catalog/searchtermautocomplete?term=comp`);
  check(resAuto, {
    'Autocomplete responds 200': (r) => r.status === 200
  });

  sleep(0.5);
}
