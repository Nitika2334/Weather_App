// const fetch = require('node-fetch');
const dotenv = require('dotenv');
const { fileURLToPath } = require('url');
const { dirname } = require('path');

// Comment out or remove these lines as they're not needed in CommonJS
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);

dotenv.config();

const API_KEY = process.env.API_KEY;
const BASE_URL = process.env.BASE_URL;
const API_URL = 'http://api.openweathermap.org/data/2.5/weather'; // Changed from 'http://api.openweathermap.org/data/2.5/'

const getWeatherData = async (city) => {
  try {
    const url = `${API_URL}?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`;
    console.log('Fetching weather data from:', url);
    
    const response = await fetch(url);
    
    if (!response.ok) {
      console.error('Response not OK:', response.status, response.statusText);
      const text = await response.text();
      console.error('Response body:', text);
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching weather data:', error);
    throw error;
  }
};

module.exports = getWeatherData;
