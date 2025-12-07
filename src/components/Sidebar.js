import React from "react";
import { Link, useLocation } from "react-router-dom";
import "../styles/Sidebar.css";

export default function Sidebar({ isOpen, toggleSidebar }) {
  const location = useLocation();

  const menuItems = [
    { name: "Activation", path: "/activation" },
    { name: "Withdraw", path: "/withdraw" },
    { name: "Referral", path: "/referral" },
    { name: "Support", path: "/support" },
  ];

  return (
    <div className={`sidebar ${isOpen ? "open" : ""}`}>
      <div className="sidebar-header">
        <h2>Loopin</h2>
      </div>

      <ul className="sidebar-menu">
        {menuItems.map((item) => (
          <li
            key={item.name}
            className={location.pathname === item.path ? "active" : ""}
            onClick={toggleSidebar}
          >
            <Link to={item.path}>{item.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
              }
