import React from 'react';

interface StarProps {
  style: React.CSSProperties;
}

// FIX: Explicitly typing `Star` as a React.FC allows it to accept the `key` prop when used in a list.
// The `key` prop is handled by React and not passed to the component's props, resolving the type error.
const Star: React.FC<StarProps> = ({ style }) => (
  <div className="absolute bg-white rounded-full" style={style} />
);

const ClearNight: React.FC = () => {
    const stars = Array.from({ length: 50 }).map((_, i) => ({
        top: `${Math.random() * 100}%`,
        left: `${Math.random() * 100}%`,
        width: `${Math.random() * 2 + 1}px`,
        height: `${Math.random() * 2 + 1}px`,
        animation: `twinkle ${Math.random() * 5 + 2}s infinite alternate`,
    }));
  return (
    <div className="w-full h-full overflow-hidden bg-gradient-to-br from-gray-800 via-slate-900 to-black">
      <div className="absolute top-1/4 right-1/4 w-32 h-32 bg-slate-200 rounded-full opacity-80" style={{ filter: 'blur(15px)' }} />
      {stars.map((star, i) => <Star key={i} style={star} />)}
      <style>{`
        @keyframes twinkle {
          0% { opacity: 0.2; }
          100% { opacity: 1; }
        }
      `}</style>
    </div>
  );
};

export default ClearNight;
