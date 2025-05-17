import { useContext } from "react";
import { WeatherContext } from "../../contexts/WeatherContext";
import WeatherIcon from "../WeatherIcon";
import styles from "./styles.module.css";
import { motion } from "framer-motion";

const WeatherCard = () => {
  const { weather, loading } = useContext(WeatherContext);

  if (loading) return <div className={styles.loading}>Loading...</div>;
  if (!weather) return null;

  return (
    <motion.div
      className={styles.card}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className={styles.header}>
        <h2>
          {weather.name}, {weather.sys.country}
        </h2>
        <p className={styles.date}>
          {new Date().toLocaleDateString("en-US", {
            weekday: "long",
            day: "numeric",
            month: "long",
          })}
        </p>
      </div>

      <div className={styles.main}>
        <WeatherIcon condition={weather.weather[0].main} size={120} />
        <div className={styles.temp}>
          <span>{Math.round(weather.main.temp)}°</span>
          <p className={styles.description}>{weather.weather[0].description}</p>
        </div>
      </div>

      <div className={styles.details}>
        <div className={styles.detailItem}>
          <span>Feels Like</span>
          <span>{Math.round(weather.main.feels_like)}°</span>
        </div>
        <div className={styles.detailItem}>
          <span>Humidity</span>
          <span>{weather.main.humidity}%</span>
        </div>
        <div className={styles.detailItem}>
          <span>Wind</span>
          <span>{weather.wind.speed} km/h</span>
        </div>
      </div>
    </motion.div>
  );
};

export default WeatherCard;
