// src/components/trainers/TraineeCard.tsx
import React from "react";

interface Trainee {
  _id: string;
  name: string;
  email: string;
  phone: string;
  institution?: string;
  skills: string[];
  projects: string[];
  isActive: boolean;
}

interface TraineeCardProps {
  trainee: Trainee;
  onActivate: (id: string) => void;
  onViewJournals: (trainee: Trainee) => void;
}

const TraineeCard: React.FC<TraineeCardProps> = ({
  trainee,
  onActivate,
  onViewJournals,
}) => {
  return (
    <div className="bg-black/60 p-5 rounded-2xl shadow-md border border-gray-700 hover:border-yellow-400 transition flex flex-col">
      <h3 className="text-yellow-400 font-bold text-lg">{trainee.name}</h3>
      <p className="text-gray-300 text-sm">{trainee.email}</p>
      {trainee.institution && (
        <p className="text-gray-300 text-sm">{trainee.institution}</p>
      )}
      <p className="mt-2">
        Status:{" "}
        <span
          className={`px-2 py-1 rounded-full text-xs ${
            trainee.isActive ? "bg-green-500/50" : "bg-yellow-400/50"
          }`}
        >
          {trainee.isActive ? "Active" : "Pending"}
        </span>
      </p>

      <div className="mt-3 flex flex-col sm:flex-row gap-2">
        {!trainee.isActive && (
          <button
            onClick={() => onActivate(trainee._id)}
            className="flex-1 bg-indigo-600 py-1 rounded hover:bg-indigo-700 transition text-white font-semibold"
          >
            Activate
          </button>
        )}
        <button
          onClick={() => onViewJournals(trainee)}
          className="flex-1 bg-gray-700 py-1 rounded hover:bg-gray-600 transition text-white font-semibold"
        >
          View Journals
        </button>
      </div>
    </div>
  );
};

export default TraineeCard;
