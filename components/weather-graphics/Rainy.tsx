import React from 'react';

interface RainDropProps {
    style: React.CSSProperties;
}

// FIX: Explicitly typing `RainDrop` as a React.FC allows it to accept the `key` prop when used in a list.
// The `key` prop is handled by React and not passed to the component's props, resolving the type error.
const RainDrop: React.FC<RainDropProps> = ({ style }) => (
    <div className="absolute w-px h-8 bg-gradient-to-b from-transparent to-blue-300" style={style} />
);

const Rainy: React.FC = () => {
    const drops = Array.from({ length: 100 }).map((_, i) => ({
        left: `${Math.random() * 100}%`,
        animation: `fall ${Math.random() * 0.5 + 0.5}s linear infinite`,
        animationDelay: `${Math.random() * 2}s`
    }));

    return (
        <div className="w-full h-full overflow-hidden bg-gradient-to-br from-slate-600 to-gray-800">
             {/* Clouds */}
            <div className="absolute top-5 left-10 w-60 h-20 bg-gray-500/50 rounded-full" style={{ filter: 'blur(20px)' }} />
            <div className="absolute top-15 right-10 w-80 h-24 bg-gray-500/60 rounded-full" style={{ filter: 'blur(25px)' }} />
            
            {drops.map((drop, i) => <RainDrop key={i} style={drop} />)}
            <style>{`
                @keyframes fall {
                    from { transform: translateY(-100px); }
                    to { transform: translateY(100vh); }
                }
            `}</style>
        </div>
    );
};

export default Rainy;
