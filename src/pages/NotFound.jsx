import React from "react";
import { Link } from "react-router-dom";
import "../styles/notfound.css";

const NotFound = () => {
  return (
    <div className="notfound-container">
      <h1 className="notfound-title">404</h1>
      <p className="notfound-message">Page Not Found</p>
      <Link to="/" className="notfound-link">Go back to Home</Link>
    </div>
  );
};

export default NotFound;
