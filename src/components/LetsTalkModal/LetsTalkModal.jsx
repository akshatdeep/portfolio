import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import API from "../../api/axios"; // your axios instance
import { toast } from "react-toastify";

const LetsTalkModal = ({ onClose }) => {
  const modalRef = useRef(null);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    gsap.fromTo(
      modalRef.current,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 0.4, ease: "power3.out" }
    );
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.message) {
      toast.error("Please fill in all fields");
      return;
    }

    try {
      setLoading(true);
      const res = await API.post("/contact", formData);

      if (res.status === 201) {
        toast.success("Message sent successfully 🎉");
        setFormData({ name: "", email: "", message: "" });
        onClose(); // optional: close modal after success
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to send message 😞");
    } finally {
      setLoading(false);
    }
  };

  const onClickOutside = (e) => {
    if (e.target === modalRef.current) {
      onClose();
    }
  };

  return (
    <div
      ref={modalRef}
      onClick={onClickOutside}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80"
    >
      <div className="bg-white rounded-lg max-w-md w-full p-6 relative text-black shadow-lg">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-xl font-bold hover:text-red-600 transition"
          aria-label="Close Modal"
        >
          &times;
        </button>

        <h2 className="text-2xl font-semibold mb-4">Let's Talk</h2>

        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            className="border border-gray-400 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
            className="border border-gray-400 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
          />
          <textarea
            name="message"
            placeholder="Your Message"
            rows={4}
            value={formData.message}
            onChange={handleChange}
            className="border border-gray-400 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
          />
          <button
            type="submit"
            disabled={loading}
            className={`bg-black text-white py-2 rounded font-semibold hover:bg-gray-900 transition ${
              loading && "opacity-50 cursor-not-allowed"
            }`}
          >
            {loading ? "Sending..." : "Send"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LetsTalkModal;
