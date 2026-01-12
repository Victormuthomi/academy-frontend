// src/components/WhyJoinSection.tsx
import whyImg from "../assets/cyber.jpg"; // high-quality illustration

const points = [
  {
    title: "Learn by Doing",
    description:
      "We emphasize hands-on learning. Solve real-world problems and build actual projects from day one.",
  },
  {
    title: "Autonomy & Ownership",
    description:
      "Take full ownership of your learning journey. Manage projects, experiment, and iterate without micromanagement.",
  },
  {
    title: "Mentorship & Growth",
    description:
      "Access guidance from experienced engineers while maintaining independence and exploring your own solutions.",
  },
  {
    title: "Creative Problem Solving",
    description:
      "Develop an alchemist mindset: mix ideas, experiment, and transform concepts into actionable solutions.",
  },
];

export default function WhyJoinSection() {
  return (
    <section className="relative px-6 md:px-12 py-24 max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12 overflow-hidden">
      {/* Background floating shapes */}
      <div className="absolute top-0 left-10 w-48 h-48 bg-indigo-500/20 rounded-full blur-3xl animate-fade-in-slow"></div>
      <div className="absolute bottom-10 right-20 w-72 h-72 bg-yellow-400/20 rounded-full blur-3xl animate-fade-in-slow"></div>

      {/* Particle sparks */}
      <div className="absolute w-full h-full pointer-events-none">
        {Array.from({ length: 12 }).map((_, i) => (
          <span
            key={i}
            className="absolute bg-white/20 rounded-full w-1 h-1 animate-float"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDuration: `${3 + Math.random() * 3}s`,
            }}
          ></span>
        ))}
      </div>

      {/* Left: Text */}
      <div className="flex-1 space-y-6 z-10">
        <h2 className="font-playfair text-4xl sm:text-5xl md:text-6xl font-bold text-white drop-shadow-2xl animate-fade-in">
          Why Join Alcodist Academy
        </h2>
        <p className="font-lora text-lg sm:text-xl md:text-2xl text-gray-300 leading-relaxed animate-fade-in">
          At Alcodist Academy, we cultivate autonomous engineers who learn
          through action, experimentation, and iteration. Our approach
          prioritizes skills over documents, results over theory, and wisdom
          over knowledge.
        </p>

        {/* Points / Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6">
          {points.map((point, i) => (
            <div
              key={i}
              className={`bg-gray-800/30 backdrop-blur-md rounded-2xl p-6 shadow-2xl transform transition-transform duration-500 hover:scale-105 hover:shadow-3xl animate-fade-in`}
              style={{ animationDelay: `${i * 150}ms` }}
            >
              <h3 className="font-playfair text-xl font-semibold text-white mb-2">
                {point.title}
              </h3>
              <p className="font-lora text-gray-300 leading-relaxed">
                {point.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Right: Illustration */}
      <div className="flex-1 flex justify-center md:justify-end z-10 animate-fade-in">
        <img
          src={whyImg}
          alt="Why join illustration"
          className="w-full max-w-xl md:max-w-2xl rounded-lg shadow-2xl drop-shadow-2xl hover:scale-105 transition-transform duration-500"
        />
      </div>
    </section>
  );
}
