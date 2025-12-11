import React, { useRef } from "react";
import { gsap } from "gsap";

const AnimatedText = ({ children }) => {
  const lettersRef = useRef([]);
  lettersRef.current = [];

  const addToRefs = (el) => {
    if (el && !lettersRef.current.includes(el)) {
      lettersRef.current.push(el);
    }
  };

  const animateSlotMachine = () => {
    gsap.killTweensOf(lettersRef.current);
    gsap.fromTo(
      lettersRef.current,
      { y: "-100%", opacity: 0 },
      {
        y: "0%",
        opacity: 1,
        duration: 0.3,
        ease: "power3.out",
        stagger: 0.05,
      }
    );
  };

  return (
    <span
      style={{ display: "inline-block", cursor: "pointer", overflow: "hidden" }}
      onMouseEnter={animateSlotMachine}
      onMouseLeave={animateSlotMachine}
    >
      {children.split("").map((char, i) => (
        <span
          key={i}
          ref={addToRefs}
          style={{ display: "inline-block", willChange: "transform, opacity" }}
        >
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </span>
  );
};

export default AnimatedText;
