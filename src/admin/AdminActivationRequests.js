import React, { useEffect, useState } from "react";
import { db } from "../firebaseConfig";
import {
  collection,
  getDocs,
  updateDoc,
  doc,
  query,
  where,
} from "firebase/firestore";
import "../styles/AdminActivationRequests.css";

export default function AdminActivationRequests() {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const q = query(
          collection(db, "activationRequests"),
          where("status", "==", "pending")
        );
        const snapshot = await getDocs(q);
        const requestsData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setRequests(requestsData);
      } catch (error) {
        console.error("Error fetching activation requests:", error);
      }
    };

    fetchRequests();
  }, []);

  const handleApprove = async (id) => {
    try {
      const requestRef = doc(db, "activationRequests", id);
      await updateDoc(requestRef, { status: "approved" });

      // Optionally update user active status
      const request = requests.find((r) => r.id === id);
      const userRef = doc(db, "users", request.userId);
      await updateDoc(userRef, { active: true });

      setRequests((prev) =>
        prev.filter((request) => request.id !== id)
      );
    } catch (error) {
      console.error("Error approving request:", error);
    }
  };

  const handleReject = async (id) => {
    try {
      const requestRef = doc(db, "activationRequests", id);
      await updateDoc(requestRef, { status: "rejected" });
      setRequests((prev) => prev.filter((request) => request.id !== id));
    } catch (error) {
      console.error("Error rejecting request:", error);
    }
  };

  return (
    <div className="admin-activation-container">
      <h2 className="admin-activation-title">Activation Requests</h2>

      <table className="activation-table">
        <thead>
          <tr>
            <th>User ID</th>
            <th>Email</th>
            <th>Payment Info</th>
            <th>Amount</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {requests.length === 0 ? (
            <tr>
              <td colSpan="5">No pending requests</td>
            </tr>
          ) : (
            requests.map((req) => (
              <tr key={req.id}>
                <td>{req.userId}</td>
                <td>{req.email}</td>
                <td>{req.paymentMethod}</td>
                <td>${req.amount}</td>
                <td>
                  <button
                    className="action-btn approve"
                    onClick={() => handleApprove(req.id)}
                  >
                    Approve
                  </button>
                  <button
                    className="action-btn reject"
                    onClick={() => handleReject(req.id)}
                  >
                    Reject
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      <div className="admin-activation-footer">
        All Rights Reserved © 2025 | Power by Blockchain
      </div>
    </div>
  );
    }
