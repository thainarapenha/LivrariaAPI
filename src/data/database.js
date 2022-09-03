import dotenv from 'dotenv';
dotenv.config();

import pkg from 'pg';

const { Pool } = pkg;

export const database = new Pool({
  connectionString: process.env.DATABASE_URI,
});
