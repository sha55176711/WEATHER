import React from 'react';
import { Sun, Moon, Cloud, CloudSun, CloudMoon, CloudDrizzle, CloudRain, CloudLightning, Snowflake, Wind, Haze, CloudFog } from 'lucide-react';

interface WeatherInfo {
  description: string;
  // FIX: Changed type from JSX.Element to React.ReactElement to resolve "Cannot find namespace 'JSX'" error.
  icon: React.ReactElement;
}

export const getWeatherInfo = (code: number, isDay: boolean): WeatherInfo => {
  switch (code) {
    case 0:
      return { description: 'آسمان صاف', icon: isDay ? <Sun className="w-full h-full" /> : <Moon className="w-full h-full" /> };
    case 1:
      return { description: 'عمدتا صاف', icon: isDay ? <CloudSun className="w-full h-full" /> : <CloudMoon className="w-full h-full" /> };
    case 2:
      return { description: 'کمی ابری', icon: isDay ? <CloudSun className="w-full h-full" /> : <CloudMoon className="w-full h-full" /> };
    case 3:
      return { description: 'ابری', icon: <Cloud className="w-full h-full" /> };
    case 45:
    case 48:
      return { description: 'مه', icon: <CloudFog className="w-full h-full" /> };
    case 51:
    case 53:
    case 55:
      return { description: 'نم نم باران', icon: <CloudDrizzle className="w-full h-full" /> };
    case 56:
    case 57:
      return { description: 'نم نم باران یخ زده', icon: <CloudDrizzle className="w-full h-full" /> };
    case 61:
    case 63:
    case 65:
      return { description: 'باران', icon: <CloudRain className="w-full h-full" /> };
    case 66:
    case 67:
      return { description: 'باران یخ زده', icon: <CloudRain className="w-full h-full" /> };
    case 71:
    case 73:
    case 75:
      return { description: 'برف', icon: <Snowflake className="w-full h-full" /> };
    case 77:
      return { description: 'دانه های برف', icon: <Snowflake className="w-full h-full" /> };
    case 80:
    case 81:
    case 82:
      return { description: 'رگبار باران', icon: <CloudRain className="w-full h-full" /> };
    case 85:
    case 86:
      return { description: 'رگبار برف', icon: <Snowflake className="w-full h-full" /> };
    case 95:
      return { description: 'رعد و برق', icon: <CloudLightning className="w-full h-full" /> };
    case 96:
    case 99:
      return { description: 'رعد و برق با تگرگ', icon: <CloudLightning className="w-full h-full" /> };
    default:
      return { description: 'نامشخص', icon: <Cloud className="w-full h-full" /> };
  }
};
