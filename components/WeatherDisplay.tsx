import React from 'react';
import type { WeatherData } from '../types';
import { getWeatherInfo } from '../utils/weatherUtils';
import { Sunrise, Sunset, Droplets } from 'lucide-react';
import WeatherInfoGrid from './WeatherInfoGrid';
import HourlyForecast from './HourlyForecast';

interface WeatherDisplayProps {
  data: WeatherData;
}

const WeatherDisplay: React.FC<WeatherDisplayProps> = ({ data }) => {
  const { name, current, hourly, daily } = data;
  const { description } = getWeatherInfo(current.weather_code, current.is_day === 1);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 animate-fade-in">
      {/* Main Info Section */}
      <div className="lg:col-span-3 flex flex-col justify-center items-center lg:items-start text-center lg:text-right p-8 animate-fade-in-up" style={{ animationDelay: '100ms' }}>
        <h2 className="text-4xl md:text-5xl font-bold text-shadow">{name}</h2>
        <p className="text-8xl md:text-9xl font-thin my-4 text-shadow-lg">{Math.round(current.temperature_2m)}°</p>
        <div className='text-center lg:text-right'>
          <p className="text-2xl font-semibold text-white/90 text-shadow">{description}</p>
          <div className="flex justify-center lg:justify-start items-baseline gap-4 mt-2 font-medium text-white/90 text-shadow">
              <span>حداکثر: {Math.round(daily.temperature_2m_max[0])}°</span>
              <span>حداقل: {Math.round(daily.temperature_2m_min[0])}°</span>
          </div>
        </div>
      </div>

      {/* Details Panel */}
      <div className="lg:col-span-2 bg-black/30 p-4 sm:p-6 rounded-2xl backdrop-blur-lg border border-white/10 shadow-2xl h-full lg:max-h-[80vh] lg:overflow-y-auto animate-fade-in-up" style={{ animationDelay: '200ms' }}>
        <WeatherInfoGrid current={current} daily={daily} />
        
        <hr className="border-white/10 my-6" />

        <HourlyForecast hourly={hourly} />
        
        <hr className="border-white/10 my-6" />

        <div>
          <h3 className="text-xl font-semibold mb-4 text-white/90">پیش‌بینی ۷ روز آینده</h3>
          <div className="space-y-2">
            {daily.time.slice(0, 7).map((time, index) => {
              const dayWeatherInfo = getWeatherInfo(daily.weather_code[index], true);
              const dayOfWeek = new Date(time).toLocaleDateString('fa-IR', { weekday: 'long' });
              return (
                <div 
                  key={time} 
                  className="grid grid-cols-3 items-center gap-4 text-white/90 p-2 rounded-lg hover:bg-white/10 transition-colors duration-300 animate-fade-in-up"
                  style={{ animationDelay: `${index * 75}ms`, animationFillMode: 'backwards' }}
                >
                  <p className="font-semibold col-span-1">{index === 0 ? 'امروز' : dayOfWeek}</p>
                  <div className="flex items-center justify-center gap-3 col-span-1">
                    <div className="w-8 h-8 flex-shrink-0">{dayWeatherInfo.icon}</div>
                  </div>
                  <div className="col-span-1 flex justify-end items-center gap-3 font-medium text-lg">
                    <span title="حداکثر">{Math.round(daily.temperature_2m_max[index])}°</span>
                    <span className="text-white/50" title="حداقل">{Math.round(daily.temperature_2m_min[index])}°</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherDisplay;