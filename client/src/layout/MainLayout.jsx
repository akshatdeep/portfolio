import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import LocomotiveScroll from "locomotive-scroll";

import NavBar from "../components/NavBar/NavBar";
import AdminNav from "../admin/AdminNav";

const MainLayout = ({ children, isLoggedIn, onLogout }) => {
  const scrollRef = useRef(null);
  const location = useLocation();

  // locomotive
  useEffect(() => {
    if (!scrollRef.current) return;

    const scroll = new LocomotiveScroll({
      el: scrollRef.current,
      smooth: true,
    });

    return () => scroll.destroy();
  }, [location.pathname]); 

  return (
    <div
      ref={scrollRef}
      className="main min-h-screen w-full bg-[#0F151A] text-white overflow-hidden"
    >
      {isLoggedIn ? <AdminNav onLogout={onLogout} /> : <NavBar />}
      {children}
    </div>
  );
};

export default MainLayout;
