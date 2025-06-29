// src/pages/HomeRedirect.jsx
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const HomeRedirect = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/dashboard");
    } else {
      navigate("/register");
    }
  }, [navigate]);

  return null; // or show a loading spinner here
};

export default HomeRedirect;
