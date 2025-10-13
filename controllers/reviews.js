const { selectReviews, insertReview } = require('../models/reviews');

const getPropertyReviews = async function (req, res, newReview) {
  const { id: propertyId } = req.params;
  const reviews = await selectReviews(propertyId);

  if (reviews.length !== 0) {
    res.status(200).send({ reviews });
  } else {
    return Promise.reject({ status: 404, msg: 'Review Not Found' });
  }
};

const postPropertyReview = async function (req, res, next) {
  const { id: propertyId } = req.params;
  const { guest_id, rating, comment } = req.body;
  const review = await insertReview(propertyId, guest_id, rating, comment);
  res.status(201).send({ review });
};

module.exports = {
  getPropertyReviews,
  postPropertyReview,
};
