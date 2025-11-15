import React, {
  useRef,
  useState,
  createContext,
  useContext,
  useEffect,
} from "react";
import { Route, Routes, useNavigate, Navigate, useLocation } from "react-router-dom";
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
import NotFound from "./components/NotFound/NotFound";

import projectsData from "./_mock/mockProject";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// -----------------------------------------
const MouseContext = createContext();
export const useMouse = () => useContext(MouseContext);

// ----------- Protected Route Component -----------
const ProtectedRoute = ({ isLoggedIn, children }) => {
  if (!isLoggedIn) return <Navigate to="/admin-login" replace />;
  return children;
};

function App() {
  const scrollRef = useRef(null);
  const dotRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  const [loadingDone, setLoadingDone] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const [dotActive, setDotActive] = useState(false);
  const [dotText, setDotText] = useState("");

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [projects, setProjects] = useState(projectsData);

  // --------------------------------------------------------
  // 🟢 Keep login state on refresh
  // --------------------------------------------------------
  useEffect(() => {
    const token = localStorage.getItem("admin_token");
    if (token === "true") setIsLoggedIn(true);
  }, []);

  useEffect(() => {
    localStorage.setItem("admin_token", isLoggedIn ? "true" : "false");
  }, [isLoggedIn]);

  // --------------------------------------------------------
  // 🟢 Loader only for Landing Page
  // --------------------------------------------------------
  useEffect(() => {
    if (location.pathname === "/") {
      document.body.style.overflow = showContent ? "auto" : "hidden";
    }
  }, [showContent, location.pathname]);

  // --------------------------------------------------------
  // 🟢 Locomotive scroll for main UI
  // --------------------------------------------------------
  useEffect(() => {
    if (!showContent) return;

    const scroll = new LocomotiveScroll({
      el: scrollRef.current,
      smooth: true,
    });

    return () => scroll.destroy();
  }, [showContent]);

  // --------------------------------------------------------
  // 🟢 Floating mouse dot
  // --------------------------------------------------------
  useEffect(() => {
    const dot = dotRef.current;
    const xTo = gsap.quickTo(dot, "x", { duration: 0.3 });
    const yTo = gsap.quickTo(dot, "y", { duration: 0.3 });

    const handleMove = (e) => {
      xTo(e.clientX - dot.offsetWidth / 2);
      yTo(e.clientY - dot.offsetHeight / 2);
    };

    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  useEffect(() => {
    gsap.to(dotRef.current, {
      width: dotActive ? 120 : 15,
      height: dotActive ? 120 : 15,
      backgroundColor: dotActive ? "rgba(255,255,255,0.8)" : "white",
      duration: 0.3,
    });
  }, [dotActive]);

  const enlargeDot = (text = "View More") => {
    setDotText(text);
    setDotActive(true);
  };
  const shrinkDot = () => {
    setDotText("");
    setDotActive(false);
  };

  // --------------------------------------------------------
  // 🟢 ADMIN LOGOUT
  // --------------------------------------------------------
  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("admin_token");
    navigate("/");
  };

  // --------------------------------------------------------
  // 🟢 Add Project Handler
  // --------------------------------------------------------
  const handleAddProject = (newProject) => {
    setProjects((prev) => [newProject, ...prev]);
    navigate("/admin");
  };

  const handleLoaderComplete = () => {
    setLoadingDone(true);
    setTimeout(() => setShowContent(true), 150);
  };

  const showLoader = location.pathname === "/" && !loadingDone;

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />

      {/* Floating Mouse Dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 z-[9999] rounded-full mix-blend-difference flex items-center justify-center text-black pointer-events-none"
      >
        {dotActive && dotText}
      </div>

      {/* Loader ONLY on home page */}
      {showLoader && <Loader onComplete={handleLoaderComplete} />}

      {(showContent || location.pathname !== "/") && (
        <MouseContext.Provider value={{ enlargeDot, shrinkDot }}>
          <div
            ref={scrollRef}
            className="main min-h-screen w-full bg-black text-white overflow-hidden"
          >
            {/* NAVBAR */}
            {isLoggedIn ? (
              <AdminNav onLogout={handleLogout} />
            ) : (
              <NavBar />
            )}

            {/* ROUTES */}
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
                path="/viewproject"
                element={<ViewProject projects={projects} />}
              />

              {/* ---------- Admin Login ---------- */}
              <Route
                path="/admin-login"
                element={
                  isLoggedIn ? (
                    <Navigate to="/admin" replace />
                  ) : (
                    <AdminLogin onLogin={() => setIsLoggedIn(true)} />
                  )
                }
              />

              {/* ---------- Protected Admin Routes ---------- */}
              <Route
                path="/admin"
                element={
                  <ProtectedRoute isLoggedIn={isLoggedIn}>
                    <AdminDashboard />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/admin/change-theme"
                element={
                  <ProtectedRoute isLoggedIn={isLoggedIn}>
                    <ChangeTheme />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/admin/add-project"
                element={
                  <ProtectedRoute isLoggedIn={isLoggedIn}>
                    <AddNewProject onAdd={handleAddProject} />
                  </ProtectedRoute>
                }
              />

              {/* 404 */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </MouseContext.Provider>
      )}
    </>
  );
}

export default App;
