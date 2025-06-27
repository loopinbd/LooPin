import React, { useEffect } from "react";
import "../styles/Notification.css";

const Notification = ({ message, type = "info", duration = 3000, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);
    return () => clearTimeout(timer);
  }, [duration, onClose]);

  return (
    <div className={`notification ${type}`}>
      {message}
    </div>
  );
};

export default Notification;
