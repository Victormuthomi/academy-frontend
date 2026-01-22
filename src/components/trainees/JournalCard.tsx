// src/components/trainees/JournalCard.tsx
import React from "react";

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

interface JournalCardProps {
  journal: Journal;
}

const JournalCard: React.FC<JournalCardProps> = ({ journal }) => {
  return (
    <div className="bg-black/60 p-6 rounded-2xl shadow-md border border-gray-700 hover:border-yellow-400 transition max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-2">
        <h4 className="text-xl font-bold text-gray-200">{journal.title}</h4>
        <span className="text-gray-400 text-sm">
          {new Date(journal.date).toLocaleDateString()}
        </span>
      </div>

      {/* Description */}
      <p className="text-gray-300 text-sm mb-3">{journal.description}</p>

      {/* GitHub Link */}
      <a
        href={journal.githubLink}
        target="_blank"
        rel="noopener noreferrer"
        className="text-yellow-400 hover:underline text-sm mb-3 block"
      >
        GitHub Link
      </a>

      {/* Comments */}
      {journal.comments.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {journal.comments.map((c) => (
            <span
              key={c._id}
              className="bg-gray-700/50 text-gray-200 px-2 py-1 rounded-full text-xs"
            >
              {c.comment}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

export default JournalCard;
