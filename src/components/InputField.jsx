import React from "react";
import "../styles/InputField.css";

const InputField = ({
  label,
  name, // <-- ADD THIS
  type = "text",
  value,
  onChange,
  placeholder = "",
  required = false,
  disabled = false,
  error = "",
}) => {
  return (
    <div className="input-field-container">
      {label && <label className="input-label">{label}</label>}
      <input
        className={`custom-input ${error ? "input-error" : ""}`}
        type={type}
        name={name} // <-- IMPORTANT
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
      />
      {error && <div className="input-error-message">{error}</div>}
    </div>
  );
};

export default InputField;
