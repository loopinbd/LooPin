import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext"; // ✅ using your custom hook
import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";
import ActivationStatus from "../components/ActivationStatus";
import PageWrapper from "../components/PageWrapper";
import "../styles/activation.css";

const Activation = () => {
  const { currentUser } = useAuth(); // ✅ use currentUser from context
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState(null); // 'pending', 'approved', 'rejected', null
  const [totalEarning, setTotalEarning] = useState(0);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!currentUser) {
      // User not logged in yet
      setStatus(null);
      setLoading(false);
      return;
    }

    const fetchStatus = async () => {
      setLoading(true);
      setError(null);
      try {
        const userRef = doc(db, "users", currentUser.uid);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
          const data = userSnap.data();
          setTotalEarning(data.totalEarning || 0);

          if (data.isActive === true) {
            setStatus("approved");
          } else if (data.activationStatus === "pending") {
            setStatus("pending");
          } else if (data.activationStatus === "rejected") {
            setStatus("rejected");
          } else {
            setStatus(null);
          }
        } else {
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
  }, [currentUser]);

  const handlePayment = async () => {
    if (!currentUser) {
      alert("Please login first.");
      return;
    }

    try {
      await setDoc(
        doc(db, "users", currentUser.uid),
        {
          activationStatus: "pending",
          activationRequestedAt: serverTimestamp(),
        },
        { merge: true }
      );

      const paymentLink =
        "https://rupantorpay.com/paymentlink/eyJ1aWQiOjEyMzksImJyYW5kX2lkIjoiNjgzIiwiY3VzdG9tZXJfYW1vdW50IjoiMTUxMiJ9";
      window.open(paymentLink, "_blank");

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
          To activate your account, please deposit <strong>$12</strong> via RupantorPay.
        </p>
        <button onClick={handlePayment} className="pay-btn">
          Activate with $12 Payment
        </button>
      </div>
    </PageWrapper>
  );
};

export default Activation;import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { doc, getDoc, setDoc, serverTimestamp, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import ActivationStatus from "../components/ActivationStatus";
import PageWrapper from "../components/PageWrapper";
import { handleReferralCommissionUpdate } from "../utils/commissionUpdate"; // ✅ নতুন লাইন
import "../styles/activation.css";

const Activation = () => {
  const { currentUser } = useAuth();
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState(null); // 'pending', 'approved', 'rejected', null
  const [totalEarning, setTotalEarning] = useState(0);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!currentUser) {
      setStatus(null);
      setLoading(false);
      return;
    }

    const fetchStatus = async () => {
      setLoading(true);
      setError(null);

      try {
        const userRef = doc(db, "users", currentUser.uid);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
          const data = userSnap.data();
          setTotalEarning(data.totalEarning || 0);

          if (data.isActive === true) {
            setStatus("approved");

            // ✅ কমিশন যদি আগে আপডেট না হয়ে থাকে
            if (!data.commissionUpdated) {
              await handleReferralCommissionUpdate(currentUser.uid);

              await updateDoc(userRef, {
                commissionUpdated: true,
              });
            }
          } else if (data.activationStatus === "pending") {
            setStatus("pending");
          } else if (data.activationStatus === "rejected") {
            setStatus("rejected");
          } else {
            setStatus(null);
          }
        } else {
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
  }, [currentUser]);

  const handlePayment = async () => {
    if (!currentUser) {
      alert("Please login first.");
      return;
    }

    try {
      await setDoc(
        doc(db, "users", currentUser.uid),
        {
          activationStatus: "pending",
          activationRequestedAt: serverTimestamp(),
        },
        { merge: true }
      );

      const paymentLink =
        "https://rupantorpay.com/paymentlink/eyJ1aWQiOjEyMzksImJyYW5kX2lkIjoiNjgzIiwiY3VzdG9tZXJfYW1vdW50IjoiMTUxMiJ9";
      window.open(paymentLink, "_blank");

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
          To activate your account, please deposit <strong>$12</strong> via RupantorPay.
        </p>
        <button onClick={handlePayment} className="pay-btn">
          Activate with $12 Payment
        </button>
      </div>
    </PageWrapper>
  );
};

export default Activation;
