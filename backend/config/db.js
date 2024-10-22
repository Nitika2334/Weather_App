const { Pool } = require('pg');
const dotenv = require('dotenv');

dotenv.config();

const pool = new Pool({
  connectionString: process.env.DB_URI,
});

const connectDB = async () => {
  try {
    await pool.connect();
    console.log('Successfully connected to the database');
  } catch (error) {
    console.error('Error connecting to the database:', error.message);
    throw error;
  }
};

module.exports = { pool, connectDB };
