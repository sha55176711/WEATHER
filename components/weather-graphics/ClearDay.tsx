import React from 'react';

const ClearDay: React.FC = () => (
  <div className="w-full h-full overflow-hidden bg-gradient-to-br from-sky-400 to-blue-600">
    <div
      className="absolute top-1/4 left-1/4 w-48 h-48 bg-yellow-300 rounded-full opacity-80 animate-sun-pulse"
      style={{ filter: 'blur(30px)' }}
    />
    <div className="absolute top-10 left-10 w-24 h-24 bg-yellow-200 rounded-full animate-sun-pulse" />
  </div>
);

export default ClearDay;
