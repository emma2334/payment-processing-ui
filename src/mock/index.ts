import { createServer } from 'miragejs';
import { LOCATIONS, ORGANIZATION, PAYMENT_LOCATION_READERS } from './data';

export function makeServer({ environment = 'development' } = {}) {
  console.log('mock server started');
  return createServer({
    environment,
    routes() {
      this.namespace = 'api';
      this.get('/organization', () => ORGANIZATION);
      this.get('/locations', () => LOCATIONS);
      this.get('/payment-location-readers', () => PAYMENT_LOCATION_READERS);
    },
  });
}
