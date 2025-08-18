import React, { useState } from "react";

const AddNewProject = ({ onAdd }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title || !description || !imageUrl) {
      setError("Please fill in all fields.");
      setSuccess("");
      return;
    }

    const newProject = {
      id: Date.now(), // or generate a better unique ID
      title,
      description,
      imageUrl,
    };

    // Call parent handler or API here
    if (onAdd) {
      onAdd(newProject);
    }

    setError("");
    setSuccess("Project added successfully!");
    setTitle("");
    setDescription("");
    setImageUrl("");
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-8">
      <h1 className="text-3xl font-bold mb-6">Add New Project</h1>

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-lg bg-gray-800 p-6 rounded-lg shadow-lg"
      >
        {error && (
          <div className="mb-4 text-red-500 font-semibold">{error}</div>
        )}
        {success && (
          <div className="mb-4 text-green-400 font-semibold">{success}</div>
        )}

        <label className="block mb-2 font-semibold" htmlFor="title">
          Project Title
        </label>
        <input
          id="title"
          type="text"
          className="w-full mb-4 p-3 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter project title"
          required
        />

        <label className="block mb-2 font-semibold" htmlFor="description">
          Description
        </label>
        <textarea
          id="description"
          rows="4"
          className="w-full mb-4 p-3 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter project description"
          required
        />

        <label className="block mb-2 font-semibold" htmlFor="imageUrl">
          Image URL
        </label>
        <input
          id="imageUrl"
          type="url"
          className="w-full mb-6 p-3 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          placeholder="Enter project image URL"
          required
        />

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded transition"
        >
          Add Project
        </button>
      </form>
    </div>
  );
};

export default AddNewProject;
