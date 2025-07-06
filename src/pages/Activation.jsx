// src/pages/Activation.jsx
import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";
import ActivationStatus from "../components/ActivationStatus";
import PageWrapper from "../components/PageWrapper";
import "../styles/activation.css";

const Activation = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState(null); // 'pending', 'approved', 'rejected', null
  const [totalEarning, setTotalEarning] = useState(0);

  useEffect(() => {
    const fetchStatus = async () => {
      if (!user) return;

      const userRef = doc(db, "users", user.uid);
      const userSnap = await getDoc(userRef);

      if (userSnap.exists()) {
        const data = userSnap.data();
        setTotalEarning(data.totalEarning || 0);

        if (data.isActive) {
          setStatus("approved");
        } else if (data.activationStatus === "pending") {
          setStatus("pending");
        } else if (data.activationStatus === "rejected") {
          setStatus("rejected");
        } else {
          setStatus(null);
        }
      }

      setLoading(false);
    };

    fetchStatus();
  }, [user]);

  const handlePayment = async () => {
    if (!user) return;

    // Mark activation as pending in Firestore
    await setDoc(doc(db, "users", user.uid), {
      activationStatus: "pending",
      activationRequestedAt: serverTimestamp(),
    }, { merge: true });

    // Redirect to your fixed RupantorPay payment link
    const fixedLink = "https://rupantorpay.com/paymentlink/eyJ1aWQiOjEyMzksImJyYW5kX2lkIjoiNjgzIiwiY3VzdG9tZXJfYW1vdW50IjoiMTUxMiJ9";
    window.open(fixedLink, "_blank");
  };

  if (loading) {
    return (
      <PageWrapper>
        <div className="activation-box loading">
          <p>Checking activation status...</p>
        </div>
      </PageWrapper>
    );
  }

  if (status) {
    return (
      <PageWrapper>
        <ActivationStatus status={status} totalEarning={totalEarning} />
      </PageWrapper>
    );
  }

  return (
    <PageWrapper>
      <div className="activation-box action">
        <h2>Activate Your Account</h2>
        <p>To activate your account, please deposit <strong>$12</strong> via RupantorPay.</p>
        <button onClick={handlePayment} className="pay-btn">
          Activate with $12 Payment
        </button>
      </div>
    </PageWrapper>
  );
};

export default Activation;
