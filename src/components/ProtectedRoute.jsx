import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ adminOnly = false }) => {
  const token = localStorage.getItem("token");
  const email = localStorage.getItem("email");

  const isLoggedIn = !!token;
  const isAdmin = email === "loopinbd@gmail.com";

  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }

  if (adminOnly && !isAdmin) {
    return <Navigate to="/dashboard" />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
