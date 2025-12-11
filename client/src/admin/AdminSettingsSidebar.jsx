import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

const AdminSettingsSidebar = ({ isOpen, onClose }) => {
  const navigate = useNavigate();

  const handleNavigate = (path) => {
    navigate(path);
    onClose(); // Close sidebar after navigating
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="fixed top-0 right-0 h-full w-80 bg-black text-white shadow-xl z-50 p-6"
        >
          <div className="flex justify-between items-center mb-6 border-b pb-3 border-gray-700">
            <h2 className="text-xl font-bold tracking-wide">Admin Settings</h2>
            <button
              onClick={onClose}
              className="text-white text-3xl hover:text-red-400 transition"
              aria-label="Close sidebar"
            >
              &times;
            </button>
          </div>

          <div className="space-y-4">
            <button
              onClick={() => handleNavigate("/admin/change-theme")}
              className="w-full py-2 px-4 bg-gray-800 hover:bg-gray-700 rounded-lg text-left transition duration-200"
            >
              🎨 Change Theme
            </button>

            <button
              onClick={() => handleNavigate("/admin/add-project")}
              className="w-full py-2 px-4 bg-gray-800 hover:bg-gray-700 rounded-lg text-left transition duration-200"
            >
              ➕ Add New Project
            </button>

            <button
              onClick={() => handleNavigate("/admin/contacts")}
              className="w-full py-2 px-4 bg-gray-800 hover:bg-gray-700 rounded-lg text-left transition duration-200"
            >
              📬 Manage Contacts
            </button>

            <button
              onClick={() => handleNavigate("/admin/analytics")}
              className="w-full py-2 px-4 bg-gray-800 hover:bg-gray-700 rounded-lg text-left transition duration-200"
            >
              📊 Analytics
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AdminSettingsSidebar;
