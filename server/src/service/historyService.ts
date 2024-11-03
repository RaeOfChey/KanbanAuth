import fs from 'fs/promises';
import path from 'path';

// TODO: Define a City class with name and id properties
interface City {
  id: string;
  name: string;
}

// TODO: Complete the HistoryService class
class HistoryService {
  private filePath = path.join(__dirname, '../../data/searchHistory.json');

    // TODO: Define a read method that reads from the searchHistory.json file
    private async read(): Promise<City[]> {
      try {
        const data = await fs.readFile(this.filePath, 'utf-8');
        return JSON.parse(data) as City[];
      } catch (error) {
        return [];
      }
    }

    // TODO: Define a write method that writes the updated cities array to the searchHistory.json file
    private async write(cities: City[]): Promise<void> {
      await fs.writeFile(this.filePath, JSON.stringify(cities, null, 2));
    }

    // TODO: Define a getCities method that reads the cities from the searchHistory.json file and returns them as an array of City objects
    async getCities(): Promise<City[]> {
      return await this.read();
    }

    // TODO Define an addCity method that adds a city to the searchHistory.json file
    async addCity(city: string): Promise<void> {
      const cities = await this.read();
      const newCity: City = { id: Date.now().toString(), name: city };
      cities.push(newCity);
      await this.write(cities);
    }

    // * BONUS TODO: Define a removeCity method that removes a city from the searchHistory.json file
    async removeCity(id: string): Promise<boolean> {
      const cities = await this.read();
      const updatedCities = cities.filter(city => city.id !== id);
      const isDeleted = cities.length !== updatedCities.length;
      if (isDeleted) await this.write(updatedCities);
      return isDeleted;
    }
  }
  
  export default new HistoryService();
  