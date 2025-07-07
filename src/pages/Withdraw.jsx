import React, { useContext, useEffect, useState } from "react";
import PageWrapper from "../components/PageWrapper";
import WithdrawForm from "../components/WithdrawForm";
import WithdrawHistory from "../components/WithdrawHistory";
import "../styles/withdraw.css";
import { AuthContext } from "../context/AuthContext";
import { db } from "../firebase";
import {
  collection,
  addDoc,
  query,
  where,
  onSnapshot,
  Timestamp,
  doc,
  getDoc,
} from "firebase/firestore";

const Withdraw = () => {
  const { currentUser } = useContext(AuthContext);
  const [balance, setBalance] = useState(0);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [submitSuccess, setSubmitSuccess] = useState("");

  useEffect(() => {
    if (!currentUser) return;

    const fetchBalance = async () => {
      const userRef = doc(db, "users", currentUser.uid);
      const userSnap = await getDoc(userRef);
      if (userSnap.exists()) {
        setBalance(userSnap.data().availableBalance || 0);
      }
    };

    fetchBalance();
  }, [currentUser]);

  useEffect(() => {
    if (!currentUser) return;

    const q = query(
      collection(db, "withdraws"),
      where("uid", "==", currentUser.uid)
    );

    const unsub = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setHistory(data);
    });

    return () => unsub();
  }, [currentUser]);

  const handleWithdraw = async ({ method, wallet, amount }) => {
    if (!currentUser) return;

    setLoading(true);
    setSubmitError("");
    setSubmitSuccess("");

    if (amount > balance) {
      setSubmitError("Not enough balance to withdraw.");
      setLoading(false);
      return;
    }

    const withdrawData = {
      uid: currentUser.uid,
      method,
      wallet,
      amount,
      status: "Pending",
      requestedAt: Timestamp.now(),
    };

    try {
      await addDoc(collection(db, "withdraws"), withdrawData);
      setSubmitSuccess("Withdraw request submitted. Wait for admin approval.");
    } catch (error) {
      setSubmitError("Failed to submit withdraw request. Please try again.");
      console.error("Withdraw error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageWrapper>
      <div className="withdraw-page">
        <h2 className="withdraw-heading">Withdraw Funds</h2>

        <WithdrawForm
          balance={balance}
          onSubmit={handleWithdraw}
          loading={loading}
          submitError={submitError}
          submitSuccess={submitSuccess}
          clearMessages={() => {
            setSubmitError("");
            setSubmitSuccess("");
          }}
        />

        <section className="withdraw-history-section">
          <WithdrawHistory history={history} />
        </section>
      </div>
    </PageWrapper>
  );
};

export default Withdraw;
