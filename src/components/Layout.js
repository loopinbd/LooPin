import React, { useState, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import TopBar from "./TopBar";
import Sidebar from "./Sidebar";
import { auth } from "../firebaseConfig";
import { useAuthState } from "react-firebase-hooks/auth";
import "../styles/Layout.css";

export default function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [userName, setUserName] = useState("");
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  useEffect(() => {
    if (!loading) {
      if (!user) {
        navigate("/login");
      } else {
        setUserName(user.displayName || user.email);
      }
    }
  }, [user, loading, navigate]);

  return (
    <div className="layout-container">
      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      <div className="layout-main">
        <TopBar toggleSidebar={toggleSidebar} userName={userName} />
        <div className="layout-content">
          <Outlet />
        </div>
        <div className="layout-footer">
          All Rights Reserved © 2025 | Power by Blockchain
        </div>
      </div>
    </div>
  );
    }
