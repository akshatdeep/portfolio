import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // ✅ Import this

const AdminLogin = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate(); // ✅ Initialize navigator

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username === "admin" && password === "password") {
      onLogin();              // ✅ Mark as logged in
      navigate("/admin");     // ✅ Redirect to admin dashboard
    } else {
      setError("Invalid credentials");
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
          <div className="mb-4 text-red-500 text-center font-semibold">{error}</div>
        )}

        <label className="block mb-2 font-medium" htmlFor="username">
          Username
        </label>
        <input
          id="username"
          type="text"
          className="w-full mb-4 px-3 py-2 bg-black border border-white rounded focus:outline-none focus:ring-2 focus:ring-white"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          autoComplete="username"
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
          className="w-full bg-white text-black font-semibold py-2 rounded hover:bg-gray-200 transition"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default AdminLogin;
