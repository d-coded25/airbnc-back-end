const express = require('express');

const app = express();

const { getProperties, getPropertyById } = require('./controllers/properties');

app.get('/api/properties', getProperties);

app.get('/api/properties/:id', getPropertyById);

module.exports = app;
