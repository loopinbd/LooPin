import React, { useEffect, useState, useContext } from "react";
‎import PageWrapper from "../components/PageWrapper";
‎import SupportChat from "../components/SupportChat";
‎import "../styles/support.css";
‎import { db } from "../firebase";
‎import {
‎  addDoc,
‎  collection,
‎  query,
‎  where,
‎  onSnapshot,
‎  orderBy,
‎  serverTimestamp,
‎} from "firebase/firestore";
‎import { AuthContext } from "../context/AuthContext"; // 🔁 Fix here
‎
‎const Support = () => {
‎  const { currentUser } = useContext(AuthContext); // ✅ Use currentUser
‎  const [messages, setMessages] = useState([]);
‎  const [newMessage, setNewMessage] = useState("");
‎  const [sending, setSending] = useState(false);
‎
‎  useEffect(() => {
‎    if (!currentUser) return;
‎
‎    const q = query(
‎      collection(db, "supportMessages"),
‎      where("userId", "==", currentUser.uid),
‎      orderBy("createdAt", "asc")
‎    );
‎
‎    const unsubscribe = onSnapshot(q, (snapshot) => {
‎      const msgs = snapshot.docs.map((doc) => doc.data());
‎      setMessages(msgs);
‎    });
‎
‎    return () => unsubscribe();
‎  }, [currentUser]);
‎
‎  const sendMessage = async () => {
‎    if (!newMessage.trim()) return;
‎    if (sending || !currentUser) return;
‎
‎    setSending(true);
‎
‎    try {
‎      await addDoc(collection(db, "supportMessages"), {
‎        userId: currentUser.uid,
‎        email: currentUser.email,
‎        content: newMessage.trim(),
‎        createdAt: serverTimestamp(),
‎        reply: "",
‎      });
‎
‎      console.log("✅ Message sent!");
‎      setNewMessage("");
‎    } catch (err) {
‎      console.error("❌ Failed to send message:", err);
‎    } finally {
‎      setSending(false);
‎    }
‎  };
‎
‎  return (
‎    <PageWrapper>
‎      <div className="support-page">
‎        <h2 className="support-title">Support</h2>
‎
‎        <SupportChat messages={messages} />
‎
‎        <div className="message-box">
‎          <textarea
‎            placeholder="Type your message..."
‎            value={newMessage}
‎            onChange={(e) => setNewMessage(e.target.value)}
‎            onKeyDown={(e) => {
‎              if (e.key === "Enter" && !e.shiftKey) {
‎                e.preventDefault();
‎                sendMessage();
‎              }
‎            }}
‎          ></textarea>
‎          <button
‎            className="send-btn"
‎            onClick={sendMessage}
‎            disabled={sending || !newMessage.trim()}
‎          >
‎            {sending ? "Sending..." : "Send"}
‎          </button>
‎        </div>
‎      </div>
‎    </PageWrapper>
‎  );
‎};
‎
‎export default Support;
