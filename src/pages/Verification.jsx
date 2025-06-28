import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/verification.css";
import logo from "../assets/logo-preview.png";

const Verification = () => {
  const navigate = useNavigate();

  // Simulate auto redirect after 10 sec
  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/login");
    }, 10000);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="verification-page">
      <div className="verification-box">
        <img src={logo} alt="LooPin Logo" className="verification-logo" />
        <h2>Verify Your Email</h2>
        <p>
          We’ve sent a verification link to your email. Please check your inbox
          and click the link to activate your account.
        </p>
        <p className="note">
          Don’t forget to check your <strong>spam/junk</strong> folder!
        </p>
        <p className="redirect-msg">
          You will be redirected to login page automatically.
        </p>
      </div>
    </div>
  );
};

export default Verification;
