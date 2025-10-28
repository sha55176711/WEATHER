import React from 'react';
import type { WeatherData } from '../types';
import { getWeatherInfo } from '../utils/weatherUtils';
import { Sunrise, Sunset, Droplets, Sun, Wind } from 'lucide-react';
import InfoCard from './InfoCard';
import HourlyForecast from './HourlyForecast';

interface WeatherDisplayProps {
  data: WeatherData;
}

const WeatherDisplay: React.FC<WeatherDisplayProps> = ({ data }) => {
  const { name, current, hourly, daily } = data;
  const { description, icon: WeatherIcon } = getWeatherInfo(current.weather_code, current.is_day === 1);

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Current Weather Card */}
      <div className="bg-black/25 p-6 md:p-8 rounded-2xl backdrop-blur-lg border border-white/10 shadow-2xl">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-right">
            <h2 className="text-4xl md:text-5xl font-bold">{name}</h2>
            <p className="text-xl text-white/80 mt-2">{description}</p>
            <div className="flex justify-center md:justify-start items-baseline gap-4 mt-4 font-medium text-white/90">
                <span>حداکثر: {Math.round(daily.temperature_2m_max[0])}°</span>
                <span>حداقل: {Math.round(daily.temperature_2m_min[0])}°</span>
            </div>
          </div>
          <div className="flex items-center gap-4 text-center">
            <div className="w-24 h-24 md:w-32 md:h-32 text-yellow-300">
                {WeatherIcon}
            </div>
            <div>
                <p className="text-6xl md:text-7xl font-normal tracking-tighter">{Math.round(current.temperature_2m)}°<span className="text-4xl align-top">C</span></p>
                <p className="text-lg text-white/80">حس واقعی: {Math.round(current.apparent_temperature)}°</p>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-6 border-t border-white/20 grid grid-cols-2 md:grid-cols-3 gap-4">
            <InfoCard icon={<Droplets size={20} />} title="رطوبت" value={`${current.relative_humidity_2m}%`} />
            <InfoCard icon={<Wind size={20} />} title="سرعت باد" value={`${current.wind_speed_10m} km/h`} />
            <InfoCard icon={<Sun size={20} />} title="شاخص UV" value={daily.uv_index_max[0].toFixed(1)} />
        </div>
      </div>
      
      {/* Hourly Forecast */}
      <HourlyForecast hourly={hourly} />

      {/* 7-Day Forecast */}
      <div>
        <h3 className="text-2xl font-semibold mb-4 text-center md:text-right">پیش‌بینی ۷ روز آینده</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {daily.time.map((time, index) => {
            if (index >= 7) return null;
            const dayWeatherInfo = getWeatherInfo(daily.weather_code[index], true);
            const dayOfWeek = new Date(time).toLocaleDateString('fa-IR', { weekday: 'long' });
            return (
              <div key={time} className="bg-black/25 p-4 rounded-xl backdrop-blur-md border border-white/10 flex flex-col justify-between space-y-3">
                <div className='flex items-center justify-between'>
                    <p className="font-semibold text-lg">{index === 0 ? 'امروز' : dayOfWeek}</p>
                    <div className="w-10 h-10 text-white/90">{dayWeatherInfo.icon}</div>
                </div>
                <div className="flex justify-between items-center text-center">
                  <span className="font-bold text-2xl text-white">{Math.round(daily.temperature_2m_max[index])}°</span>
                  <span className="text-lg font-medium text-white/60">{Math.round(daily.temperature_2m_min[index])}°</span>
                </div>
                <div className="border-t border-white/10 pt-3 space-y-2 text-sm">
                    <div className="flex justify-between items-center text-white/80">
                        <div className="flex items-center gap-2"><Sunrise size={16} /> <span>طلوع</span></div>
                        <span>{new Date(daily.sunrise[index]).toLocaleTimeString('fa-IR', {hour: '2-digit', minute:'2-digit'})}</span>
                    </div>
                     <div className="flex justify-between items-center text-white/80">
                        <div className="flex items-center gap-2"><Sunset size={16} /> <span>غروب</span></div>
                        <span>{new Date(daily.sunset[index]).toLocaleTimeString('fa-IR', {hour: '2-digit', minute:'2-digit'})}</span>
                    </div>
                     <div className="flex justify-between items-center text-white/80">
                        <div className="flex items-center gap-2"><Droplets size={16} /> <span>بارش</span></div>
                        <span>{daily.precipitation_sum[index]} mm</span>
                    </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default WeatherDisplay;