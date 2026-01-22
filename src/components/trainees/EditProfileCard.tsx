// src/components/trainees/EditProfileCard.tsx
import React from "react";
import {
  BuildingOffice2Icon,
  IdentificationIcon,
  PencilSquareIcon,
} from "@heroicons/react/24/solid";

interface EditProfileCardProps {
  editProfileData: {
    institution: string;
    skills: string;
    projects: string;
    admNo?: string;
  };
  setEditProfileData: React.Dispatch<
    React.SetStateAction<{
      institution: string;
      skills: string;
      projects: string;
      admNo?: string;
    }>
  >;
  handleProfileUpdate: () => void;
  loading?: boolean;
}

const EditProfileCard: React.FC<EditProfileCardProps> = ({
  editProfileData,
  setEditProfileData,
  handleProfileUpdate,
  loading = false,
}) => {
  return (
    <div className="bg-black/70 p-6 rounded-3xl shadow-xl border border-gray-700 max-w-4xl mx-auto space-y-6">
      <h2 className="text-3xl font-bold text-yellow-400 mb-4 flex items-center gap-2">
        <PencilSquareIcon className="w-6 h-6" />
        Edit Profile
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Institution */}
        <div className="flex flex-col">
          <label className="flex items-center gap-2 text-gray-200 font-semibold">
            <BuildingOffice2Icon className="w-5 h-5 text-indigo-400" />
            Institution
          </label>
          <input
            type="text"
            placeholder="Institution"
            value={editProfileData.institution}
            onChange={(e) =>
              setEditProfileData({
                ...editProfileData,
                institution: e.target.value,
              })
            }
            className="p-3 rounded-lg bg-gray-700 text-white focus:outline-none mt-1"
          />
        </div>

        {/* Admission Number */}
        <div className="flex flex-col">
          <label className="flex items-center gap-2 text-gray-200 font-semibold">
            <IdentificationIcon className="w-5 h-5 text-yellow-400" />
            Admission Number
          </label>
          <input
            type="text"
            placeholder="Admission Number"
            value={editProfileData.admNo || ""}
            onChange={(e) =>
              setEditProfileData({ ...editProfileData, admNo: e.target.value })
            }
            className="p-3 rounded-lg bg-gray-700 text-white focus:outline-none mt-1"
          />
        </div>

        {/* Skills */}
        <div className="flex flex-col md:col-span-2">
          <label className="text-gray-200 font-semibold">
            Skills (comma separated)
          </label>
          <input
            type="text"
            placeholder="JavaScript, React, Node"
            value={editProfileData.skills}
            onChange={(e) =>
              setEditProfileData({ ...editProfileData, skills: e.target.value })
            }
            className="p-3 rounded-lg bg-gray-700 text-white focus:outline-none mt-1"
          />
        </div>

        {/* Projects */}
        <div className="flex flex-col md:col-span-2">
          <label className="text-gray-200 font-semibold">
            Projects (comma separated)
          </label>
          <input
            type="text"
            placeholder="Portfolio Website, Inventory App"
            value={editProfileData.projects}
            onChange={(e) =>
              setEditProfileData({
                ...editProfileData,
                projects: e.target.value,
              })
            }
            className="p-3 rounded-lg bg-gray-700 text-white focus:outline-none mt-1"
          />
        </div>

        {/* Submit Button */}
        <button
          onClick={handleProfileUpdate}
          disabled={loading}
          className="bg-yellow-400 hover:bg-yellow-500 text-black py-3 rounded-lg col-span-1 md:col-span-2 transition font-semibold"
        >
          {loading ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </div>
  );
};

export default EditProfileCard;
