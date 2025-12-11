
// src/components/CustomCursor/CustomCursor.jsx
import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { useMouse } from "../../context/MouseContext";

const CustomCursor = () => {
  const { hoverText, isEnlarged } = useMouse();
  const dotRef = useRef(null);

  // 🟢 Follow mouse (same behavior as before)
  useLayoutEffect(() => {
    const dot = dotRef.current;
    if (!dot) return;

    const xTo = gsap.quickTo(dot, "x", { duration: 0.3, ease: "power3.out" });
    const yTo = gsap.quickTo(dot, "y", { duration: 0.3, ease: "power3.out" });

    const handleMove = (e) => {
      const { clientX, clientY } = e;
      const rect = dot.getBoundingClientRect();
      xTo(clientX - rect.width / 2);
      yTo(clientY - rect.height / 2);
    };

    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  // 🟢 Resize + bg color based on isEnlarged
  useLayoutEffect(() => {
    const dot = dotRef.current;
    if (!dot) return;

    gsap.to(dot, {
      width: isEnlarged ? 120 : 15,
      height: isEnlarged ? 120 : 15,
      backgroundColor: isEnlarged
        ? "rgba(255,255,255,0.8)"
        : "white",
      duration: 0.3,
      ease: "power3.out",
    });
  }, [isEnlarged]);

  return (
    <div
      ref={dotRef}
      className="fixed top-0 left-0 z-[9999] rounded-full mix-blend-difference flex items-center justify-center text-black pointer-events-none"
    >
      {isEnlarged && hoverText}
    </div>
  );
};

export default CustomCursor;
