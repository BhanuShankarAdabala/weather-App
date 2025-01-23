import "./Weather.css";
import search_icon from "../assets/search.png";
import clear_icon from "../assets/clear.png";
import cloud_icon from "../assets/cloud.png";
import drizzle_icon from "../assets/drizzle.png";
import rain_icon from "../assets/rain.png";
import snow_icon from "../assets/snow.png";
import wind_icon from "../assets/wind.png";
import humidity_icon from "../assets/humidity.png";
import { useEffect, useState } from "react";

const Weather = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [city, setCity] = useState("");
  const API_KEY = import.meta.env.VITE_APP_ID;

  const search = async (city) => {
    if (city === "") {
      alert("Enter City Name");
      return;
    }
    if (!API_KEY) {
      console.error("API key is missing! Check your .env file.");
      return;
    }

    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      if (!response.ok) {
        alert(data.message);
        return;
      }

      console.log("Weather Data:", data);

      setWeatherData({
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        temperature: Math.floor(data.main.temp),
        location: data.name,
        icon: data.weather[0].main.toLowerCase(),
      });
    } catch (error) {
      setWeatherData(null);
      console.error("Error fetching weather data:", error.message);
      alert("Error fetching weather data, please try again.");
    }
  };

  useEffect(() => {
    search("London");
  }, []);

  const handleSearch = () => {
    if (city.trim() !== "") {
      search(city);
    } else {
      alert("Enter City Name");
    }
  };

  const getWeatherIcon = (iconName) => {
    switch (iconName) {
      case "clear":
        return clear_icon;
      case "clouds":
        return cloud_icon;
      case "drizzle":
        return drizzle_icon;
      case "rain":
        return rain_icon;
      case "snow":
        return snow_icon;
      default:
        return clear_icon;
    }
  };

  return (
    <div className="weather">
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search for a city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <img src={search_icon} alt="Search" onClick={handleSearch} />
      </div>

      {weatherData ? (
        <>
          <img
            src={getWeatherIcon(weatherData.icon)}
            alt="Weather Icon"
            className="weather-icon"
          />
          <p className="temperature">{weatherData.temperature}°C</p>
          <p className="location">{weatherData.location}</p>
          <div className="weather-data">
            <div className="col">
              <img src={humidity_icon} alt="Humidity" />
              <div>
                <p>{weatherData.humidity} %</p>
                <span>Humidity</span>
              </div>
            </div>
            <div className="col">
              <img src={wind_icon} alt="Wind Speed" />
              <div>
                <p>{weatherData.windSpeed} KM/H</p>
                <span>Wind Speed</span>
              </div>
            </div>
          </div>
        </>
      ) : (
        <p>No weather data available.</p>
      )}
    </div>
  );
};

export default Weather;
