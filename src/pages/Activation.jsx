import React, { useState, useEffect } from "react";
import PageWrapper from "../components/PageWrapper";
import Button from "../components/Button";
import "../styles/activation.css";

const Activation = () => {
  const [status, setStatus] = useState("not_paid"); // pending, approved, rejected
  const [method, setMethod] = useState("usd");

  useEffect(() => {
    // This useEffect will simulate admin approval
    if (status === "pending") {
      const timer = setTimeout(() => {
        setStatus("approved"); // simulate success
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [status]);

  const handlePayment = () => {
    setStatus("pending");
    // In real case, redirect to RupantorPay or show USDT address
  };

  const handleRePay = () => {
    setStatus("not_paid");
  };

  return (
    <PageWrapper>
      <div className="activation-page">
        {status === "not_paid" && (
          <div className="activation-box">
            <h2>Activate Your Account</h2>
            <p>Pay <strong>$12</strong> to activate your account and unlock income features.</p>

            <div className="method-toggle">
              <button
                className={method === "usd" ? "active" : ""}
                onClick={() => setMethod("usd")}
              >
                Pay in USD
              </button>
              <button
                className={method === "usdt" ? "active" : ""}
                onClick={() => setMethod("usdt")}
              >
                Pay via USDT
              </button>
            </div>

            {method === "usd" ? (
              <div className="payment-section">
                <p>Click below to pay with USD (via RupantorPay):</p>
                <Button text="Pay $12 Now" onClick={handlePayment} />
              </div>
            ) : (
              <div className="payment-section">
                <p>Send exactly <strong>12 USDT</strong> to this address:</p>
                <div className="usdt-address">TRX-USDT: <span>TK1234USDTAddress</span></div>
                <Button text="I have paid" onClick={handlePayment} />
              </div>
            )}
          </div>
        )}

        {status === "pending" && (
          <div className="activation-box">
            <h2>Waiting for Approval...</h2>
            <p>Your activation is under review by admin. Please wait.</p>
          </div>
        )}

        {status === "approved" && (
          <div className="activation-box success">
            <h2>✅ Your Account is Active!</h2>
            <p>You can now access all features and start earning.</p>
          </div>
        )}

        {status === "rejected" && (
          <div className="activation-box error">
            <h2>❌ Activation Rejected</h2>
            <p>Something went wrong. Try again.</p>
            <Button text="Try Again" onClick={handleRePay} />
          </div>
        )}
      </div>
    </PageWrapper>
  );
};

export default Activation;
