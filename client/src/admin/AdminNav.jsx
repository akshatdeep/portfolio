import React, { useState } from "react";
import AdminSettingsSidebar from "./AdminSettingsSidebar";
import API from "../api/axios"; // <-- your axios instance

const AdminNav = ({ onLogout }) => {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const handleLogoutAPI = async () => {
    try {
        await API.post("/auth/logout"); // axios auto sends cookies because withCredentials: true
      } catch (error) {
      console.error("Logout error:", error);
    }

    // Remove any stored token (if you use localStorage)
    localStorage.removeItem("token");

    // Call parent handler to update UI & redirect
    onLogout();
  };

  return (
    <>
      <div className="w-full px-6 py-4 bg-black text-white flex justify-between items-center shadow">
        <h1 className="text-xl font-bold">Admin</h1>

        <div className="flex items-center gap-4">
          <button
            onClick={() => setIsSettingsOpen(true)}
            className="bg-white text-black px-4 py-1 rounded hover:bg-gray-300"
          >
            Settings
          </button>

          <button
            onClick={handleLogoutAPI}
            className="border border-white px-4 py-1 rounded hover:bg-white hover:text-black transition"
          >
            Logout
          </button>
        </div>
      </div>

      <AdminSettingsSidebar
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
      />
    </>
  );
};

export default AdminNav;
