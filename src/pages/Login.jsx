import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../firebase";
import InputField from "../components/InputField";
import Button from "../components/Button";
import "../styles/login.css";

const Login = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const { email, password } = form;

    if (!email || !password) {
      setError("Please enter both email and password.");
      return;
    }

    setLoading(true);

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      if (!user.emailVerified) {
        setError("Please verify your email before logging in.");
        navigate("/verify");
        return;
      }

      localStorage.setItem("token", user.accessToken);
      localStorage.setItem("email", user.email);
      localStorage.setItem("uid", user.uid);

      if (user.email === "loopinbd@gmail.com") {
        navigate("/admin");
      } else {
        navigate("/dashboard");
      }
    } catch (err) {
      let msg = "Login failed. Please try again.";
      if (
        err.code === "auth/wrong-password" ||
        err.code === "auth/user-not-found"
      ) {
        msg = "Invalid email or password.";
      } else if (err.code === "auth/network-request-failed") {
        msg = "Network error. Please check your connection.";
      }
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = () => {
    const userEmail = prompt("Enter your email to reset password:");
    if (!userEmail) return;

    sendPasswordResetEmail(auth, userEmail)
      .then(() => {
        alert("Password reset email sent. Check your inbox.");
      })
      .catch((error) => {
        console.error("Reset error:", error.message);
        alert("Failed to send reset email. Try again.");
      });
  };

  return (
    <div className="login-page">
      <div className="login-box">
        <h1 className="login-title">LooPin</h1>
        <p className="login-tagline">Unlock Passive Income Power by Blockchain</p>

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

          <Button
            text={loading ? "Logging in..." : "Login"}
            type="submit"
            disabled={loading}
          />

          {/* Forgot password */}
          <p className="forgot-password" onClick={handleForgotPassword}>
            Forgot Password?
          </p>

          {/* Register link */}
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
