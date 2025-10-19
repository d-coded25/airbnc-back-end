const db = require('../db/connection');

const { selectQueries, orderByQueries, queryStrings } = require('./queries');

const selectProperties = async function (optionalQueries) {
  let { selectProperties } = selectQueries;
  const { filterMaxPrice, filterMinPrice } = queryStrings;
  const { orderPropertiesByAsc } = orderByQueries;
  const { maxprice: maxPropertyPrice, minprice: minPropertyPrice } =
    optionalQueries;

  let params = [];

  if (maxPropertyPrice) {
    selectProperties = `${selectProperties} ${filterMaxPrice}`;
    params.push(maxPropertyPrice);
  } else if (minPropertyPrice) {
    selectProperties = `${selectProperties} ${filterMinPrice}`;
    params.push(minPropertyPrice);
  } else {
    selectProperties = `${selectProperties} ${orderPropertiesByAsc}`;
  }

  const { rows: properties } = await db.query(selectProperties, params);
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
