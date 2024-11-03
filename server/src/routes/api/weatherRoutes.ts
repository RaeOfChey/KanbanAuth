import { Router } from 'express';
const router = Router();

import HistoryService from '../../service/historyService.js';
import WeatherService from '../../service/weatherService.js';

// TODO: POST Request with city name to retrieve weather data
router.post('/', async (req, res) => {
  // TODO: GET weather data from city name
  try {
    const { city } = req.body;
    if (!city) return res.status(400).json({ error: 'City name is required' });

    // Retrieve weather data from WeatherService
    const weatherData = await WeatherService.getWeather(city);
    if (!weatherData) return res.status(404).json({ error: 'Weather data not found' });
    // TODO: save city to search history
    await HistoryService.addCity(city)

    return res.status(200).json({ weather: weatherData });
  } catch (error) {
    return res.status(500).json({ error: 'Failed to retrieve weather data' });
  }
});

// TODO: GET search history
router.get('/history', async (req, res) => {
  try {
    const cities = await HistoryService.getCities();
    return res.status(200).json({ history: cities });
  } catch (error) {
    return res.status(500).json({ error: 'Failed to retrieve search history' });
  }
});

// * BONUS TODO: DELETE city from search history
router.delete('/history/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const success = await HistoryService.removeCity(id);
    if (!success) return res.status(404).json({ error: 'City not found in history' });

    return res.status(200).json({ message: 'City deleted from history' });
  } catch (error) {
    return res.status(500).json({ error: 'Failed to delete city from history' });
  }
});

export default router;
