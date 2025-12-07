import React, { useEffect, useState } from "react";
import { auth, db } from "../firebaseConfig";
import { addDoc, collection, serverTimestamp, doc, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

export default function Withdraw() {
  const [amount, setAmount] = useState("");
  const [wallet, setWallet] = useState("");
  const [loading, setLoading] = useState(false);
  const [balance, setBalance] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {
    if (!auth.currentUser) {
      navigate("/login");
    } else {
      loadBalance();
    }
  }, [navigate]);

  const loadBalance = async () => {
    const userDoc = await getDoc(doc(db, "users", auth.currentUser.uid));
    if (userDoc.exists()) {
      const data = userDoc.data();
      setBalance(data.balance || 0);
    }
  };

  const submitWithdraw = async () => {
    if (amount <= 0) {
      alert("Enter a valid amount!");
      return;
    }
    if (amount > balance) {
      alert("You do not have enough balance.");
      return;
    }
    if (wallet.trim() === "") {
      alert("Wallet address is required!");
      return;
    }

    setLoading(true);

    try {
      await addDoc(collection(db, "withdrawRequests"), {
        userId: auth.currentUser.uid,
        amount,
        wallet,
        status: "pending",
        timestamp: serverTimestamp(),
      });

      alert("Withdraw request submitted!");
      setAmount("");
      setWallet("");
    } catch (error) {
      console.error("Error sending request:", error);
      alert("Failed to submit withdraw request!");
    }

    setLoading(false);
  };

  return (
    <div className="withdraw-container">
      <h2 className="page-title">Withdraw</h2>

      <div className="balance-box">
        <p>Your Balance</p>
        <h3>{balance} USD</h3>
      </div>

      <input
        type="number"
        className="withdraw-input"
        placeholder="Enter amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />

      <input
        type="text"
        className="withdraw-input"
        placeholder="Enter wallet address"
        value={wallet}
        onChange={(e) => setWallet(e.target.value)}
      />

      <button
        className="withdraw-btn"
        onClick={submitWithdraw}
        disabled={loading}
      >
        {loading ? "Submitting…" : "Submit Withdraw Request"}
      </button>
    </div>
  );
        }
