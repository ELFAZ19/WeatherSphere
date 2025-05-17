import { WeatherProvider } from "./contexts/WeatherContext";
import SearchBar from "./components/SearchBar";
import WeatherCard from "./components/WeatherCard";
import Forecast from "./components/Forecast";
import "./App.css";

function App() {
  return (
    <WeatherProvider>
      <div className="app">
        <div className="background-animation"></div>
        <div className="content">
          <h1 className="app-title">WeatherSphere</h1>
          <SearchBar />
          <WeatherCard />
          <Forecast />
        </div>
      </div>
    </WeatherProvider>
  );
}

export default App;
