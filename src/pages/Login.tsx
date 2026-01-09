// src/pages/Login.tsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { AUTH_API } from "../config/api";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";
import jwt_decode from "jwt-decode";

interface DecodedToken {
  sub: string;
  role: string;
  iat: number;
  exp: number;
}

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
      if (!token) throw new Error("No token received");

      // Decode JWT to get role
      const decoded: DecodedToken = jwt_decode(token);

      // ✅ Store token and role in localStorage
      localStorage.setItem("accessToken", token);
      localStorage.setItem("userRole", decoded.role);

      console.log("Token stored:", localStorage.getItem("accessToken"));
      console.log("Role stored:", localStorage.getItem("userRole"));

      // ✅ Show success toast
      toast.success("Welcome back! Login successful 🚀");

      // Redirect based on role
      if (decoded.role === "trainee") {
        navigate("/trainee/dashboard");
      } else if (decoded.role === "trainer") {
        navigate("/trainer/dashboard");
      } else {
        navigate("/");
      }
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
    <div className="min-h-screen flex items-center justify-center bg-[url('/assets/razor.jpeg')] bg-cover bg-center px-4 relative">
      {/* Global overlay */}
      <div className="absolute inset-0 bg-black/50 pointer-events-none"></div>

      {/* Toast container */}
      <Toaster position="top-right" reverseOrder={false} />

      <div className="relative z-10 bg-gray-900/70 backdrop-blur-xl rounded-2xl p-10 max-w-md w-full shadow-2xl text-white">
        <h2 className="text-3xl font-playfair font-bold text-center mb-6">
          Welcome Back
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            name="email"
            placeholder="Email address"
            value={form.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 rounded-lg bg-gray-800 placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 outline-none transition"
          />

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-lg bg-gray-800 placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 outline-none transition"
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

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 rounded-full font-semibold transition transform hover:-translate-y-0.5 disabled:opacity-50"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

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
