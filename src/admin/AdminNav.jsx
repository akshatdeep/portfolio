import React, { useState } from "react";
import AdminSettingsSidebar from "./AdminSettingsSidebar";

const AdminNav = ({ onLogout }) => {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

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
            onClick={onLogout}
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
