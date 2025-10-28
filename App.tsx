import React, { useState, useCallback, useMemo } from 'react';
import type { WeatherData } from './types';
import { fetchWeather } from './services/weatherService';
import SearchBar from './components/SearchBar';
import WeatherDisplay from './components/WeatherDisplay';
import Loader from './components/Loader';
import WeatherBackground from './components/WeatherBackground';
import { SunSnow } from 'lucide-react';

const App: React.FC = () => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = useCallback(async (coords: { lat: string; lon: string }) => {
    const { lat, lon } = coords;
    if (!lat || !lon) {
      setError('لطفا عرض و طول جغرافیایی را وارد کنید.');
      return;
    }
    
    const latitude = parseFloat(lat);
    const longitude = parseFloat(lon);

    if (isNaN(latitude) || isNaN(longitude)) {
        setError('مقادیر وارد شده برای مختصات جغرافیایی نامعتبر است.');
        return;
    }

    setLoading(true);
    setError(null);
    setWeatherData(null);

    try {
      const weather = await fetchWeather(latitude, longitude);
      const name = `عرض: ${latitude.toFixed(2)}°, طول: ${longitude.toFixed(2)}°`;
      setWeatherData({ ...weather, name });
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('خطایی رخ داده است. لطفا اتصال اینترنت خود را بررسی کنید.');
      }
    } finally {
      setLoading(false);
    }
  }, []);
  
  return (
    <div className={`relative min-h-screen text-white transition-colors duration-1000 overflow-hidden`}>
      <WeatherBackground weatherCode={weatherData?.current.weather_code} isDay={weatherData?.current.is_day === 1} />
      <div className="relative z-10 p-4 sm:p-6 lg:p-8 flex flex-col items-center min-h-screen bg-black/10">
        <div className="w-full max-w-6xl mx-auto">
          <header className="flex items-center justify-center gap-3 my-6">
            <SunSnow className="w-10 h-10 text-yellow-300 drop-shadow-lg" />
            <h1 className="text-3xl md:text-4xl font-bold text-white drop-shadow-lg text-center">
              اپلیکیشن آب و هوا
            </h1>
          </header>
          
          <main>
            <SearchBar onSearch={handleSearch} initialLat="35.72" initialLon="51.39" loading={loading} />
            
            <div className="mt-8">
              {loading && <Loader />}
              {error && (
                <div className="bg-red-500/50 text-white p-4 rounded-lg text-center backdrop-blur-sm border border-red-500/60 animate-fade-in">
                  <p className="font-semibold">خطا!</p>
                  <p>{error}</p>
                </div>
              )}
              {weatherData && !loading && !error && (
                <WeatherDisplay data={weatherData} />
              )}
              {!weatherData && !loading && !error && (
                   <div className="text-center p-8 mt-16 animate-fade-in">
                      <h2 className="text-2xl font-semibold text-white/90 drop-shadow-md">به پیش‌بینی آب و هوا خوش آمدید</h2>
                      <p className="text-lg text-white/70 mt-2 drop-shadow-md">برای شروع، مختصات جغرافیایی مورد نظر خود را وارد و جستجو کنید.</p>
                  </div>
              )}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default App;