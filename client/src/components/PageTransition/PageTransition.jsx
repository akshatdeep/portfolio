import React from "react";
import { motion } from "framer-motion";

const variants = {
  initial: { opacity: 0, scale: 0.995, y: 8 },
  enter: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeInOut" },
  },
  exit: {
    opacity: 0,
    scale: 0.995,
    y: -8,
    transition: { duration: 0.35, ease: "easeInOut" },
  },
};

export default function PageTransition({ children, className = "" }) {
  return (
    <motion.div
      className={`min-h-screen bg-[#0F151A] text-white ${className}`}
      variants={variants}
      initial="initial"
      animate="enter"
      exit="exit"
    >
      {children}
    </motion.div>
  );
}
