// src/components/PageTransition/OverlayWipe.jsx
"use client";
import React from "react";
import { motion } from "framer-motion";

/**
 * Full-screen black wipe used between routes.
 * pointer-events-none prevents it blocking clicks (remove if you want blocking).
 */
const overlayVariants = {
  initial: { y: "100%" },   // off-screen bottom
  animate: { y: "0%", transition: { duration: 0.28, ease: "easeInOut" } },
  exit: { y: "-100%", transition: { duration: 0.28, ease: "easeInOut" } }, // out to top
};

export default function OverlayWipe({ keyId }) {
  return (
    <motion.div
      key={keyId}
      variants={overlayVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="fixed inset-0 bg-black z-50 pointer-events-none"
      aria-hidden="true"
    />
  );
}
