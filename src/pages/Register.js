// src/pages/Register.js

import React, { useState, useEffect } from "react";
import { auth, db } from "../firebaseConfig";
import { createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import "../styles/Register.css";

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    referral: ""
  });

  const [termsChecked, setTermsChecked] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Auto-fill referral from URL (if any)
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const ref = params.get("ref");
    if (ref) {
      setFormData(prev => ({ ...prev, referral: ref }));
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!termsChecked) {
      alert("You must accept terms and conditions!");
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    setIsSubmitting(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
      const user = userCredential.user;

      // Save user data in Firestore
      await setDoc(doc(db, "users", user.uid), {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        referral: formData.referral || "",
        balance: 0,
        activated: false,
        createdAt: new Date()
      });

      // Send verification email
      await sendEmailVerification(user);

      alert("Registration successful! Please verify your email.");
      navigate("/verify-notice"); // Redirect to verification notice page
    } catch (error) {
      console.error("Registration Error:", error.message);
      alert(error.message);
      setIsSubmitting(false);
    }
  };

  return (
    <div className="register-container">
      <div className="register-logo">
        <h1 className="logo">Loopin</h1>
        <p>Unlock Passive Income Powered by Blockchain</p>
      </div>

      <form className="register-form" onSubmit={handleSubmit}>
        <h2>Register</h2>
        <input type="text" name="name" placeholder="Full Name" value={formData.name} onChange={handleChange} required />
        <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
        <input type="text" name="phone" placeholder="Phone Number" value={formData.phone} onChange={handleChange} required />
        <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
        <input type="password" name="confirmPassword" placeholder="Confirm Password" value={formData.confirmPassword} onChange={handleChange} required />
        <input type="text" name="referral" placeholder="Referral Code (Optional)" value={formData.referral} onChange={handleChange} />

        <div className="terms">
          <input type="checkbox" id="terms" checked={termsChecked} onChange={(e) => setTermsChecked(e.target.checked)} />
          <label htmlFor="terms">I accept the <a href="/terms" target="_blank">Terms & Conditions</a></label>
        </div>

        <button type="submit" disabled={!termsChecked || isSubmitting} className={isSubmitting ? "disabled" : ""}>
          {isSubmitting ? "Registering..." : "Register"}
        </button>

        <p className="login-link">
          Already registered? <a href="/login">Login</a>
        </p>
      </form>

      <footer>All rights reserved © 2025</footer>
      <div className="watermark">Power by Blockchain</div>
    </div>
  );
};

export default Register;
