import React from 'react';
import type { CurrentWeather, DailyForecast } from '../types';
import { Sunrise, Sunset, Droplets, Sun, Wind, Thermometer } from 'lucide-react';
import InfoCard from './InfoCard';

interface WeatherInfoGridProps {
    current: CurrentWeather;
    daily: DailyForecast;
}

const WeatherInfoGrid: React.FC<WeatherInfoGridProps> = ({ current, daily }) => {
    return (
        <div>
            <h3 className="text-xl font-semibold mb-4 text-white/90">جزئیات امروز</h3>
            <div className="grid grid-cols-2 gap-4">
                <InfoCard icon={<Thermometer />} title="حس واقعی" value={`${Math.round(current.apparent_temperature)}°`} />
                <InfoCard icon={<Droplets />} title="رطوبت" value={`${current.relative_humidity_2m}%`} />
                <InfoCard icon={<Wind />} title="سرعت باد" value={`${current.wind_speed_10m} km/h`} />
                <InfoCard icon={<Sun />} title="شاخص UV" value={daily.uv_index_max[0].toFixed(1)} />
                <InfoCard icon={<Sunrise />} title="طلوع آفتاب" value={new Date(daily.sunrise[0]).toLocaleTimeString('fa-IR', { hour: '2-digit', minute: '2-digit' })} />
                <InfoCard icon={<Sunset />} title="غروب آفتاب" value={new Date(daily.sunset[0]).toLocaleTimeString('fa-IR', { hour: '2-digit', minute: '2-digit' })} />
            </div>
        </div>
    );
};

export default WeatherInfoGrid;
