import React from 'react';
import { getWeatherGraphicComponent } from '../utils/weatherUtils';

interface WeatherBackgroundProps {
  weatherCode: number | undefined;
  isDay: boolean | undefined;
}

const WeatherBackground: React.FC<WeatherBackgroundProps> = ({ weatherCode, isDay }) => {
  const GraphicComponent = getWeatherGraphicComponent(weatherCode, isDay);

  return (
    <div className="absolute inset-0 z-0 bg-gray-800">
        <div className="absolute inset-0 transition-opacity duration-1000">
            {GraphicComponent && <GraphicComponent />}
        </div>
    </div>
  );
};

export default WeatherBackground;