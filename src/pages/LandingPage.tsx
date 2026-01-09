import React, { useState } from "react";
import Header from "../components/Header";
import HeroSection from "../components/HeroSection";
import MottoSection from "../components/MottoVisionSection";
import CultureSection from "../components/CultureSection";
import WhyJoinSection from "../components/WhyJoinSection";
import HowToJoinSection from "../components/HowToJoinSection";
import Footer from "../components/Footer";

export default function LandingPage() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="relative">
      {/* Header */}
      <Header menuOpen={menuOpen} setMenuOpen={setMenuOpen} />

      {/* Hero */}
      <HeroSection />

      {/* Motto / Vision */}
      <MottoSection />

      {/* Culture */}
      <CultureSection />

      {/* Why Join */}
      <WhyJoinSection />

      {/* How To Join */}
      <HowToJoinSection />

      {/* Footer */}
      <Footer />
    </div>
  );
}
