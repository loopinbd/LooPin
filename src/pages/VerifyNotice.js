// src/pages/VerifyNotice.js

import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/VerifyNotice.css";

const VerifyNotice = () => {
  const navigate = useNavigate();

  const handleLoginRedirect = () => {
    navigate("/login");
  };

  return (
    <div className="verify-container">
      <div className="verify-box">
        <h1 className="logo">Loopin</h1>
        <p>Unlock Passive Income Powered by Blockchain</p>

        <h2>Email Verification Required</h2>
        <p>
          Your account is not verified yet. Please check your Gmail inbox for the verification email. 
          If you don’t see it, check your spam/junk folder.
        </p>

        <button onClick={handleLoginRedirect}>Go to Login</button>
      </div>

      <footer>All rights reserved © 2025</footer>
      <div className="watermark">Power by Blockchain</div>
    </div>
  );
};

export default VerifyNotice;
