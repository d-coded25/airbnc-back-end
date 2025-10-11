const {
  selectProperties,
  selectPropertyById,
} = require('../models/properties');

const getProperties = async function (req, res, next) {
  const properties = await selectProperties();
  res.status(200).send({ properties });
};

const getPropertyById = async function (req, res, next) {
  const { id } = req.params;
  const property = await selectPropertyById(id);

  if (property) {
    res.status(200).send({ property });
  } else {
    const err = new Error('Property Not Found');
    err.status = 404;
    throw err;
  }
};

module.exports = {
  getProperties,
  getPropertyById,
};
