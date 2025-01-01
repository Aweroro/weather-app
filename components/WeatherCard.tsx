import React from 'react';
import Image from 'next/image';
import Spinner from './Spinner';

interface WeatherCardProps {
  isLoading: boolean;
  weatherData: WeatherData | null;
}

interface WeatherData {
  name: string;
  sys: { country: string };
  main: { temp: number };
  weather: { icon: string; description: string }[];
}

const WeatherCard = ({ isLoading, weatherData }: WeatherCardProps) => {
  return (
    <div className="relative bg-opacity-45 flex items-center justify-center w-40 md:w-80 max-w-sm overflow-hidden rounded-lg shadow-md" style={{ height: '200px' }}>
         <div className="absolute inset-0 bg-black opacity-30 z-10"></div>
      {isLoading ? (
        <div className="flex items-center justify-center h-full w-full">
          <Spinner />
        </div>
      ) : weatherData ? (
        <div className="relative z-20 flex flex-col items-center text-center text-white px-4 py-6">
          <div className='flex items-center gap-2'>
            <h2 className="text-xl font-bold">{weatherData.name},</h2>
            <h3 className="text-sm">{weatherData.sys.country}</h3>
          </div>
          <div className="flex items-center space-x-2 mt-2">
            <p className="text-lg font-semibold">{weatherData.main.temp.toFixed(1)}°C</p>
            <Image
              src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png`}
              alt={weatherData.weather[0].description}
              width={40}
              height={40}
            />
          </div>
          <p className="mt-2 text-sm capitalize">{weatherData.weather[0].description}</p>
        </div>
      ) : (
        <p className="text-gray-400">No data available</p>
      )}
    </div>
  );
};

export default WeatherCard;
