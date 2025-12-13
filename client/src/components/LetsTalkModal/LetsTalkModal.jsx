// src/components/LetsTalkModal/LetsTalkModal.jsx
import React, { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";
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


  useEffect(() => {
    if (!panelRef.current) return;

    gsap.fromTo(
      panelRef.current,
      { opacity: 0, y: 30, scale: 0.985 },
      { opacity: 1, y: 0, scale: 1, duration: 0.35, ease: "power3.out" }
    );

    
    const prevActive = document.activeElement;
    panelRef.current.focus({ preventScroll: true });

    return () => {
     
      try {
        if (prevActive?.focus) prevActive.focus();
      } catch (e) {}
    };
  }, []);

  
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && !loading) {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [loading, onClose]);


  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    const originalPaddingRight = document.body.style.paddingRight || "";

    const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;
    if (scrollBarWidth > 0) {
      document.body.style.paddingRight = `${scrollBarWidth}px`;
    }
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = originalOverflow;
      document.body.style.paddingRight = originalPaddingRight;
    };
  }, []);

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

      if (res.status === 201 || res.status === 200) {
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
  
    if (e.target === overlayRef.current && !loading) {
      onClose();
    }
  };


  const modal = (
    <div
      ref={overlayRef}
      onClick={handleOverlayClick}
      className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/80"
      aria-modal="true"
      role="dialog"
    >
      <div
        ref={panelRef}
        tabIndex={-1}
        className="bg-white rounded-lg max-w-md w-full p-6 relative text-black shadow-xl"
        aria-labelledby="lets-talk-title"
        role="document"
      >
        <button
          onClick={onClose}
          disabled={loading}
          className="absolute top-3 right-3 text-xl font-bold hover:text-red-600 transition disabled:opacity-50"
          aria-label="Close Modal"
        >
          &times;
        </button>

        <h2 id="lets-talk-title" className="text-2xl font-semibold mb-4">
          Let&apos;s Talk
        </h2>

        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
            aria-label="Your name"
          />

          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
            className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
            aria-label="Your email"
          />

          <textarea
            name="message"
            placeholder="Your Message"
            rows={4}
            value={formData.message}
            onChange={handleChange}
            className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
            aria-label="Your message"
          />

          <button
            type="submit"
            disabled={loading}
            className={`bg-black text-white py-2 rounded font-semibold transition ${
              loading ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-900 cursor-pointer"
            }`}
          >
            {loading ? "Sending..." : "Send"}
          </button>
        </form>
      </div>
    </div>
  );

  return ReactDOM.createPortal(modal, document.body);
};

export default LetsTalkModal;
