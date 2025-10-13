const selectQueries = {
  selectProperties: `SELECT DISTINCT 
                      ON (properties.property_id)
                      properties.property_id,
                      name AS property_name, 
                      location, 
                      price_per_night, 
                      CONCAT_WS(' ', first_name, surname) AS host, image_url AS image 
                      FROM properties
                      INNER JOIN users 
                      ON properties.host_id = users.user_id INNER JOIN images 
                      ON properties.property_id = images.property_id
                      ORDER BY properties.property_id ASC, images.image_id ASC;`,
  selectPropertyById: `SELECT property_id,
                        name AS property_name,
                        location,
                        price_per_night,
                        description,
                        CONCAT_WS(' ', first_name, surname) AS host,
                        avatar AS host_avatar
                        FROM properties
                        INNER JOIN users 
                        ON properties.host_id = users.user_id
                        WHERE properties.property_id = $1;`,
  selectReviews: `SELECT review_id, 
                    comment, 
                    rating,
                    reviews.created_at,
                    CONCAT_WS(' ', first_name, surname) AS guest, 
                    avatar AS guest_avatar 
                    FROM reviews 
                    INNER JOIN users 
                    ON reviews.guest_id = users.user_id WHERE property_id = $1
                    ORDER BY created_at DESC;`,
};

const insertQueries = {
  insertReview: `INSERT INTO reviews 
                  (property_id, guest_id, rating, comment)
                  VALUES ($1, $2, $3, $4) RETURNING *;`,
};

const deleteQueries = {
  deleteReview: `DELETE FROM reviews
                  WHERE review_id = $1 RETURNING *;`,
};

module.exports = { selectQueries, insertQueries, deleteQueries };
