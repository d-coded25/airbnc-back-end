const express = require('express');
const app = express();
const { getProperties, getPropertyById } = require('./controllers/properties');
const { postReview } = require('./controllers/reviews');
const { unknownPathHandler, serverErrorHandler } = require('./errors/errors');

app.use(express.json());

app.get('/api/properties', getProperties);
app.get('/api/properties/:id', getPropertyById);

app.post('/api/properties/:id/reviews', postReview);

app.all('/*unknown', unknownPathHandler);

app.use(serverErrorHandler);

module.exports = app;
