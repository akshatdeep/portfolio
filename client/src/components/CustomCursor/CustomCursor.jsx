// src/components/CustomCursor/CustomCursor.jsx
import React, { useLayoutEffect, useRef, useEffect } from "react";
import gsap from "gsap";
import { useMouse } from "../../context/MouseContext";

const CustomCursor = () => {
  const { hoverText, isEnlarged } = useMouse();
  const dotRef = useRef(null);
  const circleRef = useRef(null);
  const labelRef = useRef(null);

  const baseSize = 15;
  const enlargedSize = 120;
  const halfVisualRef = useRef(baseSize / 2);

  useEffect(() => {
    const el = dotRef.current;
    const label = labelRef.current;
    if (!el) return;
    el.style.width = `${baseSize}px`;
    el.style.height = `${baseSize}px`;
    el.style.transform = "translate3d(0,0,0)";
    el.style.willChange = "transform";
    el.style.display = "flex";
    el.style.pointerEvents = "none";

    if (label) {
      label.style.fontSize = "12px";
      label.style.lineHeight = "1";
      label.style.pointerEvents = "none";
      label.style.display = "flex";
      label.style.alignItems = "center";
      label.style.justifyContent = "center";
      label.style.transform = "none";
      label.style.webkitFontSmoothing = "antialiased";
      label.style.textRendering = "optimizeLegibility";
      label.style.whiteSpace = "nowrap";
      label.style.padding = "0 8px";
      label.style.opacity = "0";
    }
  }, []);

  useLayoutEffect(() => {
    const el = dotRef.current;
    const circle = circleRef.current;
    const label = labelRef.current;
    if (!el || !circle) return;

    const newSize = isEnlarged ? enlargedSize : baseSize;
    halfVisualRef.current = newSize / 2;

    gsap.to(el, {
      width: `${newSize}px`,
      height: `${newSize}px`,
      duration: 0.45,
      ease: "power3.out"
    });

    if (isEnlarged) {
      gsap.fromTo(
        circle,
        { scale: 0.92 },
        { scale: 1, duration: 0.45, ease: "power3.out" }
      );
    } else {
      gsap.to(circle, { scale: 0.98, duration: 0.35, ease: "power2.out" });
      gsap.to(circle, { scale: 1, duration: 0.18, ease: "power2.out", delay: 0.06 });
    }

    gsap.to(circle, {
      backgroundColor: isEnlarged ? "rgba(255,255,255,0.95)" : "white",
      duration: 0.45,
      ease: "power3.out"
    });

    if (label) {
      if (isEnlarged) {
        gsap.killTweensOf(label);
        gsap.to(label, { opacity: 1, duration: 0.28, ease: "power2.out" });
        gsap.fromTo(
          label,
          { fontSize: "11px" },
          { fontSize: "12px", duration: 0.28, ease: "power2.out" }
        );
      } else {
        gsap.to(label, { opacity: 0, duration: 0.22, ease: "power2.in" });
      }
    }
  }, [isEnlarged]);

  useLayoutEffect(() => {
    const el = dotRef.current;
    if (!el) return;

    const setX = gsap.quickTo(el, "x", { duration: 0.16, ease: "power3.out" });
    const setY = gsap.quickTo(el, "y", { duration: 0.16, ease: "power3.out" });

    const handleMove = (e) => {
      const x = e.clientX - halfVisualRef.current;
      const y = e.clientY - halfVisualRef.current;
      setX(x);
      setY(y);
    };

    window.addEventListener("mousemove", handleMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  return (
    <div
      ref={dotRef}
      className="fixed top-0 left-0 z-[9999] rounded-full mix-blend-difference flex items-center justify-center text-black pointer-events-none"
      style={{ transform: "translate3d(0,0,0)" }}
    >
      <div
        ref={circleRef}
        className="w-full h-full rounded-full flex items-center justify-center bg-white"
        style={{ transformOrigin: "center center", willChange: "transform, background-color" }}
      />
      <span
        ref={labelRef}
        className="absolute inset-0 flex items-center justify-center pointer-events-none text-black text-[12px] opacity-0 transition-opacity"
        style={{ padding: "0 8px" }}
      >
        {isEnlarged ? hoverText : null}
      </span>
    </div>
  );
};

export default CustomCursor;
