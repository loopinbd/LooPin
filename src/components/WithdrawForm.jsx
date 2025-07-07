import React, { useState, useEffect } from "react";
import "../styles/WithdrawForm.css";

const WithdrawForm = ({
  balance = 0,
  onSubmit,
  loading = false,
  submitError = "",
  submitSuccess = "",
  clearMessages = () => {},
}) => {
  const [method, setMethod] = useState("");
  const [wallet, setWallet] = useState("");
  const [amount, setAmount] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    // Clear internal error when external messages change
    setError("");
  }, [submitError, submitSuccess]);

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
    clearMessages();

    const err = validate();
    if (err) {
      setError(err);
    } else {
      setError("");
      onSubmit({ method, wallet, amount: parseFloat(amount) });
      // Reset fields only if not loading
      if (!loading) {
        setMethod("");
        setWallet("");
        setAmount("");
      }
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
              src={`/icons/${m.toLowerCase()}.png`}
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
        onFocus={clearMessages}
      />

      <input
        type="number"
        placeholder="Enter amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className="withdraw-input"
        min="0"
        step="0.01"
        onFocus={clearMessages}
      />

      <div className="balance-note">Your Balance: ${balance.toFixed(2)}</div>
      <div className="min-note">Minimum withdrawal is $25</div>

      {error && <div className="error-text">{error}</div>}
      {submitError && <div className="error-text">{submitError}</div>}
      {submitSuccess && <div className="success-text">{submitSuccess}</div>}

      <button
        className="withdraw-btn"
        onClick={handleWithdraw}
        disabled={loading || !method || !wallet || !amount}
      >
        {loading ? "Processing..." : "Request Withdraw"}
      </button>
    </div>
  );
};

export default WithdrawForm; eta kon file e peast korbo
