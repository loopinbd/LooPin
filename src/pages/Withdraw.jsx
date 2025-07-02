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
  getDocs,
  onSnapshot,
  Timestamp,
  doc,
  getDoc,
} from "firebase/firestore";

const Withdraw = () => {
  const { currentUser } = useContext(AuthContext);
  const [balance, setBalance] = useState(0);
  const [history, setHistory] = useState([]);

  // ✅ Fetch current balance from Firestore
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

  // ✅ Fetch withdraw history from Firestore
  useEffect(() => {
    if (!currentUser) return;

    const q = query(
      collection(db, "withdraws"),
      where("uid", "==", currentUser.uid)
    );

    const unsub = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => doc.data());
      setHistory(data);
    });

    return () => unsub();
  }, [currentUser]);

  // ✅ Submit withdraw request
  const handleWithdraw = async ({ method, wallet, amount }) => {
    if (!currentUser || amount > balance) return;

    const withdrawData = {
      uid: currentUser.uid,
      method,
      wallet,
      amount,
      status: "Pending",
      requestedAt: Timestamp.now(),
    };

    await addDoc(collection(db, "withdraws"), withdrawData);
    alert("Withdraw request submitted. Wait for admin approval.");
  };

  return (
    <PageWrapper>
      <div className="withdraw-page">
        <h2 className="withdraw-heading">Withdraw Funds</h2>

        <WithdrawForm balance={balance} onSubmit={handleWithdraw} />

        <section className="withdraw-history-section">
          <WithdrawHistory history={history} />
        </section>
      </div>
    </PageWrapper>
  );
};

export default Withdraw;
