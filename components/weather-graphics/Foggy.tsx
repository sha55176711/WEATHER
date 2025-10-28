import React from 'react';

const FogLayer = ({ style, animation }: { style: React.CSSProperties, animation: string }) => (
    <div className="absolute inset-0 bg-gradient-to-t from-gray-400/50 to-transparent" style={{...style, animation }} />
);

const Foggy: React.FC = () => (
    <div className="w-full h-full overflow-hidden bg-gray-400">
        <FogLayer style={{ opacity: 0.6 }} animation='cloud-drift 40s alternate infinite ease-in-out' />
        <FogLayer style={{ opacity: 0.4 }} animation='cloud-drift 30s alternate-reverse infinite ease-in-out' />
    </div>
);

export default Foggy;
