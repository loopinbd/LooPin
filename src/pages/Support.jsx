import React, { useState } from "react";
import PageWrapper from "../components/PageWrapper";
import SupportChat from "../components/SupportChat";
import "../styles/support.css";

const Support = () => {
  const [messages, setMessages] = useState([
    { from: "user", text: "Hello, I need help with activation." },
    { from: "admin", text: "Sure! Please wait while we verify." },
  ]);
  const [newMessage, setNewMessage] = useState("");

  const sendMessage = () => {
    if (!newMessage.trim()) return;
    setMessages([...messages, { from: "user", text: newMessage }]);
    setNewMessage("");
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
