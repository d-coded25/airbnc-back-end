const db = require('./connection');

const queries = require('./queries');

const { dropTablesQueries } = queries;
const { dropPropertyTypes } = dropTablesQueries;

const { createTablesQueries } = queries;
const { createPropertyTypes } = createTablesQueries;

const dropTables = async function () {
  try {
    console.log('Resolved: Drop Tables!');
  } catch (err) {
    console.log('Rejected: Drop Tables:', err.message);
  }
};

const createTables = async function () {
  try {
    console.log('Resolved: Create Tables!');
  } catch (err) {
    console.log('Rejected: Create Tables:', err.message);
  }
};

const createTestDatabase = async function () {
  try {
    await dropTables();
    await createTables();
    console.log('Resolved: Database Created!');
  } catch (err) {
    console.log('Rejected: Database Not Created:', err.message);
  }
};

module.exports = createTestDatabase;
