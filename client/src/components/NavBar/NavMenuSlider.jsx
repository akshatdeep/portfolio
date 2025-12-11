import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { Link } from "react-router-dom";
import AnimatedText from "../Animations/AnimatedText";

const NavMenuSlider = ({ isOpen, onClose, enlargeDot, shrinkDot }) => {
  const panelRef = useRef(null);
  const underlineRefs = useRef({});

  useEffect(() => {
    const panel = panelRef.current;
    if (isOpen) {
      gsap.killTweensOf(panel);
      gsap.fromTo(
        panel,
        {
          height: 0,
          borderRadius: "0 0 50% 50%",
          overflow: "hidden",
          opacity: 0,
        },
        {
          height: "100vh",
          borderRadius: "0%",
          duration: 0.6,
          ease: "power3.inOut",
          opacity: 1,
          pointerEvents: "auto",
        }
      );
    } else {
      gsap.killTweensOf(panel);
      gsap.to(panel, {
        height: 0,
        borderRadius: "0 0 50% 50%",
        duration: 0.5,
        ease: "power3.inOut",
        opacity: 0,
        pointerEvents: "none",
      });
    }
  }, [isOpen]);

  const handleMouseEnter = (key, text) => {
    enlargeDot(text);
    if (underlineRefs.current[key]) {
      gsap.to(underlineRefs.current[key], {
        width: "100%",
        transformOrigin: "left center",
        duration: 0.3,
        ease: "power1.out",
        opacity: 1,
      });
    }
  };

  const handleMouseLeave = (key) => {
    shrinkDot();
    if (underlineRefs.current[key]) {
      gsap.to(underlineRefs.current[key], {
        width: 0,
        transformOrigin: "left center",
        duration: 0.3,
        ease: "power1.in",
        opacity: 0.6,
      });
    }
  };

  const setUnderlineRef = (el, key) => {
    if (el) underlineRefs.current[key] = el;
  };

  const links = [
    { key: "resume", label: "Download Resume", to: "/akshat.pdf_20251103_115057_0000-1.pdf", external: true },
    { key: "projects", label: "View Projects", to: "/viewproject" },
    { key: "contact", label: "Contact", to: "#contact" },
  ];

  return (
    <div
      ref={panelRef}
      className="fixed top-0 left-0 w-full z-[9999] flex flex-col items-center justify-center
      text-white backdrop-blur-lg bg-white/20 border-b border-white/30
      overflow-hidden"
      style={{ height: 0, pointerEvents: "none", opacity: 0 }}
    >
      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-6 right-6 text-4xl sm:text-5xl text-white z-[10000] cursor-pointer"
        aria-label="Close Menu"
        onMouseEnter={() => enlargeDot("Close")}
        onMouseLeave={shrinkDot}
      >
        &times;
      </button>

      {/* Navigation */}
      <nav className="flex flex-col items-center gap-10 sm:gap-12 mt-[20vh] px-4 text-center">
        {links.map(({ key, label, to, external }) =>
          external ? (
            <a
              key={key}
              href={to}
              target="_blank"
              rel="noopener noreferrer"
              onClick={onClose}
              onMouseEnter={() => handleMouseEnter(key, label)}
              onMouseLeave={() => handleMouseLeave(key)}
              className="relative text-3xl sm:text-5xl font-bold tracking-wide cursor-pointer"
            >
              <AnimatedText>{label}</AnimatedText>
              <span
                ref={(el) => setUnderlineRef(el, key)}
                className="absolute left-0 -bottom-2 h-[3px] bg-white w-0 opacity-0 rounded transition-all duration-300"
              />
            </a>
          ) : (
            <Link
              key={key}
              to={to}
              onClick={onClose}
              onMouseEnter={() => handleMouseEnter(key, label)}
              onMouseLeave={() => handleMouseLeave(key)}
              className="relative text-3xl sm:text-5xl font-bold tracking-wide cursor-pointer"
            >
              <AnimatedText>{label}</AnimatedText>
              <span
                ref={(el) => setUnderlineRef(el, key)}
                className="absolute left-0 -bottom-2 h-[3px] bg-white w-0 opacity-0 rounded transition-all duration-300"
              />
            </Link>
          )
        )}
      </nav>
    </div>
  );
};

export default NavMenuSlider;
