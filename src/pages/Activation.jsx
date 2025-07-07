import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";
import ActivationStatus from "../components/ActivationStatus";
import PageWrapper from "../components/PageWrapper";
import "../styles/activation.css";

const Activation = () => {
  const { currentUser } = useContext(AuthContext);

  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState(null); // 'pending', 'approved', 'rejected', null
  const [totalEarning, setTotalEarning] = useState(0);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!user) {
      // User not logged in yet
      setStatus(null);
      setLoading(false);
      return;
    }

    const fetchStatus = async () => {
      setLoading(true);
      setError(null);
      try {
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
        } else {
          // user doc doesn't exist
          setStatus(null);
        }
      } catch (err) {
        console.error("Error fetching activation status:", err);
        setError("Failed to load activation status. Try again later.");
        setStatus(null);
      }
      setLoading(false);
    };

    fetchStatus();
  }, [user]);

  const handlePayment = async () => {
    if (!user) {
      alert("Please login first.");
      return;
    }

    try {
      // Mark activation as pending in Firestore
      await setDoc(
        doc(db, "users", user.uid),
        {
          activationStatus: "pending",
          activationRequestedAt: serverTimestamp(),
        },
        { merge: true }
      );

      // Open RupantorPay payment link in new tab
      const paymentLink =
        "https://rupantorpay.com/paymentlink/eyJ1aWQiOjEyMzksImJyYW5kX2lkIjoiNjgzIiwiY3VzdG9tZXJfYW1vdW50IjoiMTUxMiJ9";
      window.open(paymentLink, "_blank");

      // After payment, user needs to wait admin approval
      setStatus("pending");
    } catch (err) {
      console.error("Payment initiation failed:", err);
      alert("Failed to initiate payment. Please try again.");
    }
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

  if (error) {
    return (
      <PageWrapper>
        <div className="activation-box error">
          <p>{error}</p>
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
        <p>
          To activate your account, please deposit <strong>$12</strong> via
          RupantorPay.
        </p>
        <button onClick={handlePayment} className="pay-btn">
          Activate with $12 Payment
        </button>
      </div>
    </PageWrapper>
  );
};

export default Activation;
