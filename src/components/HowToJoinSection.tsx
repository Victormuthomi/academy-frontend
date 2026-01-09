// src/components/HowToJoinSection.tsx
import React from "react";
import {
  UserPlusIcon,
  DocumentTextIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";
import joinIllustration from "../assets/tech.jpg";

const steps = [
  {
    title: "Register on the Portal",
    description:
      "Sign up on Alcodist Academy to create your account and gain access to the portal.",
    icon: UserPlusIcon,
    color: "bg-indigo-500/20 text-indigo-500",
    action: (
      <Link
        to="/register"
        className="mt-3 inline-block px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-full shadow-lg transition duration-300"
      >
        Register
      </Link>
    ),
  },
  {
    title: "Fill the Google Form",
    description: (
      <>
        Complete our form with extra questions, task instructions, and include
        your task submission link. <br />
        Form link:{" "}
        <a
          href="https://forms.gle/3k3gQ1dGqGb99KZ88"
          target="_blank"
          rel="noopener noreferrer"
          className="text-yellow-400 underline hover:text-yellow-300 transition-colors"
        >
          https://forms.gle/3k3gQ1dGqGb99KZ88
        </a>
      </>
    ),
    icon: DocumentTextIcon,
    color: "bg-yellow-400/20 text-yellow-400",
  },
  {
    title: "Submit & Get Approved",
    description:
      "Once we review your submission, you’ll be notified and able to login. Start your Alcodist journey with full access!",
    icon: CheckCircleIcon,
    color: "bg-green-500/20 text-green-500",
  },
];

export default function HowToJoinSection() {
  return (
    <section className="relative px-6 md:px-12 py-24 max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12 overflow-hidden">
      {/* Background floating shapes */}
      <div className="absolute top-10 left-0 w-48 h-48 bg-pink-500/20 rounded-full blur-3xl animate-fade-in-slow"></div>
      <div className="absolute bottom-0 right-10 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl animate-fade-in-slow"></div>

      {/* Left: Steps */}
      <div className="flex-1 space-y-16 z-10 relative">
        <h2 className="font-playfair text-4xl sm:text-5xl md:text-6xl font-bold text-white drop-shadow-2xl animate-fade-in">
          How To Join
        </h2>
        <p className="font-lora text-lg sm:text-xl md:text-2xl text-gray-300 leading-relaxed animate-fade-in">
          Follow these simple steps to start your Alcodist journey. Register,
          complete the task, and gain full access to our academy.
        </p>

        <div className="relative flex flex-col gap-12">
          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <div key={i} className="relative">
                {/* Connector line (except for last step) */}
                {i < steps.length - 1 && (
                  <div className="absolute left-7 top-14 h-16 border-l-2 border-gray-500/40 animate-fade-in-slow"></div>
                )}

                <div
                  className={`group bg-gray-800/30 backdrop-blur-md rounded-2xl p-6 shadow-2xl transform transition-transform duration-500 hover:scale-105 hover:shadow-3xl animate-fade-in`}
                  style={{ animationDelay: `${i * 150}ms` }}
                >
                  <div
                    className={`w-14 h-14 flex items-center justify-center rounded-full ${step.color} mb-2 shadow-lg`}
                  >
                    <Icon className="w-7 h-7" />
                  </div>
                  <h3 className="font-playfair text-xl font-semibold text-white mb-2">
                    {step.title}
                  </h3>
                  <p className="font-lora text-gray-300 leading-relaxed">
                    {step.description}
                  </p>

                  {step.action && <div>{step.action}</div>}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Right: Illustration */}
      <div className="flex-1 flex justify-center md:justify-end z-10 animate-fade-in">
        <img
          src={joinIllustration}
          alt="How to join illustration"
          className="w-full max-w-xl md:max-w-2xl rounded-lg shadow-2xl drop-shadow-2xl hover:scale-105 transition-transform duration-500"
        />
      </div>
    </section>
  );
}
