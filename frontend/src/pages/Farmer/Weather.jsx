import { useState, useEffect } from 'react';
import { weatherAPI } from '../../services/api';
import './Weather.css';

const Weather = () => {
  const [weather, setWeather] = useState(null);
  const [city, setCity] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    getCurrentLocationWeather();
  }, []);

  const getCurrentLocationWeather = () => {
    if (navigator.geolocation) {
      setLoading(true);
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          try {
            const response = await weatherAPI.getWeatherByCoords(
              position.coords.latitude,
              position.coords.longitude
            );
            setWeather(response.data);
            setError('');
          } catch (err) {
            setError('Failed to fetch weather data');
          } finally {
            setLoading(false);
          }
        },
        (error) => {
          setError('Unable to get your location. Please enter city manually.');
          setLoading(false);
        }
      );
    } else {
      setError('Geolocation is not supported by your browser');
    }
  };

  const handleSearchWeather = async (e) => {
    e.preventDefault();
    if (!city.trim()) return;

    setLoading(true);
    setError('');

    try {
      const response = await weatherAPI.getCurrentWeather(city);
      setWeather(response.data);
    } catch (err) {
      setError('City not found. Please try again.');
      setWeather(null);
    } finally {
      setLoading(false);
    }
  };

  const getWeatherIcon = (weatherMain) => {
    const icons = {
      Clear: '☀️',
      Clouds: '☁️',
      Rain: '🌧️',
      Drizzle: '🌦️',
      Thunderstorm: '⛈️',
      Snow: '❄️',
      Mist: '🌫️',
      Haze: '🌫️',
    };
    return icons[weatherMain] || '🌤️';
  };

  return (
    <div className="weather-container">
      <div className="weather-header">
        <h1>🌤️ Weather Forecast</h1>
        <p>Check today's weather conditions for better farm planning</p>
      </div>

      <div className="weather-search">
        <form onSubmit={handleSearchWeather}>
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Enter city name..."
            className="search-input"
          />
          <button type="submit" className="search-btn" disabled={loading}>
            {loading ? 'Searching...' : 'Search'}
          </button>
        </form>
        <button onClick={getCurrentLocationWeather} className="location-btn" disabled={loading}>
          📍 Use Current Location
        </button>
      </div>

      {error && <div className="error-message">{error}</div>}

      {loading && <div className="loading">Loading weather data...</div>}

      {weather && !loading && (
        <div className="weather-display">
          <div className="weather-main">
            <div className="weather-icon-large">
              {getWeatherIcon(weather.weather[0].main)}
            </div>
            <div className="weather-info">
              <h2>{weather.name}, {weather.sys.country}</h2>
              <div className="temperature">
                {Math.round(weather.main.temp)}°C
              </div>
              <div className="weather-description">
                {weather.weather[0].description}
              </div>
            </div>
          </div>

          <div className="weather-details-grid">
            <div className="weather-detail-card">
              <div className="detail-icon">🌡️</div>
              <div className="detail-info">
                <div className="detail-label">Feels Like</div>
                <div className="detail-value">{Math.round(weather.main.feels_like)}°C</div>
              </div>
            </div>

            <div className="weather-detail-card">
              <div className="detail-icon">💧</div>
              <div className="detail-info">
                <div className="detail-label">Humidity</div>
                <div className="detail-value">{weather.main.humidity}%</div>
              </div>
            </div>

            <div className="weather-detail-card">
              <div className="detail-icon">💨</div>
              <div className="detail-info">
                <div className="detail-label">Wind Speed</div>
                <div className="detail-value">{weather.wind.speed} m/s</div>
              </div>
            </div>

            <div className="weather-detail-card">
              <div className="detail-icon">🔽</div>
              <div className="detail-info">
                <div className="detail-label">Pressure</div>
                <div className="detail-value">{weather.main.pressure} hPa</div>
              </div>
            </div>

            <div className="weather-detail-card">
              <div className="detail-icon">👁️</div>
              <div className="detail-info">
                <div className="detail-label">Visibility</div>
                <div className="detail-value">{(weather.visibility / 1000).toFixed(1)} km</div>
              </div>
            </div>

            <div className="weather-detail-card">
              <div className="detail-icon">☁️</div>
              <div className="detail-info">
                <div className="detail-label">Cloudiness</div>
                <div className="detail-value">{weather.clouds.all}%</div>
              </div>
            </div>
          </div>

          <div className="farming-tips">
            <h3>🌾 Farming Tips Based on Current Weather</h3>
            <div className="tips-list">
              {weather.main.temp > 30 && (
                <div className="tip">🌡️ High temperature - Ensure adequate irrigation</div>
              )}
              {weather.main.humidity > 80 && (
                <div className="tip">💧 High humidity - Watch for fungal diseases</div>
              )}
              {weather.wind.speed > 10 && (
                <div className="tip">💨 Strong winds - Secure loose materials</div>
              )}
              {weather.weather[0].main === 'Rain' && (
                <div className="tip">🌧️ Rainy conditions - Delay pesticide application</div>
              )}
              {weather.weather[0].main === 'Clear' && (
                <div className="tip">☀️ Clear weather - Good for harvesting activities</div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Weather;
