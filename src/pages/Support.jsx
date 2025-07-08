import React, { useEffect, useState, useContext } from "react";
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
import { AuthContext } from "../context/AuthContext";

const Support = () => {
  const { currentUser } = useContext(AuthContext);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [sending, setSending] = useState(false);

  useEffect(() => {
    if (!currentUser) return;

    const q = query(
      collection(db, "supportMessages"),
      where("userId", "==", currentUser.uid),
      orderBy("createdAt", "asc")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const msgs = snapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          content: data.content || "",
          reply: data.reply || "",
        };
      });

      console.log("📥 Fetched support messages:", msgs);
      setMessages(msgs);
    });

    return () => unsubscribe();
  }, [currentUser]);

  const sendMessage = async () => {
    if (!newMessage.trim()) return;
    if (sending || !currentUser) return;

    setSending(true);

    try {
      await addDoc(collection(db, "support
