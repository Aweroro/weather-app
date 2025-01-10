'use client'
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import {withPageAuthRequired, useUser } from '@auth0/nextjs-auth0/client';
import axios from 'axios';
import Spinner from '../../components/Spinner';

interface WeatherData {
  city: string;
  temperature: string;
  condition: string;
  iconUrl: string;
}

const WeatherSearch = () => {
  const { user, isLoading } = useUser();
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [weatherResults, setWeatherResults] = useState<WeatherData | null>(null);
  const [favoriteCities, setFavoriteCities] = useState<string[]>([]);
  const [errorMessage, setErrorMessage] = useState<string>('');

  if(isLoading || !user){
    return <Spinner/>
  }

  useEffect(() => {
    const savedFavorites = localStorage.getItem('favoriteCities');
    if (savedFavorites) {
      setFavoriteCities(JSON.parse(savedFavorites));
    }
  }, []);

  const handleSearch = async () => {
    if (!searchQuery) return;

    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${searchQuery}&appid=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}`
      );
      const data = response.data;

      setWeatherResults({
        city: data.name,
        temperature: `${data.main.temp}°C`,
        condition: data.weather[0].description,
        iconUrl: `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`,
      });

      setErrorMessage('');
    } catch (error) {
      setErrorMessage('City not found. Please try again.');
      setWeatherResults(null);
    }
  };

  const addToFavorites = (city: string) => {
    if (!favoriteCities.includes(city)) {
      const updatedFavorites = [...favoriteCities, city];
      setFavoriteCities(updatedFavorites);
      localStorage.setItem('favoriteCities', JSON.stringify(updatedFavorites));
    }
  };

  return (
    <div className="max-w-lg mx-auto">
      <h1 className="text-3xl font-bold mb-4 text-center">Weather Search</h1>

      <div className="mb-4">
        <input
          type="text"
          placeholder="Search city..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full p-3 border rounded"
        />
        <button
          onClick={handleSearch}
          className="w-full bg-blue-500 text-white p-3 rounded mt-2 hover:bg-blue-600"
        >
          Search
        </button>
        {errorMessage && <p className="text-red-500 mt-2">{errorMessage}</p>}
      </div>

      {weatherResults && (
        <div className="text-center mt-6">
          <h2 className="text-xl font-bold">{weatherResults.city}</h2>
          <p>{weatherResults.temperature}</p>
          <p>{weatherResults.condition}</p>
          <Image
            src={weatherResults.iconUrl}
            alt="Weather Icon"
            width={100}
            height={100}
            className="mx-auto"
          />
          <button
            onClick={() => addToFavorites(weatherResults.city)}
            className="mt-4 bg-green-500 text-white p-2 rounded hover:bg-green-600"
          >
            Add to Favorites
          </button>
        </div>
      )}

      {favoriteCities.length > 0 && (
        <div className="mt-8">
          <h3 className="text-xl font-bold mb-4">Favorite Cities</h3>
          <ul className="list-disc pl-6">
            {favoriteCities.map((city) => (
              <li key={city}>{city}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default withPageAuthRequired(WeatherSearch)
   