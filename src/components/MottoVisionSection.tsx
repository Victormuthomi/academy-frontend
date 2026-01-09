// src/components/MottoVisionSection.tsx
import React from "react";
import visionImg from "../assets/expert.jpg"; // replace with your horizontal image

export default function MottoSection() {
  return (
    <section className="relative px-6 md:px-12 py-24 max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12 overflow-hidden">
      {/* Floating gradient shapes behind image */}
      <div className="absolute right-0 top-1/4 w-64 h-64 bg-indigo-500/20 rounded-full blur-3xl animate-fade-in-slow"></div>
      <div className="absolute right-20 bottom-0 w-48 h-48 bg-yellow-400/20 rounded-full blur-2xl animate-fade-in-slow"></div>

      {/* Left: Text */}
      <div className="flex-1 text-center md:text-left space-y-6 animate-fade-in">
        <h2 className="font-playfair text-4xl sm:text-5xl md:text-6xl font-bold text-white drop-shadow-2xl">
          Our Vision & Motto
        </h2>

        <p className="font-lora text-lg sm:text-xl md:text-2xl text-gray-200 leading-relaxed">
          At <strong>Alcodist Academy</strong>, we believe mastery comes through{" "}
          <strong>practice, experimentation, and iteration</strong>. Every
          learner owns their journey — from solving real-world problems to
          building impactful projects. We prioritize{" "}
          <strong>wisdom over knowledge</strong>,{" "}
          <strong>skills over documents</strong>, and{" "}
          <strong>results over theory</strong>. By embracing autonomy and
          accountability, our members transform ideas into actionable solutions
          while cultivating a mindset of growth and innovation.
        </p>

        <p className="mt-4 text-indigo-400 font-semibold text-lg">
          Grow autonomously. Solve creatively. Become an Alcodist.
        </p>
      </div>

      {/* Right: Illustration */}
      <div className="flex-1 flex justify-center md:justify-end animate-fade-in">
        <img
          src={visionImg}
          alt="Creative learning illustration"
          className="w-full max-w-xl md:max-w-2xl rounded-lg shadow-2xl drop-shadow-2xl hover:scale-105 transition-transform duration-500"
        />
      </div>
    </section>
  );
}
