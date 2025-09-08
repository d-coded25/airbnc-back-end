const db = require('./connection');

const queries = require('./queries');

const { dropTablesQueries } = queries;
const { dropPropertyTypes } = dropTablesQueries;
const { dropUsers } = dropTablesQueries;
const { dropProperties } = dropTablesQueries;
const { dropReviews } = dropTablesQueries;

const { createTablesQueries } = queries;
const { createPropertyTypes } = createTablesQueries;
const { createUsers } = createTablesQueries;
const { createProperties } = createTablesQueries;
const { createReviews } = createTablesQueries;

const dropTables = async function () {
  try {
    await db.query(dropReviews);
    await db.query(dropProperties);
    await db.query(dropUsers);
    await db.query(dropPropertyTypes);
    console.log('Resolved: Drop Tables!');
  } catch (err) {
    console.log('Rejected: Drop Tables:', err.message);
  }
};

const createTables = async function () {
  try {
    await db.query(createPropertyTypes);
    await db.query(createUsers);
    await db.query(createProperties);
    await db.query(createReviews);
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
