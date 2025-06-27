import React, { useState } from "react";
import "../styles/ReferralLink.css";

const ReferralLink = ({ userId, isActive }) => {
  const [copied, setCopied] = useState(false);

  const baseUrl = "https://loopin.com/register"; // Replace with actual domain
  const referralLink = `${baseUrl}?ref=${userId}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(referralLink).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  if (!isActive) {
    return (
      <div className="referral-locked">
        <p>Your account is not activated.</p>
        <p>Activate to get your referral link.</p>
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
