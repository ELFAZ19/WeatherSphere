import { createContext, useState } from "react";

export const WeatherContext = createContext();

export const WeatherProvider = ({ children }) => {
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  return (
    <WeatherContext.Provider
      value={{
        weather,
        forecast,
        loading,
        error,
        setWeather,
        setForecast,
        setLoading,
        setError,
      }}
    >
      {children}
    </WeatherContext.Provider>
  );
};
