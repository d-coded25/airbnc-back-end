const { selectProperties } = require('../models/properties');

const getProperties = async function (req, res, next) {
  const properties = await selectProperties();
  res.status(200).send({ properties });
};

module.exports = {
  getProperties,
};
