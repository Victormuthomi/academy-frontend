// src/pages/TrainerDashboard.tsx
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
  trainee?: Trainee; // in case API returns author info
}

export default function TrainerDashboard() {
  const [trainees, setTrainees] = useState<Trainee[]>([]);
  const [selectedTrainee, setSelectedTrainee] = useState<Trainee | null>(null);
  const [journals, setJournals] = useState<Journal[]>([]);
  const [loadingJournals, setLoadingJournals] = useState(false);
  const [commentMap, setCommentMap] = useState<{ [key: string]: string }>({});
  const [activeTab, setActiveTab] = useState("dashboard");
  const [showJournalModal, setShowJournalModal] = useState(false);

  const token = localStorage.getItem("accessToken");

  const fetchTrainees = async () => {
    try {
      const res = await axios.get(TRAINER_API.TRAINEES, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTrainees(res.data);
    } catch {
      toast.error("Failed to load trainees");
    }
  };

  const fetchJournals = async (traineeId: string) => {
    setLoadingJournals(true);
    try {
      const res = await axios.get(TRAINER_API.GET_JOURNALS(traineeId), {
        headers: { Authorization: `Bearer ${token}` },
      });
      // Sort journals newest first
      const sorted = res.data.sort(
        (a: Journal, b: Journal) =>
          new Date(b.date).getTime() - new Date(a.date).getTime(),
      );
      setJournals(sorted);
    } catch {
      toast.error("Failed to load journals");
    } finally {
      setLoadingJournals(false);
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
      if (selectedTrainee?._id === traineeId) {
        setSelectedTrainee({ ...selectedTrainee, isActive: true });
      }
    } catch {
      toast.error("Activation failed");
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

  const openJournalsModal = (trainee: Trainee) => {
    setSelectedTrainee(trainee);
    fetchJournals(trainee._id);
    setShowJournalModal(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("userRole");
    window.location.href = "/login";
  };

  useEffect(() => {
    fetchTrainees();
  }, []);

  // Stats
  const totalTrainees = trainees.length;
  const activeTrainees = trainees.filter((t) => t.isActive).length;
  const pendingTrainees = totalTrainees - activeTrainees;
  const totalJournals = journals.length;

  const pieData = [
    { name: "Active", value: activeTrainees },
    { name: "Pending", value: pendingTrainees },
  ];
  const COLORS = ["#34d399", "#facc15"];

  // Latest pending trainees (limit 5)
  const latestPending = trainees.filter((t) => !t.isActive).slice(0, 5);

  // Latest trainees (limit 5)
  const latestTrainees = trainees.slice(0, 5);

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
            onClick={() => handleLogout()}
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
        {activeTab === "dashboard" && (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-gray-800/50 p-6 rounded-2xl hover:scale-105 transform transition cursor-pointer">
                <p className="text-gray-300 text-sm">Total Trainees</p>
                <h3 className="text-2xl font-bold">{totalTrainees}</h3>
              </div>
              <div className="bg-gray-800/50 p-6 rounded-2xl hover:scale-105 transform transition cursor-pointer">
                <p className="text-gray-300 text-sm">Active Trainees</p>
                <h3 className="text-2xl font-bold">{activeTrainees}</h3>
              </div>
              <div className="bg-gray-800/50 p-6 rounded-2xl hover:scale-105 transform transition cursor-pointer">
                <p className="text-gray-300 text-sm">Pending Trainees</p>
                <h3 className="text-2xl font-bold">{pendingTrainees}</h3>
              </div>
              <div className="bg-gray-800/50 p-6 rounded-2xl hover:scale-105 transform transition cursor-pointer">
                <p className="text-gray-300 text-sm">Total Journals</p>
                <h3 className="text-2xl font-bold">{totalJournals}</h3>
              </div>
            </div>

            <div className="mt-6 bg-gray-800/50 p-6 rounded-2xl w-full h-64">
              <h3 className="text-xl font-bold mb-4">Trainee Status</h3>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    dataKey="value"
                    nameKey="name"
                    outerRadius={80}
                    label={(entry) => `${entry.name}: ${entry.value}`}
                  >
                    {pieData.map((entry, index) => (
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

            {/* Latest Pending Trainees */}
            {latestPending.length > 0 && (
              <div>
                <h3 className="text-xl font-bold mb-4">Pending Trainees</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {latestPending.map((t) => (
                    <div
                      key={t._id}
                      className="bg-gray-800/50 p-5 rounded-2xl hover:scale-105 transform transition"
                    >
                      <h3 className="text-lg font-bold">{t.name}</h3>
                      <p className="text-gray-300 text-sm">{t.email}</p>
                      <p className="text-gray-300 text-sm">
                        {t.institution || ""}
                      </p>
                      <div className="mt-3 flex space-x-2">
                        <button
                          onClick={() => handleActivate(t._id)}
                          className="flex-1 bg-indigo-600 py-1 rounded hover:bg-indigo-700 transition"
                        >
                          Activate
                        </button>
                        <button
                          onClick={() => openJournalsModal(t)}
                          className="flex-1 bg-gray-700 py-1 rounded hover:bg-gray-600 transition"
                        >
                          View Journals
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        )}

        {/* Trainees Tab */}
        {activeTab === "trainees" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {latestTrainees.map((t) => (
              <div
                key={t._id}
                className="bg-gray-800/50 p-5 rounded-2xl hover:scale-105 transform transition"
              >
                <h3 className="text-lg font-bold">{t.name}</h3>
                <p className="text-gray-300 text-sm">{t.email}</p>
                <p className="text-gray-300 text-sm">{t.institution || ""}</p>
                <p className="mt-2">
                  Status:{" "}
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${
                      t.isActive ? "bg-green-500/50" : "bg-yellow-400/50"
                    }`}
                  >
                    {t.isActive ? "Active" : "Pending"}
                  </span>
                </p>

                <div className="mt-3 flex space-x-2">
                  {!t.isActive && (
                    <button
                      onClick={() => handleActivate(t._id)}
                      className="flex-1 bg-indigo-600 py-1 rounded hover:bg-indigo-700 transition"
                    >
                      Activate
                    </button>
                  )}
                  <button
                    onClick={() => openJournalsModal(t)}
                    className="flex-1 bg-gray-700 py-1 rounded hover:bg-gray-600 transition"
                  >
                    View Journals
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Journal Modal */}
        {showJournalModal && selectedTrainee && (
          <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
            <div className="bg-gray-900 p-6 rounded-2xl w-11/12 md:w-3/4 max-h-[80vh] overflow-y-auto relative">
              <button
                onClick={() => setShowJournalModal(false)}
                className="absolute top-3 right-3 text-gray-300 hover:text-white"
              >
                ✕
              </button>
              <h2 className="text-xl font-bold mb-4">
                {selectedTrainee.name}'s Journals
              </h2>
              {loadingJournals && <p>Loading journals...</p>}
              {!loadingJournals && journals.length === 0 && (
                <p>No journals found.</p>
              )}
              {journals.map((j) => (
                <div
                  key={j._id}
                  className="bg-gray-800/50 p-4 rounded-2xl hover:scale-105 transform transition mb-4"
                >
                  <h3 className="font-semibold">{j.title}</h3>
                  <p className="text-gray-400 text-xs">
                    {new Date(j.createdAt).toLocaleString()}
                  </p>
                  <p className="text-gray-300 text-sm">{j.description}</p>
                  {j.githubLink && (
                    <a
                      href={j.githubLink}
                      target="_blank"
                      className="text-indigo-400 hover:underline text-sm"
                    >
                      GitHub Link
                    </a>
                  )}
                  <div className="flex flex-wrap mt-2 gap-2">
                    {j.comments.map((c) => (
                      <span
                        key={c._id}
                        className="bg-gray-700/40 px-2 py-1 rounded-full text-xs"
                      >
                        {c.comment}
                      </span>
                    ))}
                  </div>
                  <div className="flex mt-2">
                    <input
                      type="text"
                      placeholder="Add comment..."
                      value={commentMap[j._id] || ""}
                      onChange={(e) =>
                        setCommentMap({
                          ...commentMap,
                          [j._id]: e.target.value,
                        })
                      }
                      className="flex-1 px-3 py-1 rounded-l-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none"
                    />
                    <button
                      onClick={() => handleAddComment(j._id)}
                      className="bg-indigo-600 px-4 rounded-r-lg hover:bg-indigo-700 transition"
                    >
                      Add
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
