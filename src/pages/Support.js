import React, { useEffect, useState } from "react";
import { auth, db } from "../firebaseConfig";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

export default function Support() {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (!auth.currentUser) {
      navigate("/login");
    }
  }, [navigate]);

  const sendMessage = async () => {
    if (message.trim() === "") {
      alert("Message cannot be empty!");
      return;
    }

    setLoading(true);

    try {
      await addDoc(collection(db, "supportMessages"), {
        userId: auth.currentUser.uid,
        message,
        timestamp: serverTimestamp(),
        status: "pending",
      });

      setMessage("");
      alert("Message sent successfully!");
    } catch (error) {
      console.error("Error sending message:", error);
      alert("Failed to send message. Try again.");
    }

    setLoading(false);
  };

  return (
    <div className="support-container">
      <h2 className="page-title">Support Center</h2>

      <p className="support-desc">
        If you have any problem, feel free to contact us. Our admin will reply as soon as possible.
      </p>

      <textarea
        className="support-textarea"
        placeholder="Write your message…"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      ></textarea>

      <button
        className="support-btn"
        onClick={sendMessage}
        disabled={loading}
      >
        {loading ? "Sending…" : "Send Message"}
      </button>
    </div>
  );
}
