import React, { useEffect, useRef, useState } from "react";
import LandingPage from "./components/LandingPage/LandingPage";
import PageOne from "./components/PageOne/PageOne";
import About from "./components/About/About";
import Footer from "./components/Footer/Footer";
import LocomotiveScroll from "locomotive-scroll";
import gsap from "gsap";

function App() {
  const scrollRef = useRef(null);
  const dotRef = useRef(null);

  const [mousevalue, setmousevalue] = useState({
    x: 0,
    y: 0,
  });

  // console.log(mousevalue)

  useEffect(() => {
    const MouseMove = (e) => {
      setmousevalue({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", MouseMove);
    return () => {
      window.removeEventListener("mousemove", MouseMove);
    };
  }, [mousevalue]);

  useEffect(() => {
    gsap.to(dotRef.current, {
      x: mousevalue.x,
      y: mousevalue.y,
    });
  }, [mousevalue]);

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
    <div ref={scrollRef} className="main bg-black -z-10">
      <div
        ref={dotRef}
        className="h-[20px] w-[20px] bg-white rounded-full absolute top-0 left-0 z-50 translate-x-[]"
      ></div>
      <LandingPage />
      <PageOne />
      <About />
      <Footer />
    </div>
  );
}

export default App;
