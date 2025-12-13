import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import OverlayWipe from "./OverlayWipe";


export default function RouteTransitionManager({ overlayVisibleMs = 560 }) {
  const location = useLocation();
  const [showOverlay, setShowOverlay] = useState(false);
  const [lastPath, setLastPath] = useState(location.pathname);

  useEffect(() => {
    if (location.pathname === lastPath) return;

    setShowOverlay(true);
    setLastPath(location.pathname);

    const t = setTimeout(() => setShowOverlay(false), overlayVisibleMs);
    return () => clearTimeout(t);
    
  }, [location.pathname]);

  return (
    <AnimatePresence mode="wait" initial={false}>
      {showOverlay && <OverlayWipe keyId={`overlay-${lastPath}`} />}
    </AnimatePresence>
  );
}
