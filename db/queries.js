const dropTablesQueries = {
  dropImages: 'DROP TABLE IF EXISTS images;',
  dropPropertyTypes: 'DROP TABLE IF EXISTS property_types;',
  dropUsers: `DROP TABLE IF EXISTS users;`,
  dropProperties: `DROP TABLE IF EXISTS properties;`,
  dropReviews: `DROP TABLE IF EXISTS reviews;`,
};

const createTablesQueries = {
  createPropertyTypes: `CREATE TABLE property_types (
                          property_type VARCHAR NOT NULL PRIMARY KEY, 
                          description TEXT NOT NULL
                        );`,
  createUsers: `CREATE TABLE users (
                  user_id SERIAL PRIMARY KEY,
                  first_name VARCHAR NOT NULL,
                  surname VARCHAR NOT NULL,
                  email VARCHAR NOT NULL,
                  phone_number VARCHAR,
                  is_host BOOLEAN NOT NULL,
                  avatar VARCHAR,
                  created_at TIMESTAMP default NOW()
                );`,
  createProperties: `CREATE TABLE properties (
                        property_id SERIAL PRIMARY KEY,
                        host_id INT NOT NULL REFERENCES users(user_id),
                        name VARCHAR NOT NULL,  
                        location VARCHAR NOT NULL,
                        property_type VARCHAR NOT NULL REFERENCES property_types(property_type),
                        price_per_night decimal NOT NULL,
                        description TEXT
                      );`,
  createReviews: `CREATE TABLE reviews (
                    review_id SERIAL PRIMARY KEY,
                    property_id INT NOT NULL REFERENCES properties(property_id),
                    guest_id INT NOT NULL REFERENCES users(user_id),
                    rating INT NOT NULL,
                    comment TEXT,
                    created_at TIMESTAMP default NOW()
                  );`,
  createImages: `CREATE TABLE images (
                  image_id SERIAL PRIMARY KEY,
                  property_id INT NOT NULL REFERENCES properties(property_id),
                  image_url VARCHAR NOT NULL,
                  alt_text VARCHAR NOT NULL
  
                )`,
};

const insertDataQueries = {
  insertPropertyTypes: `INSERT INTO property_types (property_type, description) 
                          VALUES %L RETURNING *;`,
  insertUsers: `INSERT INTO users
                  (first_name, surname, email, phone_number, is_host, avatar)
                  VALUES %L RETURNING *;`,
  insertProperties: `INSERT INTO properties 
                      (host_id, name, location, property_type, price_per_night, description) 
                      VALUES %L RETURNING *;`,
  insertReviews: `INSERT INTO reviews
                    (property_id, guest_id, rating, comment)
                    VALUES %L RETURNING *;`,
};

module.exports = { dropTablesQueries, createTablesQueries, insertDataQueries };
