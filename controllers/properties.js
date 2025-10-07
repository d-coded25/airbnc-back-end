const {
  selectProperties,
  selectPropertyById,
} = require('../models/properties');

const getProperties = async function (req, res, next) {
  const properties = await selectProperties();
  res.status(200).send({ properties });
};

const getPropertyById = async function (req, res, next) {
  const { id: propertyId } = req.params;
  const [property] = await selectPropertyById(propertyId);
  res.status(200).send({ property });
};

module.exports = {
  getProperties,
  getPropertyById,
};
