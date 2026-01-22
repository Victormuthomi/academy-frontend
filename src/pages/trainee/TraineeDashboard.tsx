// src/pages/trainee/TraineeDashboard.tsx
import { useState, useEffect } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

import Sidebar from "../../components/trainees/Sidebar";
import ProfileCard from "../../components/trainees/ProfileCard";
import EditProfileCard from "../../components/trainees/EditProfileCard";
import DashboardCard from "../../components/trainees/DashboardCard";
import ChartsCard from "../../components/trainees/ChartsCard";
import JournalCard from "../../components/trainees/JournalCard";

import { TRAINEE_API } from "../../config/api";

// Types
interface JournalComment {
  _id: string;
  comment: string;
}
interface Journal {
  _id: string;
  title: string;
  description: string;
  githubLink: string;
  comments: JournalComment[];
  date: string;
}
interface Profile {
  _id: string;
  name: string;
  email: string;
  phone: string;
  institution?: string;
  admNo?: string;
  skills: string[];
  projects: string[];
  isActive: boolean;
  joinedAt?: string;
}

export default function TraineeDashboard() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [journals, setJournals] = useState<Journal[]>([]);
  const [loading, setLoading] = useState(false);

  const [activeTab, setActiveTab] = useState<
    "dashboard" | "journals" | "profile" | "editProfile"
  >("dashboard");

  // **Fixed type: admNo is optional**
  const [editProfileData, setEditProfileData] = useState<{
    institution: string;
    skills: string;
    projects: string;
    admNo?: string;
  }>({
    institution: "",
    skills: "",
    projects: "",
    admNo: undefined,
  });

  const [newJournal, setNewJournal] = useState({
    title: "",
    description: "",
    githubLink: "",
    date: new Date().toISOString().split("T")[0],
  });

  const token = localStorage.getItem("accessToken");

  // Fetch dashboard
  const fetchDashboard = async () => {
    setLoading(true);
    try {
      const res = await axios.get<{
        trainee: Profile;
        journalSummary: { journals: Journal[] };
      }>(TRAINEE_API.DASHBOARD, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setProfile(res.data.trainee);

      // **Use undefined for missing admNo to match EditProfileCard type**
      setEditProfileData({
        institution: res.data.trainee.institution || "",
        skills: (res.data.trainee.skills || []).join(", "),
        projects: (res.data.trainee.projects || []).join(", "),
        admNo: res.data.trainee.admNo || undefined,
      });

      const sorted = res.data.journalSummary.journals.sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
      );
      setJournals(sorted);
    } catch {
      toast.error("Failed to load dashboard");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("userRole");
    window.location.href = "/login";
  };

  // Add Journal
  const handleJournalSubmit = async () => {
    if (
      !newJournal.title ||
      !newJournal.description ||
      !newJournal.githubLink
    ) {
      toast.error("All fields including GitHub link are required");
      return;
    }
    if (new Date(newJournal.date) > new Date()) {
      toast.error("Cannot submit a journal for a future date");
      return;
    }
    try {
      const res = await axios.post<Journal>(
        TRAINEE_API.ADD_JOURNAL,
        newJournal,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      toast.success("Journal added!");
      setJournals([res.data, ...journals]);
      setNewJournal({
        title: "",
        description: "",
        githubLink: "",
        date: new Date().toISOString().split("T")[0],
      });
      setActiveTab("journals");
    } catch {
      toast.error("Failed to add journal");
    }
  };

  // Update Profile
  const handleProfileUpdate = async () => {
    try {
      const updated = {
        institution: editProfileData.institution,
        admNo: editProfileData.admNo,
        skills: editProfileData.skills.split(",").map((s) => s.trim()),
        projects: editProfileData.projects.split(",").map((p) => p.trim()),
      };
      await axios.put(TRAINEE_API.UPDATE_PROFILE, updated, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Profile updated!");
      fetchDashboard();
      setActiveTab("profile");
    } catch {
      toast.error("Failed to update profile");
    }
  };

  // Metrics
  const lastSubmission = journals.length
    ? new Date(journals[0].date).toLocaleDateString()
    : "N/A";
  const metrics = [
    { title: "Total Journals", value: journals.length },
    { title: "Skills", value: profile?.skills.length || 0 },
    { title: "Projects", value: profile?.projects.length || 0 },
    { title: "Last Submission", value: lastSubmission },
  ];

  // Charts
  const pieDataJournals = [
    { name: "Completed", value: journals.length },
    { name: "Skills", value: profile?.skills.length || 0 },
    { name: "Projects", value: profile?.projects.length || 0 },
  ];
  const pieDataProjects =
    profile?.projects.map((p) => ({ name: p, value: 1 })) || [];

  const getLast6Months = () => {
    const months = [];
    const today = new Date();
    for (let i = 5; i >= 0; i--) {
      const d = new Date(today.getFullYear(), today.getMonth() - i, 1);
      months.push(
        `${d.toLocaleString("default", { month: "short" })} ${d.getFullYear()}`,
      );
    }
    return months;
  };
  const last6Months = getLast6Months();
  const monthlyData = last6Months.map((m) => ({
    name: m,
    value: journals.filter((j) => {
      const date = new Date(j.date);
      const monthYear = `${date.toLocaleString("default", { month: "short" })} ${date.getFullYear()}`;
      return monthYear === m;
    }).length,
  }));

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-gray-900 text-white">
      <Toaster position="top-right" />

      {/* Sidebar */}
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        handleLogout={handleLogout}
      />

      {/* Main Content */}
      <main className="flex-1 p-4 lg:p-6 overflow-y-auto space-y-8">
        {/* Dashboard */}
        {activeTab === "dashboard" && profile && (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {metrics.map((m) => (
                <DashboardCard key={m.title} title={m.title} value={m.value} />
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <ChartsCard
                title="Overall Progress"
                data={pieDataJournals}
                type="pie"
              />
              <ChartsCard
                title="Projects Distribution"
                data={pieDataProjects}
                type="pie"
              />
              <ChartsCard
                title="Monthly Activity"
                data={monthlyData}
                type="line"
              />
            </div>
          </>
        )}

        {/* Journals */}
        {activeTab === "journals" && (
          <div className="space-y-6">
            <div className="bg-black/60 p-6 rounded-2xl shadow-md border border-gray-700 hover:border-yellow-400 transition max-w-4xl mx-auto">
              <h3 className="text-xl font-bold mb-4">Add New Journal</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Title"
                  value={newJournal.title}
                  onChange={(e) =>
                    setNewJournal({ ...newJournal, title: e.target.value })
                  }
                  className="p-3 rounded-lg bg-gray-700 text-white focus:outline-none"
                />
                <input
                  type="url"
                  placeholder="GitHub Link"
                  value={newJournal.githubLink}
                  onChange={(e) =>
                    setNewJournal({ ...newJournal, githubLink: e.target.value })
                  }
                  className="p-3 rounded-lg bg-gray-700 text-white focus:outline-none"
                />
                <textarea
                  placeholder="Description"
                  value={newJournal.description}
                  onChange={(e) =>
                    setNewJournal({
                      ...newJournal,
                      description: e.target.value,
                    })
                  }
                  className="p-3 rounded-lg bg-gray-700 text-white col-span-1 md:col-span-2 focus:outline-none"
                  rows={4}
                />
                <input
                  type="date"
                  max={new Date().toISOString().split("T")[0]}
                  value={newJournal.date}
                  onChange={(e) =>
                    setNewJournal({ ...newJournal, date: e.target.value })
                  }
                  className="p-3 rounded-lg bg-gray-700 text-white focus:outline-none"
                />
                <button
                  onClick={handleJournalSubmit}
                  className="bg-yellow-400 hover:bg-yellow-500 text-black py-2 rounded-lg col-span-1 md:col-span-2 transition font-semibold"
                >
                  Submit Journal
                </button>
              </div>
            </div>

            {journals.length === 0 && (
              <p className="text-center text-gray-400">
                No journals submitted yet.
              </p>
            )}
            {journals.map((j) => (
              <JournalCard key={j._id} journal={j} />
            ))}
          </div>
        )}

        {/* Profile */}
        {activeTab === "profile" && profile && (
          <ProfileCard profile={profile} />
        )}

        {/* Edit Profile */}
        {activeTab === "editProfile" && profile && (
          <EditProfileCard
            editProfileData={editProfileData}
            setEditProfileData={setEditProfileData}
            handleProfileUpdate={handleProfileUpdate}
            loading={loading}
          />
        )}
      </main>
    </div>
  );
}
