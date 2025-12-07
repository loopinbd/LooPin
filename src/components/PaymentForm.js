import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../firebaseConfig";
import { doc, updateDoc, getDoc } from "firebase/firestore";
import "../styles/PaymentForm.css";

export default function PaymentForm() {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("pending"); // pending, success, failed
  const navigate = useNavigate();
  const user = auth.currentUser;

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  const handlePayNow = () => {
    // Redirect user to your payment gateway URL
    const paymentUrl = "https://your-payment-gateway-link.com";
    window.open(paymentUrl, "_blank");

    // Set verifying status
    setLoading(true);
    setStatus("pending");

    // Simulate checking payment status (or you can fetch real API)
    setTimeout(async () => {
      try {
        // Here, you should verify payment with your backend or payment API
        // For now, we simulate a successful payment
        const userRef = doc(db, "users", user.uid);
        await updateDoc(userRef, { activationStatus: "pending" }); // Admin will approve later
        setStatus("success");
        setLoading(false);
      } catch (error) {
        console.error("Payment verification failed:", error);
        setStatus("failed");
        setLoading(false);
      }
    }, 5000); // 5 seconds simulation
  };

  return (
    <div className="payment-container">
      <h2 className="payment-title">Activate Your Account</h2>
      <p>Pay $12 to activate your account and unlock referral income.</p>

      {loading ? (
        <div className="payment-status">
          <p>Verifying your payment... Please wait.</p>
        </div>
      ) : status === "success" ? (
        <div className="payment-status success">
          <p>Payment done! Waiting for admin approval.</p>
        </div>
      ) : status === "failed" ? (
        <div className="payment-status failed">
          <p>Payment failed. Try again.</p>
        </div>
      ) : (
        <button className="pay-now-btn" onClick={handlePayNow}>
          Pay Now
        </button>
      )}
    </div>
  );
      }
