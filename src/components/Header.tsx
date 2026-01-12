// src/components/Header.tsx
import { Link, useNavigate } from "react-router-dom";

interface HeaderProps {
  menuOpen: boolean;
  setMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
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

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-white focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            {menuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-black/90 text-white flex flex-col gap-2 px-6 py-4">
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
                className="hover:text-red-400 transition text-left"
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
                className="hover:text-red-400 transition text-left"
              >
                Logout
              </button>
            </>
          )}
        </div>
      )}
    </header>
  );
}
