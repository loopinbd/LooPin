import React from "react";
import "../styles/ActivationStatus.css";
import { useNavigate } from "react-router-dom";

const ActivationStatus = ({ status, totalEarning = 0 }) => {
  const navigate = useNavigate();

  const handleRetry = () => {
    navigate("/activation");
  };

  if (status === "pending") {
    return (
      <div className="activation-box pending">
        <h3>Activation Pending</h3>
        <p>Your payment is under review. Please wait for admin approval.</p>
      </div>
    );
  }

  if (status === "approved") {
    return (
      <div className="activation-box approved">
        <h3>Account Active ✅</h3>
        <p>Your account is now active!</p>
        <p>Total Earning: ${totalEarning.toFixed(2)}</p>
      </div>
    );
  }

  if (status === "rejected") {
    return (
      <div className="activation-box rejected">
        <h3>Activation Rejected ❌</h3>
        <p>Your activation request was rejected.</p>
        <button className="retry-btn" onClick={handleRetry}>
          Activate Now
        </button>
      </div>
    );
  }

  return (
    <div className="activation-box unknown">
      <p>Unknown activation status.</p>
    </div>
  );
};

export default ActivationStatus;
