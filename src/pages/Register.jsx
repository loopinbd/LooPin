import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import InputField from "../components/InputField";
import Button from "../components/Button";
import "../styles/register.css";

const Register = () => {
  const navigate = useNavigate();

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

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let newErrors = {};
    if (!form.name) newErrors.name = "Name is required";
    if (!form.email) newErrors.email = "Email is required";
    if (!form.phone) newErrors.phone = "Phone is required";
    if (!form.password) newErrors.password = "Password is required";
    if (form.password !== form.confirmPassword)
      newErrors.confirmPassword = "Passwords do not match";
    if (!form.agree) newErrors.agree = "You must accept the terms";
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      // registration success — simulate sending to backend
      navigate("/verify"); // redirect to verification page
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

          <Button
            text="Register"
            type="submit"
            disabled={!form.agree}
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
