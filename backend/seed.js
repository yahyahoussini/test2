// This is a utility script to create the first admin user.
// Run it with: node backend/seed.js

const { Pool } = require('pg');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

async function createAdmin() {
  const email = 'admin@maboutique.com';
  const password = 'password123'; // Change this in a real environment

  console.log(`Creating admin user: ${email}`);

  try {
    // Check if user already exists
    const checkUser = await pool.query('SELECT * FROM admins WHERE email = $1', [email]);
    if (checkUser.rows.length > 0) {
      console.log('Admin user already exists.');
      return;
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const password_hash = await bcrypt.hash(password, salt);

    // Insert the new admin user
    const insertQuery = 'INSERT INTO admins (email, password_hash) VALUES ($1, $2) RETURNING *';
    const { rows } = await pool.query(insertQuery, [email, password_hash]);

    console.log('Admin user created successfully:');
    console.log(rows[0]);

  } catch (err) {
    console.error('Error creating admin user:', err.message);
  } finally {
    await pool.end();
    console.log('Database pool closed.');
  }
}

createAdmin();
