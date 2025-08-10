const { Pool } = require('pg');
require('dotenv').config();

// The pool will use the DATABASE_URL environment variable by default
// if it's set. This is a feature of the 'pg' library.
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  // Use SSL in production, but not in a typical local dev environment
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
});

module.exports = {
  // A query function that will be used throughout the app
  query: (text, params) => pool.query(text, params),
  getClient: () => pool.connect(),
  pool, // Export the pool itself for more complex operations
};
