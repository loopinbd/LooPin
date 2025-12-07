import React, { useEffect, useState } from "react";
import { db } from "../firebaseConfig";
import { collection, getDocs, updateDoc, doc, query, where } from "firebase/firestore";
import "../styles/AdminWithdrawRequests.css";

export default function AdminWithdrawRequests() {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    const fetchWithdraws = async () => {
      try {
        const q = query(collection(db, "withdrawRequests"), where("status", "==", "pending"));
        const snapshot = await getDocs(q);
        const requestsData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setRequests(requestsData);
      } catch (error) {
        console.error("Error fetching withdraw requests:", error);
      }
    };

    fetchWithdraws();
  }, []);

  const handleApprove = async (id, userId, amount) => {
    try {
      const requestRef = doc(db, "withdrawRequests", id);
      await updateDoc(requestRef, { status: "approved" });

      // Deduct from user's balance
      const userRef = doc(db, "users", userId);
      await updateDoc(userRef, {
        balance: parseFloat((user.balance - amount).toFixed(2)) || 0,
      });

      setRequests(prev => prev.filter(req => req.id !== id));
    } catch (error) {
      console.error("Error approving withdraw:", error);
    }
  };

  const handleReject = async (id) => {
    try {
      const requestRef = doc(db, "withdrawRequests", id);
      await updateDoc(requestRef, { status: "rejected" });
      setRequests(prev => prev.filter(req => req.id !== id));
    } catch (error) {
      console.error("Error rejecting withdraw:", error);
    }
  };

  return (
    <div className="admin-withdraw-container">
      <h2 className="admin-withdraw-title">Withdraw Requests</h2>

      <table className="withdraw-table">
        <thead>
          <tr>
            <th>User ID</th>
            <th>Email</th>
            <th>Amount</th>
            <th>Method</th>
            <th>Wallet/Account</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {requests.length === 0 ? (
            <tr>
              <td colSpan="6">No pending withdraw requests</td>
            </tr>
          ) : (
            requests.map(req => (
              <tr key={req.id}>
                <td>{req.userId}</td>
                <td>{req.email}</td>
                <td>${req.amount}</td>
                <td>{req.method}</td>
                <td>{req.walletAddress}</td>
                <td>
                  <button className="action-btn approve" onClick={() => handleApprove(req.id, req.userId, req.amount)}>
                    Approve
                  </button>
                  <button className="action-btn reject" onClick={() => handleReject(req.id)}>
                    Reject
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      <div className="admin-withdraw-footer">
        All Rights Reserved © 2025 | Power by Blockchain
      </div>
    </div>
  );
    }
