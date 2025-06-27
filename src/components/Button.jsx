import React from "react";
import "../styles/Button.css";

const Button = ({ text, onClick, disabled = false, type = "button", variant = "primary" }) => {
  return (
    <button
      className={`custom-button ${variant} ${disabled ? "disabled" : ""}`}
      onClick={onClick}
      type={type}
      disabled={disabled}
    >
      {text}
    </button>
  );
};

export default Button;
