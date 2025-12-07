import React, { useEffect, useState } from "react";
import { db } from "../firebaseConfig";
import { collection, getDocs, updateDoc, doc } from "firebase/firestore";
import "../styles/AdminUsers.css";

export default function AdminUsers() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersSnap = await getDocs(collection(db, "users"));
        const usersData = usersSnap.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setUsers(usersData);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  const toggleBlockUser = async (userId, currentStatus) => {
    try {
      const userRef = doc(db, "users", userId);
      await updateDoc(userRef, {
        blocked: !currentStatus,
      });
      setUsers((prevUsers) =>
        prevUsers.map((u) =>
          u.id === userId ? { ...u, blocked: !currentStatus } : u
        )
      );
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  return (
    <div className="admin-users-container">
      <h2 className="admin-users-title">Manage Users</h2>

      <table className="users-table">
        <thead>
          <tr>
            <th>User ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Active</th>
            <th>Blocked</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.active ? "Yes" : "No"}</td>
              <td>{user.blocked ? "Yes" : "No"}</td>
              <td>
                <button
                  className={`action-btn ${
                    user.blocked ? "unblock" : "block"
                  }`}
                  onClick={() => toggleBlockUser(user.id, user.blocked)}
                >
                  {user.blocked ? "Unblock" : "Block"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="admin-users-footer">
        All Rights Reserved © 2025 | Power by Blockchain
      </div>
    </div>
  );
  }
