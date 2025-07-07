import React, { useState } from "react";
import "../styles/ReferralLink.css";
import copyToClipboard from "../utils/copyToClipboard";

const ReferralLink = ({ userId = "", isActive = false }) => {
  const [copied, setCopied] = useState(false);

  // Use current origin dynamically + /register path
  const baseUrl = `${window.location.origin}/register`;
  const referralLink = `${baseUrl}?ref=${userId}`;

  const handleCopy = async () => {
    const success = await copyToClipboard(referralLink);
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (!isActive) {
    return (
      <div className="referral-locked">
        <p>Your account is not activated.</p>
        <p className="referral-note">Activate to unlock your referral link.</p>
      </div>
    );
  }

  return (
    <div className="referral-link-container">
      <h3 className="referral-title">Your Referral Link</h3>
      <div className="referral-box">
        <input type="text" value={referralLink} readOnly />
        <button onClick={handleCopy} className="copy-btn">
          {copied ? "Copied!" : "Copy"}
        </button>
      </div>
    </div>
  );
};

export default ReferralLink;
