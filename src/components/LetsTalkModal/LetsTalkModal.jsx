import React, { useEffect, useRef } from "react";
import gsap from "gsap";

const LetsTalkModal = ({ onClose }) => {
  const modalRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      modalRef.current,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 0.4, ease: "power3.out" }
    );
  }, []);

  // Close when clicking outside content
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

        <form className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Your Name"
            className="border border-gray-400 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
          />
          <input
            type="email"
            placeholder="Your Email"
            className="border border-gray-400 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
          />
          <textarea
            placeholder="Your Message"
            rows={4}
            className="border border-gray-400 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
          />
          <button
            type="submit"
            className="bg-black text-white py-2 rounded font-semibold hover:bg-gray-900 transition"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default LetsTalkModal;
