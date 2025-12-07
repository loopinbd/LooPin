import React, { useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import "../styles/AdminLayout.css";
import logo from "../public/methods/logo.png"; // Replace with your admin logo path

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // Admin login restriction: only loopinbd@gmail.com
  // Replace with actual Firebase auth check if needed
  const handleLogout = () => {
    navigate("/admin/login");
  };

  return (
    <div className="admin-layout-container">
      {/* Sidebar */}
      <div className={`admin-sidebar ${sidebarOpen ? "" : "hidden"}`}>
        <div className="admin-sidebar-logo">
          <img src={logo} alt="Loopin Admin Logo" />
          <h2>Loopin Admin</h2>
        </div>
        <div className="admin-sidebar-menu">
          <Link className="sidebar-menu-item" to="/admin/dashboard">
            Dashboard
          </Link>
          <Link className="sidebar-menu-item" to="/admin/activation-requests">
            Activation Requests
          </Link>
          <Link className="sidebar-menu-item" to="/admin/withdraw-requests">
            Withdraw Requests
          </Link>
          <Link className="sidebar-menu-item" to="/admin/set-rates">
            Set Dollar Rate
          </Link>
          <Link className="sidebar-menu-item" to="/admin/set-wallets">
            Set Wallets
          </Link>
          <Link className="sidebar-menu-item" to="/admin/inbox">
            Inbox
          </Link>
          <Link className="sidebar-menu-item" to="/admin/users">
            Users
          </Link>
          <button
            className="sidebar-menu-item"
            style={{ background: "#f87171", color: "#fff" }}
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </div>

      {/* Main content */}
      <div className="admin-main-content">
        {/* Topbar */}
        <div className="admin-topbar">
          <div className="admin-topbar-left">
            <img src={logo} alt="Logo" />
            <h3>Loopin Admin Panel</h3>
          </div>
          <div className="admin-topbar-right">
            <button onClick={toggleSidebar} style={{ cursor: "pointer" }}>
              ☰
            </button>
          </div>
        </div>

        {/* Page content */}
        <div className="admin-content">
          <Outlet />
        </div>

        {/* Footer */}
        <div className="admin-layout-footer">
          All Rights Reserved © 2025 | Power by Blockchain
        </div>
      </div>
    </div>
  );
  }
