import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";

const AdminLogin = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const { data } = await API.post("/auth/login", { email, password });

      if (data.success) {
        // ✅ Store token & mark as logged in
        localStorage.setItem("adminToken", data.token);
        onLogin();

        // ✅ Redirect immediately
        navigate("/admin", { replace: true });
      } else {
        setError(data.message || "Login failed");
      }
    } catch (err) {
      console.error(err);
      setError("Invalid credentials or server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white px-6">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm bg-gray-900 p-8 rounded-lg shadow-lg"
      >
        <h2 className="text-2xl font-semibold mb-6 text-center">Admin Login</h2>

        {error && (
          <div className="mb-4 text-red-500 text-center font-semibold">
            {error}
          </div>
        )}

        <label className="block mb-2 font-medium" htmlFor="email">
          Email
        </label>
        <input
          id="email"
          type="email"
          className="w-full mb-4 px-3 py-2 bg-black border border-white rounded focus:outline-none focus:ring-2 focus:ring-white"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="email"
          required
        />

        <label className="block mb-2 font-medium" htmlFor="password">
          Password
        </label>
        <input
          id="password"
          type="password"
          className="w-full mb-6 px-3 py-2 bg-black border border-white rounded focus:outline-none focus:ring-2 focus:ring-white"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="current-password"
          required
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-white text-black font-semibold py-2 rounded hover:bg-gray-200 transition"
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
};

export default AdminLogin;
