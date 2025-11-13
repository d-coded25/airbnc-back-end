const createTestDatabase = require('./seed');
const data = require('./data/');
const db = require('./connection');

createTestDatabase(data)
  .then(() => db.end())
  .then(() => {
    console.log('Database connection closed...');
  })
  .catch((err) => {
    console.error('Database failed to shutdown!...', err.message);
  });
