import React, { useEffect, useState } from "react";
import API from "../api/axios";



const AdminDashboard = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [onlineUsers, setOnlineUsers] = useState(0);

  // -----------------------------
  // Fetch Messages (API)
  // -----------------------------
  const fetchMessages = async () => {
    try {
      const res = await API.get("/contact");
      console.log("Messages Response:", res);

      setMessages(res.data); // backend returns array
    } catch (error) {
      console.error("Error fetching messages:", error);
    } finally {
      setLoading(false);
    }
  };

  // -----------------------------
  // Real-time visitor count
  // -----------------------------
  useEffect(() => {
    socket.on("onlineUsers", (count) => {
      console.log("Live Visitors:", count);
      setOnlineUsers(count);
    });

    return () => {
      socket.off("onlineUsers");
    };
  }, []);

  // -----------------------------
  // Load messages on mount
  // -----------------------------
  useEffect(() => {
    fetchMessages();
  }, []);

  return (
    <div className="min-h-screen p-10 bg-black text-white font-['General Sans']">
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>

      {/* Quick Stats */}
      <div className="flex gap-6 mb-10">
        <div className="bg-gray-800 p-6 rounded-lg flex-1 text-center">
          <h2 className="text-xl font-semibold mb-2">Total Messages</h2>
          <p className="text-4xl">{messages.length}</p>
        </div>

        <div className="bg-gray-800 p-6 rounded-lg flex-1 text-center">
          <h2 className="text-xl font-semibold mb-2">Projects</h2>
          <p className="text-4xl">12</p>
        </div>

        <div className="bg-gray-800 p-6 rounded-lg flex-1 text-center">
          <h2 className="text-xl font-semibold mb-2">Live Visitors</h2>
          <p className="text-4xl">{onlineUsers}</p>
        </div>
      </div>

      {/* Messages Table */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Let's Talk Messages</h2>

        {loading ? (
          <p>Loading...</p>
        ) : messages.length === 0 ? (
          <p>No messages yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full table-auto border-collapse border border-gray-700">
              <thead>
                <tr className="bg-gray-900">
                  <th className="border border-gray-700 px-4 py-2 text-left">Name</th>
                  <th className="border border-gray-700 px-4 py-2 text-left">Email</th>
                  <th className="border border-gray-700 px-4 py-2 text-left">Message</th>
                  <th className="border border-gray-700 px-4 py-2 text-left">Date</th>
                </tr>
              </thead>
              <tbody>
                {messages.map(({ _id, name, email, message, createdAt }) => (
                  <tr key={_id} className="hover:bg-gray-800">
                    <td className="border border-gray-700 px-4 py-2">{name}</td>
                    <td className="border border-gray-700 px-4 py-2">{email}</td>
                    <td className="border border-gray-700 px-4 py-2 break-words whitespace-normal">
                      {message}
                    </td>
                    <td className="border border-gray-700 px-4 py-2">
                      {new Date(createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
};

export default AdminDashboard;
