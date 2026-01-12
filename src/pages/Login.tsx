// src/pages/Login.tsx
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { AUTH_API } from "../config/api";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";
import React, { useState } from "react";

export default function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post(AUTH_API.LOGIN, form);

      const token = res.data.accessToken;
      const role = res.data.role;

      if (!token || !role)
        throw new Error("Invalid login response from server");

      // Store in localStorage
      localStorage.setItem("accessToken", token);
      localStorage.setItem("userRole", role);

      // ✅ Success toast
      toast.success("Welcome back! Login successful 🚀", { duration: 2500 });

      // Redirect based on role after a short delay
      setTimeout(() => {
        if (role === "trainee") navigate("/trainee/dashboard");
        else if (role === "trainer") navigate("/trainer/dashboard");
        else navigate("/");
      }, 500); // 500ms delay to let toast render
    } catch (err: any) {
      const status = err.response?.status;
      const message = err.response?.data?.message;

      if (status === 403) {
        toast.error(
          "Your account is pending approval. Please wait for confirmation.",
        );
      } else if (status === 401) {
        toast.error("Invalid credentials or inactive user.");
      } else if (status === 404) {
        toast.error("User does not exist. Please register first.");
      } else {
        toast.error(message || "Login failed. Try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[url('/assets/razor.jpeg')] bg-cover bg-center relative px-4">
      {/* Overlay for readability */}
      <div className="absolute inset-0 bg-black/50 pointer-events-none"></div>

      {/* Toast container */}
      <Toaster position="top-right" reverseOrder={false} />

      {/* Login Card */}
      <div className="relative z-10 bg-gray-900/70 backdrop-blur-xl rounded-3xl p-10 max-w-md w-full shadow-2xl text-white">
        <h2 className="text-3xl font-playfair font-bold text-center mb-6 animate-fade-in">
          Welcome Back
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email */}
          <input
            type="email"
            name="email"
            placeholder="Email address"
            value={form.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 rounded-xl bg-gray-800 placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 outline-none transition"
          />

          {/* Password with show/hide */}
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              required
              minLength={6}
              className="w-full px-4 py-3 rounded-xl bg-gray-800 placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 outline-none transition"
            />
            <div
              className="absolute right-3 top-3 cursor-pointer text-gray-400 hover:text-white"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <EyeSlashIcon className="w-5 h-5" />
              ) : (
                <EyeIcon className="w-5 h-5" />
              )}
            </div>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 rounded-full font-semibold shadow-lg transition transform hover:-translate-y-0.5 disabled:opacity-50"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {/* Register Link */}
        <p className="mt-6 text-center text-gray-400">
          Not registered yet?{" "}
          <span
            onClick={() => navigate("/register")}
            className="text-indigo-400 underline cursor-pointer hover:text-indigo-300"
          >
            Create an account
          </span>
        </p>
      </div>
    </div>
  );
}
