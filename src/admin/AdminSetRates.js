import React, { useEffect, useState } from "react";
import { db } from "../firebaseConfig";
import { collection, doc, getDocs, setDoc } from "firebase/firestore";
import "../styles/AdminSetRates.css";

export default function AdminSetRates() {
  const [rate, setRate] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRate = async () => {
      try {
        const ratesSnap = await getDocs(collection(db, "settings"));
        ratesSnap.forEach((doc) => {
          if (doc.id === "dollarRate") {
            setRate(doc.data().rate);
          }
        });
        setLoading(false);
      } catch (error) {
        console.error("Error fetching rate:", error);
        setLoading(false);
      }
    };

    fetchRate();
  }, []);

  const handleUpdateRate = async () => {
    try {
      const rateRef = doc(db, "settings", "dollarRate");
      await setDoc(rateRef, { rate: parseFloat(rate) });
      alert("Dollar rate updated successfully!");
    } catch (error) {
      console.error("Error updating rate:", error);
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="admin-setrates-container">
      <h2 className="admin-setrates-title">Set Dollar Rate</h2>

      <div className="setrate-form">
        <label htmlFor="rate">Current Rate (1 USD = ? BDT)</label>
        <input
          type="number"
          id="rate"
          value={rate}
          onChange={(e) => setRate(e.target.value)}
          placeholder="Enter new dollar rate"
        />
        <button className="setrate-btn" onClick={handleUpdateRate}>
          Update Rate
        </button>
      </div>

      <div className="admin-setrates-footer">
        All Rights Reserved © 2025 | Power by Blockchain
      </div>
    </div>
  );
    }
