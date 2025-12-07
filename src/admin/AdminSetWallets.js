import React, { useEffect, useState } from "react";
import { db } from "../firebaseConfig";
import { collection, doc, getDocs, setDoc } from "firebase/firestore";
import "../styles/AdminSetWallets.css";

export default function AdminSetWallets() {
  const [wallets, setWallets] = useState({
    bkash: "",
    nagad: "",
    usdt: "",
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWallets = async () => {
      try {
        const walletsSnap = await getDocs(collection(db, "settings"));
        walletsSnap.forEach((doc) => {
          if (doc.id === "wallets") {
            setWallets(doc.data());
          }
        });
        setLoading(false);
      } catch (error) {
        console.error("Error fetching wallets:", error);
        setLoading(false);
      }
    };

    fetchWallets();
  }, []);

  const handleChange = (e) => {
    setWallets({ ...wallets, [e.target.name]: e.target.value });
  };

  const handleUpdateWallets = async () => {
    try {
      const walletsRef = doc(db, "settings", "wallets");
      await setDoc(walletsRef, wallets);
      alert("Wallet addresses updated successfully!");
    } catch (error) {
      console.error("Error updating wallets:", error);
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="admin-wallets-container">
      <h2 className="admin-wallets-title">Set Wallet Addresses</h2>

      <div className="wallets-form">
        <label htmlFor="bkash">bKash Number</label>
        <input
          type="text"
          id="bkash"
          name="bkash"
          value={wallets.bkash}
          onChange={handleChange}
          placeholder="Enter bKash wallet number"
        />

        <label htmlFor="nagad">Nagad Number</label>
        <input
          type="text"
          id="nagad"
          name="nagad"
          value={wallets.nagad}
          onChange={handleChange}
          placeholder="Enter Nagad wallet number"
        />

        <label htmlFor="usdt">USDT Wallet Address</label>
        <input
          type="text"
          id="usdt"
          name="usdt"
          value={wallets.usdt}
          onChange={handleChange}
          placeholder="Enter USDT wallet address"
        />

        <button className="wallets-btn" onClick={handleUpdateWallets}>
          Update Wallets
        </button>
      </div>

      <div className="admin-wallets-footer">
        All Rights Reserved © 2025 | Power by Blockchain
      </div>
    </div>
  );
    }
