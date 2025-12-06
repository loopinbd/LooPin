// src/pages/Activation.js

import React, { useEffect, useState } from "react";
import { auth, db } from "../firebaseConfig";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import "../styles/Activation.css";

const Activation = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [verifying, setVerifying] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const uid = auth.currentUser.uid;
        const docRef = doc(db, "users", uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setUserData(docSnap.data());
        }
        setLoading(false);
      } catch (error) {
        console.error("Activation fetch error:", error.message);
      }
    };
    fetchUserData();
  }, []);

  const handlePayNow = () => {
    // Redirect to payment gateway
    window.open("https://your-payment-gateway-link.com", "_blank");
    setVerifying(true);
  };

  const handleCheckStatus = async () => {
    setVerifying(true);
    try {
      const uid = auth.currentUser.uid;
      const docRef = doc(db, "users", uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setUserData(docSnap.data());
        setVerifying(false);
      }
    } catch (error) {
      console.error("Check status error:", error.message);
    }
  };

  if (loading) return <div className="loading">Loading...</div>;

  return (
    <div className="activation-container">
      <div className="activation-box">
        <h1 className="logo">Loopin</h1>
        <p>Unlock Passive Income Powered by Blockchain</p>

        {!userData?.activated ? (
          <>
            <h2>Activate Your Account</h2>
            <p>Pay $12 to activate your account.</p>
            <button onClick={handlePayNow} disabled={verifying}>
              {verifying ? "Verifying Payment..." : "Pay Now"}
            </button>
            {verifying && (
              <p className="verifying-text">Verifying your payment, please wait...</p>
            )}
          </>
        ) : (
          <>
            <h2>Account Active</h2>
            <p>Your account is activated. Your total earnings:</p>
            <p className="balance">${userData.balance.toFixed(2)}</p>
          </>
        )}
      </div>

      <footer>All rights reserved © 2025</footer>
      <div className="watermark">Power by Blockchain</div>
    </div>
  );
};

export default Activation;
