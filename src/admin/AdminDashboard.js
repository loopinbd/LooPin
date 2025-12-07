import React, { useEffect, useState } from "react";
import { db, auth } from "../firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import "../styles/AdminDashboard.css";

export default function AdminDashboard() {
  const [usersCount, setUsersCount] = useState(0);
  const [activationRequests, setActivationRequests] = useState(0);
  const [withdrawRequests, setWithdrawRequests] = useState(0);

  useEffect(() => {
    // Fetch total users
    const fetchUsers = async () => {
      try {
        const usersSnap = await getDocs(collection(db, "users"));
        setUsersCount(usersSnap.size);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    // Fetch activation requests
    const fetchActivations = async () => {
      try {
        const activSnap = await getDocs(collection(db, "activationRequests"));
        setActivationRequests(activSnap.size);
      } catch (error) {
        console.error("Error fetching activations:", error);
      }
    };

    // Fetch withdraw requests
    const fetchWithdraws = async () => {
      try {
        const withdrawSnap = await getDocs(collection(db, "withdrawRequests"));
        setWithdrawRequests(withdrawSnap.size);
      } catch (error) {
        console.error("Error fetching withdraws:", error);
      }
    };

    fetchUsers();
    fetchActivations();
    fetchWithdraws();
  }, []);

  return (
    <div className="admin-dashboard-container">
      <h2 className="admin-dashboard-title">Admin Dashboard</h2>

      <div className="dashboard-cards">
        <div className="dashboard-card">
          <h3>Total Users</h3>
          <p>{usersCount}</p>
        </div>

        <div className="dashboard-card">
          <h3>Activation Requests</h3>
          <p>{activationRequests}</p>
        </div>

        <div className="dashboard-card">
          <h3>Withdraw Requests</h3>
          <p>{withdrawRequests}</p>
        </div>
      </div>

      <div className="admin-dashboard-footer">
        All Rights Reserved © 2025 | Power by Blockchain
      </div>
    </div>
  );
    }
