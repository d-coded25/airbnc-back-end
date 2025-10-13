const db = require('../db/connection');

const { selectQueries, insertQueries } = require('./queries');

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

module.exports = { selectReviews, insertReview };
