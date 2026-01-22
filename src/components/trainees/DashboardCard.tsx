// src/components/trainees/DashboardCard.tsx
import React from "react";

interface DashboardCardProps {
  title: string;
  value: string | number;
  icon?: React.ReactNode;
  color?: string; // optional override for value color
}

const DashboardCard: React.FC<DashboardCardProps> = ({
  title,
  value,
  icon,
  color,
}) => {
  return (
    <div className="bg-black/60 p-6 rounded-2xl shadow-md border border-gray-700 hover:border-yellow-400 transition flex flex-col items-center justify-center text-center">
      {icon && <div className="mb-2">{icon}</div>}
      <p className="text-gray-200 font-semibold">{title}</p>
      <h3 className={`font-bold text-2xl mt-2 ${color || "text-yellow-400"}`}>
        {value}
      </h3>
    </div>
  );
};

export default DashboardCard;
