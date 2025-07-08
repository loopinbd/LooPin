import React, { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  doc,
  updateDoc,
  getDoc,
  increment,
} from "firebase/firestore";
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

  // 🔥 Referral chain update function
  const updateReferralCommission = async (userId) => {
    const userRef = doc(db, "users", userId);
    const userSnap = await getDoc(userRef);

    if (!userSnap.exists()) return;

    const userData = userSnap.data();
    if (userData.activationStatus === "active") return;

    let ref1 = userData.referredBy;
    let ref2 = null;
    let ref3 = null;

    if (ref1) {
      const ref1Ref = doc(db, "users", ref1);
      const ref1Snap = await getDoc(ref1Ref);
      if (ref1Snap.exists()) {
        await updateDoc(ref1Ref, {
          "teamLevels.1.teamCount": increment(1),
          "teamLevels.1.earned": increment(3),
        });
        ref2 = ref1Snap.data().referredBy;
      }
    }

    if (ref2) {
      const ref2Ref = doc(db, "users", ref2);
      const ref2Snap = await getDoc(ref2Ref);
      if (ref2Snap.exists()) {
        await updateDoc(ref2Ref, {
          "teamLevels.2.teamCount": increment(1),
          "teamLevels.2.earned": increment(2),
        });
        ref3 = ref2Snap.data().referredBy;
      }
    }

    if (ref3) {
      const ref3Ref = doc(db, "users", ref3);
      const ref3Snap = await getDoc(ref3Ref);
      if (ref3Snap.exists()) {
        await updateDoc(ref3Ref, {
          "teamLevels.3.teamCount": increment(1),
          "teamLevels.3.earned": increment(1),
        });
      }
    }
  };

  const handleApprove = async (id) => {
    try {
      const requestRef = doc(db, "activationRequests", id);
      const requestSnap = await getDoc(requestRef);
      if (!requestSnap.exists()) return;

      const requestData = requestSnap.data();
      const userId = requestData.uid;

      // Step 1: Approve activation request
      await updateDoc(requestRef, { status: "approved" });

      // Step 2: Update user activation status
      const userRef = doc(db, "users", userId);
      await updateDoc(userRef, { activationStatus: "active" });

      // Step 3: Update referrer commission
      await updateReferralCommission(userId);

      // Step 4: Update UI
      setRequests((prev) =>
        prev.map((req) => (req.id === id ? { ...req, status: "approved" } : req))
      );
    } catch (err) {
      console.error("Error approving user:", err);
      alert("Something went wrong while approving.");
    }
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
