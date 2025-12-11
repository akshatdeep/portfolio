import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import API from "../../api/axios";
import { toast } from "react-toastify";

const LetsTalkModal = ({ onClose }) => {
  const overlayRef = useRef(null);
  const panelRef = useRef(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);

  // Animate modal in
  useEffect(() => {
    if (!panelRef.current) return;

    gsap.fromTo(
      panelRef.current,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 0.4, ease: "power3.out" }
    );
  }, []);

  // Close on ESC
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && !loading) {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [loading, onClose]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, email, message } = formData;
    if (!name || !email || !message) {
      toast.error("Please fill in all fields");
      return;
    }

    try {
      setLoading(true);
      const res = await API.post("/contact", formData);

      if (res.status === 201) {
        toast.success("Message sent successfully 🎉");
        setFormData({ name: "", email: "", message: "" });
        onClose();
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to send message 😞");
    } finally {
      setLoading(false);
    }
  };

  const handleOverlayClick = (e) => {
    // Only close if click directly on dark overlay (not inside panel)
    if (e.target === overlayRef.current && !loading) {
      onClose();
    }
  };

  return (
    <div
      ref={overlayRef}
      onClick={handleOverlayClick}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80"
      aria-modal="true"
      role="dialog"
    >
      <div
        ref={panelRef}
        className="bg-white rounded-lg max-w-md w-full p-6 relative text-black shadow-lg"
      >
        <button
          onClick={onClose}
          disabled={loading}
          className="absolute top-3 right-3 text-xl font-bold hover:text-red-600 transition disabled:opacity-50"
          aria-label="Close Modal"
        >
          &times;
        </button>

        <h2 className="text-2xl font-semibold mb-4">Let&apos;s Talk</h2>

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
            className={`bg-black text-white py-2 rounded font-semibold transition ${
              loading
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-gray-900 cursor-pointer"
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
