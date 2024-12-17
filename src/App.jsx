import React, { useEffect, useRef, useState } from "react";
import LandingPage from "./components/LandingPage/LandingPage";
import LocomotiveScroll from "locomotive-scroll";
import gsap from "gsap";
import { Route, Routes } from "react-router-dom";
import ViewProject from "./components/ViewProject/ViewProject";
import NavBar from "./components/NavBar/NavBar";
import projects from "./_mock/mockProject";

function App() {
  const scrollRef = useRef(null);
  const dotRef = useRef(null);

  const [mousevalue, setmousevalue] = useState({
    x: 0,
    y: 0,
  });

  // Track mouse movement
  useEffect(() => {
    const MouseMove = (e) => {
      setmousevalue({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", MouseMove);
    return () => {
      window.removeEventListener("mousemove", MouseMove);
    };
  }, [mousevalue]);

  // GSAP for smooth dot animation
  useEffect(() => {
    gsap.to(dotRef.current, {
      x: mousevalue.x,
      y: mousevalue.y,
    });
  }, [mousevalue]);

  // Locomotive scroll initialization
  useEffect(() => {
    const scroll = new LocomotiveScroll({
      el: scrollRef.current,
      smooth: true,
    });

    return () => {
      if (scroll) scroll.destroy();
    };
  }, []);

  return (
    <div ref={scrollRef} className="main h-full w-full bg-black -z-10 overflow-x-hidden text-white">
      <div
        ref={dotRef}
        className="h-[20px] w-[20px] bg-white mix-blend-difference rounded-full absolute top-0 left-0 z-50 translate-x-[]"
      ></div>
      <NavBar />
      {/* Routes for pages that change based on the path */}
      <Routes>
        <Route path="/" element={<LandingPage />} />
        
          <Route path="/viewproject" element={<ViewProject projects={projects}/>}/>
         
      </Routes>
    </div>
  );
}

export default App;
