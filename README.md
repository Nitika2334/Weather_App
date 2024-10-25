 # Weather APP

## Project Overview

This project involves building a real-time weather monitoring app that continuously gathers, processes, and summarizes weather data, displaying insights through rollups and aggregates. Data is pulled from the OpenWeatherMap API, with a focus on key metro cities in India, to generate meaningful daily summaries and automated alerts.

## Data Source and Requirements

The system retrieves data from the OpenWeatherMap API, which requires an API key. Key data points to track include:

- **Main Weather Condition** (e.g., Rain, Snow, Clear)
- **Temperature** (real-time, in Celsius or Fahrenheit as per preference)
- **Feels Like** (perceived temperature)
- **Timestamp** of the data update

## Data Storage

Weather details are stored in a database. PostgreSQL is well-suited here due to its powerful SQL compliance, robust relational structure, and support for complex queries and data integrity.

## Functional Overview

Weather data is fetched at set intervals (e.g., every 5 minutes) for cities including Delhi, Mumbai, Chennai, Bangalore, Kolkata, and Hyderabad.

### Key Processing Steps
- **Temperature Conversion**: Convert temperatures from Kelvin to either Celsius or Fahrenheit.
- **Data Storage and Rollups**: Summarize daily weather data and store it for analysis.
- **Alert System**: Trigger alerts based on user-defined conditions, with notifications displayed on the console or through email.

## Data Aggregation and Rollups

### 1. Daily Summary Generation

- Aggregate daily data for each city:
  - Calculate average, maximum, and minimum temperatures.
  - Identify the dominant weather condition for the day.
- **Storage**: Save summaries to a database or file-based storage.

### 2. Alerting System

- **User-Defined Thresholds**: Set thresholds for conditions like high temperatures or specific weather events.
- **Real-Time Monitoring**: Continuously check incoming data against thresholds to trigger alerts if limits are exceeded, with options for notification types (console or email).

### 3. Visualization

- Visualize data through:
  - Daily summaries
  - Historical weather trends
  - Alerts and threshold breaches

## Testing and Validation

### Test Scenarios

#### 1. Initialization and Setup

- Confirm system initializes properly and connects to the OpenWeatherMap API.

#### 2. Data Retrieval and Parsing

- Simulate API calls to verify accurate data retrieval and parsing for each city.

#### 3. Temperature Conversion

- Test temperature conversion between Kelvin, Celsius, and Fahrenheit.

#### 4. Daily Summary Aggregation

- Simulate weather updates over several days to validate calculations of average, maximum, minimum temperatures, and dominant weather conditions.

#### 5. Threshold-Based Alerts

- Set sample thresholds and simulate data breaches to confirm alerts trigger correctly when conditions are met.

## Getting Started

### Requirements

- ReactJS
- OpenWeatherMap API key

### Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/Nitika2334/Weather_App.git
   cd Weather_web/frontend
   ```

2. Install Dependencies

```sh
    npm i
```
3.run Script
  ```sh
  npm run dev
```
## Viewing Visualizations
-The application will display daily weather summaries, historical trends, and triggered alerts on the web interface.
