const express = require('express');
const axios = require('axios');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = 3000;

console.log('Google Maps API Key:', process.env.GOOGLE_MAPS_API_KEY);

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.get('/weather', async (req, res) => {
  const city = req.query.city;
  try {
    console.log(`Fetching weather data for ${city}`);
    const weatherResponse = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${process.env.OPENWEATHER_API_KEY}`);
    const weatherData = weatherResponse.data;

    console.log('Weather data fetched:', weatherData);

    const { lat, lon } = weatherData.coord;
    console.log(`Fetching air quality data for coordinates: ${lat}, ${lon}`);
    const airQualityResponse = await axios.get(`https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${process.env.OPENWEATHER_API_KEY}`);
    const airQualityData = airQualityResponse.data;

    console.log('Air quality data fetched:', airQualityData);

    console.log(`Fetching timezone data for coordinates: ${lat}, ${lon}`);
    const timeZoneResponse = await axios.get(`https://maps.googleapis.com/maps/api/timezone/json?location=${lat},${lon}&timestamp=${Math.floor(Date.now() / 1000)}&key=${process.env.GOOGLE_MAPS_API_KEY}`);
    const timeZoneData = timeZoneResponse.data;

    console.log('Timezone data fetched:', timeZoneData);

    console.log(`Fetching city information for ${city}`);
    const cityInfoResponse = await axios.get(`https://en.wikipedia.org/api/rest_v1/page/summary/${city}`);
    const cityInfoData = cityInfoResponse.data;

    console.log('City information fetched:', cityInfoData);

    res.json({
      weather: weatherData,
      airQuality: airQualityData,
      timeZone: timeZoneData,
      cityInfo: cityInfoData
    });
  } catch (error) {
    if (error.response) {
      console.error('Error response data:', error.response.data);
      console.error('Error response status:', error.response.status);
      console.error('Error response headers:', error.response.headers);
    } else if (error.request) {
      console.error('Error request:', error.request);
    } else {
      console.error('Error message:', error.message);
    }
    res.status(500).json({ error: 'Failed to fetch data' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
