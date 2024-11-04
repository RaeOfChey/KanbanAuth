import dotenv from 'dotenv';
import axios from 'axios';
dotenv.config();

// TODO: Define an interface for the Coordinates object
interface Coordinates {
  lat: number;
  lon: number;
}

// TODO: Define a class for the Weather object
interface Weather {
  temperature: number;
  description: string;
  humidity: number;
  windSpeed: number;
}

// TODO: Define an interface for the Forecast object
interface Forecast {
  temperature: number;
  description: string;
  humidity: number;
  windSpeed: number;
}

// TODO: Complete the WeatherService class
class WeatherService {
  private baseURL = 'https://api.openweathermap.org';
  private apiKey = process.env.WEATHER_API_KEY || '';
  private city: string = '';

  constructor() {
    if (!this.apiKey) {
      throw new Error('Weather API key is missing. Please set WEATHER_API_KEY in your .env file.');
    }
  }

  // Fetch location data based on the city name
  private async fetchLocationData(): Promise<any> {
    const response = await axios.get(this.buildGeocodeQuery());
    return response.data[0];
  }

  // Destructure location data to get coordinates
  private destructureLocationData(locationData: any): Coordinates {
    return {
      lat: locationData.lat,
      lon: locationData.lon,
    };
  }

  // Build geocode query using the city
  private buildGeocodeQuery(): string {
    return `${this.baseURL}/geo/1.0/direct?q=${this.city}&appid=${this.apiKey}&limit=1`;
  }

  // Build weather query using coordinates
  private buildWeatherQuery(coordinates: Coordinates): string {
    return `${this.baseURL}/data/2.5/weather?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${this.apiKey}&units=metric`;
  }

  // Fetch and destructure location data to get coordinates
  private async fetchAndDestructureLocationData(): Promise<Coordinates> {
    const locationData = await this.fetchLocationData();
    return this.destructureLocationData(locationData);
  }

  // Fetch weather data based on coordinates
  private async fetchWeatherData(coordinates: Coordinates): Promise<any> {
    const response = await axios.get(this.buildWeatherQuery(coordinates));
    return response.data;
  }

  // Parse current weather from response data
  private parseCurrentWeather(response: any): Weather {
    return {
      temperature: response.main.temp,
      description: response.weather[0].description,
      humidity: response.main.humidity,
      windSpeed: response.wind.speed,
    };
  }

  // Build forecast array from current weather and forecast data
  private buildForecastArray(weatherData: any[]): Forecast[] {
    return weatherData.map((day: any) => ({
      temperature: day.temp.day,
      description: day.weather[0].description,
      humidity: day.humidity,
      windSpeed: day.speed,
    }));
  }

  // Fetch forecast data based on coordinates
  private async fetchForecastData(coordinates: Coordinates): Promise<any> {
    const response = await axios.get(`${this.baseURL}/data/2.5/forecast?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${this.apiKey}&units=metric`);
    return response.data.list; // Assuming the forecast data is in response.data.list
  }

  // Get weather and forecast for the specified city
  async getWeatherForCity(city: string): Promise<{ currentWeather: Weather; forecast: Forecast[] }> {
    this.city = city;
    const coordinates = await this.fetchAndDestructureLocationData();
    const weatherData = await this.fetchWeatherData(coordinates);
    const currentWeather = this.parseCurrentWeather(weatherData);

    // Fetch forecast data and build forecast array
    const forecastData = await this.fetchForecastData(coordinates);
    const forecast = this.buildForecastArray(forecastData);

    return { currentWeather, forecast };
  }
}

export default new WeatherService();
