"use client";
import React from 'react';
import { useState, useEffect } from 'react';

const weatherCode: { [key: number]: string } = {
  0: 'Clear sky',
  1: 'Mainly clear',
  2: 'Partly cloudy',
  3: 'Overcast',
  45: 'Fog',
  48: 'Depositing rime fog',
  51: 'Drizzle: Light',
  53: 'Drizzle: Moderate',
  55: 'Drizzle: Dense intensity',
  56: 'Freezing Drizzle: Light',
  57: 'Freezing Drizzle: Dense intensity',
  61: 'Rain: Slight',
  63: 'Rain: Moderate',
  65: 'Rain: Heavy intensity',
  66: 'Freezing Rain: Light',
  67: 'Freezing Rain: Heavy intensity',
  71: 'Snow fall: Slight',
  73: 'Snow fall: Moderate',
  75: 'Snow fall: Heavy intensity',
  77: 'Snow grains',
  80: 'Rain showers: Slight',
  81: 'Rain showers: Moderate',
  82: 'Rain showers: Violent',
  85: 'Snow showers: Slight',
  86: 'Snow showers: Heavy',
  95: 'Thunderstorm: Slight or moderate',
  96: 'Thunderstorm with slight hail',
  99: 'Thunderstorm with heavy hail',
};

export default function dashboard() {
  const [locationName, setLocationName] = useState<any>('');
  const [weatherData, setWeatherData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    if (!locationName) {
      setError('Please enter a city name');
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);
    setWeatherData(null);

    try {
      const name = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${locationName}&count=10&language=en&format=json`);
      if (!name.ok) {
        throw new Error('Failed to fetch location data');
      }
      const location = await name.json();
      console.log(location);
      if (!location.results || location.results.length === 0) {
        throw new Error('No results found for the specified city');
      }
      const { latitude, longitude } = location.results[0];

      const weather = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`);
      if (!weather.ok) {
        throw new Error('Failed to fetch weather data');
      }
      const weatherData = await weather.json();
      console.log(weatherData);
      setWeatherData(weatherData);
    } catch (error) {
      console.error('Error fetching weather data:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex bg-amber-200 h-screen">
      <div className='flex flex-col h-full w-full items-center justify-center'>
        <nav className='flex flex-row items-center justify-between w-7/12 h-20 glass shadow-md rounded-4xl m-auto mt-10'>
          <div className='flex items-center justify-between ml-6'>
            <h1 className='text-xl font-bold text-black'>Weather Dashboard</h1>
          </div>
          <div className='flex h-fit w-fit mr-6'>
            <form onSubmit={handleSearch}>
              <input
                type="text"
                placeholder="Search city"
                value={locationName}
                onChange={(e) => setLocationName(e.target.value)}
                className="p-2 pl-4 border border-gray-300 rounded-full text-black text-sm" />
              <button
                type="submit"
                disabled={loading}
                className="ml-2 p-2 bg-black text-white rounded-full text-xs cursor-pointer">
                {loading ? 'Searching...' : 'Search'}
              </button>
            </form>
            {error && <p style={{ color: 'red' }}>Error: {error}</p>}
          </div>
        </nav>
        {weatherData ? (
          <div className="flex bg-transparent h-10/12 w-10/12 m-auto mb-10 mt-10 rounded-lg shadow-lg items-center justify-center">
            <div className="flex flex-col items-center justify-center p-4 glass rounded-lg">
              <p className="text-lg mb-2">{locationName}</p>
              <h2 className="text-2xl font-bold mb-4">{weatherData.current_weather.temperature}°C</h2>
              <p className="text-md">Wind Speed: {weatherData.current_weather.windspeed} km/h</p>
              <p className="text-md">Weather: {weatherCode[weatherData.current_weather.weathercode]}</p>
            </div>
          </div>) : (
          <div className="flex flex-col bg-transparent gap-6 h-full w-10/12 m-auto mb-10 mt-10 rounded-lg shadow-lg items-start">
            <div className='flex w-full gap-6 rounded-lg text-white'>
              <div className="flex flex-col h-fit w-1/2 justify-center p-4 glass rounded-lg text-white">
                <div className='flex flex-col justify-center'>
                  <div className='flex items-center'>
                    <img src="/images/location.svg" alt="loc" className='w-4 h-4 mr-1' />
                    <p className="text-2xl">Location Name</p>
                  </div>
                  <p className="text-sm">Time</p>
                </div>
                <div className='flex items-center mt-4 w-fit'>
                  <h1 className="text-7xl">30°<span className="text-5xl">C</span></h1>
                  <div className='flex flex-col ml-6'>
                    <p className='text-md'>Description</p>
                    <p className='text-md'>Feels like: 32°<span className="text-sm">C</span></p>
                  </div>
                </div>
                <p className='text-sm'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae veniam, maxime quasi assumenda temporibus molestiae ipsa exercitationem rerum dolore dolorum optio fugit sapiente voluptatum. Error sapiente veniam iure rerum. Perspiciatis.</p>
              </div>
              <div className="flex flex-col w-1/2 justify-center p-4 glass rounded-lg text-white">
                <div className='flex flex-col justify-center'>
                  <div className='flex items-center'>
                    <img src="/images/location.svg" alt="loc" className='w-4 h-4 mr-1' />
                    <p className="text-2xl">Location Name</p>
                  </div>
                  <p className="text-sm">Time</p>
                </div>
                <div className='flex items-center mt-4 w-fit'>
                  <h1 className="text-7xl">30°<span className="text-5xl">C</span></h1>
                  <div className='flex flex-col ml-6'>
                    <p className='text-md'>Description</p>
                    <p className='text-md'>Feels like: 32°<span className="text-sm">C</span></p>
                  </div>
                </div>
                <p className='text-sm'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae veniam, maxime quasi assumenda temporibus molestiae ipsa exercitationem rerum dolore dolorum optio fugit sapiente voluptatum. Error sapiente veniam iure rerum. Perspiciatis.</p>
              </div>
            </div>
            <h1 className='text-2xl font-bold mb-4'>OverView</h1>
          </div>
        )}
      </div>
    </div>
  )
}