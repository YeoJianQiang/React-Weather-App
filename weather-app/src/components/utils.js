// Utility function to fetch weather data from the API
export async function GetWeatherData(search) {
    const apiKey = "fccaf511556a2a6a7e109c68e6f64f89";
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${search}&units=metric&APPID=${apiKey}`;
  
    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching weather data:", error);
      throw error;
    }
  }
  
  // Utility function to format a timestamp into a readable date and time format
  export function formatTime(timestamp) {
    const date = new Date(timestamp * 1000); // Convert timestamp to milliseconds
    const options = {
      year: "numeric",
      month: "numeric",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true, // Use 12-hour time format with AM/PM
    };
    return date.toLocaleString("en-US", options);
  }
  