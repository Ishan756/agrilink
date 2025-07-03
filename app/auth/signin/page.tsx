"use client";
import { Header } from "@/components/layout/header";
import { useState } from "react";

export default function LoginPage() {
  const [role, setRole] = useState("consumer");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Role: ${role}\nEmail: ${email}\nPassword: ${password}`);
  };

  return (
    <>
    <Header/>
    <div className="min-h-screen bg-gradient-to-r from-green-100 to-green-200 flex items-center justify-center px-4">
      <div className="w-full max-w-3xl bg-white shadow-xl rounded-3xl p-12 md:p-16 transition-all duration-300">
        <h2 className="text-4xl font-extrabold text-center text-green-700 mb-2">Welcome Back</h2>
        <p className="text-center text-gray-600 mb-8 text-lg">
          Sign in as a {role === "farmer" ? "Farmer" : "Consumer"} to access your dashboard
        </p>

        {/* Role Toggle */}
        <div className="flex justify-center gap-6 mb-10">
          <button
            onClick={() => setRole("farmer")}
            className={`px-6 py-2 text-lg rounded-full font-medium border ${
              role === "farmer"
                ? "bg-green-600 text-white border-green-600"
                : "bg-white text-green-600 border-green-400"
            } shadow-sm hover:shadow-md transition`}
          >
            Farmer
          </button>
          <button
            onClick={() => setRole("consumer")}
            className={`px-6 py-2 text-lg rounded-full font-medium border ${
              role === "consumer"
                ? "bg-green-600 text-white border-green-600"
                : "bg-white text-green-600 border-green-400"
            } shadow-sm hover:shadow-md transition`}
          >
            Consumer
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 max-w-xl mx-auto">
          <div>
            <label className="block mb-1 font-semibold text-gray-700">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-5 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 text-lg"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-semibold text-gray-700">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              className="w-full px-5 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 text-lg"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-lg text-lg transition"
          >
            Sign In
          </button>
        </form>

        <p className="text-center mt-8 text-base">
          Don’t have an account?{" "}
          <a href="/auth/signup" className="text-green-700 font-semibold underline">
            Create one
          </a>
        </p>
      </div>
    </div>
    </>
  );
}
