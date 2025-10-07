const db = require('../db/connection');

const { insertQueries } = require('./queries');

const insertReview = async function (propertyId, guestId, rating, comment) {
  const { insertReview } = insertQueries;
  const {
    rows: [review],
  } = await db.query(insertReview, [propertyId, guestId, rating, comment]);
  return review;
};

module.exports = { insertReview };
