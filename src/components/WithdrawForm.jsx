import React, { useState } from "react";
import "../styles/WithdrawForm.css";

const WithdrawForm = ({ balance = 0, onSubmit }) => {
  const [method, setMethod] = useState("");
  const [wallet, setWallet] = useState("");
  const [amount, setAmount] = useState("");
  const [error, setError] = useState("");

  const handleWithdraw = () => {
    const amt = parseFloat(amount);
    if (!method || !wallet || !amount) {
      setError("All fields are required.");
    } else if (amt < 25) {
      setError("Minimum withdraw amount is $25.");
    } else if (amt > balance) {
      setError("Not enough balance to withdraw.");
    } else {
      setError("");
      onSubmit({ method, wallet, amount: amt });
    }
  };

  return (
    <div className="withdraw-form">
      <h3 className="form-title">Withdraw Request</h3>

      <div className="method-options">
        {["Bkash", "Nagad", "USDT"].map((m) => (
          <div
            key={m}
            className={`method-option ${method === m ? "selected" : ""}`}
            onClick={() => setMethod(m)}
          >
            {m}
          </div>
        ))}
      </div>

      <input
        type="text"
        placeholder="Enter wallet address"
        value={wallet}
        onChange={(e) => setWallet(e.target.value)}
        className="withdraw-input"
      />

      <input
        type="number"
        placeholder="Enter amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className="withdraw-input"
      />

      <div className="balance-note">Your Balance: ${balance.toFixed(2)}</div>

      {error && <div className="error-text">{error}</div>}

      <button className="withdraw-btn" onClick={handleWithdraw}>
        Request Withdraw
      </button>
    </div>
  );
};

export default WithdrawForm;
