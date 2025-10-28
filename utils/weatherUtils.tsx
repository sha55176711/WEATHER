import React from 'react';
import { Sun, Moon, Cloud, CloudSun, CloudMoon, CloudDrizzle, CloudRain, CloudLightning, Snowflake, CloudFog } from 'lucide-react';
import ClearDay from '../components/weather-graphics/ClearDay';
import ClearNight from '../components/weather-graphics/ClearNight';
import Cloudy from '../components/weather-graphics/Cloudy';
import Rainy from '../components/weather-graphics/Rainy';
import Snowy from '../components/weather-graphics/Snowy';
import Foggy from '../components/weather-graphics/Foggy';


interface WeatherInfo {
  description: string;
  icon: React.ReactElement;
}

export const getWeatherInfo = (code: number, isDay: boolean): WeatherInfo => {
  const commonIconClass = "w-full h-full";
  switch (code) {
    case 0:
      return { description: 'آسمان صاف', icon: isDay ? <Sun className={`${commonIconClass} animate-icon-pulse`} /> : <Moon className={commonIconClass} /> };
    case 1:
    case 2:
      return { description: 'کمی ابری', icon: isDay ? <CloudSun className={`${commonIconClass} animate-icon-drift`} /> : <CloudMoon className={`${commonIconClass} animate-icon-drift`} /> };
    case 3:
      return { description: 'ابری', icon: <Cloud className={`${commonIconClass} animate-icon-drift`} /> };
    case 45:
    case 48:
      return { description: 'مه', icon: <CloudFog className={`${commonIconClass} animate-icon-drift`} /> };
    case 51:
    case 53:
    case 55:
    case 56:
    case 57:
      return { description: 'نم نم باران', icon: <CloudDrizzle className={`${commonIconClass} animate-icon-sway`} /> };
    case 61:
    case 63:
    case 65:
    case 66:
    case 67:
      return { description: 'باران', icon: <CloudRain className={`${commonIconClass} animate-icon-sway`} /> };
    case 71:
    case 73:
    case 75:
    case 77:
      return { description: 'برف', icon: <Snowflake className={`${commonIconClass} animate-icon-sway`} /> };
    case 80:
    case 81:
    case 82:
      return { description: 'رگبار باران', icon: <CloudRain className={`${commonIconClass} animate-icon-sway`} /> };
    case 85:
    case 86:
      return { description: 'رگبار برف', icon: <Snowflake className={`${commonIconClass} animate-icon-sway`} /> };
    case 95:
    case 96:
    case 99:
      return { description: 'رعد و برق', icon: <CloudLightning className={commonIconClass} /> };
    default:
      return { description: 'نامشخص', icon: <Cloud className={commonIconClass} /> };
  }
};

export const getWeatherGraphicComponent = (code: number | undefined, isDay: boolean | undefined): React.FC | null => {
  if (code === undefined || isDay === undefined) {
    return ClearDay; // Default background
  }

  switch (true) {
    case code === 0:
      return isDay ? ClearDay : ClearNight;
    case code >= 1 && code <= 3:
      return Cloudy;
    case code >= 45 && code <= 48:
      return Foggy;
    case (code >= 51 && code <= 67) || (code >= 80 && code <= 82):
      return Rainy;
    case (code >= 71 && code <= 77) || (code >= 85 && code <= 86):
      return Snowy;
    case code >= 95:
      return Rainy; // Using rainy for thunderstorms for now
    default:
      return isDay ? ClearDay : Cloudy;
  }
}