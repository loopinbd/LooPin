import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import { auth } from "../firebase";
import InputField from "../components/InputField";
import Button from "../components/Button";
import "../styles/register.css";

const Register = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    referralCode: "",
    agree: false,
  });

  const [errors, setErrors] = useState({});
  const [firebaseError, setFirebaseError] = useState("");
  const [loading, setLoading] = useState(false);

  // Autofill referral code from URL
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const ref = queryParams.get("ref");
    if (ref) {
      setForm((prev) => ({ ...prev, referralCode: ref }));
    }
  }, [location.search]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setFirebaseError("");

    const { name, email, phone, password, confirmPassword, agree } = form;

    let newErrors = {};
    if (!name) newErrors.name = "Name is required";
    if (!email) newErrors.email = "Email is required";
    if (!phone) newErrors.phone = "Phone is required";

    // Enhanced password validation
    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters.";
    } else if (!/[A-Z]/.test(password)) {
      newErrors.password = "Password must contain at least one uppercase letter.";
    } else if (!/[0-9]/.test(password)) {
      newErrors.password = "Password must include at least one number.";
    }

    if (password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    if (!agree) newErrors.agree = "You must accept the terms";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);
    try {
      const userCred = await createUserWithEmailAndPassword(auth, email, password);
      await sendEmailVerification(userCred.user);

      localStorage.setItem("userData", JSON.stringify(form));

      navigate("/verify");
    } catch (err) {
      let msg = "";
      switch (err.code) {
        case "auth/email-already-in-use":
          msg = "This email is already registered.";
          break;
        case "auth/invalid-email":
          msg = "Invalid email address.";
          break;
        case "auth/weak-password":
          msg = "Password should be at least 6 characters.";
          break;
        case "auth/network-request-failed":
          msg = "Network error. Please check your connection.";
          break;
        default:
          msg = "Registration failed. Please try again.";
      }
      setFirebaseError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-page">
      <div className="register-box">
        <h1 className="register-title">LooPin</h1>
        <p className="register-tagline">Unlock Passive income Power by Blockchain</p>

        <form onSubmit={handleSubmit}>
          <InputField
            label="Full Name"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Enter your full name"
            error={errors.name}
          />
          <InputField
            label="Email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Enter your email"
            error={errors.email}
          />
          <InputField
            label="Phone Number"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            placeholder="Enter your phone"
            error={errors.phone}
          />
          <InputField
            label="Password"
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Enter password"
            error={errors.password}
          />
          <InputField
            label="Confirm Password"
            name="confirmPassword"
            type="password"
            value={form.confirmPassword}
            onChange={handleChange}
            placeholder="Confirm password"
            error={errors.confirmPassword}
          />
          <InputField
            label="Referral Code"
            name="referralCode"
            value={form.referralCode}
            onChange={handleChange}
            placeholder="(Optional if joined by link)"
          />

          <div className="checkbox-wrapper">
            <input
              type="checkbox"
              name="agree"
              checked={form.agree}
              onChange={handleChange}
            />
            <label>
              I agree to the{" "}
              <span className="terms-link" onClick={() => navigate("/terms")}>
                Terms & Conditions
              </span>
            </label>
          </div>
          {errors.agree && <div className="error-message">{errors.agree}</div>}
          {firebaseError && <div className="error-message">{firebaseError}</div>}

          <Button
            text={loading ? "Please wait..." : "Register"}
            type="submit"
            disabled={!form.agree || loading}
          />

          <p className="login-redirect">
            Already registered?{" "}
            <span onClick={() => navigate("/login")} className="login-link">
              Login
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
