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

const dropTables = async function () {
  try {
    await db.query(dropImages);
    await db.query(dropReviews);
    await db.query(dropProperties);
    await db.query(dropUsers);
    await db.query(dropPropertyTypes);
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
    await db.query(createImages);
  } catch (err) {
    console.log('Rejected: Create Tables!:', err.message);
  }
};

const insertData = async function (data) {
  try {
    const {
      propertyTypesData,
      usersData,
      propertiesData,
      reviewsData,
      imagesData,
    } = data;

    const propertyTypes = propertyTypesFormatter(propertyTypesData);
    await db.query(format(insertPropertyTypes, propertyTypes));

    const users = usersFormatter(usersData);
    const { rows: usersResponse } = await db.query(format(insertUsers, users));

    const usersAndIds = usersLookup(usersResponse);
    const properties = propertiesFormatter(propertiesData, usersAndIds);
    const { rows: propertiesResponse } = await db.query(
      format(insertProperties, properties)
    );

    const guestsAndIds = guestsLookup(usersResponse);
    const propertiesAndIds = propertiesLookup(propertiesResponse);
    const reviews = reviewsFormatter(
      reviewsData,
      propertiesAndIds,
      guestsAndIds
    );
    await db.query(format(insertReviews, reviews));

    const images = imagesFormatter(imagesData, propertiesAndIds);
    await db.query(format(insertImages, images));
  } catch (err) {
    console.log('Rejected: Inserted Data Into Tables!:', err.message);
  }
};

const createTestDatabase = async function (data) {
  try {
    await dropTables();
    await createTables();
    await insertData(data);
  } catch (err) {
    console.log('Rejected: Database Not Created!:', err.message);
  }
};

module.exports = createTestDatabase;
