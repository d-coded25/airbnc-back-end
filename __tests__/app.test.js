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
  describe('happy paths', () => {
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

      const response = await server.get('/api/properties');
      const {
        body: { properties },
      } = response;

      expect(properties.length).toBeGreaterThan(0);
      properties.forEach((property) => {
        expect(property).toHaveProperty('property_id');
        expect(property).toHaveProperty('property_name');
        expect(property).toHaveProperty('location');
        expect(property).toHaveProperty('price_per_night');
        expect(property).toHaveProperty('host');
        expect(property).toHaveProperty('image');
      });
    });
  });
});

describe('GET /api/properties/:id', () => {
  describe('happy paths', () => {
    test('should respond with the status code 200', async () => {
      const server = request(app);
      const propertyId = 1;

      await server.get(`/api/properties/${propertyId}`).expect(200);
    });
    test('should respond with an object containing a key of property', async () => {
      const server = request(app);
      const propertyId = 1;

      const response = await server.get(`/api/properties/${propertyId}`);
      const { body } = response;

      expect(typeof body).toBe('object');
      expect(body).toHaveProperty('property');
    });
    test('property key should be an object containing the correct keys', async () => {
      const server = request(app);
      const propertyId = 1;
      const propertyKeys = [
        'property_id',
        'property_name',
        'location',
        'price_per_night',
        'description',
        'host',
        'host_avatar',
        'images',
      ];

      const response = await server.get(`/api/properties/${propertyId}`);
      const {
        body: { property },
      } = response;
      console.log(property);

      expect(Object.keys(property).length).toBeGreaterThan(0);
      propertyKeys.forEach((key) => {
        expect(property).toHaveProperty(key);
      });
    });
  });
  describe('sad paths', () => {
    test('should respond with the status code 400 for an invalid property id', async () => {
      const server = request(app);
      const propertyId = 'invalid-id';

      await server.get(`/api/properties/${propertyId}`).expect(400);
    });
    test('should respond with the message "bad request" for an invalid property id', async () => {
      const server = request(app);
      const propertyId = 'invalid-id';

      const response = await server.get(`/api/properties/${propertyId}`);
      const { body: error } = response;

      expect(error.msg).toBe('Bad Request');
    });
    test('should respond with the status code 404 for a property id that does not yet exist', async () => {
      const server = request(app);
      const propertyId = 250;

      await server.get(`/api/properties/${propertyId}`).expect(404);
    });
    test('should respond with the message "property not found" for a property id that does not yet exist', async () => {
      const server = request(app);
      const propertyId = 250;

      const response = await server.get(`/api/properties/${propertyId}`);
      const { body: error } = response;

      expect(error.msg).toBe('Property Not Found');
    });
  });
});

describe('GET /api/properties/:id/reviews', () => {
  describe('happy paths', () => {
    test('should respond with the status code 200', async () => {
      const server = request(app);
      const propertyId = 1;

      await server.get(`/api/properties/${propertyId}/reviews`).expect(200);
    });
    test('should respond with an object containing a key of reviews', async () => {
      const server = request(app);
      const propertyId = 1;

      const response = await server.get(
        `/api/properties/${propertyId}/reviews`
      );
      const { body } = response;

      expect(typeof body).toBe('object');
      expect(body).toHaveProperty('reviews');
    });
    test('reviews key should be an array of objects containing the correct keys', async () => {
      const server = request(app);
      const propertyId = 1;

      const response = await server.get(
        `/api/properties/${propertyId}/reviews`
      );
      const {
        body: { reviews },
      } = response;

      reviews.forEach((review) => {
        expect(review).toHaveProperty('review_id');
        expect(review).toHaveProperty('comment');
        expect(review).toHaveProperty('rating');
        expect(review).toHaveProperty('guest');
        expect(review).toHaveProperty('guest_avatar');
      });
    });
  });
  describe('sad paths', () => {
    test('should respond with the status code 400 for an invalid property id', async () => {
      const server = request(app);
      const propertyId = 'invalid-id';

      await server.get(`/api/properties/${propertyId}/reviews`).expect(400);
    });
    test('should respond with the message "bad request" for an invalid property id', async () => {
      const server = request(app);
      const propertyId = 'invalid-id';

      const { body: error } = await server.get(
        `/api/properties/${propertyId}/reviews`
      );

      expect(error.msg).toBe('Bad Request');
    });
    test('should respond with the status code 404 for a property id that does not yet exist', async () => {
      const server = request(app);
      const propertyId = 250;

      await server.get(`/api/properties/${propertyId}/reviews`).expect(404);
    });
    test('should respond with the message "review not found" for a property id that does not yet exist', async () => {
      const server = request(app);
      const propertyId = 250;

      const { body: error } = await server.get(
        `/api/properties/${propertyId}/reviews`
      );

      expect(error.msg).toBe('Review Not Found');
    });
  });
});

describe('POST /api/properties/:id/reviews', () => {
  describe('happy paths', () => {
    test('should respond with the status code 201', async () => {
      const server = request(app);
      const propertyId = 1;
      const review = {
        guest_id: 1,
        rating: 2,
        comment: 'Test comment!...',
      };

      await server
        .post(`/api/properties/${propertyId}/reviews`)
        .send(review)
        .expect(201);
    });
    test('should respond with an object containing a key of review', async () => {
      const server = request(app);
      const propertyId = 1;
      const review = {
        guest_id: 1,
        rating: 2,
        comment: 'Test comment!...',
      };

      const response = await server
        .post(`/api/properties/${propertyId}/reviews`)
        .send(review);
      const { body } = response;

      expect(typeof body).toBe('object');
      expect(body).toHaveProperty('review');
    });
    test('review key should be an object containing the correct keys', async () => {
      const server = request(app);
      const propertyId = 1;
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
        .post(`/api/properties/${propertyId}/reviews`)
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
  describe('sad paths', () => {
    test('should respond with the status code 400 for an invalid property id', async () => {
      const server = request(app);
      const propertyId = 'invalid-id';
      const review = {
        guest_id: 1,
        rating: 2,
        comment: 'Test comment!...',
      };

      await server
        .post(`/api/properties/${propertyId}/reviews`)
        .send(review)
        .expect(400);
    });
    test('should respond with the message "bad request" for an invalid property id', async () => {
      const server = request(app);
      const propertyId = 'invalid-id';
      const review = {
        guest_id: 1,
        rating: 2,
        comment: 'Test comment!...',
      };

      const response = await server
        .post(`/api/properties/${propertyId}/reviews`)
        .send(review)
        .expect(400);
      const { body: error } = response;

      expect(error.msg).toBe('Bad Request');
    });
    test('should respond with the status code 400 if guest id is not provided', async () => {
      const server = request(app);
      const propertyId = 1;
      const review = {
        rating: 2,
        comment: 'Test comment!...',
      };

      await server
        .post(`/api/properties/${propertyId}/reviews`)
        .send(review)
        .expect(400);
    });
    test('should respond with the message "bad request" if guest id is not provided', async () => {
      const server = request(app);
      const propertyId = 1;
      const review = {
        rating: 2,
        comment: 'Test comment!...',
      };

      const response = await server
        .post(`/api/properties/${propertyId}/reviews`)
        .send(review);
      const { body: error } = response;

      expect(error.msg).toBe('Bad Request');
    });
    test('should respond with the status code 400 if rating is not provided', async () => {
      const server = request(app);
      const propertyId = 1;
      const review = {
        guest_id: 1,
        comment: 'Test comment!...',
      };

      await server
        .post(`/api/properties/${propertyId}/reviews`)
        .send(review)
        .expect(400);
    });
    test('should respond with the message "bad request" if rating is not provided', async () => {
      const server = request(app);
      const propertyId = 1;
      const review = {
        guest_id: 1,
        comment: 'Test comment!...',
      };

      const response = await server
        .post(`/api/properties/${propertyId}/reviews`)
        .send(review);
      const { body: error } = response;

      expect(error.msg).toBe('Bad Request');
    });
    test('should respond with the status code 400 if comment is not provided', async () => {
      const server = request(app);
      const propertyId = 1;
      const review = {
        guest_id: 1,
        rating: 2,
      };

      await server
        .post(`/api/properties/${propertyId}/reviews`)
        .send(review)
        .expect(400);
    });
    test('should respond with the message "bad request" if comment is not provided', async () => {
      const server = request(app);
      const propertyId = 1;
      const review = {
        guest_id: 1,
        rating: 2,
      };

      const response = await server
        .post(`/api/properties/${propertyId}/reviews`)
        .send(review);
      const { body: error } = response;

      expect(error.msg).toBe('Bad Request');
    });
    test('should respond with the status code 400 if guest id is not a valid number', async () => {
      const server = request(app);
      const propertyId = 1;
      const review = {
        guest_id: 'invalid-number',
        rating: 2,
        comment: 'Test comment!...',
      };

      await server
        .post(`/api/properties/${propertyId}/reviews`)
        .send(review)
        .expect(400);
    });
    test('should respond with the message "bad request" if guest id is not a valid number', async () => {
      const server = request(app);
      const propertyId = 1;
      const review = {
        guest_id: 'invalid-number',
        rating: 2,
        comment: 'Test comment!...',
      };

      const response = await server
        .post(`/api/properties/${propertyId}/reviews`)
        .send(review);
      const { body: error } = response;

      expect(error.msg).toBe('Bad Request');
    });
    test('should respond with the status code 400 if rating is not a valid number', async () => {
      const server = request(app);
      const propertyId = 1;
      const review = {
        guest_id: 1,
        rating: 'invalid-number',
        comment: 'Test comment!...',
      };

      await server
        .post(`/api/properties/${propertyId}/reviews`)
        .send(review)
        .expect(400);
    });
    test('should respond with the message "bad request" if rating is not a valid string', async () => {
      const server = request(app);
      const propertyId = 1;
      const review = {
        guest_id: 1,
        rating: 'invalid-number',
        comment: 'Test comment!...',
      };

      const response = await server
        .post(`/api/properties/${propertyId}/reviews`)
        .send(review);
      const { body: error } = response;

      expect(error.msg).toBe('Bad Request');
    });
    test('should respond with the status code 400 if comment is not a valid string', async () => {
      const server = request(app);
      const propertyId = 1;
      const review = {
        guest_id: 1,
        rating: 2,
        comment: undefined,
      };

      await server
        .post(`/api/properties/${propertyId}/reviews`)
        .send(review)
        .expect(400);
    });
    test('should respond with the message "bad request" if comment is not a valid string', async () => {
      const server = request(app);
      const propertyId = 1;
      const review = {
        guest_id: 1,
        rating: 2,
        comment: undefined,
      };

      const response = await server
        .post(`/api/properties/${propertyId}/reviews`)
        .send(review);
      const { body: error } = response;

      expect(error.msg).toBe('Bad Request');
    });
  });
});

describe('DELETE /api/reviews/:id', () => {
  describe('happy paths', () => {
    test('should respond with the status code 204', async () => {
      const server = request(app);
      const reviewId = 1;

      await server.delete(`/api/reviews/${reviewId}`).expect(204);
    });
    describe('sad paths', () => {
      test('should respond with the status code 400 for an invalid review id', async () => {
        const server = request(app);
        const reviewId = 'invalid-id';

        await server.delete(`/api/reviews/${reviewId}`).expect(400);
      });
      test('should respond with the message "bad request" for an invalid review id', async () => {
        const server = request(app);
        const reviewId = 'invalid-id';

        const { body: error } = await server.delete(`/api/reviews/${reviewId}`);

        expect(error.msg).toBe('Bad Request');
      });
      test('should respond with the status code 404 for a review id that does not yet exist', async () => {
        const server = request(app);
        const reviewId = 250;

        await server.delete(`/api/reviews/${reviewId}`).expect(404);
      });
      test('should respond with the message "review not found" for a review id that does not yet exist', async () => {
        const server = request(app);
        const reviewId = 250;

        const { body: error } = await server.delete(`/api/reviews/${reviewId}`);

        expect(error.msg).toBe('Review Not Found');
      });
    });
  });
});

describe('Unknown path error', () => {
  test('should respond with the status code 404 for an unknown path', async () => {
    const server = request(app);

    await server.get('/api/unknown').expect(404);
  });
  test('should respond with the message "path not found" for an unknown path', async () => {
    const server = request(app);

    const { body: error } = await server.get('/api/unknown/path').expect(404);

    expect(error.msg).toBe('Path Not Found');
  });
});
