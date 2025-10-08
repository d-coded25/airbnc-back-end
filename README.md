# AirBNC

## Project Overview:

A project that replicates a simplified version of the Airbnb platform.

### Project Setup:

1. Make sure to setup a local database by running the following NPM script:

```sh
 npm run db-setup
```

2. Make sure to install all NPM dependencies by running the following NPM script:

```sh
npm install
```

3. Make sure a .env file is located at the project root level and contains the correct database credentials:

```
PGDATABASE=airbnc_test
```

4. Make sure to seed the database with initial data by running the following NPM script:

```sh
npm run seed
```

5.  To run the express server in development mode, please run the following NPM script:

```sh
npm run dev
```

6. To run utility tests, please run the following NPM script:

```sh
npm run test-utils
```
