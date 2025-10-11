const request = require('supertest');
const app = require('../app');
const seed = require('../db/seed');
const testData = require('../db/data/test/index');
const db = require('../db/connection');

beforeEach(async () => {
  await seed(testData);
});

afterAll(async () => {
  await db.end();
});

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

describe('GET /api/properties/:id', () => {
  test('should respond with the status code 200', async () => {
    const server = request(app);
    const id = 1;

    await server.get(`/api/properties/${id}`).expect(200);
  });
  test('should respond with an object containing a key of property', async () => {
    const server = request(app);
    const id = 1;

    const response = await server.get(`/api/properties/${id}`);
    const { body } = response;

    expect(typeof body).toBe('object');
    expect(body).toHaveProperty('property');
  });
  test('property key should be an object containing the correct keys', async () => {
    const server = request(app);
    const id = 1;
    const propertyKeys = [
      'property_id',
      'property_name',
      'location',
      'price_per_night',
      'description',
      'host',
      'host_avatar',
    ];

    const response = await server.get(`/api/properties/${id}`);
    const {
      body: { property },
    } = response;

    expect(Object.keys(property).length).toBeGreaterThan(0);
    propertyKeys.forEach((key) => {
      expect(property).toHaveProperty(key);
    });
  });
});

describe('POST /api/properties/:id/reviews', () => {
  test('should respond with the status code 201', async () => {
    const server = request(app);
    const id = 1;
    const review = {
      guest_id: 1,
      rating: 2,
      comment: 'Test comment!...',
    };

    await server.post(`/api/properties/${id}/reviews`).send(review).expect(201);
  });
  test('should respond with an object containing a key of review', async () => {
    const server = request(app);
    const id = 1;
    const review = {
      guest_id: 1,
      rating: 2,
      comment: 'Test comment!...',
    };

    const response = await server
      .post(`/api/properties/${id}/reviews`)
      .send(review);
    const { body } = response;

    expect(typeof body).toBe('object');
    expect(body).toHaveProperty('review');
  });
  test('review key should be an object containing the correct keys', async () => {
    const server = request(app);
    const id = 1;
    const newReview = {
      guest_id: 1,
      rating: 2,
      comment: 'Test comment!...',
    };
    const propertyKeys = [
      'review_id',
      'property_id',
      'guest_id',
      'rating',
      'comment',
      'created_at',
    ];

    const response = await server
      .post(`/api/properties/${id}/reviews`)
      .send(newReview);
    const {
      body: { review },
    } = response;

    expect(Object.keys(review).length).toBeGreaterThan(0);
    propertyKeys.forEach((key) => {
      expect(review).toHaveProperty(key);
    });
  });
});

describe('Unknown path error', () => {
  test('unknown path should respond with the status code 404', async () => {
    const server = request(app);

    await server.get('/api/unknown').expect(404);
  });
  test('unknown path should respond with the message "path not found"', async () => {
    const server = request(app);

    const { body: error } = await server.get('/api/unknown/path').expect(404);

    expect(error.msg).toBe('Path not found');
  });
});
