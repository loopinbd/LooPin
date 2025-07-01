import React, { useState } from "react";
import "../../styles/admin.css";

const SupportCard = ({ message, onReply }) => {
  const { userId, email, content, createdAt, reply } = message;
  const [adminReply, setAdminReply] = useState("");

  const handleReply = () => {
    if (adminReply.trim()) {
      onReply(message.id, adminReply);
      setAdminReply("");
    }
  };

  return (
    <div className="admin-card">
      <div><strong>User ID:</strong> {userId}</div>
      <div><strong>Email:</strong> {email}</div>
      <div><strong>Message:</strong> {content}</div>
      <div><strong>Sent:</strong> {new Date(createdAt).toLocaleString()}</div>

      {reply ? (
        <div className="admin-replied">
          <strong>Replied:</strong> {reply}
        </div>
      ) : (
        <div className="admin-reply-form">
          <textarea
            placeholder="Type your reply..."
            value={adminReply}
            onChange={(e) => setAdminReply(e.target.value)}
          ></textarea>
          <button className="approve-btn" onClick={handleReply}>Send Reply</button>
        </div>
      )}
    </div>
  );
};

export default SupportCard;
