import React from "react";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../firebase"; // make sure your firebase.js exports 'auth'
import "../styles/Sidebar.css"; // Use existing sidebar button styling

const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <button className="sidebar-logout-btn" onClick={handleLogout}>
      Logout
    </button>
  );
};

export default LogoutButton;
