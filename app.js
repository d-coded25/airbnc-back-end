const express = require('express');
const app = express();
const { getProperties, getPropertyById } = require('./controllers/properties');
const { postReview } = require('./controllers/reviews');

app.use(express.json());

app.get('/api/properties', getProperties);
app.get('/api/properties/:id', getPropertyById);

app.post('/api/properties/:id/reviews', postReview);

app.all('/*unknown', (req, res, next) => {
  res.status(404).send({ msg: 'Path not found' });
});

app.use((err, req, res, next) => {
  res.status(500).send({ msg: 'Server error' });
});

module.exports = app;
