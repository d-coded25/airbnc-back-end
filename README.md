# Airbnc - Back-End

## Project Overview:

Airbnc back-end is a simplified back-end implementation of the Airbnb platform. The back-end application exposes RESTful API endpoints, accepts HTTP requests, interacts with a relational database, and returns JSON responses.

## Technology Stack

- JavaScript (Node JS)
- Express JS (Server)
- PostgreSQL (Relational database)
- Node-postgres (PostgreSQL client)
- Jest (testing framework)

## Project Setup

### 1. Database Setup

Create and initialise a local PostgreSQL database by running the following NPM script:

```sh
 npm run db-setup
```

### 2. Install Dependencies

Install all required Node.js dependencies by running the following NPM script:

```sh
npm install
```

### 3. Environment Variables

Ensure a .env file is located at the project root level and contains the correct database credentials:

```
PGDATABASE=airbnc_test
```

### 4. Database Seeding

Populate the database with initial data by running the following NPM script:

```sh
npm run seed
```

### 5. Run The Development Server

Start the Express server in development mode by run the following NPM script

```sh
npm run dev
```

Development server will run on:

```sh
http://localhost:9090
```

### 6. Utility Testing

Run unit tests for utility functions by running the following NPM script:

```sh
npm run test-utils
```

### 7. Integration Testing

Run integration tests by running the following NPM script:

```sh
npm run test-app
```

## Future Improvements

As a property guest user:

- Delete reviews
- Sort and filter properties
