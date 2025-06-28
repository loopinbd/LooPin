import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import InputField from "../components/InputField";
import Button from "../components/Button";
import "../styles/login.css";

const Login = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Simulate login (Replace with Firebase/Auth later)
    if (form.email === "loopinbd@gmail.com" && form.password === "admin123") {
      localStorage.setItem("token", "adminToken");
      localStorage.setItem("email", form.email);
      navigate("/admin");
    } else if (form.email && form.password) {
      localStorage.setItem("token", "userToken");
      localStorage.setItem("email", form.email);
      navigate("/dashboard");
    } else {
      setError("Invalid email or password");
    }
  };

  return (
    <div className="login-page">
      <div className="login-box">
        <h1 className="login-title">LooPin</h1>
        <p className="login-tagline">Unlock Passive income Power by Blockchain</p>

        <form onSubmit={handleSubmit}>
          <InputField
            label="Email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Enter your email"
          />
          <InputField
            label="Password"
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Enter your password"
          />
          {error && <div className="error-message">{error}</div>}

          <Button text="Login" type="submit" />

          <p className="register-redirect">
            Not registered yet?{" "}
            <span onClick={() => navigate("/register")} className="register-link">
              Register now
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
