// src/App.tsx
import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import Header from "./components/Header";
import Footer from "./components/Footer";

import LandingPage from "./pages/LandingPage";
import RegisterPage from "./pages/Register";
import LoginPage from "./pages/Login";
import TrainerDashboard from "./pages/trainer/TrainerDashboard";
import TraineeDashboard from "./pages/trainee/TraineeDashboard";

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
          success: { style: { background: "#16a34a", color: "white" } },
          error: { style: { background: "#dc2626", color: "white" } },
        }}
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50 pointer-events-none"></div>

      {/* Header */}
      <Header menuOpen={false} setMenuOpen={() => {}} />

      {/* Main content */}
      <div className="relative z-10 pt-20 pb-10">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/trainer/dashboard" element={<TrainerDashboard />} />
          <Route path="/trainee/dashboard" element={<TraineeDashboard />} />
        </Routes>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;
