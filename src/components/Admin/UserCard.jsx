import React from "react";
import "../../styles/admin.css";

const UserCard = ({ user }) => {
  const { uid, email, isActive, joinedAt, referredBy } = user;

  return (
    <div className="admin-card">
      <div><strong>User ID:</strong> {uid}</div>
      <div><strong>Email:</strong> {email}</div>
      <div><strong>Referral:</strong> {referredBy || "None"}</div>
      <div><strong>Status:</strong> 
        <span className={`status ${isActive ? "approved" : "pending"}`}>
          {isActive ? "Active" : "Inactive"}
        </span>
      </div>
      <div><strong>Joined:</strong> {joinedAt ? new Date(joinedAt).toLocaleString() : "N/A"}</div>
    </div>
  );
};

export default UserCard;
