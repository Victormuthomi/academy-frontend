// src/pages/trainee/TraineeDashboard.tsx
import { useState, useEffect } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import {
  CalendarIcon,
  UserCircleIcon,
  PencilSquareIcon,
  ArrowLeftOnRectangleIcon,
  DocumentTextIcon,
} from "@heroicons/react/24/solid";
import { TRAINEE_API } from "../../config/api";

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
  skills: string[];
  projects: string[];
  isActive: boolean;
}

export default function TraineeDashboard() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [journals, setJournals] = useState<Journal[]>([]);
  const [loading, setLoading] = useState(false);
  const [newJournal, setNewJournal] = useState({
    title: "",
    description: "",
    githubLink: "",
    date: new Date().toISOString().split("T")[0],
  });
  const [activeTab, setActiveTab] = useState<
    "dashboard" | "journals" | "profile" | "editProfile"
  >("dashboard");
  const [editProfileData, setEditProfileData] = useState({
    institution: "",
    skills: "",
    projects: "",
  });

  const token = localStorage.getItem("accessToken");

  // Fetch dashboard data
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
      setEditProfileData({
        institution: res.data.trainee.institution || "",
        skills: (res.data.trainee.skills || []).join(", "),
        projects: (res.data.trainee.projects || []).join(", "),
      });

      const sortedJournals = res.data.journalSummary.journals.sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
      );
      setJournals(sortedJournals);
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

  // Journal submit
  const handleJournalSubmit = async () => {
    if (!newJournal.title || !newJournal.description || !newJournal.githubLink) {
      toast.error("All fields including GitHub link are required");
      return;
    }
    const today = new Date();
    const selectedDate = new Date(newJournal.date);
    if (selectedDate > today) {
      toast.error("Cannot submit a journal for a future date");
      return;
    }
    try {
      const res = await axios.post<Journal>(TRAINEE_API.ADD_JOURNAL, newJournal, {
        headers: { Authorization: `Bearer ${token}` },
      });
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

  // Profile update
  const handleProfileUpdate = async () => {
    try {
      const updated = {
        institution: editProfileData.institution,
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

  // Dashboard stats chart
  const pieData = [
    { name: "Completed Journals", value: journals.length },
    { name: "Skills", value: profile?.skills.length || 0 },
    { name: "Projects", value: profile?.projects.length || 0 },
  ];

  const COLORS = ["#34d399", "#6366f1", "#facc15"];

  return (
    <div className="flex min-h-screen bg-gray-900 text-white">
      <Toaster position="top-right" />

      {/* Sidebar */}
      <aside className="w-64 bg-gray-800/90 p-6 flex flex-col space-y-6">
        <h1 className="text-2xl font-bold">Alcodist Academy</h1>
        <nav className="flex-1 space-y-2">
          <button
            onClick={() => setActiveTab("dashboard")}
            className={`w-full flex items-center p-2 rounded-lg hover:bg-indigo-600/50 transition ${
              activeTab === "dashboard" ? "bg-indigo-500/40" : ""
            }`}
          >
            <DocumentTextIcon className="w-5 h-5 mr-2" />
            Dashboard
          </button>
          <button
            onClick={() => setActiveTab("journals")}
            className={`w-full flex items-center p-2 rounded-lg hover:bg-indigo-600/50 transition ${
              activeTab === "journals" ? "bg-indigo-500/40" : ""
            }`}
          >
            <CalendarIcon className="w-5 h-5 mr-2" />
            Journals
          </button>
          <button
            onClick={() => setActiveTab("profile")}
            className={`w-full flex items-center p-2 rounded-lg hover:bg-indigo-600/50 transition ${
              activeTab === "profile" ? "bg-indigo-500/40" : ""
            }`}
          >
            <UserCircleIcon className="w-5 h-5 mr-2" />
            Profile
          </button>
          <button
            onClick={() => setActiveTab("editProfile")}
            className={`w-full flex items-center p-2 rounded-lg hover:bg-indigo-600/50 transition ${
              activeTab === "editProfile" ? "bg-indigo-500/40" : ""
            }`}
          >
            <PencilSquareIcon className="w-5 h-5 mr-2" />
            Edit Profile
          </button>
          <button
            onClick={handleLogout}
            className="w-full flex items-center p-2 rounded-lg hover:bg-red-600/50 transition"
          >
            <ArrowLeftOnRectangleIcon className="w-5 h-5 mr-2" />
            Logout
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 overflow-y-auto space-y-8">
        {/* Dashboard */}
        {activeTab === "dashboard" && profile && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gray-800/50 p-6 rounded-2xl shadow hover:shadow-lg transition">
                <h2 className="text-xl font-bold mb-2">{profile.name}</h2>
                <p className="text-gray-300">{profile.email}</p>
                <p className="text-gray-300">{profile.phone}</p>
                {profile.institution && (
                  <p className="text-gray-300">{profile.institution}</p>
                )}
                <p className="mt-2">
                  Skills:{" "}
                  <span className="font-semibold">{profile.skills.length}</span>
                </p>
                <p>
                  Projects:{" "}
                  <span className="font-semibold">{profile.projects.length}</span>
                </p>
                <p>
                  Active:{" "}
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${
                      profile.isActive ? "bg-green-500/50" : "bg-yellow-400/50"
                    }`}
                  >
                    {profile.isActive ? "Yes" : "No"}
                  </span>
                </p>
              </div>
              <div className="md:col-span-2 bg-gray-800/50 p-6 rounded-2xl shadow hover:shadow-lg transition h-64">
                <h3 className="text-xl font-bold mb-4">Your Progress</h3>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={pieData}
                      dataKey="value"
                      nameKey="name"
                      outerRadius={80}
                      label={({ name, value }) => `${name}: ${value}`}
                    >
                      {pieData.map((_, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend verticalAlign="bottom" height={36} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </>
        )}

        {/* Journals */}
        {activeTab === "journals" && (
          <div className="space-y-6">
            <div className="bg-gray-800/50 p-6 rounded-2xl shadow hover:shadow-lg transition">
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
                    setNewJournal({ ...newJournal, description: e.target.value })
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
                  className="bg-indigo-600 hover:bg-indigo-700 py-2 rounded-lg col-span-1 md:col-span-2 transition"
                >
                  Submit Journal
                </button>
              </div>
            </div>

            <div className="bg-gray-800/50 p-6 rounded-2xl shadow hover:shadow-lg transition">
              <h3 className="text-xl font-bold mb-4">Latest Journals</h3>
              {loading && <p>Loading journals...</p>}
              {!loading && journals.length === 0 && <p>No journals submitted yet.</p>}
              {journals.map((j: Journal) => (
                <div
                  key={j._id}
                  className="bg-gray-700/40 p-4 rounded-2xl mb-4 hover:shadow-lg transition"
                >
                  <div className="flex justify-between items-center">
                    <h4 className="font-semibold">{j.title}</h4>
                    <span className="text-gray-400 text-sm">
                      {new Date(j.date).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-gray-300 text-sm mt-1">{j.description}</p>
                  <a
                    href={j.githubLink}
                    target="_blank"
                    className="text-indigo-400 hover:underline text-sm"
                  >
                    GitHub Link
                  </a>
                  <div className="flex flex-wrap mt-2 gap-2">
                    {j.comments.map((c: JournalComment) => (
                      <span
                        key={c._id}
                        className="bg-gray-600 px-2 py-1 rounded-full text-xs"
                      >
                        {c.comment}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Profile */}
        {activeTab === "profile" && profile && (
          <div className="bg-gray-800/50 p-8 rounded-3xl shadow-lg transition hover:shadow-xl max-w-4xl mx-auto">
            <h3 className="text-3xl font-bold mb-6 border-b border-gray-600 pb-2">
              Portfolio
            </h3>
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex-shrink-0 w-40 h-40 bg-gray-700 rounded-full flex items-center justify-center text-6xl text-indigo-400">
                {profile.name.charAt(0)}
              </div>
              <div className="flex-1 space-y-3">
                <h2 className="text-2xl font-bold">{profile.name}</h2>
                <p className="text-gray-300">{profile.email}</p>
                <p className="text-gray-300">{profile.phone}</p>
                <p className="text-gray-300">
                  {profile.institution || "No institution set"}
                </p>
                <p className="text-gray-300">
                  <span className="font-semibold">Skills:</span>{" "}
                  {profile.skills.join(", ") || "None"}
                </p>
                <p className="text-gray-300">
                  <span className="font-semibold">Projects:</span>{" "}
                  {profile.projects.join(", ") || "None"}
                </p>
                <p className="text-gray-300">
                  <span className="font-semibold">Active:</span>{" "}
                  {profile.isActive ? "Yes" : "No"}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Edit Profile */}
        {activeTab === "editProfile" && profile && (
          <div className="bg-gray-800/50 p-8 rounded-3xl shadow-lg transition hover:shadow-xl max-w-4xl mx-auto">
            <h3 className="text-3xl font-bold mb-6 border-b border-gray-600 pb-2">
              Edit Profile
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <input
                type="text"
                placeholder="Institution"
                value={editProfileData.institution}
                onChange={(e) =>
                  setEditProfileData({ ...editProfileData, institution: e.target.value })
                }
                className="p-3 rounded-lg bg-gray-700 text-white focus:outline-none"
              />
              <input
                type="text"
                placeholder="Skills (comma separated)"
                value={editProfileData.skills}
                onChange={(e) =>
                  setEditProfileData({ ...editProfileData, skills: e.target.value })
                }
                className="p-3 rounded-lg bg-gray-700 text-white focus:outline-none"
              />
              <input
                type="text"
                placeholder="Projects (comma separated)"
                value={editProfileData.projects}
                onChange={(e) =>
                  setEditProfileData({ ...editProfileData, projects: e.target.value })
                }
                className="p-3 rounded-lg bg-gray-700 text-white focus:outline-none"
              />
              <button
                onClick={handleProfileUpdate}
                className="bg-indigo-600 hover:bg-indigo-700 py-3 rounded-lg col-span-1 md:col-span-2 transition"
              >
                Save Changes
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

