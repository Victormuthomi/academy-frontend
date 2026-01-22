// src/pages/trainer/TrainerDashboard.tsx
import { useState, useEffect } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

import StatsCard from "../../components/trainers/StatsCards.tsx";
import ChartCard from "../../components/trainers/ChartCard";
import TraineeCard from "../../components/trainers/TraineeCard";
import JournalModal from "../../components/trainers/JournalModal";

import {
  UsersIcon,
  UserGroupIcon,
  ArrowLeftOnRectangleIcon,
} from "@heroicons/react/24/solid";

import { TRAINER_API } from "../../config/api";

interface Trainee {
  _id: string;
  name: string;
  email: string;
  phone: string;
  institution?: string;
  skills: string[];
  projects: string[];
  isActive: boolean;
  totalJournals?: number;
  lastSubmission?: string | null;
}

interface JournalComment {
  _id: string;
  comment: string;
  trainer: string;
  createdAt: string;
}

interface Journal {
  _id: string;
  title: string;
  description: string;
  githubLink?: string;
  comments: JournalComment[];
  date: string;
  createdAt: string;
  trainee?: Trainee;
}

export default function TrainerDashboard() {
  const [trainees, setTrainees] = useState<Trainee[]>([]);
  const [selectedTrainee, setSelectedTrainee] = useState<Trainee | null>(null);
  const [journals, setJournals] = useState<Journal[]>([]);
  const [loadingJournals, setLoadingJournals] = useState(false);
  const [commentMap, setCommentMap] = useState<Record<string, string>>({});
  const [activeTab, setActiveTab] = useState<"dashboard" | "trainees">(
    "dashboard",
  );

  const token = localStorage.getItem("accessToken");

  /** Fetch all trainees with journal summaries */
  const fetchTrainees = async () => {
    try {
      const res = await axios.get(TRAINER_API.DASHBOARD, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = res.data.map((item: any) => ({
        ...item.trainee,
        totalJournals: item.journalSummary.totalJournals,
        lastSubmission: item.journalSummary.lastSubmission,
      }));

      setTrainees(data);
    } catch {
      toast.error("Failed to load trainees");
    }
  };

  const handleActivate = async (traineeId: string) => {
    try {
      await axios.post(
        TRAINER_API.ACTIVATE_TRAINEE(traineeId),
        {},
        { headers: { Authorization: `Bearer ${token}` } },
      );
      toast.success("Trainee activated!");
      fetchTrainees();
    } catch {
      toast.error("Activation failed");
    }
  };

  const openJournalsModal = async (trainee: Trainee) => {
    setSelectedTrainee(trainee);
    setLoadingJournals(true);

    try {
      const res = await axios.get<Journal[]>(
        TRAINER_API.GET_JOURNALS(trainee._id),
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      const sorted = res.data.sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
      );

      setJournals(sorted);
    } catch {
      toast.error("Failed to load journals");
      setJournals([]);
    } finally {
      setLoadingJournals(false);
    }
  };

  const handleAddComment = async (journalId: string) => {
    const text = commentMap[journalId];
    if (!text) return;

    try {
      const res = await axios.post(
        TRAINER_API.ADD_COMMENT(journalId),
        { comment: text },
        { headers: { Authorization: `Bearer ${token}` } },
      );

      setJournals((prev) =>
        prev.map((j) =>
          j._id === journalId ? { ...j, comments: res.data.comments } : j,
        ),
      );

      setCommentMap({ ...commentMap, [journalId]: "" });
      toast.success("Comment added!");
    } catch {
      toast.error("Failed to add comment");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("userRole");
    window.location.href = "/login";
  };

  useEffect(() => {
    fetchTrainees();
  }, []);

  /** Stats calculation */
  const totalTrainees = trainees.length;
  const activeTrainees = trainees.filter((t) => t.isActive).length;
  const pendingTrainees = totalTrainees - activeTrainees;
  const totalJournals = trainees.reduce(
    (sum, t) => sum + (t.totalJournals || 0),
    0,
  );

  /** Pie chart data */
  const pieData = [
    { name: "Active", value: activeTrainees },
    { name: "Pending", value: pendingTrainees },
  ];

  /** Skills distribution */
  const getSkillDistribution = (trainees: Trainee[]) => {
    const skillCount: Record<string, number> = {};
    trainees.forEach((t) => {
      t.skills.forEach((skill) => {
        skillCount[skill] = (skillCount[skill] || 0) + 1;
      });
    });
    return Object.entries(skillCount).map(([name, value]) => ({ name, value }));
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col md:flex-row">
      <Toaster position="top-right" />

      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-gray-800/90 p-6 flex flex-col space-y-6">
        <h1 className="text-2xl font-bold">Alcodist Academy</h1>
        <nav className="flex-1 flex flex-col space-y-2">
          <button
            onClick={() => setActiveTab("dashboard")}
            className={`w-full flex items-center p-2 rounded-lg hover:bg-indigo-600/50 transition ${
              activeTab === "dashboard" ? "bg-indigo-500/40" : ""
            }`}
          >
            <UsersIcon className="w-5 h-5 mr-2" />
            Dashboard
          </button>
          <button
            onClick={() => setActiveTab("trainees")}
            className={`w-full flex items-center p-2 rounded-lg hover:bg-indigo-600/50 transition ${
              activeTab === "trainees" ? "bg-indigo-500/40" : ""
            }`}
          >
            <UserGroupIcon className="w-5 h-5 mr-2" />
            Trainees
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

      {/* Main */}
      <main className="flex-1 p-6 md:p-8 overflow-y-auto space-y-8">
        {activeTab === "dashboard" && (
          <>
            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <StatsCard title="Total Trainees" value={totalTrainees} />
              <StatsCard title="Active Trainees" value={activeTrainees} />
              <StatsCard title="Pending Trainees" value={pendingTrainees} />
              <StatsCard title="Total Journals" value={totalJournals} />
            </div>

            {/* Charts */}
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              <ChartCard
                title="Trainee Status"
                type="pie"
                pieData={pieData}
                colors={["#34d399", "#facc15"]}
              />
              <ChartCard
                title="Journals per Trainee"
                type="bar"
                barData={trainees.map((t) => ({
                  name: t.name,
                  value: t.totalJournals || 0,
                }))}
                colors={["#60a5fa"]}
              />
              <ChartCard
                title="Skills Distribution"
                type="bar"
                barData={getSkillDistribution(trainees)}
                colors={["#f472b6"]}
              />
            </div>
          </>
        )}

        {activeTab === "trainees" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {trainees.map((t) => (
              <TraineeCard
                key={t._id}
                trainee={t}
                onActivate={handleActivate}
                onViewJournals={openJournalsModal}
              />
            ))}
          </div>
        )}

        {/* Journal Modal */}
        {selectedTrainee && (
          <JournalModal
            show={!!selectedTrainee}
            trainee={selectedTrainee}
            journals={journals}
            commentMap={commentMap}
            onClose={() => setSelectedTrainee(null)}
            onCommentChange={(id, text) =>
              setCommentMap({ ...commentMap, [id]: text })
            }
            onAddComment={handleAddComment}
            loading={loadingJournals}
          />
        )}
      </main>
    </div>
  );
}
