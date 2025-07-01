import React, { useState } from "react";
import "../styles/WithdrawForm.css";

const WithdrawForm = ({ balance = 0, onSubmit }) => {
  const [method, setMethod] = useState("");
  const [wallet, setWallet] = useState("");
  const [amount, setAmount] = useState("");
  const [error, setError] = useState("");

  const validate = () => {
    const amt = parseFloat(amount);
    if (!method || !wallet || !amount) {
      return "All fields are required.";
    }
    if (amt < 25) {
      return "Minimum withdraw amount is $25.";
    }
    if (amt > balance) {
      return "Not enough balance to withdraw.";
    }
    return "";
  };

  const handleWithdraw = () => {
    const err = validate();
    if (err) {
      setError(err);
    } else {
      setError("");
      onSubmit({ method, wallet, amount: parseFloat(amount) });
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
            <img
              src={`/icons/${m.toLowerCase()}.png`} // Optional icons path
              alt={m}
              className="method-icon"
            />
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
        min="0"
      />

      <div className="balance-note">Your Balance: ${balance.toFixed(2)}</div>
      <div className="min-note">Minimum withdrawal is $25</div>

      {error && <div className="error-text">{error}</div>}

      <button className="withdraw-btn" onClick={handleWithdraw} disabled={!!validate()}>
        Request Withdraw
      </button>
    </div>
  );
};

export default WithdrawForm;
