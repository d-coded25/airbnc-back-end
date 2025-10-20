const nodePostgres = require('pg');
const { Pool } = nodePostgres;

const ENV = process.env.NODE_ENV || 'development';

const dotEnv = require('dotenv');
dotEnv.config({ path: `${__dirname}/../.env.${ENV}` });

const config = {};

if (ENV === 'production') {
  config.connectionString = process.env.DATABASE_URL;
  config.max = 2;
}

const pool = new Pool(config);

module.exports = pool;
