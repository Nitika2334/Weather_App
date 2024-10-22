const { pool } = require('../config/db');
const aggregateWeatherData = require('../utils/aggregateWeatherData');

const fetchWeatherData = async () => {
  try {
    await aggregateWeatherData();
    console.log('Weather data updated successfully');
  } catch (error) {
    console.error('Error fetching or storing weather data:', error);
  }
};

// Fetch every 5 minutes
setInterval(fetchWeatherData, 300000);

// Fetch immediately on startup
fetchWeatherData();

module.exports = { start: fetchWeatherData };
