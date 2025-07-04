import React, { useState, useEffect } from "react";
import { doc, getDoc, setDoc } from "firebase/firestore";
import PageWrapper from "../components/PageWrapper";
import ActivationList from "../components/ActivationList";
import WithdrawList from "../components/WithdrawList";
import UserMessages from "../components/UserMessages";
import UserList from "../components/UserList";
import { db } from "../firebase";
import "../styles/admin.css";

const AdminPanel = () => {
  const [dollarRate, setDollarRate] = useState(110);
  const [walletAddress, setWalletAddress] = useState("");

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const settingsRef = doc(db, "admin", "settings");
        const settingsSnap = await getDoc(settingsRef);
        if (settingsSnap.exists()) {
          const { dollarRate, walletAddress } = settingsSnap.data();
          setDollarRate(dollarRate || 110);
          setWalletAddress(walletAddress || "");
        }
      } catch (err) {
        console.error("Failed to fetch admin settings:", err);
      }
    };

    fetchSettings();
  }, []);

  const handleSaveSettings = async () => {
    try {
      await setDoc(doc(db, "admin", "settings"), {
        dollarRate: Number(dollarRate),
        walletAddress,
      });
      alert("Settings updated successfully.");
    } catch (err) {
      console.error("Failed to update settings:", err);
      alert("Error saving settings.");
    }
  };

  return (
    <PageWrapper>
      <div className="admin-panel">
        <h2 className="admin-title">Admin Panel</h2>

        <section className="admin-section">
          <h3>Activation Requests</h3>
          <ActivationList />
        </section>

        <section className="admin-section">
          <h3>Withdraw Requests</h3>
          <WithdrawList />
        </section>

        <section className="admin-section">
          <h3>Set Dollar Rate (BDT)</h3>
          <input
            type="number"
            value={dollarRate}
            onChange={(e) => setDollarRate(e.target.value)}
            className="admin-input"
          />
        </section>

        <section className="admin-section">
          <h3>Set USDT Wallet Address</h3>
          <input
            type="text"
            value={walletAddress}
            onChange={(e) => setWalletAddress(e.target.value)}
            className="admin-input"
          />
          <button onClick={handleSaveSettings} className="admin-save-btn">
            Save Settings
          </button>
        </section>

        <section className="admin-section">
          <h3>Inbox (User Messages)</h3>
          <UserMessages />
        </section>

        <section className="admin-section">
          <h3>Users</h3>
          <UserList />
        </section>
      </div>
    </PageWrapper>
  );
};

export default AdminPanel;
