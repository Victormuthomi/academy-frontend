// src/components/CultureSection.tsx
import {
  LightBulbIcon,
  CogIcon,
  ClockIcon,
  BookOpenIcon,
  BeakerIcon,
  SparklesIcon,
  RocketLaunchIcon,
} from "@heroicons/react/24/solid";

const culturePoints = [
  {
    title: "Creative Alcodists",
    description:
      "Learn through action and practice. Share, experiment, and grow together in software engineering and creative problem solving.",
    icon: LightBulbIcon,
    color: "bg-indigo-500/20 text-indigo-500",
  },
  {
    title: "Autonomous Engineers",
    description:
      "Own your work, own your learning. Take responsibility and drive your projects to completion.",
    icon: CogIcon,
    color: "bg-green-500/20 text-green-500",
  },
  {
    title: "Async & Efficient",
    description:
      "Less talk, more action. Communicate effectively and get things done asynchronously.",
    icon: ClockIcon,
    color: "bg-yellow-400/20 text-yellow-400",
  },
  {
    title: "Wisdom over Knowledge",
    description:
      "Skills matter more than documents. Focus on doing and understanding rather than just reading.",
    icon: BookOpenIcon,
    color: "bg-purple-500/20 text-purple-500",
  },
  {
    title: "Alchemist Mindset",
    description:
      "Mix ideas, experiment, and transform. Innovation comes from creative synthesis and iteration.",
    icon: BeakerIcon,
    color: "bg-pink-500/20 text-pink-500",
  },
  {
    title: "Value-Driven",
    description:
      "Build what truly matters. Focus on creating impactful solutions that solve real problems.",
    icon: SparklesIcon,
    color: "bg-orange-400/20 text-orange-400",
  },
  {
    title: "Freedom & Accountability",
    description:
      "Move with those ready. Be accountable and seize opportunities while they exist.",
    icon: RocketLaunchIcon,
    color: "bg-red-500/20 text-red-500",
  },
];

export default function CultureSection() {
  return (
    <section className="relative px-6 md:px-12 py-24 bg-gray-900 text-white max-w-7xl mx-auto">
      <h2 className="font-playfair text-4xl sm:text-5xl md:text-6xl font-bold text-center drop-shadow-2xl mb-16 animate-fade-in">
        Our Culture
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {culturePoints.map((point, index) => {
          const Icon = point.icon;
          return (
            <div
              key={index}
              className="group bg-gray-800/30 backdrop-blur-md rounded-2xl p-6 flex flex-col items-start gap-4 shadow-2xl hover:shadow-2xl hover:scale-105 transition-transform duration-500 animate-fade-in"
            >
              {/* Icon */}
              <div
                className={`w-14 h-14 flex items-center justify-center rounded-full ${point.color} mb-2 shadow-lg`}
              >
                <Icon className="w-7 h-7" />
              </div>

              {/* Title */}
              <h3 className="font-playfair text-xl sm:text-2xl font-semibold">
                {point.title}
              </h3>

              {/* Description */}
              <p className="font-lora text-gray-300 leading-relaxed">
                {point.description}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
