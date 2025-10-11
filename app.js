const express = require('express');
const app = express();
const { getProperties, getPropertyById } = require('./controllers/properties');
const { postReview } = require('./controllers/reviews');
const { unknownPathHandler } = require('./errors/errors');

app.use(express.json());

app.get('/api/properties', getProperties);
app.get('/api/properties/:id', getPropertyById);

app.post('/api/properties/:id/reviews', postReview);

app.all('/*unknown', unknownPathHandler);

module.exports = app;
