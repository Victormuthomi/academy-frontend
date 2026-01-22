// src/components/trainers/StatsCard.tsx
import React from "react";

interface StatsCardProps {
  title: string;
  value: number;
}

const StatsCard: React.FC<StatsCardProps> = ({ title, value }) => {
  return (
    <div className="bg-black/60 p-6 rounded-2xl shadow-md border border-gray-700 hover:border-yellow-400 transition text-center">
      <p className="text-gray-200 font-semibold">{title}</p>
      <h3 className="text-yellow-400 font-bold text-2xl mt-2">{value}</h3>
    </div>
  );
};

export default StatsCard;
