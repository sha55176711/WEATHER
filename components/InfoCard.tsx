import React from 'react';

interface InfoCardProps {
  icon: React.ReactElement;
  title: string;
  value: string | number;
}

const InfoCard: React.FC<InfoCardProps> = ({ icon, title, value }) => {
  return (
    <div className="bg-white/10 p-3 rounded-lg flex items-center gap-3">
        <div className="text-white/80">{icon}</div>
        <div>
            <p className="text-sm text-white/70">{title}</p>
            <p className="text-lg font-semibold">{value}</p>
        </div>
    </div>
  );
};

export default InfoCard;
