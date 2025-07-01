import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/verification.css";
import logo from "../assets/logo-preview.png";

const Verification = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/login");
    }, 10000); // ⏱️ 10 seconds
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="verification-page">
      <div className="verification-box">
        <img src={logo} alt="LooPin Logo" className="verification-logo" />
        <h1 className="app-name">LooPin</h1>
        <p className="tagline">Unlock Passive Income Power by Blockchain</p>

        <h2 className="verify-title">Verify Your Email</h2>
        <p className="verify-instruction">
          We’ve sent a verification link to your email. Please check your inbox
          and click the link to activate your account.
        </p>
        <p className="note">
          Don’t forget to check your <strong>Spam</strong> or{" "}
          <strong>Junk</strong> folder!
        </p>
        <p className="redirect-msg">
          You will be automatically redirected to the login page in 10 seconds.
        </p>
      </div>
    </div>
  );
};

export default Verification;
