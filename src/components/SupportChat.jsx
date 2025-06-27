import React, { useState } from "react";
import "../styles/SupportChat.css";

const SupportChat = ({ messages = [], onSend }) => {
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (input.trim() !== "") {
      onSend(input.trim());
      setInput("");
    }
  };

  return (
    <div className="chat-container">
      <h3 className="chat-title">Support Chat</h3>

      <div className="chat-box">
        {messages.length === 0 && (
          <div className="empty-msg">No messages yet. Start a conversation!</div>
        )}

        {messages.map((msg, index) => (
          <div
            key={index}
            className={`chat-message ${msg.sender === "admin" ? "admin-msg" : "user-msg"}`}
          >
            <span>{msg.text}</span>
          </div>
        ))}
      </div>

      <div className="chat-input-area">
        <input
          type="text"
          placeholder="Type your message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
};

export default SupportChat;
