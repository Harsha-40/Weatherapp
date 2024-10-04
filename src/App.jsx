import { useState , useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState('');

  const API_KEY = '7ac34c45d0d99497d1ca659665e2b14b'; 

  const fetchWeather = async () => {
    if (city.trim() === '') {
      setError('Please enter a city name');
      setWeather(null);
      return;
    }

    try {
      const encodedCity = encodeURIComponent(city);
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${encodedCity}&units=metric&appid=${API_KEY}`
      );
      console.log('API Response:', response.data);
      setWeather(response.data);
      setError('');
    } catch (error) {
      console.error('API Error:', error);
      setError('City not found. Please try again.');
      setWeather(null);
    }
  };

  const handleInputChange = (e) => {
    setCity(e.target.value);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchWeather();
  };
  useEffect(() => {
    if (weather) {
      const condition = weather.weather[0].main.toLowerCase();

      
      document.body.className = '';

      
      if (condition.includes('cloud')) {
        document.body.classList.add('cloudy');
      } else if (condition.includes('rain')) {
        document.body.classList.add('rainy');
      } else if (condition.includes('snow')) {
        document.body.classList.add('snowy');
      } else {
        document.body.classList.add('sunny');
      }
    }
  }, [weather]);


  return (
    <div className="app">
      <h1>Weather App</h1>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Enter city name"
          value={city}
          onChange={handleInputChange}
        />
        <button type="submit">Search</button>
      </form>
      {error && <p className="error">{error}</p>}
      
      {/* Log the weather state */}
      {weather && console.log('Weather State:', weather)}
      
      {weather && weather.main && weather.sys && weather.weather && (
        <div className="weather-info">
          <h2>{weather.name}, {weather.sys.country}</h2>
          <p>Temperature: {weather.main.temp}°C</p>
          <p>Humidity: {weather.main.humidity}%</p>
          <p>Condition: {weather.weather[0].description}</p>
        </div>
      )}
    </div>
  );
}

export default App;
