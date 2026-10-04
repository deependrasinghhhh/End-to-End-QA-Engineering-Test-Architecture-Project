import http from 'k6/http';
import { check, sleep } from 'k6';
import { config } from './config.js';

export const options = {
  vus: 5,
  duration: '10s',
  thresholds: config.thresholds
};

export default function () {
  // 1. Storefront Homepage
  const resHome = http.get(config.baseUrl);
  check(resHome, {
    'Homepage status is 200': (r) => r.status === 200,
    'Homepage contains title': (r) => r.body.includes('nopCommerce')
  });

  // 2. Catalog Products API
  const resProducts = http.get(`${config.apiBaseUrl}/catalog/products`);
  check(resProducts, {
    'Products API status is 200': (r) => r.status === 200,
    'Products list is non-empty': (r) => JSON.parse(r.body).length > 0
  });

  // 3. Search API
  const resSearch = http.get(`${config.apiBaseUrl}/catalog/search?q=computer`);
  check(resSearch, {
    'Search API status is 200': (r) => r.status === 200
  });

  sleep(1);
}
