import React, { useEffect, useRef } from "react";
import { Route, Routes } from "react-router-dom";
import LocomotiveScroll from "locomotive-scroll";
import gsap from "gsap";

import LandingPage from "./components/LandingPage/LandingPage";
import ViewProject from "./components/ViewProject/ViewProject";
import NavBar from "./components/NavBar/NavBar";
import projects from "./_mock/mockProject";

function App() {
  const scrollRef = useRef(null);
  const dotRef = useRef(null);

  useEffect(() => {
    const scroll = new LocomotiveScroll({
      el: scrollRef.current,
      smooth: true,
    });

    return () => {
      if (scroll) scroll.destroy();
    };
  }, []);

  useEffect(() => {
    const dot = dotRef.current;

    // Use gsap.quickTo for performance
    const xTo = gsap.quickTo(dot, "x", { duration: 0.3, ease: "power3.out" });
    const yTo = gsap.quickTo(dot, "y", { duration: 0.3, ease: "power3.out" });

    const handleMouseMove = (e) => {
      xTo(e.clientX - 10);
      yTo(e.clientY - 10);
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <>
      {/* Mouse-following dot - OUTSIDE scrollRef */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 h-[15px] w-[15px] bg-white mix-blend-difference rounded-full z-[9999] pointer-events-none"
      ></div>

      <div
        ref={scrollRef}
        className="main min-h-screen w-full bg-black text-white overflow-x-hidden"
      >
        <NavBar />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/viewproject" element={<ViewProject projects={projects} />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
