import React from "react";
import { formatTime } from "../utils";
import './WeatherDisplay.css';

import sunnyImage from "../../assets/sun.png";
import cloudImage from "../../assets/cloud.png";

function WeatherDisplay({ weatherData }) {
  // Function to select the weather image based on the description
  function selectWeatherImage(description) {
    switch (description.toLowerCase()) {
      case "sunny":
        return sunnyImage;
      case "cloud":
        return cloudImage;
      default:
        return sunnyImage; // Return a default value
    }
  }
  // Get the selected weather image
  const weatherImage = weatherData ? selectWeatherImage(weatherData.weather[0].description) : null;

  return (
    <div className="weather-display">
      {weatherData && weatherData.main ? (
        <>
          <div className="left-container">
            <h2>Today's Weather</h2>
            <div className="weather-image">
              {weatherImage && <img src={weatherImage} alt="Weather" />}
            </div>
            <p className="temperature">{weatherData.main.temp.toFixed(1)}°C</p>
            <div className="max-min">
              <p>H: {weatherData.main.temp_max.toFixed(1)}°</p>
              <p>L: {weatherData.main.temp_min.toFixed(1)}°</p>
            </div>
            <div className="name-country">
              <p>{weatherData.name}, {weatherData.sys.country}</p>
            </div>
          </div>
          <div className="right-container">
            <p>Weather Description: {weatherData.weather[0].description}</p>
            <p>Humidity: {weatherData.main.humidity}%</p>
            <p>Time: {formatTime(weatherData.dt)}</p>
          </div>
        </>
      ) : (
        ""
      )}
    </div>
  );
}

export default WeatherDisplay;
