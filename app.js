const express = require('express');

const app = express();

const { getProperties, getPropertyById } = require('./controllers/properties');

const { postReview } = require('./controllers/reviews');

app.use(express.json());

app.get('/api/properties', getProperties);

app.get('/api/properties/:id', getPropertyById);

app.post('/api/properties/:id/reviews', postReview);

module.exports = app;
