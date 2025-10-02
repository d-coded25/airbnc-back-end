const db = require('./connection');

const format = require('pg-format');

// Utility Functions:
const {
  propertyTypesFormatter,
  usersFormatter,
  usersLookup,
  propertiesFormatter,
  guestsLookup,
  propertiesLookup,
  reviewsFormatter,
  imagesFormatter,
} = require('./utils');

// Queries:
const {
  dropTablesQueries,
  createTablesQueries,
  insertDataQueries,
} = require('./queries');

const {
  dropPropertyTypes,
  dropUsers,
  dropProperties,
  dropReviews,
  dropImages,
} = dropTablesQueries;

const {
  createPropertyTypes,
  createUsers,
  createProperties,
  createReviews,
  createImages,
} = createTablesQueries;

const {
  insertPropertyTypes,
  insertUsers,
  insertProperties,
  insertReviews,
  insertImages,
} = insertDataQueries;

// Drop Tables:
const dropTables = async function () {
  try {
    await db.query(dropImages);
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
    await db.query(createImages);

    console.log('Resolved: Create Tables');
  } catch (err) {
    console.log('Rejected: Create Tables!:', err.message);
  }
};

// Insert Table Data:
const insertData = async function (testData) {
  try {
    // Test DB Data:
    const {
      propertyTypesData,
      usersData,
      propertiesData,
      reviewsData,
      imagesData,
    } = testData;

    // Insert Property Types Data:
    const propertyTypes = propertyTypesFormatter(propertyTypesData);
    await db.query(format(insertPropertyTypes, propertyTypes));

    // Insert Users Data:
    const users = usersFormatter(usersData);
    const { rows: usersResponse } = await db.query(format(insertUsers, users));

    // Insert Properties Data:
    const usersAndIds = usersLookup(usersResponse);
    const properties = propertiesFormatter(propertiesData, usersAndIds);
    const { rows: propertiesResponse } = await db.query(
      format(insertProperties, properties)
    );

    // Insert Reviews Data:
    const guestsAndIds = guestsLookup(usersResponse);
    const propertiesAndIds = propertiesLookup(propertiesResponse);
    const reviews = reviewsFormatter(
      reviewsData,
      propertiesAndIds,
      guestsAndIds
    );
    await db.query(format(insertReviews, reviews));

    // Insert Images Data:
    const images = imagesFormatter(imagesData, propertiesAndIds);
    await db.query(format(insertImages, images));

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
