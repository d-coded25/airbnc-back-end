const nodePostgres = require('pg');
const { Pool } = nodePostgres;

const dotEnv = require('dotenv');
dotEnv.config();

const pool = new Pool();

module.exports = pool;
