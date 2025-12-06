// src/pages/Dashboard.js

import React, { useEffect, useState } from "react";
import { auth, db } from "../firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import "../styles/Dashboard.css";

const Dashboard = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [timeFrame, setTimeFrame] = useState("all"); // today, 3days, 7days, 30days, all

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const uid = auth.currentUser.uid;
        const docRef = doc(db, "users", uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setUserData(docSnap.data());
        }
        setLoading(false);
      } catch (error) {
        console.error("Dashboard fetch error:", error.message);
      }
    };

    fetchUserData();
  }, []);

  if (loading) return <div className="loading">Loading...</div>;

  return (
    <div className="dashboard-container">
      {/* Topbar */}
      <div className="dashboard-topbar">
        <div className="logo-name">
          <h1 className="logo">Loopin</h1>
          <span>{userData?.name}</span>
        </div>
        <div className="topbar-menu">☰</div>
      </div>

      {/* Current Balance */}
      <div className="dashboard-balance">
        <h2>Current Balance</h2>
        <p>${userData?.balance.toFixed(2)}</p>
      </div>

      {/* Timeframe Filter */}
      <div className="dashboard-filter">
        <button onClick={() => setTimeFrame("today")}>Today</button>
        <button onClick={() => setTimeFrame("3days")}>Last 3 Days</button>
        <button onClick={() => setTimeFrame("7days")}>Last 7 Days</button>
        <button onClick={() => setTimeFrame("30days")}>Last 30 Days</button>
        <button onClick={() => setTimeFrame("all")}>All Time</button>
      </div>

      {/* Team & Commissions */}
      <div className="dashboard-team">
        <div className="team-level">
          <h3>Level 1</h3>
          <p>{userData?.level1 || 0} members</p>
          <p>Commission: ${userData?.commission1 || 0}</p>
        </div>
        <div className="team-level">
          <h3>Level 2</h3>
          <p>{userData?.level2 || 0} members</p>
          <p>Commission: ${userData?.commission2 || 0}</p>
        </div>
        <div className="team-level">
          <h3>Level 3</h3>
          <p>{userData?.level3 || 0} members</p>
          <p>Commission: ${userData?.commission3 || 0}</p>
        </div>
      </div>

      <footer>All rights reserved © 2025</footer>
      <div className="watermark">Power by Blockchain</div>
    </div>
  );
};

export default Dashboard;
