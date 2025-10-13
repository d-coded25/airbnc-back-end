const db = require('../db/connection');

const { selectQueries, insertQueries, deleteQueries } = require('./queries');

const selectReviews = async function (propertyId) {
  const { selectReviews } = selectQueries;
  const { rows: reviews } = await db.query(selectReviews, [propertyId]);
  return reviews;
};

const insertReview = async function (propertyId, guestId, rating, comment) {
  const { insertReview } = insertQueries;
  const {
    rows: [review],
  } = await db.query(insertReview, [propertyId, guestId, rating, comment]);
  return review;
};

const deleteReview = async function (reviewId) {
  const { deleteReview } = deleteQueries;
  const {
    rows: [review],
  } = await db.query(deleteReview, [reviewId]);
  return review;
};

module.exports = { selectReviews, insertReview, deleteReview };
