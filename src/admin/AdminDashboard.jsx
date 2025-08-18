import React from "react";

const mockLetsTalkMessages = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    message: "Hi! I want to discuss a project.i! I want to discuss a project.i! I want to discuss a project.i! I want to discuss a project.i! I want to discuss a project.i! I want to discuss a project.i! I want to discuss a project.i! I want to discuss a project.",
    date: "2025-06-25",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@example.com",
    message: "Interested in collaborating.",
    date: "2025-06-24",
  },
  {
    id: 3,
    name: "Michael Lee",
    email: "michael@example.com",
    message: "Looking for freelance work.",
    date: "2025-06-20",
  },
];

const AdminDashboard = () => {
  return (
    <div className="min-h-screen p-10 bg-black text-white font-['General Sans']">
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>

      {/* Quick Stats (example) */}
      <div className="flex gap-6 mb-10">
        <div className="bg-gray-800 p-6 rounded-lg flex-1 text-center">
          <h2 className="text-xl font-semibold mb-2">Total Messages</h2>
          <p className="text-4xl">{mockLetsTalkMessages.length}</p>
        </div>
        <div className="bg-gray-800 p-6 rounded-lg flex-1 text-center">
          <h2 className="text-xl font-semibold mb-2">Projects</h2>
          <p className="text-4xl">12</p>
        </div>
        <div className="bg-gray-800 p-6 rounded-lg flex-1 text-center">
          <h2 className="text-xl font-semibold mb-2">Site Visitors</h2>
          <p className="text-4xl">1,235</p>
        </div>
      </div>

      {/* Let's Talk Messages */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Let's Talk Messages</h2>

        {mockLetsTalkMessages.length === 0 ? (
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
                {mockLetsTalkMessages.map(({ id, name, email, message, date }) => (
                  <tr key={id} className="hover:bg-gray-800">
                    <td className="border border-gray-700 px-4 py-2">{name}</td>
                    <td className="border border-gray-700 px-4 py-2">{email}</td>
                    <td className="border border-gray-700 px-4 py-2">{message}</td>
                    <td className="border border-gray-700 px-4 py-2">{date}</td>
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
