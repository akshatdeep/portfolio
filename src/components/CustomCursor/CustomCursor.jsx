import React, { useEffect, useRef, useContext } from "react";
import { MouseContext } from "../../context/MouseContext";

const CustomCursor = () => {
  const { cursorVariant } = useContext(MouseContext);
  const cursorRef = useRef(null);

  useEffect(() => {
    const moveCursor = (e) => {
      const { clientX, clientY } = e;
      cursorRef.current.style.transform = `translate3d(${clientX}px, ${clientY}px, 0)`;
    };

    window.addEventListener("mousemove", moveCursor);
    return () => window.removeEventListener("mousemove", moveCursor);
  }, []);

  return (
    <div className="pointer-events-none fixed top-0 left-0 z-[9999]">
      <div
        ref={cursorRef}
        className={`transition-all duration-300 ease-out rounded-full flex items-center justify-center text-[10px] font-bold
          ${cursorVariant === "viewMore" ? "w-24 h-24 bg-white text-black" : "w-4 h-4 bg-white"}
        `}
      >
        {cursorVariant === "viewMore" && <span>View More</span>}
      </div>
    </div>
  );
};

export default CustomCursor;
