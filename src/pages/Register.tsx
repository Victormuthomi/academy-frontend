import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { AUTH_API } from "../config/api";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";

export default function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  /* -------------------------
     Validation Helpers
  -------------------------- */
  const isEmailValid = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const isPhoneValid = (phone: string) => /^\+?[0-9]{7,15}$/.test(phone);

  const isPasswordStrong = (password: string) =>
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/.test(password);

  /* -------------------------
     Submit Handler
  -------------------------- */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!isEmailValid(form.email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (!isPhoneValid(form.phone)) {
      setError("Please enter a valid phone number.");
      return;
    }

    if (!isPasswordStrong(form.password)) {
      setError(
        "Password must be at least 6 characters and include uppercase, lowercase, and a number.",
      );
      return;
    }

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      await axios.post(AUTH_API.REGISTER, {
        name: form.name,
        email: form.email,
        phone: form.phone,
        password: form.password,
        role: "trainee", // enforced
      });

      toast.success(
        "Registration received! Please fill the Google form and wait for approval.",
        { duration: 5000 },
      );

      setLoading(false);

      // Let the toast breathe
      setTimeout(() => {
        navigate("/login");
      }, 1800);
    } catch (err: any) {
      setError(err.response?.data?.message || "Registration failed.");
      setLoading(false);
    }
  };

  /* -------------------------
     UI
  -------------------------- */
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="bg-gray-900/70 backdrop-blur-xl rounded-2xl p-10 max-w-md w-full shadow-2xl">
        <h1 className="text-3xl font-playfair font-bold text-center mb-6">
          Join Alcodist Academy
        </h1>

        {error && (
          <div className="mb-4 p-3 rounded-lg bg-red-600/80 text-center text-sm font-semibold">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={form.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 rounded-lg bg-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={form.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 rounded-lg bg-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />

          <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            value={form.phone}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 rounded-lg bg-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />

          {/* Password */}
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-lg bg-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-3 text-gray-400 hover:text-white"
            >
              {showPassword ? (
                <EyeSlashIcon className="w-5 h-5" />
              ) : (
                <EyeIcon className="w-5 h-5" />
              )}
            </button>
          </div>

          {/* Confirm Password */}
          <div className="relative">
            <input
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              placeholder="Confirm Password"
              value={form.confirmPassword}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-lg bg-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-3 text-gray-400 hover:text-white"
            >
              {showConfirmPassword ? (
                <EyeSlashIcon className="w-5 h-5" />
              ) : (
                <EyeIcon className="w-5 h-5" />
              )}
            </button>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-full bg-indigo-600 hover:bg-indigo-700 font-semibold transition transform hover:-translate-y-0.5"
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        <p className="mt-6 text-center text-gray-400 text-sm">
          Already registered?{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-indigo-400 cursor-pointer hover:underline"
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
}
