import React from 'react';
import type { HourlyForecast } from '../types';
import { getWeatherInfo } from '../utils/weatherUtils';
import { Droplets } from 'lucide-react';

interface HourlyForecastProps {
  hourly: HourlyForecast;
}

const HourlyForecast: React.FC<HourlyForecastProps> = ({ hourly }) => {
  // Get current hour to start forecast from now
  const now = new Date();
  const currentHour = now.getHours();
  
  // Find the index of the current hour in the forecast data
  const startIndex = hourly.time.findIndex(t => new Date(t).getHours() === currentHour);

  // Take the next 24 hours from the current hour
  const forecastHours = hourly.time.slice(startIndex, startIndex + 24).map((time, i) => {
    const index = startIndex + i;
    return {
      time: new Date(time).toLocaleTimeString('fa-IR', { hour: '2-digit', minute: '2-digit' }),
      weatherInfo: getWeatherInfo(hourly.weather_code[index], true), // Assuming day for icon simplicity
      temp: Math.round(hourly.temperature_2m[index]),
      precip: hourly.precipitation_probability[index],
    };
  });

  return (
    <div>
      <h3 className="text-2xl font-semibold mb-4 text-center md:text-right">پیش‌بینی ساعتی</h3>
      <div className="flex space-x-3 space-x-reverse overflow-x-auto pb-4 -mb-4">
        {forecastHours.map((hour, index) => (
          <div key={index} className="flex-shrink-0 w-28 bg-black/25 p-4 rounded-xl text-center backdrop-blur-md border border-white/10 flex flex-col items-center justify-between space-y-2">
            <p className="font-medium text-sm">{hour.time}</p>
            <div className="w-10 h-10 my-1 text-white/90">{hour.weatherInfo.icon}</div>
            <p className="font-bold text-xl">{hour.temp}°</p>
            <div className="flex items-center justify-center gap-1 text-xs text-blue-300">
              <Droplets size={12} />
              <span>{hour.precip}%</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HourlyForecast;
