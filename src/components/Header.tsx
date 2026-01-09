import React from "react";
import { Link } from "react-router-dom";

interface HeaderProps {
  menuOpen: boolean;
  setMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Header({ menuOpen, setMenuOpen }: HeaderProps) {
  return (
    <header className="fixed w-full z-50 bg-black/40 backdrop-blur-md">
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
        <Link to="/" className="text-indigo-400 font-bold text-xl sm:text-2xl">
          Alcodist Academy
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex gap-6 items-center">
          <Link to="/register" className="hover:text-indigo-300 transition">
            Register
          </Link>
          <Link to="/login" className="hover:text-indigo-300 transition">
            Login
          </Link>
        </nav>
      </div>

      {/* Mobile Bottom Navbar */}
      <div className="fixed bottom-0 left-0 w-full md:hidden bg-black/60 flex justify-around py-2 text-sm">
        <Link to="/" className="hover:text-indigo-300 transition">
          Home
        </Link>
        <Link to="/register" className="hover:text-indigo-300 transition">
          Register
        </Link>
        <Link to="/login" className="hover:text-indigo-300 transition">
          Login
        </Link>
      </div>
    </header>
  );
}
