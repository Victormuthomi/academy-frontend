// src/components/HeroSection.tsx
import React from "react";
import { Link } from "react-router-dom";
import heroIllustration from "../assets/workstation.jpg"; // Horizontal illustration

export default function HeroSection() {
  return (
    <section className="relative flex items-center justify-center min-h-screen px-6 md:px-12 overflow-hidden">
      {/* Background overlay */}
      <div className="absolute inset-0 bg-black/50"></div>

      {/* Floating gradient shapes */}
      <div className="absolute top-10 left-10 w-56 h-56 bg-indigo-500/20 rounded-full blur-3xl animate-fade-in-slow"></div>
      <div className="absolute bottom-20 right-20 w-72 h-72 bg-yellow-400/20 rounded-full blur-3xl animate-fade-in-slow"></div>
      <div className="absolute top-1/3 right-1/4 w-40 h-40 bg-pink-400/20 rounded-full blur-2xl animate-fade-in-slow"></div>

      {/* Particle sparks */}
      <div className="absolute w-full h-full pointer-events-none">
        {Array.from({ length: 15 }).map((_, i) => (
          <span
            key={i}
            className="absolute bg-white/30 rounded-full w-1 h-1 animate-float"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDuration: `${3 + Math.random() * 3}s`,
            }}
          ></span>
        ))}
      </div>

      {/* Hero content */}
      <div className="relative z-10 flex flex-col md:flex-row items-center max-w-7xl w-full gap-12">
        {/* Left: Text */}
        <div className="flex-1 text-center md:text-left space-y-6 animate-fade-in">
          <h1 className="font-playfair text-5xl sm:text-6xl md:text-7xl font-extrabold text-white drop-shadow-2xl">
            Alcodist Academy
          </h1>

          <p className="font-lora text-lg sm:text-xl md:text-2xl text-gray-200 leading-relaxed">
            Learn by doing. Experiment boldly. Iterate relentlessly. Transform
            your ideas into real-world software solutions and become a true
            autonomous engineer.
          </p>

          <p className="mt-4 text-indigo-400 font-semibold text-lg">
            Grow autonomously. Solve creatively. Become an Alcodist.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 mt-8">
            <Link
              to="/register"
              className="px-8 py-3 rounded-full bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-700 hover:to-indigo-600 text-white font-semibold shadow-lg transition-transform transform hover:-translate-y-1 hover:scale-105"
            >
              Get Started
            </Link>
            <Link
              to="/login"
              className="px-8 py-3 rounded-full bg-white text-black hover:bg-white/10 hover:text-white font-semibold shadow-lg transition-transform transform hover:-translate-y-1 hover:scale-105"
            >
              Login
            </Link>
          </div>
        </div>

        {/* Right: Hero Illustration */}
        <div className="flex-1 flex justify-center md:justify-end animate-fade-in">
          <img
            src={heroIllustration}
            alt="Creative learning illustration"
            className="w-full max-w-xl md:max-w-2xl rounded-lg shadow-2xl drop-shadow-2xl hover:scale-105 transition-transform duration-500"
          />
        </div>
      </div>
    </section>
  );
}
