const express = require('express');
const app = express();
const { getProperties, getPropertyById } = require('./controllers/properties');
const {
  getPropertyReviews,
  postPropertyReview,
  deletePropertyReview,
} = require('./controllers/reviews');
const {
  unknownURLHandler,
  badRequestsHandler,
  resourceNotFoundHandler,
  serverErrorHandler,
} = require('./errors/errors');

app.use(express.static('public'));
app.use(express.json());

app.get('/api/properties', getProperties);
app.get('/api/properties/:id', getPropertyById);
app.get('/api/properties/:id/reviews', getPropertyReviews);

app.post('/api/properties/:id/reviews', postPropertyReview);

app.delete('/api/reviews/:id', deletePropertyReview);

app.all('/*unknown', unknownURLHandler);

app.use(badRequestsHandler);
app.use(resourceNotFoundHandler);
app.use(serverErrorHandler);

module.exports = app;
