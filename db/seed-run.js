const createTestDatabase = require('./seed');
const testData = require('./data/test/index');
const db = require('./connection');

createTestDatabase(testData)
  .then(() => db.end())
  .then(() => {
    console.log('Database connection closed...');
  })
  .catch((err) => {
    console.error('Database failed to shutdown!...', err.message);
  });
