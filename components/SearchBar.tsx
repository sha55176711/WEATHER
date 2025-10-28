
import React, { useState } from 'react';

interface SearchBarProps {
  onSearch: (coords: { lat: string; lon: string }) => void;
  initialLat: string;
  initialLon: string;
  loading: boolean;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, initialLat, initialLon, loading }) => {
  const [lat, setLat] = useState(initialLat);
  const [lon, setLon] = useState(initialLon);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch({ lat, lon });
  };

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-5 gap-2 md:gap-4">
      <input
        type="number"
        step="any"
        value={lat}
        onChange={(e) => setLat(e.target.value)}
        placeholder="عرض جغرافیایی (مثلا: 35.72)"
        className="md:col-span-2 p-3 md:p-4 rounded-xl bg-black/20 text-white placeholder-white/50 border border-white/20 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all backdrop-blur-md"
        disabled={loading}
      />
       <input
        type="number"
        step="any"
        value={lon}
        onChange={(e) => setLon(e.target.value)}
        placeholder="طول جغرافیایی (مثلا: 51.39)"
        className="md:col-span-2 p-3 md:p-4 rounded-xl bg-black/20 text-white placeholder-white/50 border border-white/20 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all backdrop-blur-md"
        disabled={loading}
      />
      <button
        type="submit"
        className="md:col-span-1 p-3 md:p-4 bg-blue-500 hover:bg-blue-600 disabled:bg-blue-500/50 disabled:cursor-not-allowed rounded-xl font-bold transition-colors flex items-center justify-center min-w-[100px]"
        disabled={loading}
      >
        {loading ? (
            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
        ) : 'جستجو'}
      </button>
    </form>
  );
};

export default SearchBar;
