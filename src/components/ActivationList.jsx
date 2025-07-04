// src/components/ActivationList.jsx
import React, { useEffect, useState } from "react";
import { collection, getDocs, doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";

const ActivationList = () => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    const fetchRequests = async () => {
      const querySnapshot = await getDocs(collection(db, "activationRequests"));
      const data = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setRequests(data);
    };

    fetchRequests();
  }, []);

  const handleApprove = async (id) => {
    await updateDoc(doc(db, "activationRequests", id), { status: "approved" });
    setRequests((prev) =>
      prev.map((req) => (req.id === id ? { ...req, status: "approved" } : req))
    );
  };

  const handleReject = async (id) => {
    await updateDoc(doc(db, "activationRequests", id), { status: "rejected" });
    setRequests((prev) =>
      prev.map((req) => (req.id === id ? { ...req, status: "rejected" } : req))
    );
  };

  return (
    <div className="admin-list">
      {requests.length === 0 ? (
        <p>No activation requests found.</p>
      ) : (
        <ul>
          {requests.map((req) => (
            <li key={req.id} className="admin-item">
              <strong>{req.email}</strong> - Status:{" "}
              <span className={req.status}>{req.status}</span>
              <div className="admin-actions">
                {req.status === "pending" && (
                  <>
                    <button onClick={() => handleApprove(req.id)} className="approve-btn">
                      Approve
                    </button>
                    <button onClick={() => handleReject(req.id)} className="reject-btn">
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

export default ActivationList;
