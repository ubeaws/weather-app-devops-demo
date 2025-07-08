const express = require('express');
const path = require('path');
const fetch = require('node-fetch'); // Make sure to install this
const app = express();
const PORT = process.env.PORT || 3000;

// Replace with your actual OpenWeatherMap API key
const API_KEY = '049e888e29b8e7d4913be9f90677b98c';

app.use(express.static(path.join(__dirname, 'public')));

app.get('/weather', async (req, res) => {
  const city = req.query.city;
  if (!city) {
    return res.status(400).json({ error: 'City is required' });
  }

  try {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;
    const response = await fetch(url);
    const data = await response.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch weather data' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

