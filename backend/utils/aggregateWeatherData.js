const { pool } = require('../config/db');
const getWeatherData = require('./getWeatherData');

const aggregateWeatherData = async () => {
  try {
    const cities = ['London', 'New York', 'Tokyo', 'Sydney', 'Paris'];
    const weatherPromises = cities.map(city => 
      getWeatherData(city).catch(error => {
        console.error(`Error fetching data for ${city}:`, error);
        return null; // Return null for failed requests
      })
    );
    
    const weatherData = await Promise.all(weatherPromises);
    const validData = weatherData.filter(data => data !== null);
    
    if (validData.length === 0) {
      throw new Error('No valid weather data retrieved');
    }
    
    // Process validData to create a single summary object
    const date = new Date().toISOString().split('T')[0];
    const temperatures = validData.map(data => data.main.temp);
    const maxTemperature = Math.max(...validData.map(data => data.main.temp_max));
    const minTemperature = Math.min(...validData.map(data => data.main.temp_min));
    const conditions = validData.map(data => data.weather[0].main);
    const dominantCondition = mode(conditions);

    const summary = {
      date,
      avgTemperature: average(temperatures),
      maxTemperature,
      minTemperature,
      dominantCondition
    };

    // Insert summary into PostgreSQL database
    try {
      console.log('Attempting to insert data into weather_summary table...');
      const query = `
        INSERT INTO weather_summary (date, avg_temperature, max_temperature, min_temperature, dominant_condition)
        VALUES ($1, $2, $3, $4, $5)
        ON CONFLICT (date) DO UPDATE SET
          avg_temperature = EXCLUDED.avg_temperature,
          max_temperature = EXCLUDED.max_temperature,
          min_temperature = EXCLUDED.min_temperature,
          dominant_condition = EXCLUDED.dominant_condition,
          updated_at = CURRENT_TIMESTAMP
        RETURNING *
      `;

      const values = [
        summary.date,
        summary.avgTemperature,
        summary.maxTemperature,
        summary.minTemperature,
        summary.dominantCondition
      ];

      const result = await pool.query(query, values);
      console.log('Weather summary inserted/updated successfully');
      return result.rows[0];
    } catch (error) {
      console.error('Error inserting/updating weather summary:', error);
      console.error('Error details:', error.message);
      throw error;
    }
  } catch (error) {
    console.error('Error aggregating weather data:', error);
    throw error;
  }
};

// Helper function to calculate average
const average = arr => arr.reduce((p, c) => p + c, 0) / arr.length;

// Helper function to find mode (most frequent item)
const mode = arr =>
  Object.values(
    arr.reduce((count, e) => {
      if (!(e in count)) {
        count[e] = [0, e];
      }
      count[e][0]++;
      return count;
    }, {})
  ).reduce((a, v) => v[0] < a[0] ? a : v, [0, null])[1];

module.exports = aggregateWeatherData;
