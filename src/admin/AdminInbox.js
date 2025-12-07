import React, { useEffect, useState } from "react";
import { db } from "../firebaseConfig";
import {
  collection,
  getDocs,
  updateDoc,
  doc,
  addDoc,
  query,
  orderBy,
} from "firebase/firestore";
import "../styles/AdminInbox.css";

export default function AdminInbox() {
  const [messages, setMessages] = useState([]);
  const [replyText, setReplyText] = useState("");
  const [selectedMessage, setSelectedMessage] = useState(null);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const q = query(collection(db, "supportMessages"), orderBy("timestamp", "desc"));
        const snapshot = await getDocs(q);
        const messagesData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setMessages(messagesData);
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };

    fetchMessages();
  }, []);

  const handleSelectMessage = (msg) => {
    setSelectedMessage(msg);
    setReplyText(msg.adminReply || "");
  };

  const handleSendReply = async () => {
    if (!selectedMessage) return;
    try {
      const msgRef = doc(db, "supportMessages", selectedMessage.id);
      await updateDoc(msgRef, {
        adminReply: replyText,
        replyTimestamp: new Date(),
      });

      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === selectedMessage.id
            ? { ...msg, adminReply: replyText }
            : msg
        )
      );
      alert("Reply sent successfully!");
      setReplyText("");
      setSelectedMessage(null);
    } catch (error) {
      console.error("Error sending reply:", error);
    }
  };

  return (
    <div className="admin-inbox-container">
      <h2 className="admin-inbox-title">User Support Inbox</h2>

      <div className="inbox-wrapper">
        <div className="inbox-messages-list">
          {messages.length === 0 ? (
            <p>No messages yet.</p>
          ) : (
            messages.map((msg) => (
              <div
                key={msg.id}
                className={`inbox-message-item ${
                  selectedMessage?.id === msg.id ? "selected" : ""
                }`}
                onClick={() => handleSelectMessage(msg)}
              >
                <p><strong>{msg.userEmail}</strong></p>
                <p>{msg.message}</p>
                <p>Status: {msg.adminReply ? "Replied" : "Pending"}</p>
              </div>
            ))
          )}
        </div>

        <div className="inbox-reply-section">
          {selectedMessage ? (
            <>
              <h3>Reply to: {selectedMessage.userEmail}</h3>
              <textarea
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                placeholder="Type your reply here..."
              />
              <button className="reply-btn" onClick={handleSendReply}>
                Send Reply
              </button>
            </>
          ) : (
            <p>Select a message to reply</p>
          )}
        </div>
      </div>

      <div className="admin-inbox-footer">
        All Rights Reserved © 2025 | Power by Blockchain
      </div>
    </div>
  );
    }
