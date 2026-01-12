import HeroSection from "../components/HeroSection";
import MottoSection from "../components/MottoVisionSection";
import CultureSection from "../components/CultureSection";
import WhyJoinSection from "../components/WhyJoinSection";
import HowToJoinSection from "../components/HowToJoinSection";

export default function LandingPage() {
  return (
    <div className="relative">
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
    </div>
  );
}
