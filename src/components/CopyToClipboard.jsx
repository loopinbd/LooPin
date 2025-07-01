import React, { useState } from "react";
import { FaCopy } from "react-icons/fa";
import "../styles/ReferralLink.css"; // Reuse this CSS

const CopyToClipboard = ({ textToCopy }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <div className="copy-container">
      <input
        type="text"
        className="copy-input"
        value={textToCopy}
        readOnly
      />
      <button className="copy-btn" onClick={handleCopy}>
        <FaCopy />
      </button>
      {copied && <span className="copy-msg">Copied!</span>}
    </div>
  );
};

export default CopyToClipboard;
