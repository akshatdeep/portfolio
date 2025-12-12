// src/context/MouseContext.jsx
import React, { createContext, useContext, useState, useCallback } from "react";

const MouseContext = createContext(null);

export const useMouse = () => useContext(MouseContext);

export const MouseProvider = ({ children }) => {
  const [hoverText, setHoverText] = useState("");
  const [isEnlarged, setIsEnlarged] = useState(false);

  const setHoverTextSafe = useCallback((text) => {
    setHoverText(text || "");
  }, []);

  const setIsEnlargedSafe = useCallback((v) => {
    setIsEnlarged(Boolean(v));
  }, []);

  const enlargeDot = useCallback((text = "") => {
    setHoverTextSafe(text);
    setIsEnlargedSafe(true);
  }, [setHoverTextSafe, setIsEnlargedSafe]);

  const shrinkDot = useCallback(() => {
    setHoverTextSafe("");
    setIsEnlargedSafe(false);
  }, [setHoverTextSafe, setIsEnlargedSafe]);

  const reset = useCallback(() => {
    setHoverTextSafe("");
    setIsEnlargedSafe(false);
  }, [setHoverTextSafe, setIsEnlargedSafe]);

  return (
    <MouseContext.Provider
      value={{
        hoverText,
        isEnlarged,
        setHoverText: setHoverTextSafe,
        setIsEnlarged: setIsEnlargedSafe,
        enlargeDot,
        shrinkDot,
        reset,
      }}
    >
      {children}
    </MouseContext.Provider>
  );
};
