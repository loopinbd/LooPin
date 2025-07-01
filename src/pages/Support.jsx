import React, { useEffect, useState } from "react";
import PageWrapper from "../components/PageWrapper";
import SupportChat from "../components/SupportChat";
import "../styles/support.css";
import { db } from "../firebase";
import {
  addDoc,
  collection,
  query,
  where,
  onSnapshot,
  orderBy,
  serverTimestamp,
} from "firebase/firestore";
import { useAuth } from "../context/AuthContext";

const Support = () => {
  const { user } = useAuth(); // get user info
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    if (!user) return;

    const q = query(
      collection(db, "supportMessages"),
      where("userId", "==", user.uid),
      orderBy("createdAt", "asc")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const msgs = snapshot.docs.map((doc) => doc.data());
      setMessages(msgs);
    });

    return () => unsubscribe();
  }, [user]);

  const sendMessage = async () => {
    if (!newMessage.trim()) return;

    try {
      await addDoc(collection(db, "supportMessages"), {
        userId: user.uid,
        email: user.email,
        content: newMessage,
        createdAt: serverTimestamp(),
        reply: "", // initially empty
      });

      setNewMessage("");
    } catch (err) {
      console.error("Failed to send message", err);
    }
  };

  return (
    <PageWrapper>
      <div className="support-page">
        <h2 className="support-title">Support</h2>

        <SupportChat messages={messages} />

        <div className="message-box">
          <textarea
            placeholder="Type your message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
          ></textarea>
          <button className="send-btn" onClick={sendMessage}>
            Send
          </button>
        </div>
      </div>
    </PageWrapper>
  );
};

export default Support;
