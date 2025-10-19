const {
  selectProperties,
  selectPropertyById,
} = require('../models/properties');

const getProperties = async function (req, res, next) {
  const { query: optionalQueries } = req;
  const properties = await selectProperties(optionalQueries);
  res.status(200).send({ properties });
};

const getPropertyById = async function (req, res, next) {
  const { id } = req.params;
  const property = await selectPropertyById(id);

  if (property) {
    res.status(200).send({ property });
  } else {
    return Promise.reject({ status: 404, msg: 'Property Not Found' });
  }
};

module.exports = {
  getProperties,
  getPropertyById,
};
