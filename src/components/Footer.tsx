// src/components/Footer.tsx
import React from "react";
import { FaGithub, FaLinkedin, FaTwitter, FaGlobe } from "react-icons/fa";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-200 py-8 px-6 md:px-12">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <p className="text-sm font-lora">
          &copy; {year} Alcodist Academy. All rights reserved.
        </p>

        <div className="flex gap-6 text-2xl">
          <a
            href="https://github.com/YOUR_USERNAME"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-indigo-500"
            title="GitHub"
          >
            <FaGithub />
          </a>
          <a
            href="https://linkedin.com/in/YOUR_USERNAME"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-indigo-500"
            title="LinkedIn"
          >
            <FaLinkedin />
          </a>
          <a
            href="https://twitter.com/YOUR_USERNAME"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-indigo-500"
            title="Twitter"
          >
            <FaTwitter />
          </a>
          <a
            href="https://YOUR_PORTFOLIO_LINK"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-indigo-500"
            title="Portfolio"
          >
            <FaGlobe />
          </a>
        </div>
      </div>
    </footer>
  );
}
