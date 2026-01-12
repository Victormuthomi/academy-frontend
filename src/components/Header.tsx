import React from "react";
import { Link, useNavigate } from "react-router-dom";

interface HeaderProps {
  menuOpen?: boolean;
  setMenuOpen?: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Header({ menuOpen, setMenuOpen }: HeaderProps) {
  const navigate = useNavigate();
  const token = localStorage.getItem("accessToken");
  const role = localStorage.getItem("userRole");

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("userRole");
    navigate("/login");
  };

  return (
    <header className="fixed w-full z-50 bg-black/40 backdrop-blur-md">
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
        <Link to="/" className="text-indigo-400 font-bold text-xl sm:text-2xl">
          Alcodist Academy
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex gap-6 items-center">
          {!token && (
            <>
              <Link to="/register" className="hover:text-indigo-300 transition">
                Register
              </Link>
              <Link to="/login" className="hover:text-indigo-300 transition">
                Login
              </Link>
            </>
          )}

          {token && role === "trainer" && (
            <>
              <Link
                to="/trainer/dashboard"
                className="hover:text-indigo-300 transition"
              >
                Dashboard
              </Link>
              <button
                onClick={handleLogout}
                className="hover:text-red-400 transition"
              >
                Logout
              </button>
            </>
          )}

          {token && role === "trainee" && (
            <>
              <Link
                to="/trainee/dashboard"
                className="hover:text-indigo-300 transition"
              >
                Dashboard
              </Link>
              <Link
                to="/trainee/profile"
                className="hover:text-indigo-300 transition"
              >
                Profile
              </Link>
              <button
                onClick={handleLogout}
                className="hover:text-red-400 transition"
              >
                Logout
              </button>
            </>
          )}
        </nav>
      </div>

      {/* Mobile Bottom Navbar */}
      <div className="fixed bottom-0 left-0 w-full md:hidden bg-black/60 flex justify-around py-2 text-sm">
        {!token && (
          <>
            <Link to="/" className="hover:text-indigo-300 transition">
              Home
            </Link>
            <Link to="/register" className="hover:text-indigo-300 transition">
              Register
            </Link>
            <Link to="/login" className="hover:text-indigo-300 transition">
              Login
            </Link>
          </>
        )}

        {token && role === "trainer" && (
          <>
            <Link
              to="/trainer/dashboard"
              className="hover:text-indigo-300 transition"
            >
              Dashboard
            </Link>
            <button
              onClick={handleLogout}
              className="hover:text-red-400 transition"
            >
              Logout
            </button>
          </>
        )}

        {token && role === "trainee" && (
          <>
            <Link
              to="/trainee/dashboard"
              className="hover:text-indigo-300 transition"
            >
              Dashboard
            </Link>
            <Link
              to="/trainee/profile"
              className="hover:text-indigo-300 transition"
            >
              Profile
            </Link>
            <button
              onClick={handleLogout}
              className="hover:text-red-400 transition"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </header>
  );
}
