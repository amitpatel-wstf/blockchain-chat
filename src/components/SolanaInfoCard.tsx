
import React from 'react';

interface SolanaInfoCardProps {
  info: {
    title: string;
    data: {
      [key: string]: string | number;
    };
  };
}

const SolanaInfoCard: React.FC<SolanaInfoCardProps> = ({ info }) => {
  return (
    <div className="info-card mt-3 font-mono">
      <h3 className="text-sm font-bold text-solana-purple mb-2">{info.title}</h3>
      <div className="space-y-1">
        {Object.entries(info.data).map(([key, value]) => (
          <div key={key} className="flex justify-between text-xs">
            <span className="text-gray-400">{key}:</span>
            <span className="text-white font-medium">{value}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SolanaInfoCard;
