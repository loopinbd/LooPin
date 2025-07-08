
‎
‎import React, { useEffect, useRef } from "react";
‎import "../styles/SupportChat.css";
‎
‎const SupportChat = ({ messages = [] }) => {
‎  const chatEndRef = useRef(null);
‎
‎  useEffect(() => {
‎    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
‎  }, [messages]);
‎
‎  return (
‎    <div className="chat-container">
‎      <h3 className="chat-title">Support Chat</h3>
‎
‎      <div className="chat-box">
‎        {messages.length === 0 ? (
‎          <div className="empty-msg">No messages yet. Start a conversation!</div>
‎        ) : (
‎          messages.map((msg, index) => (
‎            <div className="message-pair" key={index}>
‎              <div className="chat-message user-msg">
‎                <span>{msg.content}</span>
‎              </div>
‎              {msg.reply && (
‎                <div className="chat-message admin-msg">
‎                  <span>{msg.reply}</span>
‎                </div>
‎              )}
‎            </div>
‎          ))
‎        )}
‎        <div ref={chatEndRef} />
‎      </div>
‎    </div>
‎  );
‎};
‎
‎export default SupportChat;
