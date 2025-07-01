import React from "react";
import "../../styles/AdminPanel.css";

const ActivationCard = ({ request, onApprove, onReject }) => {
  const {
    userId,
    paymentMethod,
    transactionId,
    amount,
    timestamp,
  } = request;

  const formattedDate = new Date(timestamp).toLocaleString();

  return (
    <div className="activation-card">
      <h3>User ID: {userId}</h3>
      <p><strong>Payment Method:</strong> {paymentMethod}</p>
      <p><strong>Transaction ID:</strong> {transactionId}</p>
      <p><strong>Amount:</strong> ${amount}</p>
      <p><strong>Requested On:</strong> {formattedDate}</p>

      <div className="activation-actions">
        <button className="approve-btn" onClick={() => onApprove(userId)}>
