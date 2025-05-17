import React from "react";
import Clear from "../../assets/weather-icons/clear.png";
import Rain from "../../assets/weather-icons/rain.png";
import Clouds from "../../assets/weather-icons/clouds.png";
import Snow from "../../assets/weather-icons/snow.png";
import Thunderstorm from "../../assets/weather-icons/thunderstorm.png";
import styles from "./styles.module.css";

const WeatherIcon = ({ condition, size = 64 }) => {
  const getIcon = () => {
    switch (condition.toLowerCase()) {
      case "clear":
        return Clear;
      case "rain":
        return Rain;
      case "clouds":
        return Clouds;
      case "snow":
        return Snow;
      case "thunderstorm":
        return Thunderstorm;
      default:
        return Clouds;
    }
  };

  return (
    <img
      src={getIcon()}
      alt={condition}
      style={{ width: size, height: size }}
      className={styles.weatherIcon}
    />
  );
};

export default WeatherIcon;
