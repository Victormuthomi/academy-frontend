// src/components/trainers/JournalModal.tsx
import React from "react";

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
}

interface Trainee {
  _id: string;
  name: string;
}

interface JournalModalProps {
  show: boolean;
  trainee: Trainee;
  journals: Journal[];
  commentMap: Record<string, string>;
  onClose: () => void;
  onCommentChange: (journalId: string, text: string) => void;
  onAddComment: (journalId: string) => void;
  loading?: boolean;
}

const JournalModal: React.FC<JournalModalProps> = ({
  show,
  trainee,
  journals,
  commentMap,
  onClose,
  onCommentChange,
  onAddComment,
  loading = false,
}) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
      <div className="bg-black/80 p-6 rounded-2xl w-full max-w-3xl max-h-[80vh] overflow-y-auto relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-300 hover:text-white text-xl"
        >
          ✕
        </button>

        <h2 className="text-xl font-bold mb-4 text-yellow-400">
          {trainee.name}'s Journals
        </h2>

        {loading && <p className="text-gray-200">Loading journals...</p>}
        {!loading && journals.length === 0 && (
          <p className="text-gray-200">No journals found.</p>
        )}

        {journals.map((j) => (
          <div
            key={j._id}
            className="bg-black/60 p-4 rounded-2xl shadow-md border border-gray-700 hover:border-yellow-400 transition mb-4"
          >
            <h3 className="font-semibold text-yellow-400">{j.title}</h3>
            <p className="text-gray-400 text-xs mb-2">
              {new Date(j.createdAt).toLocaleString()}
            </p>
            <p className="text-gray-200 text-sm">{j.description}</p>
            {j.githubLink && (
              <a
                href={j.githubLink}
                target="_blank"
                className="text-blue-400 hover:underline text-sm"
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
                onChange={(e) => onCommentChange(j._id, e.target.value)}
                className="flex-1 px-3 py-1 rounded-l-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none"
              />
              <button
                onClick={() => onAddComment(j._id)}
                className="bg-indigo-600 px-4 rounded-r-lg hover:bg-indigo-700 transition text-white font-semibold"
              >
                Add
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default JournalModal;
