import React from "react";
import "../styles/LoadingScreen.css";
import logo from "../assets/logo-preview.png"; // ✅ logo path ensure করো

const LoadingScreen = () => {
  return (
    <div className="loading-screen">
      <img src={logo} alt="Loopin Logo" className="loading-logo" />
      <div className="loading-text">Please wait...</div>
      <div className="golden-loader"></div>
    </div>
  );
};

export default LoadingScreen;
