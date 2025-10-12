const nodePostgres = require('pg');
const { Pool } = nodePostgres;

const ENV = process.env.NODE_ENV;

const dotEnv = require('dotenv');
dotEnv.config({ path: `${__dirname}/../.env.${ENV}` });

const pool = new Pool();

module.exports = pool;
