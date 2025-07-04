// src/components/WithdrawList.jsx
import React, { useEffect, useState } from "react";
import { collection, getDocs, doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";

const WithdrawList = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "withdrawRequests"));
        const data = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setRequests(data);
      } catch (error) {
        console.error("Error fetching withdraw requests:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, []);

  const handleApprove = async (id) => {
    await updateDoc(doc(db, "withdrawRequests", id), { status: "approved" });
    setRequests((prev) =>
      prev.map((req) => (req.id === id ? { ...req, status: "approved" } : req))
    );
  };

  const handleReject = async (id) => {
    await updateDoc(doc(db, "withdrawRequests", id), { status: "rejected" });
    setRequests((prev) =>
      prev.map((req) => (req.id === id ? { ...req, status: "rejected" } : req))
    );
  };

  return (
    <div className="admin-list">
      {loading ? (
        <p>Loading withdraw requests...</p>
      ) : requests.length === 0 ? (
        <p>No withdraw requests found.</p>
      ) : (
        <ul>
          {requests.map((req) => (
            <li key={req.id} className="admin-item">
              <strong>{req.email}</strong> requested <b>${req.amount}</b> – Status:{" "}
              <span className={req.status}>{req.status}</span>
              <div className="admin-actions">
                {req.status === "pending" && (
                  <>
                    <button
                      onClick={() => handleApprove(req.id)}
                      className="approve-btn"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => handleReject(req.id)}
                      className="reject-btn"
                    >
                      Reject
                    </button>
                  </>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default WithdrawList;
