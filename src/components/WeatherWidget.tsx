import React, { useState, useEffect } from 'react';
import { Widget } from './Widget';

interface WeatherWidgetProps {
  title: string;
  onRemove: () => void;
  number?: number;
}

export const WeatherWidget: React.FC<WeatherWidgetProps> = ({ title, onRemove, number }) => {
  const [weather, setWeather] = useState({
    temperature: 22,
    condition: 'Sunny',
    humidity: 65,
    windSpeed: 12,
  });

  useEffect(() => {
    // Simulate weather data updates
    const interval = setInterval(() => {
      setWeather(prev => ({
        ...prev,
        temperature: 18 + Math.round(Math.random() * 15),
        humidity: 50 + Math.round(Math.random() * 40),
        windSpeed: 5 + Math.round(Math.random() * 20),
      }));
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  const getWeatherIcon = (condition: string) => {
    switch (condition) {
      case 'Sunny':
        return '☀️';
      case 'Cloudy':
        return '☁️';
      case 'Rainy':
        return '🌧️';
      default:
        return '🌤️';
    }
  };

  return (
    <Widget title={title} onRemove={onRemove} number={number}>
      <div style={{ textAlign: 'center' }}>
        <div style={{ fontSize: '48px', marginBottom: '10px' }}>
          {getWeatherIcon(weather.condition)}
        </div>
        <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#2d3748', marginBottom: '5px' }}>
          {weather.temperature}°C
        </div>
        <div style={{ fontSize: '16px', color: '#666', marginBottom: '20px' }}>
          {weather.condition}
        </div>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '14px', fontWeight: '500' }}>{weather.humidity}%</div>
            <div style={{ fontSize: '12px', color: '#666' }}>Humidity</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '14px', fontWeight: '500' }}>{weather.windSpeed} km/h</div>
            <div style={{ fontSize: '12px', color: '#666' }}>Wind</div>
          </div>
        </div>
      </div>
    </Widget>
  );
};
