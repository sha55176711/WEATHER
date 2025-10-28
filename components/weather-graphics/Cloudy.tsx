import React from 'react';

const Cloud = ({ style }: { style: React.CSSProperties }) => (
    <div className="absolute bg-white/60 rounded-full" style={style} />
);

const Cloudy: React.FC = () => (
  <div className="w-full h-full overflow-hidden bg-gradient-to-br from-slate-400 to-gray-600">
    <Cloud style={{ top: '15%', left: '10%', width: '200px', height: '60px', animation: 'cloud-drift 25s alternate infinite ease-in-out', filter: 'blur(10px)' }} />
    <Cloud style={{ top: '25%', left: '50%', width: '300px', height: '90px', animation: 'cloud-drift 35s alternate-reverse infinite ease-in-out', filter: 'blur(15px)' }} />
    <Cloud style={{ top: '60%', left: '20%', width: '250px', height: '75px', animation: 'cloud-drift 30s alternate infinite ease-in-out', filter: 'blur(12px)' }} />
    <Cloud style={{ top: '70%', left: '70%', width: '200px', height: '60px', animation: 'cloud-drift 20s alternate-reverse infinite ease-in-out', filter: 'blur(10px)' }} />
  </div>
);

export default Cloudy;
