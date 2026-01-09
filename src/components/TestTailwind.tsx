import React from "react";

const TestTailwind: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-500 to-blue-500">
      <div className="bg-white p-12 rounded-xl shadow-xl text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Tailwind is Working!
        </h1>
        <p className="text-gray-600 mb-6">
          If you can see this styling, Tailwind CSS is properly configured.
        </p>
        <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-3 rounded-lg">
          Awesome
        </button>
      </div>
    </div>
  );
};

export default TestTailwind;
