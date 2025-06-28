import React, { useState } from "react";
import PageWrapper from "../components/PageWrapper";
import "../styles/admin.css";

const AdminPanel = () => {
  const [dollarRate, setDollarRate] = useState(110); // default BDT rate
  const [walletAddress, setWalletAddress] = useState("TRX123456789");

  const handleRateChange = (e) => setDollarRate(e.target.value);
  const handleAddressChange = (e) => setWalletAddress(e.target.value);

  return (
    <PageWrapper>
      <div className="admin-panel">
        <h2 className="admin-title">Admin Panel</h2>

        <section className="admin-section">
          <h3>Activation Requests</h3>
          <div className="data-box">[List of activation requests here]</div>
        </section>

        <section className="admin-section">
          <h3>Withdraw Requests</h3>
          <div className="data-box">[List of withdraw requests here]</div>
        </section>

        <section className="admin-section">
          <h3>Set Dollar Rate (BDT)</h3>
          <input
            type="number"
            value={dollarRate}
            onChange={handleRateChange}
            className="admin-input"
          />
        </section>

        <section className="admin-section">
          <h3>Set USDT Wallet Address</h3>
          <input
            type="text"
            value={walletAddress}
            onChange={handleAddressChange}
            className="admin-input"
          />
        </section>

        <section className="admin-section">
          <h3>Inbox (User Messages)</h3>
          <div className="data-box">[Support messages from users]</div>
        </section>

        <section className="admin-section">
          <h3>Users</h3>
          <div className="data-box">[List of registered users]</div>
        </section>
      </div>
    </PageWrapper>
  );
};

export default AdminPanel;
