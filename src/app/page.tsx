"use client";
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { useState, useEffect } from 'react';
import { strict } from 'assert';

// utils/weatherMapping.ts

export const weatherCodeMapping: Record<string, { day: { description: string; image: string }; night: { description: string; image: string } }> = {
  "0": {
    "day": { "description": "Sunny", "image": "http://openweathermap.org/img/wn/01d@2x.png" },
    "night": { "description": "Clear", "image": "http://openweathermap.org/img/wn/01n@2x.png" }
  },
  "1": {
    "day": { "description": "Mainly Sunny", "image": "http://openweathermap.org/img/wn/01d@2x.png" },
    "night": { "description": "Mainly Clear", "image": "http://openweathermap.org/img/wn/01n@2x.png" }
  },
  "2": {
    "day": { "description": "Partly Cloudy", "image": "http://openweathermap.org/img/wn/02d@2x.png" },
    "night": { "description": "Partly Cloudy", "image": "http://openweathermap.org/img/wn/02n@2x.png" }
  },
  "3": {
    "day": { "description": "Cloudy", "image": "http://openweathermap.org/img/wn/03d@2x.png" },
    "night": { "description": "Cloudy", "image": "http://openweathermap.org/img/wn/03n@2x.png" }
  },
  "45": {
    "day": { "description": "Foggy", "image": "http://openweathermap.org/img/wn/50d@2x.png" },
    "night": { "description": "Foggy", "image": "http://openweathermap.org/img/wn/50n@2x.png" }
  },
  "48": {
    "day": { "description": "Rime Fog", "image": "http://openweathermap.org/img/wn/50d@2x.png" },
    "night": { "description": "Rime Fog", "image": "http://openweathermap.org/img/wn/50n@2x.png" }
  },
  "51": {
    "day": { "description": "Light Drizzle", "image": "http://openweathermap.org/img/wn/09d@2x.png" },
    "night": { "description": "Light Drizzle", "image": "http://openweathermap.org/img/wn/09n@2x.png" }
  },
  "53": {
    "day": { "description": "Drizzle", "image": "http://openweathermap.org/img/wn/09d@2x.png" },
    "night": { "description": "Drizzle", "image": "http://openweathermap.org/img/wn/09n@2x.png" }
  },
  "55": {
    "day": { "description": "Heavy Drizzle", "image": "http://openweathermap.org/img/wn/09d@2x.png" },
    "night": { "description": "Heavy Drizzle", "image": "http://openweathermap.org/img/wn/09n@2x.png" }
  },
  "56": {
    "day": { "description": "Light Freezing Drizzle", "image": "http://openweathermap.org/img/wn/09d@2x.png" },
    "night": { "description": "Light Freezing Drizzle", "image": "http://openweathermap.org/img/wn/09n@2x.png" }
  },
  "57": {
    "day": { "description": "Freezing Drizzle", "image": "http://openweathermap.org/img/wn/09d@2x.png" },
    "night": { "description": "Freezing Drizzle", "image": "http://openweathermap.org/img/wn/09n@2x.png" }
  },
  "61": {
    "day": { "description": "Light Rain", "image": "http://openweathermap.org/img/wn/10d@2x.png" },
    "night": { "description": "Light Rain", "image": "http://openweathermap.org/img/wn/10n@2x.png" }
  },
  "63": {
    "day": { "description": "Rain", "image": "http://openweathermap.org/img/wn/10d@2x.png" },
    "night": { "description": "Rain", "image": "http://openweathermap.org/img/wn/10n@2x.png" }
  },
  "65": {
    "day": { "description": "Heavy Rain", "image": "http://openweathermap.org/img/wn/10d@2x.png" },
    "night": { "description": "Heavy Rain", "image": "http://openweathermap.org/img/wn/10n@2x.png" }
  },
  "66": {
    "day": { "description": "Light Freezing Rain", "image": "http://openweathermap.org/img/wn/10d@2x.png" },
    "night": { "description": "Light Freezing Rain", "image": "http://openweathermap.org/img/wn/10n@2x.png" }
  },
  "67": {
    "day": { "description": "Freezing Rain", "image": "http://openweathermap.org/img/wn/10d@2x.png" },
    "night": { "description": "Freezing Rain", "image": "http://openweathermap.org/img/wn/10n@2x.png" }
  },
  "71": {
    "day": { "description": "Light Snow", "image": "http://openweathermap.org/img/wn/13d@2x.png" },
    "night": { "description": "Light Snow", "image": "http://openweathermap.org/img/wn/13n@2x.png" }
  },
  "73": {
    "day": { "description": "Snow", "image": "http://openweathermap.org/img/wn/13d@2x.png" },
    "night": { "description": "Snow", "image": "http://openweathermap.org/img/wn/13n@2x.png" }
  },
  "75": {
    "day": { "description": "Heavy Snow", "image": "http://openweathermap.org/img/wn/13d@2x.png" },
    "night": { "description": "Heavy Snow", "image": "http://openweathermap.org/img/wn/13n@2x.png" }
  },
  "77": {
    "day": { "description": "Snow Grains", "image": "http://openweathermap.org/img/wn/13d@2x.png" },
    "night": { "description": "Snow Grains", "image": "http://openweathermap.org/img/wn/13n@2x.png" }
  },
  "80": {
    "day": { "description": "Light Showers", "image": "http://openweathermap.org/img/wn/09d@2x.png" },
    "night": { "description": "Light Showers", "image": "http://openweathermap.org/img/wn/09n@2x.png" }
  },
  "81": {
    "day": { "description": "Showers", "image": "http://openweathermap.org/img/wn/09d@2x.png" },
    "night": { "description": "Showers", "image": "http://openweathermap.org/img/wn/09n@2x.png" }
  },
  "82": {
    "day": { "description": "Heavy Showers", "image": "http://openweathermap.org/img/wn/09d@2x.png" },
    "night": { "description": "Heavy Showers", "image": "http://openweathermap.org/img/wn/09n@2x.png" }
  },
  "85": {
    "day": { "description": "Light Snow Showers", "image": "http://openweathermap.org/img/wn/13d@2x.png" },
    "night": { "description": "Light Snow Showers", "image": "http://openweathermap.org/img/wn/13n@2x.png" }
  },
  "86": {
    "day": { "description": "Snow Showers", "image": "http://openweathermap.org/img/wn/13d@2x.png" },
    "night": { "description": "Snow Showers", "image": "http://openweathermap.org/img/wn/13n@2x.png" }
  },
  "95": {
    "day": { "description": "Thunderstorm", "image": "http://openweathermap.org/img/wn/11d@2x.png" },
    "night": { "description": "Thunderstorm", "image": "http://openweathermap.org/img/wn/11n@2x.png" }
  },
  "96": {
    "day": { "description": "Light Thunderstorms With Hail", "image": "http://openweathermap.org/img/wn/11d@2x.png" },
    "night": { "description": "Light Thunderstorms With Hail", "image": "http://openweathermap.org/img/wn/11n@2x.png" }
  },
  "99": {
    "day": { "description": "Thunderstorm With Hail", "image": "http://openweathermap.org/img/wn/11d@2x.png" },
    "night": { "description": "Thunderstorm With Hail", "image": "http://openweathermap.org/img/wn/11n@2x.png" }
  }
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

      const weather = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=precipitation_sum,temperature_2m_max,temperature_2m_min,weather_code,sunrise,sunset,uv_index_max&hourly=temperature_2m,relative_humidity_2m,wind_speed_10m,apparent_temperature,precipitation,visibility,weather_code,is_day&current_weather=true&timezone=auto`);
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

  const time = new Date();
  const formattedTime = time.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  });

  return (
    <div className="flex background h-screen">
      <div className='flex flex-col h-full w-full items-center justify-center'>

        <nav className='flex flex-row items-center justify-between w-10/12 h-20 translucent shadow-md rounded-4xl m-auto mt-10 shrink-0'>
          <div className='flex items-center justify-between ml-6'>
            <h1 className='text-xl font-bold text-black'>Weather Dashboard</h1>
          </div>
          <div className='flex h-fit w-2/6 mr-6'>
            <form onSubmit={handleSearch} className='flex w-full'>
              <input
                type="text"
                placeholder="Search city"
                value={locationName}
                onChange={(e) => setLocationName(e.target.value)}
                className="p-2 pl-4 border border-white rounded-full text-black text-sm w-full" />
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

        {weatherData && (
          <div className="flex flex-col bg-transparent gap-6 h-full w-10/12 m-auto mb-10 mt-10 rounded-lg shadow-lg items-start p-6">
            <div className='flex w-full h-5/12 gap-6 rounded-lg text-white'>
              <div className="flex flex-col w-1/2 h-full p-4 translucent rounded-lg text-white flex-1">
                <div className='flex justify-between items-center'>
                  <div className='flex items-center'>
                    <img src="/images/location.svg" alt="loc" className='w-8 h-8 mr-1' />
                    <p className="text-4xl">{locationName.charAt(0).toUpperCase() + locationName.slice(1)}</p>
                  </div>
                  <p className="text-lg">{weatherData.current_weather.time.split("T")[1]}</p>
                </div>
                <div className='flex flex-col items-center justify-center mt-6 w-full'>
                  <h1 className="text-9xl mb-4">{weatherData.current_weather.temperature}°<span className="text-6xl">C</span></h1>
                  <div className='flex justify-between items-center w-full gap-2'>
                    <div className='flex flex-col'>
                      <p className='text-lg font-semibold ml-4'>Feels like: {weatherData.hourly.apparent_temperature[0]}°<span className="text-sm">C</span></p>
                      <div className='flex items-center'>
                        {weatherData.current_weather.weathercode !== undefined &&
                          weatherCodeMapping[weatherData.current_weather.weathercode] && (
                            <img
                              src={weatherData.hourly.is_day === 1 ? weatherCodeMapping[weatherData.current_weather.weathercode].day.image : weatherCodeMapping[weatherData.current_weather.weathercode].night.image}
                              alt={weatherData.hourly.is_day === 1 ? weatherCodeMapping[weatherData.current_weather.weathercode].day.description : weatherCodeMapping[weatherData.current_weather.weathercode].night.description}
                              className="w-10 h-10"
                            />
                          )}
                        <p className='text-lg font-semibold'>
                          {weatherData.current_weather.weathercode !== undefined &&
                            weatherCodeMapping[weatherData.current_weather.weathercode] ?
                            (weatherData.hourly.is_day == 1
                              ? weatherCodeMapping[weatherData.current_weather.weathercode].day.description
                              : weatherCodeMapping[weatherData.current_weather.weathercode].night.description)
                            : 'N/A'}
                        </p>
                      </div>
                    </div>
                    <p className="text-md ">{weatherData.current_weather.time.split("T")[0]}</p>
                  </div>
                </div>
              </div>
              <div className="flex flex-col w-1/2 justify-start p-4 translucent rounded-lg text-white flex-1">
                <div className='flex flex-col w-full'>
                  <div className='flex items-center mb-4 mt-2'>
                    <img src="/images/week.svg" alt="loc" className='w-8 h-8 mr-1' />
                    <p className="text-4xl">Week</p>
                  </div>
                  <div className='flex items-center w-full mt-4'>
                    {weatherData && weatherData.daily && (
                      <Swiper
                        spaceBetween={10}
                        slidesPerView={7}
                        className="w-full"
                      >
                        {/* Filter and then map for the next 7 days */}
                        {weatherData.daily.time
                          .filter((time: string) => {
                            const forecastDate = new Date(time);
                            const today = new Date();
                            // Normalize 'today' to start of day for accurate comparison
                            today.setHours(0, 0, 0, 0);
                            forecastDate.setHours(0, 0, 0, 0); // Normalize forecast date too

                            // Ensure forecastDate is today or in the future
                            return forecastDate.getTime() >= today.getTime();
                          })
                          .slice(0, 7) // Take the next 7 days (including today)
                          .map((time: string, index: number) => {
                            // It's crucial here to find the ORIGINAL index
                            // because filtering changes the temporary index.
                            // This ensures we get the correct weather data.
                            const originalIndex = weatherData.daily.time.indexOf(time);

                            const weathercode = weatherData.daily.weather_code[originalIndex];
                            const weatherInfo = weatherCodeMapping[weathercode];

                            return (
                              <SwiperSlide key={time}>
                                <div className='flex flex-col items-center p-2 text-white rounded-2xl translucent-glass'>
                                  <p className="font-bold text-lg">{new Date(time).toLocaleDateString('en-US', { weekday: 'short' })}</p>
                                  <p className="text-md">{new Date(time).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</p>
                                  <img
                                    src={weatherData.hourly.is_day === 1 ? weatherInfo?.day.image : weatherInfo?.night.image || '/images/default.png'}
                                    alt={weatherData.hourly.is_day === 1 ? weatherInfo?.day.description : weatherInfo?.night.description || 'Unknown weather'}
                                    className="w-10 h-10 mt-2"
                                  />

                                  <h1 className="text-lg mt-2 font-semibold">{weatherData.daily.temperature_2m_max[originalIndex]}°<span className="text-md">C</span></h1>
                                  <p className="text-xs mb-2">Min: {weatherData.daily.temperature_2m_min[originalIndex]}°<span className="text-xs">C</span></p>
                                  {/* <p className="text-xs mt-1">{weatherInfo?.description || 'N/A'}</p> */}
                                </div>
                              </SwiperSlide>
                            );
                          })}
                      </Swiper>)}
                  </div>
                </div>
              </div>
            </div>
            <div className='flex w-full h-7/12 gap-6 rounded-lg text-white'>
              <div className='flex flex-col w-1/2 h-fit justify-start p-4 translucent rounded-lg text-white flex-1'>
                <div className='flex flex-col justify-center w-full mb-4'>
                  <div className='flex items-center mb-4 mt-2'>
                    <img src="/images/today.svg" alt="loc" className='w-8 h-8 mr-1' />
                    <p className="text-4xl">Today</p>
                  </div>
                  <div className='flex items-center mt-4 w-full'>
                    <Swiper
                      spaceBetween={10}
                      slidesPerView={7}
                      // centeredSlides={true}
                      initialSlide={(() => {
                        if (!weatherData || !weatherData.hourly || !weatherData.hourly.time || !weatherData.timezone) return 0;

                        const currentTime = new Date();
                        const formatter = new Intl.DateTimeFormat('en-US', {
                          timeZone: weatherData.timezone,
                          hour: 'numeric',
                          day: 'numeric',
                          month: 'numeric',
                          year: 'numeric',
                        });

                        let currentHourIndex = -1;
                        for (let i = 0; i < weatherData.hourly.time.length; i++) {
                          const forecastTime = new Date(weatherData.hourly.time[i]);
                          forecastTime.setMinutes(0, 0, 0);

                          if (forecastTime.getTime() >= currentTime.getTime()) {
                            currentHourIndex = i;
                            break;
                          }
                        }

                        // If currentHourIndex is found, we want to center it.
                        // If slidesPerView is 7, we want the current slide to be at position 3 (index 3)
                        // So, `initialSlide = currentHourIndex - (slidesPerView / 2 - 0.5)`
                        // For slidesPerView=7, (7/2 - 0.5) = 3.5 - 0.5 = 3
                        // So, initialSlide = currentHourIndex - 3;
                        const slidesPerView = 7; // Matches your Swiper prop
                        const offset = Math.floor(slidesPerView / 2); // For 7 slides, offset is 3

                        return Math.max(0, currentHourIndex - offset);
                      })()}
                      className="w-full"
                    >
                      {weatherData && weatherData.hourly && weatherData.hourly.time
                        .map((time: string, index: number) => {
                          const weathercode = weatherData.hourly.weather_code[index];
                          const weatherInfo = weatherCodeMapping[weathercode];

                          // Determine if this is the current hour for highlighting (optional)
                          const forecastTime = new Date(time);
                          const currentTime = new Date();
                          const isCurrentHour =
                            forecastTime.getFullYear() === currentTime.getFullYear() &&
                            forecastTime.getMonth() === currentTime.getMonth() &&
                            forecastTime.getDate() === currentTime.getDate() &&
                            forecastTime.getHours() === currentTime.getHours();

                          return (
                            <SwiperSlide key={time}>
                              <div className={`flex flex-col items-center p-4 text-white rounded-2xl translucent-glass ${isCurrentHour ? 'border-2 border-blue-400' : ''}`}>
                                <p className="text-md">{new Date(time).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false })}</p>
                                <img
                                  src={weatherData.hourly.is_day === 1 ? weatherInfo?.day.image : weatherInfo?.night.image || '/images/default.png'}
                                  alt={weatherData.hourly.is_day === 1 ? weatherInfo?.day.description : weatherInfo?.night.description || 'Unknown weather'}
                                  className="w-10 h-10 mt-2"
                                />
                                <h1 className="text-lg mt-2">{weatherData.hourly.temperature_2m[index]}°<span className="text-sm">C</span></h1>
                              </div>
                            </SwiperSlide>
                          );
                        })}
                    </Swiper>
                  </div>
                </div>
              </div>
              <div className='flex flex-col w-1/2 h-full justify-start rounded-lg text-white flex-1'>
                <div className="grid grid-cols-2 gap-4 h-full">
                  <div className="flex flex-col p-4 translucent rounded-lg text-white flex-1">
                    <div className='flex items-center mb-4 mt-2'>
                      <img src="/images/humidity.svg" alt="loc" className='w-8 h-8 mr-1' />
                      <p className="text-2xl">Humidity</p>
                    </div>
                    <span className="text-3xl">{weatherData.hourly.relative_humidity_2m[0]}%</span>
                  </div>
                  <div className="flex flex-col p-4 translucent rounded-lg text-white flex-1">
                    <div className='flex items-center mb-4 mt-2'>
                      <img src="/images/wind.svg" alt="loc" className='w-8 h-8 mr-1' />
                      <p className="text-2xl">Wind Speed</p>
                    </div>
                    <span className="text-3xl">{weatherData.hourly.wind_speed_10m[0]} m/s</span>
                  </div>
                  <div className="flex flex-col p-4 translucent rounded-lg text-white flex-1">
                    <div className='flex items-center mb-4 mt-2'>
                      <img src="/images/visibility.svg" alt="loc" className='w-8 h-8 mr-1' />
                      <p className="text-2xl">Visibility</p>
                    </div>
                    <span className="text-3xl">{weatherData.hourly.visibility[0]} m</span>
                  </div>
                  <div className="flex flex-col p-4 translucent rounded-lg text-white flex-1">
                    <div className='flex items-center mb-4 mt-2'>
                      <img src="/images/rain.svg" alt="loc" className='w-8 h-8 mr-1' />
                      <p className="text-2xl">Precipitation</p>
                    </div>
                    <span className="text-3xl">{weatherData.daily.precipitation_sum[0]} mm</span>
                  </div>
                  <div className="flex gap-1 p-4 w-full justify-evenly items-center translucent rounded-lg text-white flex-1">
                    <div className='flex flex-col items-center justify-between'>
                      <img src="/images/sunrise.svg" alt="loc" className='w-8 h-8 mb-1' />
                      <p className="text-xl">Sunrise</p>
                      <span className="text-lg">{(() => {
                        const sunriseTime = new Date(weatherData.daily.sunrise[0]);
                        const formattedSunriseTime = sunriseTime.toLocaleTimeString('en-US', {
                          hour: '2-digit',
                          minute: '2-digit',
                          hour12: true
                        });
                        return formattedSunriseTime;
                      })()}</span>
                    </div>
                    <div className='flex flex-col items-center justify-between'>
                      <img src="/images/sunset.svg" alt="loc" className='w-8 h-8 mb-1' />
                        <p className="text-xl">Sunset</p>
                        <span className="text-lg">{(() => {
                          const sunsetTime = new Date(weatherData.daily.sunset[0]);
                          const formattedSunsetTime = sunsetTime.toLocaleTimeString('en-US', {
                            hour: '2-digit',
                            minute: '2-digit',
                            hour12: true
                          });
                          return formattedSunsetTime;
                        })()}</span>
                    </div>
                  </div>
                  <div className="flex flex-col border-2 p-4 translucent rounded-lg text-white flex-1">
                    <div className='flex items-center mb-4 mt-2'>
                      <img src="/images/uv-index.png" alt="loc" className='w-8 h-8 mr-1' />
                      <p className="text-2xl">UV Index</p>
                    </div>
                    <span className="text-3xl">{weatherData.daily.uv_index_max[0]}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>)}
      </div>
    </div>
  )
}