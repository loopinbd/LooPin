// src/pages/Login.js

import React, { useState } from "react";
import { auth } from "../firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import "../styles/Login.css";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      if (!user.emailVerified) {
        alert("Please verify your email first!");
        setIsSubmitting(false);
        navigate("/verify-notice");
        return;
      }

      // Successfully logged in, redirect to Dashboard
      navigate("/dashboard");
    } catch (error) {
      console.error("Login Error:", error.message);
      alert(error.message);
      setIsSubmitting(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-logo">
        <h1 className="logo">Loopin</h1>
        <p>Unlock Passive Income Powered by Blockchain</p>
      </div>

      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Login</h2>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit" disabled={isSubmitting} className={isSubmitting ? "disabled" : ""}>
          {isSubmitting ? "Logging in..." : "Login"}
        </button>

        <p className="register-link">
          Not registered yet? <a href="/register">Register now</a>
        </p>
      </form>

      <footer>All rights reserved © 2025</footer>
      <div className="watermark">Power by Blockchain</div>
    </div>
  );
};

export default Login;
