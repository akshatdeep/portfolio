// src/context/MouseContext.jsx
import React, { createContext, useContext, useState } from "react";

const MouseContext = createContext();

export const useMouse = () => useContext(MouseContext);

export const MouseProvider = ({ children }) => {
  const [hoverText, setHoverText] = useState("");
  const [isEnlarged, setIsEnlarged] = useState(false);

  const enlargeDot = (text = "") => {
    setHoverText(text);
    setIsEnlarged(true);
  };
  const shrinkDot = () => {
    setHoverText("");
    setIsEnlarged(false);
  };

  return (
    <MouseContext.Provider
      value={{ hoverText, isEnlarged, enlargeDot, shrinkDot }}
    >
      {children}
    </MouseContext.Provider>
  );
};
