import React, { useState, useEffect } from "react";
import SearchBar from "./components/SearchBar";
import WeatherDisplay from "./components/WeatherDisplay";
import HistoryList from "./components/HistoryList";

import { GetWeatherData, formatTime } from "./components/utils";

import './App.css';

function App() {
  const [search, setSearch] = useState("Singapore");
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true); // Initially set loading to true
  const [error, setError] = useState(null);
  const [history, setHistory] = useState([]);

  // Function to fetch weather data
  const fetchWeatherData = async (city) => {
    try {
      const data = await GetWeatherData(city);

      if (!data || !data.main) {
        setError("No results found");
        setWeatherData(null);
      } else {
        setWeatherData(data);

        const existingIndex = history.findIndex((item) => item.name === data.name);

        if (existingIndex !== -1) {
          const updatedHistory = [...history];
          updatedHistory.splice(existingIndex, 1);
          setHistory(updatedHistory);
        }

        const newHistoryItem = {
          name: data.name,
          country: data.sys.country,
          time: formatTime(data.dt),
        };

        setHistory((prevHistory) => [newHistoryItem, ...prevHistory]);
      }
    } catch (err) {
      setError("City not found or an error occurred.");
    } finally {
      setLoading(false); // Set loading to false when the API call is complete
    }
  };


  useEffect(() => {
    fetchWeatherData(search); // Call the API when start so is not empty
    // eslint-disable-next-line
  }, []);



  const searchPressed = async () => {
    setLoading(true);
    setError(null);

    if (!search.trim()) {
      setError("Please enter something");
      setLoading(false);
      return;
    }

    try {
      const data = await GetWeatherData(search);

      if (!data || !data.main) {
        setError("No results found");
        setWeatherData(null);
      } else {
        setWeatherData(data);

        const existingIndex = history.findIndex((item) => item.name === data.name);

        if (existingIndex !== -1) {
          const updatedHistory = [...history];
          updatedHistory.splice(existingIndex, 1);
          setHistory(updatedHistory);
        }

        const newHistoryItem = {
          name: data.name,
          country: data.sys.country,
          time: formatTime(data.dt),
        };

        setHistory((prevHistory) => [newHistoryItem, ...prevHistory]);
      }
    } catch (err) {
      setError("City not found or an error occurred.");
    } finally {
      setLoading(false);
    }
  };

  const deleteHistoryItem = (index) => {
    const updatedHistory = [...history];
    updatedHistory.splice(index, 1);
    setHistory(updatedHistory);
  };

  const searchFromHistory = (searchValue) => {
    setSearch(searchValue);
    searchPressed();
  };

  useEffect(() => {
    const savedHistory = JSON.parse(localStorage.getItem("weatherHistory"));
    if (savedHistory) {
      setHistory(savedHistory);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("weatherHistory", JSON.stringify(history));
  }, [history]);

  return (
    <div className="app">
      <div className="top"></div>
      <SearchBar search={search} setSearch={setSearch} searchPressed={searchPressed} />
      {error && <div className="error">{error}</div>}
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="bottom-weather">
          <WeatherDisplay weatherData={weatherData} />
        </div>
      )}
      <div className="bottom-history">
        <div className="history-header">Search History</div>
        <div className="history-list-container">
          <HistoryList history={history} deleteHistoryItem={deleteHistoryItem} searchFromHistory={searchFromHistory} />
        </div>
      </div>
    </div>
  );
}

export default App;
