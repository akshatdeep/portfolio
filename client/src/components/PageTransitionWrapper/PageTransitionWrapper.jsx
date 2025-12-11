import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { motion } from "framer-motion";

const PageTransitionWrapper = ({ children }) => {
  const wrapperRef = useRef(null);

  useEffect(() => {
    const el = wrapperRef.current;
    gsap.fromTo(
      el,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" }
    );

    return () => {
      gsap.to(el, {
        opacity: 0,
        y: -50,
        duration: 0.4,
        ease: "power3.inOut",
      });
    };
  }, []);

  return (
    <motion.div
      ref={wrapperRef}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
      className="w-full h-full"
    >
      {children}
    </motion.div>
  );
};

export default PageTransitionWrapper;
