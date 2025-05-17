import React, { useState, useEffect, useContext } from 'react';
import { WeatherContext } from '../../contexts/WeatherContext';
import { searchCities, fetchWeather, fetchForecast } from '../../services/weatherService'; // Added imports here
import styles from './styles.module.css';
import { motion } from 'framer-motion';

const SearchBar = () => {
  const { setWeather, setForecast, setLoading, setError } = useContext(WeatherContext);
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  // Handle city search
  const handleSearch = async (city) => {
    try {
      setLoading(true);
      setError(null);
      
      const weatherData = await fetchWeather(city);
      const forecastData = await fetchForecast(city);
      
      setWeather(weatherData);
      setForecast(forecastData);
      setShowSuggestions(false);
    } catch (err) {
      setError('City not found. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch city suggestions
  useEffect(() => {
    if (query.trim().length > 2) {
      const timer = setTimeout(async () => {
        try {
          const cities = await searchCities(query);
          setSuggestions(cities);
          setShowSuggestions(true);
        } catch (err) {
          setSuggestions([]);
        }
      }, 300);

      return () => clearTimeout(timer);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [query]);

  // Handle Enter key press
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && query.trim()) {
      handleSearch(query);
    }
  };

  return (
    <div className={styles.searchContainer}>
      <motion.div
        className={styles.searchBox}
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Search city..."
          className={styles.searchInput}
        />
        <button
          onClick={() => query.trim() && handleSearch(query)}
          className={styles.searchButton}
        >
          Search
        </button>

        {showSuggestions && suggestions.length > 0 && (
          <ul className={styles.suggestions}>
            {suggestions.map((city) => (
              <li
                key={`${city.lat}-${city.lon}`}
                onClick={() => {
                  setQuery(`${city.name}, ${city.country}`);
                  handleSearch(`${city.name}, ${city.country}`);
                }}
              >
                {city.name}, {city.country}
              </li>
            ))}
          </ul>
        )}
      </motion.div>
    </div>
  );
};

export default SearchBar;
