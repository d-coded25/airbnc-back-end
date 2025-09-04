const nodePostgres = require('pg');
const { Pool } = nodePostgres;

const dotEnv = require('dotenv');
dotEnv.config();

const db = new Pool();
