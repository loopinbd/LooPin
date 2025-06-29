import React from "react";
import "../styles/BalanceCard.css";

const BalanceCard = ({ balance = 0 }) => {
  return (
    <div className="balance-card">
      <h3 className="balance-title">Current Balance</h3>
      <div className="balance-amount">${Number(balance).toFixed(2)}</div>
    </div>
  );
};

export default BalanceCard;
