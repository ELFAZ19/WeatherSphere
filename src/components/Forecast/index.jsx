import { useContext } from "react";
import { WeatherContext } from "../../contexts/WeatherContext";
import WeatherIcon from "../WeatherIcon";
import styles from "./styles.module.css";
import { motion } from "framer-motion";

const Forecast = () => {
  const { forecast, loading } = useContext(WeatherContext);

  if (loading || !forecast) return null;

  // Get one forecast per day at 12:00 PM
  const dailyForecast = forecast.list
    .filter((_, index) => index % 8 === 0)
    .slice(0, 5);

  return (
    <motion.div
      className={styles.container}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.3 }}
    >
      <h3 className={styles.title}>5-Day Forecast</h3>
      <div className={styles.forecastGrid}>
        {dailyForecast.map((day) => (
          <motion.div
            key={day.dt}
            className={styles.dayCard}
            whileHover={{ scale: 1.05 }}
          >
            <p className={styles.day}>
              {new Date(day.dt * 1000).toLocaleDateString("en-US", {
                weekday: "short",
              })}
            </p>
            <WeatherIcon condition={day.weather[0].main} size={48} />
            <div className={styles.temps}>
              <span className={styles.maxTemp}>
                {Math.round(day.main.temp_max)}°
              </span>
              <span className={styles.minTemp}>
                {Math.round(day.main.temp_min)}°
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default Forecast;
