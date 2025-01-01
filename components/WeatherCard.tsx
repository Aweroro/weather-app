import React from 'react';
import Image from 'next/image';

interface WeatherCardProps {
  city: string;
  country: string;
  temperature: number;
  weatherIcon: string;
  description: string;
  unit: 'metric' | 'imperial';
}

const WeatherCard = ({
  city,
  country,
  temperature,
  weatherIcon,
  description,
  unit,
}: WeatherCardProps) => {
  return (
    <div className="relative flex items-center justify-center w-full max-w-sm overflow-hidden rounded-lg shadow-md bg-cover bg-center" style={{ height: '200px' }}>
      {/* Background Image */}
      <Image
        src="/assets/bg-image2.jpg"
        alt="background"
        layout="fill"
        objectFit="cover"
        className="absolute inset-0 z-0"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black opacity-30 z-10"></div>

      {/* Weather Info */}
      <div className="relative z-20 flex flex-col items-center text-center text-white px-4 py-6">
        <h2 className="text-xl font-bold">{city}</h2>
        <h3 className="text-sm">{country}</h3>
        <div className="flex items-center space-x-2 mt-2">
          <p className="text-lg font-semibold">{temperature.toFixed(1)}°{unit === 'metric' ? 'C' : 'F'}</p>
          <Image
            src={weatherIcon}
            alt={description}
            width={40}
            height={40}
          />
        </div>
        <p className="mt-2 text-sm capitalize">{description}</p>
      </div>
    </div>
  );
};

export default WeatherCard;
