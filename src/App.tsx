import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import LandingPage from "./pages/LandingPage";
import RegisterPage from "./pages/Register";
import LoginPage from "./pages/Login";

function App() {
  return (
    <div
      className="min-h-screen bg-contain bg-repeat relative text-white font-sans"
      style={{ backgroundImage: "url('/assets/razor.jpeg')" }}
    >
      {/* 🔔 GLOBAL TOASTER */}
      <Toaster
        position="top-right"
        toastOptions={{
          success: {
            style: {
              background: "#16a34a", // green-600
              color: "white",
            },
          },
          error: {
            style: {
              background: "#dc2626", // red-600
              color: "white",
            },
          },
        }}
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50 pointer-events-none"></div>

      <div className="relative z-10">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
