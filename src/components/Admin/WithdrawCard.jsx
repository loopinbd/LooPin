import React from "react";
import "../../styles/admin.css";

const WithdrawCard = ({ request, onApprove, onReject }) => {
  const { userId, email, amount, wallet, address, status, requestedAt } = request;

  return (
    <div className="admin-card">
      <div><strong>User ID:</strong> {userId}</div>
      <div><strong>Email:</strong> {email}</div>
      <div><strong>Wallet:</strong> {wallet}</div>
      <div><strong>Address:</strong> {address}</div>
      <div><strong>Amount:</strong> ${amount}</div>
      <div><strong>Date:</strong> {new Date(requestedAt).toLocaleString()}</div>
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

export default WithdrawCard;
