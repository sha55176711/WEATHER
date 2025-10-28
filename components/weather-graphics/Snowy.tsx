import React from 'react';

interface SnowflakeProps {
  style: React.CSSProperties;
}

// FIX: Explicitly typing `Snowflake` as a React.FC allows it to accept the `key` prop when used in a list.
// The `key` prop is handled by React and not passed to the component's props, resolving the type error.
const Snowflake: React.FC<SnowflakeProps> = ({ style }) => (
  <div className="absolute text-white" style={style}>•</div>
);

const Snowy: React.FC = () => {
  const flakes = Array.from({ length: 100 }).map((_, i) => ({
    left: `${Math.random() * 100}%`,
    fontSize: `${Math.random() * 10 + 5}px`,
    opacity: `${Math.random() * 0.5 + 0.3}`,
    animation: `fall ${Math.random() * 10 + 5}s linear infinite`,
    animationDelay: `${Math.random() * 5}s`
  }));

  return (
    <div className="w-full h-full overflow-hidden bg-gradient-to-br from-slate-300 to-gray-500">
      {flakes.map((flake, i) => <Snowflake key={i} style={flake} />)}
      <style>{`
        @keyframes fall {
          from { transform: translateY(-10vh) translateX(0); }
          to { transform: translateY(110vh) translateX(${Math.random() > 0.5 ? '' : '-'}50px); }
        }
      `}</style>
    </div>
  );
};

export default Snowy;
