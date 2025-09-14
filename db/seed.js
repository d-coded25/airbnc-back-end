const db = require('./connection');

const format = require('pg-format');

const { propertyTypesFormatter } = require('./utils');

const {
  dropTablesQueries,
  createTablesQueries,
  insertDataQueries,
} = require('./queries');

const { dropPropertyTypes, dropUsers, dropProperties, dropReviews } =
  dropTablesQueries;

const { createPropertyTypes, createUsers, createProperties, createReviews } =
  createTablesQueries;

const { insertPropertyTypes } = insertDataQueries;

const dropTables = async function () {
  try {
    await db.query(dropReviews);
    await db.query(dropProperties);
    await db.query(dropUsers);
    await db.query(dropPropertyTypes);
    console.log('Resolved: Drop Tables');
  } catch (err) {
    console.log('Rejected: Drop Tables!:', err.message);
  }
};

const createTables = async function () {
  try {
    await db.query(createPropertyTypes);
    await db.query(createUsers);
    await db.query(createProperties);
    await db.query(createReviews);
    console.log('Resolved: Create Tables');
  } catch (err) {
    console.log('Rejected: Create Tables!:', err.message);
  }
};

const insertData = async function (testData) {
  try {
    const { propertyTypesData } = testData;
    const propertyTypes = propertyTypesFormatter(propertyTypesData);

    await db.query(format(insertPropertyTypes, propertyTypes));
    console.log('Resolved: Inserted Data Into Tables');
  } catch (err) {
    console.log('Rejected: Inserted Data Into Tables!:', err.message);
  }
};

const createTestDatabase = async function (testData) {
  try {
    await dropTables();
    await createTables();
    await insertData(testData);
    console.log('Resolved: Database Created');
  } catch (err) {
    console.log('Rejected: Database Not Created!:', err.message);
  }
};

module.exports = createTestDatabase;
