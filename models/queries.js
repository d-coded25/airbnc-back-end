const selectQueries = {
  selectProperties: `SELECT property_id, 
                      name AS property_name, 
                      location, 
                      price_per_night, 
                      host_id AS host 
                      FROM properties;`,
  selectPropertyById: `SELECT property_id,
                        name AS property_name,
                        location,
                        price_per_night,
                        description,
                        CONCAT_WS(' ', first_name, surname) AS host,
                        avatar AS host_avatar
                        FROM properties
                        INNER JOIN users ON properties.host_id = users.user_id
                        WHERE properties.property_id = $1;`,
};

const insertQueries = {
  insertReview: `INSERT INTO reviews 
                  (property_id, guest_id, rating, comment)
                  VALUES ($1, $2, $3, $4) RETURNING *;`,
};

module.exports = { selectQueries, insertQueries };
