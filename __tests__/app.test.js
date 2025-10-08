const request = require('supertest');
const app = require('../app');

describe('GET /api/properties', () => {
  test('should respond with the status code 200', async () => {
    const server = request(app);

    await server.get('/api/properties').expect(200);
  });
  test('should respond with an object containing a key of properties', async () => {
    const server = request(app);

    const response = await server.get('/api/properties');
    const { body } = response;

    expect(typeof body).toBe('object');
    expect(body).toHaveProperty('properties');
  });
  test('properties key should be an array of objects containing the correct keys', async () => {
    const server = request(app);
    const propertyKeys = [
      'property_id',
      'property_name',
      'location',
      'price_per_night',
      'host',
    ];

    const response = await server.get('/api/properties');
    const {
      body: { properties },
    } = response;

    expect(properties.length).toBeGreaterThan(0);
    properties.forEach((property) => {
      expect(property).toHaveProperty(propertyKeys[0]);
      expect(property).toHaveProperty(propertyKeys[1]);
      expect(property).toHaveProperty(propertyKeys[2]);
      expect(property).toHaveProperty(propertyKeys[3]);
      expect(property).toHaveProperty(propertyKeys[4]);
    });
  });
});
