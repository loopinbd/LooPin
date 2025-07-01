import React from "react";
import "../styles/BalanceCard.css";

const BalanceCard = ({ balance = 0 }) => {
  return (
    <div className="balance-card">
      <h3 className="balance-title">Available Balance</h3>
      <div className="balance-amount">${parseFloat(balance).toFixed(2)}</div>
    </div>
  );
};

export default BalanceCard;
