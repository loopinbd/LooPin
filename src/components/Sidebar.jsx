import React from "react";
import "../styles/Sidebar.css";
import logo from "../assets/logo-preview.png";
import { useLocation, useNavigate } from "react-router-dom";
import LogoutButton from "./LogoutButton"; // ⬅️ Added logout button

const Sidebar = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { name: "Activation", path: "/activation" },
    { name: "Withdraw", path: "/withdraw" },
    { name: "Referral", path: "/referral" },
    { name: "Support", path: "/support" },
    // { name: "Admin", path: "/admin" }, // Optional if admin-only
  ];

  return (
    <div className={`sidebar-container ${isOpen ? "open" : ""}`}>
      <div className="sidebar-content">
        <div className="sidebar-header">
          <img src={logo} alt="Logo" className="sidebar-logo" />
          <div className="sidebar-app-name">LooPin</div>
        </div>

        <nav className="menu-list">
          {menuItems.map((item) => (
            <div
              key={item.name}
              className={`menu-item ${
                location.pathname === item.path ? "active" : ""
              }`}
              onClick={() => {
                navigate(item.path);
                onClose(); // close sidebar on click
              }}
            >
              {item.name}
            </div>
          ))}
        </nav>

        <div className="sidebar-logout-wrapper">
          <LogoutButton /> {/* ⬅️ added */}
        </div>
      </div>

      <div className="sidebar-overlay" onClick={onClose} />
    </div>
  );
};

export default Sidebar;
