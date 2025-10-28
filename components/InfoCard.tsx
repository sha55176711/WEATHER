import React from 'react';

interface InfoCardProps {
  icon: React.ReactElement;
  title: string;
  value: string | number;
}

const InfoCard: React.FC<InfoCardProps> = ({ icon, title, value }) => {
  return (
    <div className="bg-black/20 p-4 rounded-lg flex flex-col items-start gap-2 border border-white/10">
        <div className="flex items-center gap-2 text-white/70">
            {icon}
            <p className="text-sm font-medium">{title}</p>
        </div>
        <p className="text-2xl font-semibold">{value}</p>
    </div>
  );
};

export default InfoCard;