import React, { useState, useCallback, useMemo } from 'react';
import type { WeatherData } from './types';
import { fetchWeather } from './services/weatherService';
import SearchBar from './components/SearchBar';
import WeatherDisplay from './components/WeatherDisplay';
import Loader from './components/Loader';

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
  
  const backgroundClass = useMemo(() => {
    if (!weatherData) return 'from-gray-700 via-gray-900 to-black';
    return weatherData.current.is_day 
      ? 'from-blue-300 via-blue-500 to-purple-600' 
      : 'from-gray-800 via-slate-900 to-black';
  }, [weatherData]);

  return (
    <div className={`min-h-screen bg-gradient-to-br ${backgroundClass} text-white transition-all duration-1000 p-4 sm:p-6 lg:p-8 flex flex-col items-center`}>
      <div className="w-full max-w-4xl mx-auto">
        <header className="text-center my-6">
          <h1 className="text-4xl md:text-5xl font-bold text-white drop-shadow-lg">اپلیکیشن پیش‌بینی آب و هوا</h1>
          <p className="text-lg font-light text-white/80 mt-2 drop-shadow-md">وضعیت آب و هوای مختصات مورد نظر خود را جستجو کنید</p>
        </header>
        
        <main>
          <SearchBar onSearch={handleSearch} initialLat="35.72" initialLon="51.39" loading={loading} />
          
          <div className="mt-8">
            {loading && <Loader />}
            {error && (
              <div className="bg-red-500/50 text-white p-4 rounded-lg text-center backdrop-blur-sm border border-red-500/60">
                <p className="font-semibold">خطا!</p>
                <p>{error}</p>
              </div>
            )}
            {weatherData && !loading && !error && (
              <WeatherDisplay data={weatherData} />
            )}
            {!weatherData && !loading && !error && (
                 <div className="text-center p-8 bg-black/20 rounded-xl backdrop-blur-md border border-white/10">
                    <p className="text-xl text-white/70">برای شروع، مختصات جغرافیایی را وارد و جستجو کنید.</p>
                </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default App;