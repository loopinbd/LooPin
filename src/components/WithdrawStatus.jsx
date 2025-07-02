// src/components/WithdrawStatus.jsx
import React from "react";
import "../styles/admin.css"; // Reuse styling if needed

const dummyWithdrawals = [
  { id: 1, email: "user1@example.com", method: "USDT", amount: 20, status: "pending" },
  { id: 2, email: "user2@example.com", method: "USD", amount: 15, status: "approved" },
  { id: 3, email: "user3@example.com", method: "USDT", amount: 30, status: "rejected" },
];

const WithdrawStatus = () => {
  const handleApprove = (id) => {
    alert(`Approved withdrawal request ID: ${id}`);
    // Add logic to update Firestore
  };

  const handleReject = (id) => {
    alert(`Rejected withdrawal request ID: ${id}`);
    // Add logic to update Firestore
  };

  return (
    <div className="admin-table">
      <h4>Withdraw Requests</h4>
      <div className="admin-table-header">
        <span>Email</span>
        <span>Method</span>
        <span>Amount</span>
        <span>Status</span>
        <span>Actions</span>
      </div>

      {dummyWithdrawals.map((item) => (
        <div key={item.id} className="admin-table-row">
          <span>{item.email}</span>
          <span>{item.method}</span>
          <span>${item.amount}</span>
          <span className={`status ${item.status}`}>{item.status}</span>
          <span>
            {item.status === "pending" ? (
              <>
                <button className="approve-btn" onClick={() => handleApprove(item.id)}>
                  Approve
                </button>
                <button className="reject-btn" onClick={() => handleReject(item.id)}>
                  Reject
                </button>
              </>
            ) : (
              "-"
            )}
          </span>
        </div>
      ))}
    </div>
  );
};

export default WithdrawStatus;
