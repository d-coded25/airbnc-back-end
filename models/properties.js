const db = require('../db/connection');

const { selectQueries } = require('./queries');

const selectProperties = async function () {
  const { selectProperties } = selectQueries;
  const { rows: properties } = await db.query(selectProperties);
  return properties;
};

module.exports = { selectProperties };
