// src/components/Header.jsx
import React from "react";
import "../styles/Header.css";
import logo from "../assets/logo-preview.png"; // Make sure the logo file exists

const Header = ({ showMenuIcon = true, onMenuClick }) => {
  return (
    <header className="header-container">
      <div className="header-left">
        <img src={logo} alt="Loopin Logo" className="logo" />
        <div className="app-name">LooPin</div>
      </div>
      <div className="tagline">Unlock Passive income Power by Blockchain</div>
      {showMenuIcon && (
        <div className="menu-icon" onClick={onMenuClick}>
          &#9776;
        </div>
      )}
    </header>
  );
};

export default Header;
