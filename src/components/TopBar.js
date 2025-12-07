import React from "react";
import "../styles/TopBar.css";
import logo from "../public/methods/logo.png"; // Replace with your logo path

export default function TopBar({ toggleSidebar, userName }) {
  return (
    <div className="topbar">
      <div className="topbar-left">
        <img src={logo} alt="Loopin Logo" className="topbar-logo" />
        <div className="topbar-info">
          <h2>Loopin</h2>
          <p>Unlock Passive Income | Power by Blockchain</p>
        </div>
      </div>
      <div className="topbar-right">
        <span className="username">{userName}</span>
        <button className="sidebar-toggle-btn" onClick={toggleSidebar}>
          ☰
        </button>
      </div>
    </div>
  );
}
