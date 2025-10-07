const db = require('../db/connection');

const { selectQueries } = require('./queries');

const selectProperties = async function () {
  const { selectProperties } = selectQueries;
  const { rows: properties } = await db.query(selectProperties);
  return properties;
};

const selectPropertyById = async function (id) {
  const { selectPropertyById } = selectQueries;
  const {
    rows: [property],
  } = await db.query(selectPropertyById, [id]);
  return property;
};

module.exports = { selectProperties, selectPropertyById };
