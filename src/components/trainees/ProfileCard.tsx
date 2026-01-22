// src/components/trainees/ProfileCard.tsx
import React from "react";
import {
  EnvelopeIcon,
  PhoneIcon,
  BuildingOffice2Icon,
  IdentificationIcon,
  CalendarIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/solid";

interface ProfileCardProps {
  profile: {
    name: string;
    email: string;
    phone: string;
    institution?: string;
    admNo?: string;
    skills: string[];
    projects: string[];
    isActive: boolean;
    joinedAt?: string;
  };
}

// Reusable row for icon + value
const InfoRow: React.FC<{ icon: React.ReactNode; value?: string }> = ({
  icon,
  value,
}) => (
  <div className="flex items-center gap-2 text-gray-200">
    {icon}
    <span>{value || "N/A"}</span>
  </div>
);

const ProfileCard: React.FC<ProfileCardProps> = ({ profile }) => {
  return (
    <div className="bg-black/70 p-6 rounded-3xl shadow-xl border border-gray-700 max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-center gap-6">
        <div className="w-32 h-32 bg-gray-800 rounded-full flex items-center justify-center text-6xl text-yellow-400 font-bold">
          {profile.name.charAt(0)}
        </div>
        <div className="text-center md:text-left">
          <h1 className="text-4xl font-bold text-yellow-400">{profile.name}</h1>
        </div>
      </div>

      <hr className="border-gray-700" />

      {/* Contact & Basic Info */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <InfoRow
          icon={<EnvelopeIcon className="w-5 h-5 text-indigo-400" />}
          value={profile.email}
        />
        <InfoRow
          icon={<PhoneIcon className="w-5 h-5 text-green-400" />}
          value={profile.phone}
        />
        <InfoRow
          icon={<BuildingOffice2Icon className="w-5 h-5 text-purple-400" />}
          value={profile.institution}
        />
        <InfoRow
          icon={<IdentificationIcon className="w-5 h-5 text-yellow-400" />}
          value={profile.admNo}
        />
      </div>

      {/* Stats: Skills, Projects, Active */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gray-800/50 p-4 rounded-2xl text-center">
          <h4 className="text-gray-300 font-semibold">Skills</h4>
          <div className="flex flex-wrap justify-center mt-2 gap-2">
            {profile.skills.length ? (
              profile.skills.map((s) => (
                <span
                  key={s}
                  className="bg-indigo-600 px-2 py-1 rounded-full text-sm"
                >
                  {s}
                </span>
              ))
            ) : (
              <span className="text-gray-400">None</span>
            )}
          </div>
        </div>

        <div className="bg-gray-800/50 p-4 rounded-2xl text-center">
          <h4 className="text-gray-300 font-semibold">Projects</h4>
          <div className="flex flex-wrap justify-center mt-2 gap-2">
            {profile.projects.length ? (
              profile.projects.map((p) => (
                <span
                  key={p}
                  className="bg-yellow-400/70 px-2 py-1 rounded-full text-sm text-black"
                >
                  {p}
                </span>
              ))
            ) : (
              <span className="text-gray-400">None</span>
            )}
          </div>
        </div>

        <div className="bg-gray-800/50 p-4 rounded-2xl text-center">
          <h4 className="text-gray-300 font-semibold">Active</h4>
          <div className="mt-2 flex items-center justify-center gap-2">
            <CheckCircleIcon
              className={`w-5 h-5 ${profile.isActive ? "text-green-500" : "text-yellow-400"}`}
            />
            <span className="text-gray-200">
              {profile.isActive ? "Yes" : "No"}
            </span>
          </div>
        </div>
      </div>

      {/* Joined Date */}
      {profile.joinedAt && (
        <div className="flex items-center gap-2 text-gray-300">
          <CalendarIcon className="w-5 h-5 text-gray-400" />
          <span>
            Joined on: {new Date(profile.joinedAt).toLocaleDateString()}
          </span>
        </div>
      )}
    </div>
  );
};

export default ProfileCard;
