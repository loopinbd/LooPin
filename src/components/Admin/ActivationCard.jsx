import React from "react";
import "../../styles/admin.css";

const ActivationCard = ({ request, onApprove, onReject }) => {
  const { userId, email, amount, txnId, status } = request;

  return (
    <div className="admin-card">
      <div><strong>User ID:</strong> {userId}</div>
      <div><strong>Email:</strong> {email}</div>
      <div><strong>Amount:</strong> ${amount}</div>
      <div><strong>Transaction ID:</strong> {txnId}</div>
      <div><strong>Status:</strong> <span className={`status ${status}`}>{status}</span></div>

      {status === "pending" && (
        <div className="admin-card-actions">
          <button className="approve-btn" onClick={() => onApprove(request)}>Approve</button>
          <button className="reject-btn" onClick={() => onReject(request)}>Reject</button>
        </div>
      )}
    </div>
  );
};

export default ActivationCard;
