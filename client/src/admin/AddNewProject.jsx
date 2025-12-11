import React, { useState, useEffect } from "react";
import UploadWidget from "../components/UploadWidget/UploadWidget";
import API from "../api/axios"; // adjust path as needed (where your Axios instance is stored)

const AddNewProject = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [technologies, setTechnologies] = useState("");
  const [media, setMedia] = useState([]);
  const [error, setError] = useState("");

  const handleUpload = (result) => {
    if (result.event === "success") {
      const uploadedFile = {
        url: result.info.secure_url,
        public_id: result.info.public_id,
        type: result.info.resource_type,
      };
      setMedia((prev) => [...prev, uploadedFile]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !description || !technologies || media.length === 0) {
      setError("Please fill in all required fields.");
      return;
    }

    const newProject = {
      title,
      description,
      technologies: technologies.split(",").map((t) => t.trim()),
      media,
    };

    try {
      await API.post("/projects", newProject);
      // Redirect to admin dashboard after successful creation
      window.location.href = "/admin";
    } catch (err) {
      console.error("Error creating project:", err.response?.data || err.message);
      setError(err.response?.data?.message || "Failed to create project.");
    }
  };

  useEffect(() => {
    console.log("Current media:", media);
  }, [media]);

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-8">
      <h1 className="text-3xl font-bold mb-6">Add New Project</h1>

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-lg bg-gray-800 p-6 rounded-lg shadow-lg"
      >
        {error && <div className="mb-4 text-red-500 font-semibold">{error}</div>}

        {/* Title */}
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
        />

        {/* Description */}
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
        />

        {/* Technologies */}
        <label className="block mb-2 font-semibold" htmlFor="technologies">
          Technologies (comma separated)
        </label>
        <input
          id="technologies"
          type="text"
          className="w-full mb-4 p-3 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={technologies}
          onChange={(e) => setTechnologies(e.target.value)}
          placeholder="e.g. React, Node.js, MongoDB"
        />

        {/* Upload */}
        <label className="block mb-2 font-semibold">Media</label>
        <UploadWidget onUpload={handleUpload} />

        {/* ✅ Preview Section */}
        {media.length > 0 && (
          <div className="grid grid-cols-2 gap-4 mt-4">
            {media.map((item, index) => (
              <div
                key={index}
                className="relative rounded overflow-hidden border border-gray-700"
              >
                {item.type === "image" ? (
                  <img
                    src={item.url}
                    alt={`upload-${index}`}
                    className="w-full h-40 object-cover"
                  />
                ) : (
                  <video
                    src={item.url}
                    controls
                    className="w-full h-40 object-cover"
                  />
                )}
              </div>
            ))}
          </div>
        )}

        {/* Submit */}
        <button
          type="submit"
          className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded transition"
        >
          Add Project
        </button>
      </form>
    </div>
  );
};

export default AddNewProject;
