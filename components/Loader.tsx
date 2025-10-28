
import React from 'react';

const Loader: React.FC = () => {
  return (
    <div className="flex justify-center items-center p-8">
        <div className="w-16 h-16 border-4 border-white/20 border-t-white rounded-full animate-spin"></div>
    </div>
  );
};

export default Loader;
