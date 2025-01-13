'use client';
import React, { useState, useEffect, useRef } from 'react';
import { withPageAuthRequired, useUser } from '@auth0/nextjs-auth0/client';
import axios from 'axios';
import Spinner from '../../components/Spinner';
import WeatherCard from '../../components/WeatherCard';

interface WeatherData {
  name: string;
  sys: { country: string };
  main: { temp: number };
  weather: { icon: string; description: string }[];
}

interface LocationSuggestion {
  name: string;
  country: string;
}

const WeatherSearch: React.FC = () => {
  const { user, isLoading: userLoading } = useUser();
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [favoriteCities, setFavoriteCities] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [locationSuggestions, setLocationSuggestions] = useState<LocationSuggestion[]>([]);
  const [favoriteLimitError, setFavoriteLimitError] = useState<string>('');

  const suggestionsRef = useRef<HTMLDivElement | null>(null); 

  useEffect(() => {
    try {
      const savedFavorites = JSON.parse(localStorage.getItem("favoriteCities") || "[]");
      setFavoriteCities(savedFavorites);
      console.log("Loaded favorites:", savedFavorites);
    } catch (error) {
      console.error("Failed to parse favorites from localStorage", error);
      setFavoriteCities([]);
    }
  }, []);
  
  useEffect(() => {
    if (favoriteCities.length) {
      localStorage.setItem("favoriteCities", JSON.stringify(favoriteCities));
      console.log("Favorites saved:", favoriteCities);
    }
  }, [favoriteCities]);

  const fetchSuggestions = async (query: string) => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=5&appid=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}`
      );
      setLocationSuggestions(response.data.map((location: any) => ({
        name: location.name,
        country: location.country,
      })));
    } catch (error) {
      setLocationSuggestions([]);
    }
  };

  const handleSearch = async (city: string) => {
    setSearchQuery(city);
    setLocationSuggestions([]);
    setIsLoading(true);
    setErrorMessage('');

    try {
      const response = await axios.get<WeatherData>(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}`
      );
      setWeatherData(response.data);
    } catch (error) {
      setErrorMessage('City not found. Please try again.');
      setWeatherData(null);
    } finally {
      setIsLoading(false);
    }
  };

  const addToFavorites = (city: string) => {
    if (favoriteCities.length >= 5) {
      setFavoriteLimitError('You can only have up to 5 favorite cities.');
    } else if (!favoriteCities.includes(city)) {
      const updatedFavorites = [...favoriteCities, city];
      setFavoriteCities(updatedFavorites);
      localStorage.setItem('favoriteCities', JSON.stringify(updatedFavorites));
      setFavoriteLimitError('');
    }
  };

  const removeFromFavorites = (city: string) => {
    setFavoriteCities(favoriteCities.filter((favorite) => favorite !== city));
  };

  const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    if (e.target.value.length > 2) {
      fetchSuggestions(e.target.value);
    }
  };

  const handleClickOutside = (e: MouseEvent) => {
    if (suggestionsRef.current && !suggestionsRef.current.contains(e.target as Node)) {
      setLocationSuggestions([]);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  if (userLoading || !user) {
    return <Spinner />;
  }

  console.log("Favorites saved:", JSON.parse(localStorage.getItem("favoriteCities") || "[]"));

  return (
    <div className="max-w-lg mx-auto mt-6">
      <div className="mb-4 relative">
        <input
          type="text"
          placeholder="Search city..."
          value={searchQuery}
          onChange={handleQueryChange}
          className="w-full p-3 border rounded"
        />
        {searchQuery.length > 2 && (
          <div ref={suggestionsRef} className="absolute w-full bg-white border rounded mt-1 z-10">
            {locationSuggestions.map((suggestion, index) => (
              <li
                key={index}
                className="p-2 cursor-pointer hover:bg-gray-200"
                onClick={() => handleSearch(suggestion.name)}
              >
                {suggestion.name}, {suggestion.country}
              </li>
            ))}
          </div>
        )}
      </div>

      <button
        onClick={() => handleSearch(searchQuery)}
        className="w-full bg-blue-500 text-white p-3 rounded mt-2 hover:bg-blue-600"
      >
        Search
      </button>
      {errorMessage && <p className="text-red-500 mt-2">{errorMessage}</p>}
      {favoriteLimitError && <p className="text-red-500 mt-2">{favoriteLimitError}</p>}

      {weatherData && (
        <div className="flex justify-center mt-4">
          <WeatherCard isLoading={isLoading} weatherData={weatherData} />
        </div>
      )}

      {weatherData && (
        <button
          onClick={() => addToFavorites(weatherData.name)}
          className="mt-4 bg-slate-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Add to Favorites
        </button>
      )}

      {favoriteCities.length > 0 && (
        <div className="mt-8">
          <h3 className="text-xl font-bold mb-4">Favorite Cities</h3>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {favoriteCities.map((city) => (
              <li key={city} className="flex justify-between items-center bg-gray-100 p-2 rounded">
                <span
                  className="cursor-pointer text-blue-500 hover:underline"
                  onClick={() => handleSearch(city)}
                >
                  {city}
                </span>
                <button
                  onClick={() => removeFromFavorites(city)}
                  className="text-red-500 hover:text-red-700"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default withPageAuthRequired(WeatherSearch);
