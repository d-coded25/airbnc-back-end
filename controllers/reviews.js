const { insertReview } = require('../models/reviews');

const postReview = async function (req, res, next) {
  const { id: propertyId } = req.params;
  const { guest_id, rating, comment } = req.body;
  const review = await insertReview(propertyId, guest_id, rating, comment);
  res.status(201).send({ review });
};

module.exports = {
  postReview,
};
