import React from "react";
import "../styles/WithdrawHistory.css";

const WithdrawHistory = ({ history = [] }) => {
  if (history.length === 0) {
    return <div className="no-history">No withdraw history available.</div>;
  }

  return (
    <div className="withdraw-history-container">
      <h3 className="withdraw-history-title">Withdraw History</h3>
      <div className="history-table">
        <div className="history-header">
          <div>Method</div>
          <div>Amount</div>
          <div>Status</div>
        </div>

        {history.map((item, index) => (
          <div className="history-row" key={index}>
            <div>{item.method}</div>
            <div>${item.amount.toFixed(2)}</div>
            <div className={`status ${item.status.toLowerCase()}`}>
              {item.status}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WithdrawHistory;
