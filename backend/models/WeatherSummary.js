const { pool } = require('../config/db');

const createWeatherSummaryTable = async () => {
  try {
    console.log('Verifying weather_summary table...');
    await pool.query(`
      SELECT 1 FROM weather_summary LIMIT 1
    `);
    console.log('Weather summary table verified successfully');
  } catch (error) {
    if (error.code === '42P01') {
      console.log('Weather summary table does not exist. Creating...');
      await pool.query(`
        CREATE TABLE IF NOT EXISTS weather_summary (
          id SERIAL PRIMARY KEY,
          date DATE UNIQUE NOT NULL,
          avg_temperature NUMERIC(5,2) NOT NULL,
          max_temperature NUMERIC(5,2) NOT NULL,
          min_temperature NUMERIC(5,2) NOT NULL,
          dominant_condition VARCHAR(50) NOT NULL,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
        )
      `);
      console.log('Weather summary table created successfully');
    } else {
      console.error('Error verifying/creating weather summary table:', error);
      throw error;
    }
  }
};

const WeatherSummary = {
  create: async (data) => {
    const { date, avgTemperature, maxTemperature, minTemperature, dominantCondition } = data;
    const query = `
      INSERT INTO weather_summary (date, avg_temperature, max_temperature, min_temperature, dominant_condition)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *
    `;
    const values = [date, avgTemperature, maxTemperature, minTemperature, dominantCondition];
    const result = await pool.query(query, values);
    return result.rows[0];
  },
  // Add other CRUD operations as needed
};

module.exports = { WeatherSummary, createWeatherSummaryTable };
