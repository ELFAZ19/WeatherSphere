import axios from "axios";

const API_KEY = process.env.REACT_APP_OPENWEATHER_API_KEY;

export const searchCities = async (query) => {
  try {
    const response = await axios.get(
      `https://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=5&appid=${API_KEY}`
    );
    return response.data.map((city) => ({
      name: city.name,
      country: city.country,
      lat: city.lat,
      lon: city.lon,
    }));
  } catch (error) {
    console.error("Error fetching cities:", error);
    return [];
  }
};
