'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import WeatherCard from '../components/WeatherCard';
import Link from 'next/link';

interface WeatherData {
  name: string;
  sys: { country: string };
  main: { temp: number };
  weather: { icon: string; description: string }[];
}

const randomCities = ['Tokyo', 'Sydney', 'New York', 'Berlin', 'Cape Town', 'Mumbai', 'Los Angeles', 'London', 'Beijing', 'Hong Kong', 'Cairo', 'Lagos', 'Dubai'];

export default function LandingPage() {
  const [weather, setWeather] = useState<(WeatherData | null)[]>([null, null, null]);
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

      const weatherData = [...weather]; 

      const userWeather = await fetchWeatherByLocation(userLocation.lat, userLocation.lon);
      if (userWeather) weatherData[0] = userWeather;
      setWeather([...weatherData]);

      const city1Weather = await fetchWeatherByCity(randomCity1);
      if (city1Weather) weatherData[1] = city1Weather;
      setWeather([...weatherData]);

      const city2Weather = await fetchWeatherByCity(randomCity2);
      if (city2Weather) weatherData[2] = city2Weather;
      setWeather([...weatherData]);
    } catch (err) {
      setError('Error fetching weather data.');
    }
  };

  useEffect(() => {
    fetchWeatherData();
  }, []);

  return (
    <div className="relative py-4 flex flex-col items-center justify-center overflow-auto">
      <h1 className="max-w-xl lg:max-w-4xl mx-4 text-center text-3xl md:text-4xl lg:text-6xl text-white font-semibold">
        Explore the <span className='text-blue-400 font-bold'>weather</span> across different <span className='text-blue-400'>regions</span> and <span className='text-blue-400'>zones</span> of the world.
      </h1>

     <div className='flex items-center mt-10 space-y-2 flex-col'>
        <h2 className='max-w-xl text-center text-white mx-4 text-lg lg:text-2xl'>Sign in to get started and access search functionality and save your preferences</h2>
        <Link 
        className='border rounded p-2 bg-blue-400 text-white font-semibold hover:font-bold text-lg'
        href="/api/auth/login"
        >Get Started
        </Link>
     </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:grid-cols-3 mt-8">
        {error ? (
          <p className="text-red-500 text-lg font-semibold">{error}</p>
        ) : (
          weather.map((data, index) => (
            <WeatherCard key={index} isLoading={!data} weatherData={data} />
          ))
        )}
      </div>
    </div>
  );
}
