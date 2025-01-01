'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import WeatherCard from '../components/WeatherCard';

interface WeatherData {
  name: string;
  sys: { country: string };
  main: { temp: number };
  weather: { icon: string; description: string }[];
}

const randomCities = ['Tokyo', 'Sydney', 'New York', 'Berlin', 'Cape Town', 'Mumbai'];

export default function LandingPage() {
  const [weather, setWeather] = useState<WeatherData[]>([]);
  const [error, setError] = useState('');

  const fetchWeatherByCity = async (city: string): Promise<WeatherData | null> => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}`
      );
      return response.data;
    } catch (error) {
      console.error(`Error fetching weather for ${city}:`, error);
      return null;
    }
  };

  const fetchWeatherByLocation = async (lat: number, lon: number): Promise<WeatherData | null> => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}`
      );
      return response.data;
    } catch (error) {
      console.error('Error fetching weather for user location:', error);
      return null;
    }
  };

  const fetchWeatherData = async () => {
    try {
      const userLocation = await new Promise<{ lat: number; lon: number }>((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(
          (position) =>
            resolve({
              lat: position.coords.latitude,
              lon: position.coords.longitude,
            }),
          (err) => {
            console.error('Error fetching user location:', err);
            reject(err);
          }
        );
      });

      const randomCity1 = randomCities[Math.floor(Math.random() * randomCities.length)];
      const randomCity2 = randomCities[Math.floor(Math.random() * randomCities.length)];

      const [userWeather, city1Weather, city2Weather] = await Promise.all([
        fetchWeatherByLocation(userLocation.lat, userLocation.lon),
        fetchWeatherByCity(randomCity1),
        fetchWeatherByCity(randomCity2),
      ]);

      // Filter out null values and set the valid weather data
      setWeather([userWeather, city1Weather, city2Weather].filter((data): data is WeatherData => data !== null));
    } catch (err) {
      setError('Error fetching weather data.');
    }
  };

  useEffect(() => {
    fetchWeatherData();
  }, []);

  return (
    <div className="relative flex flex-col items-center justify-center overflow-auto">
      <h1 className="max-w-xl lg:max-w-4xl mx-4 text-center text-3xl md:text-4xl lg:text-6xl text-white font-bold">
        Explore the weather across different regions and zones of the world.
      </h1>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 mt-8">
        {error ? (
          <p className="text-red-500 text-lg font-semibold">{error}</p>
        ) : weather.length > 0 ? (
          weather.map((weather, index) => (
            <WeatherCard
              key={index}
              city={weather.name}
              country={weather.sys.country}
              temperature={weather.main.temp}
              weatherIcon={`https://openweathermap.org/img/wn/${weather.weather[0].icon}.png`}
              description={weather.weather[0].description}
              unit="metric"
            />
          ))
        ) : (
          <p className="text-lg animate-pulse">Loading weather data...</p>
        )}
      </div>
    </div>
  );
}

