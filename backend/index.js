const express = require('express');
const { connectDB } = require('./config/db');
const dotenv = require('dotenv');
const { createWeatherSummaryTable } = require('./models/WeatherSummary');
const weatherFetcher = require('./jobs/weatherFetcher');

dotenv.config();

const app = express();

// Middleware
app.use(express.json());

// Connect to database and set up table
const setupDatabase = async () => {
  try {
    await connectDB();
    await createWeatherSummaryTable();
    weatherFetcher.start();
  } catch (err) {
    console.error('Failed to set up the database:', err);
    process.exit(1);
  }
};

setupDatabase();

// Define routes
app.get('/', (req, res) => res.send('Weather Summary App'));

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}).on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.log(`Port ${PORT} is busy, trying ${PORT + 1}...`);
    app.listen(PORT + 1);
  } else {
    console.error('Failed to start server:', err);
  }
});
