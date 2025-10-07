const selectQueries = {
  selectProperties: `SELECT property_id, 
                    name AS property_name, 
                    location, 
                    price_per_night, 
                    host_id AS host 
                    FROM properties;`,
};

module.exports = { selectQueries };
