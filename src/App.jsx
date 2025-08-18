import React, { useRef, useState, createContext, useContext, useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import LocomotiveScroll from "locomotive-scroll";
import gsap from "gsap";

import Loader from "./components/Loader/Loader";
import PageTransitionWrapper from "./components/PageTransitionWrapper/PageTransitionWrapper";

import LandingPage from "./components/LandingPage/LandingPage";
import ViewProject from "./components/ViewProject/ViewProject";
import NavBar from "./components/NavBar/NavBar";
import AdminNav from "./admin/AdminNav";
import AdminLogin from "./admin/AdminLogin";
import AdminDashboard from "./admin/AdminDashboard";
import ChangeTheme from "./admin/ChangeTheme";
import AddNewProject from "./admin/AddNewProject";
import projectsData from "./_mock/mockProject";
import NotFound from "./components/NotFound/NotFound";

const MouseContext = createContext();
export const useMouse = () => useContext(MouseContext);

function App() {
  const scrollRef = useRef(null);
  const dotRef = useRef(null);
  const navigate = useNavigate();

  const [loadingDone, setLoadingDone] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const [dotActive, setDotActive] = useState(false);
  const [dotText, setDotText] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [projects, setProjects] = useState(projectsData);

  useEffect(() => {
    document.body.style.overflow = showContent ? "auto" : "hidden";
  }, [showContent]);

  useEffect(() => {
    if (showContent) {
      const scroll = new LocomotiveScroll({
        el: scrollRef.current,
        smooth: true,
      });
      return () => scroll && scroll.destroy();
    }
  }, [showContent]);

  useEffect(() => {
    const dot = dotRef.current;
    const xTo = gsap.quickTo(dot, "x", { duration: 0.3, ease: "power3.out" });
    const yTo = gsap.quickTo(dot, "y", { duration: 0.3, ease: "power3.out" });

    const handleMouseMove = (e) => {
      xTo(e.clientX - dot.offsetWidth / 2);
      yTo(e.clientY - dot.offsetHeight / 2);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    const dot = dotRef.current;
    gsap.to(dot, {
      width: dotActive ? 120 : 15,
      height: dotActive ? 120 : 15,
      backgroundColor: dotActive ? "rgba(255,255,255,0.8)" : "white",
      duration: 0.4,
      ease: "power3.out",
    });
  }, [dotActive]);

  const enlargeDot = (text = "View More") => {
    setDotText(text);
    setDotActive(true);
  };

  const shrinkDot = () => {
    setDotActive(false);
    setDotText("");
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    navigate("/");
  };

  const handleAddProject = (newProject) => {
    setProjects((prev) => [newProject, ...prev]);
    alert("Project added successfully!");
    navigate("/admin");
  };

  const handleLoaderComplete = () => {
    setLoadingDone(true);
    setTimeout(() => {
      setShowContent(true);
    }, 100);
  };

  return (
    <>
      <div
        ref={dotRef}
        className="fixed top-0 left-0 mix-blend-difference rounded-full z-[9999] pointer-events-none flex items-center justify-center text-black font-semibold select-none"
        style={{ fontSize: "1rem", userSelect: "none" }}
      >
        {dotActive && dotText}
      </div>

      {/* Only show Loader on Landing Page */}
      {!loadingDone && window.location.pathname === "/" && (
        <Loader onComplete={handleLoaderComplete} />
      )}

      {/* Show main content after loader for landing or immediately for others */}
      {(showContent || window.location.pathname !== "/") && (
        <MouseContext.Provider value={{ enlargeDot, shrinkDot }}>
          <div
            ref={scrollRef}
            className="main min-h-screen w-full bg-black text-white overflow-x-hidden scrollbar-hide"
          >
            {isLoggedIn ? (
              <AdminNav onLogout={handleLogout} />
            ) : (
              <NavBar />
            )}

            <Routes>
              <Route
                path="/"
                element={
                  <PageTransitionWrapper>
                    <LandingPage />
                  </PageTransitionWrapper>
                }
              />

              <Route
                path="*"
                element={
                  <PageTransitionWrapper>
                    <NotFound />
                  </PageTransitionWrapper>
                }
              />
              <Route
                path="/viewproject"
                element={<ViewProject projects={projects} />}
              />
              <Route
                path="/admin-login"
                element={<AdminLogin onLogin={() => setIsLoggedIn(true)} />}
              />
              {isLoggedIn && (
                <Route path="/admin" element={<AdminDashboard />} />
              )}
              <Route path="/admin/change-theme" element={<ChangeTheme />} />
              <Route
                path="/admin/add-project"
                element={<AddNewProject onAdd={handleAddProject} />}
              />
            </Routes>
          </div>
        </MouseContext.Provider>
      )}
    </>
  );
}

export default App;
