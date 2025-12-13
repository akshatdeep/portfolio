import React from "react";
import { motion } from "framer-motion";


const overlayVariants = {
  initial: { y: "100%" },  
  animate: { y: "0%", transition: { duration: 0.28, ease: "easeInOut" } },
  exit: { y: "-100%", transition: { duration: 0.28, ease: "easeInOut" } }, 
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
