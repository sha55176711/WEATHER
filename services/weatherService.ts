import type { WeatherAPIResponse } from '../types';

const WEATHER_API_URL = 'https://api.open-meteo.com/v1/forecast';

export const fetchWeather = async (latitude: number, longitude: number): Promise<WeatherAPIResponse> => {
  const params = new URLSearchParams({
    latitude: latitude.toString(),
    longitude: longitude.toString(),
    current: 'temperature_2m,relative_humidity_2m,apparent_temperature,is_day,weather_code,wind_speed_10m',
    hourly: 'temperature_2m,weather_code,precipitation_probability',
    daily: 'weather_code,temperature_2m_max,temperature_2m_min,sunrise,sunset,uv_index_max,precipitation_sum',
    timezone: 'auto',
  });

  const response = await fetch(`${WEATHER_API_URL}?${params.toString()}`);
  if (!response.ok) {
    throw new Error('خطا در دریافت اطلاعات آب و هوا.');
  }
  return response.json();
};
