import React, { useEffect, useState } from "react";
import { auth, db } from "../firebaseConfig";
import { collection, query, where, getDocs } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

export default function WithdrawHistory() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const user = auth.currentUser;

    if (!user) {
      navigate("/login");
      return;
    }

    const fetchHistory = async () => {
      try {
        const q = query(
          collection(db, "withdrawRequests"),
          where("userId", "==", user.uid)
        );

        const querySnapshot = await getDocs(q);

        const data = [];
        querySnapshot.forEach((doc) => {
          data.push({ id: doc.id, ...doc.data() });
        });

        setHistory(data);
        setLoading(false);
      } catch (error) {
        console.error("Error loading withdrawal history:", error);
        setLoading(false);
      }
    };

    fetchHistory();
  }, [navigate]);

  return (
    <div className="withdraw-history-container">
      <h2 className="page-title">Withdraw History</h2>

      {loading ? (
        <p className="loading-text">Loading...</p>
      ) : history.length === 0 ? (
        <p className="empty-text">No withdraw history found.</p>
      ) : (
        <div className="history-list">
          {history.map((item) => (
            <div key={item.id} className="history-card">
              <p><strong>Amount:</strong> {item.amount} USD</p>
              <p><strong>Wallet:</strong> {item.wallet}</p>
              <p><strong>Status:</strong> {item.status}</p>
              <p><strong>Date:</strong> {item.date}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
            }
