import React, { useEffect, useState } from "react";
import {
  Route,
  Routes,
  useNavigate,
  Navigate,
  useLocation,
} from "react-router-dom";

import { AnimatePresence } from "framer-motion";

import Loader from "./components/Loader/Loader";
import PageTransitionWrapper from "./components/PageTransition/PageTransition";
import RouteTransitionManager from "./components/PageTransition/RouteTransitionManager";

import LandingPage from "./components/LandingPage/LandingPage";
import ViewProject from "./components/ViewProject/ViewProject";
import AdminLogin from "./admin/AdminLogin";
import AdminDashboard from "./admin/AdminDashboard";
import ChangeTheme from "./admin/ChangeTheme";
import AddNewProject from "./admin/AddNewProject";
import NotFound from "./components/NotFound/NotFound";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { MouseProvider, useMouse } from "./context/MouseContext";
import CustomCursor from "./components/CustomCursor/CustomCursor";
import ProtectedRoute from "./routes/ProtectedRoute";
import MainLayout from "./layout/MainLayout";

function RouteResetter() {
  const { reset } = useMouse();
  const location = useLocation();

  useEffect(() => {
    reset();
  }, [location.pathname, reset]);

  return null;
}

function App() {
  const [loadingDone, setLoadingDone] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  // keep login state
  useEffect(() => {
    const token = localStorage.getItem("admin_token");
    if (token === "true") setIsLoggedIn(true);
  }, []);

  useEffect(() => {
    localStorage.setItem("admin_token", isLoggedIn ? "true" : "false");
  }, [isLoggedIn]);


  useEffect(() => {
    if (location.pathname === "/") {
      document.body.style.overflow = showContent ? "auto" : "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [showContent, location.pathname]);

  const handleLoaderComplete = () => {
    setLoadingDone(true);
    setTimeout(() => setShowContent(true), 150);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("admin_token");
    navigate("/");
  };

  const showLoader = location.pathname === "/" && !loadingDone;

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />

      <MouseProvider>
        <CustomCursor />
        <RouteResetter />

        {showLoader && <Loader onComplete={handleLoaderComplete} />}

        {(showContent || location.pathname !== "/") && (
          <MainLayout isLoggedIn={isLoggedIn} onLogout={handleLogout}>
           
            <AnimatePresence mode="wait" initial={false}>
              <RouteTransitionManager overlayVisibleMs={560} />

              <Routes location={location} key={location.pathname}>
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
                  element={
                    <PageTransitionWrapper>
                      <ViewProject />
                    </PageTransitionWrapper>
                  }
                />

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
                      <AddNewProject />
                    </ProtectedRoute>
                  }
                />

                <Route path="*" element={<NotFound />} />
              </Routes>
            </AnimatePresence>
          </MainLayout>
        )}
      </MouseProvider>
    </>
  );
}

export default App;
