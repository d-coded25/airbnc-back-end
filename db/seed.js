const db = require('./connection');

const format = require('pg-format');

// Utility Functions:
const {
  propertyTypesFormatter,
  usersFormatter,
  usersLookup,
  propertiesFormatter,
} = require('./utils');

// Queries:
const {
  dropTablesQueries,
  createTablesQueries,
  insertDataQueries,
} = require('./queries');

const { dropPropertyTypes, dropUsers, dropProperties, dropReviews } =
  dropTablesQueries;

const { createPropertyTypes, createUsers, createProperties, createReviews } =
  createTablesQueries;

const { insertPropertyTypes, insertUsers, insertProperties } =
  insertDataQueries;

// Drop Tables:
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

// Create Tables:
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

// Insert Table Data:
const insertData = async function (testData) {
  try {
    const { propertyTypesData, usersData, propertiesData } = testData;

    // Insert Property Types Data:
    const propertyTypes = propertyTypesFormatter(propertyTypesData);
    await db.query(format(insertPropertyTypes, propertyTypes));

    // Insert Users Data:
    const users = usersFormatter(usersData);
    const { rows: usersResponse } = await db.query(format(insertUsers, users));

    // Insert Property Data:
    const usersAndIds = usersLookup(usersResponse);
    const properties = propertiesFormatter(propertiesData, usersAndIds);
    await db.query(format(insertProperties, properties));

    console.log('Resolved: Inserted Data Into Tables');
  } catch (err) {
    console.log('Rejected: Inserted Data Into Tables!:', err.message);
  }
};

// Main Database Creation Function:
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
