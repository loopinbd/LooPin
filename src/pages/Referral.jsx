import React, { useState, useEffect } from "react";
import PageWrapper from "../components/PageWrapper";
// import ReferralLink from "../components/ReferralLink";
// import TeamCommission from "../components/TeamCommission";
import "../styles/referral.css";

const Referral = () => {
  const [isActive, setIsActive] = useState(null);

  useEffect(() => {
    const userActive = true;
    setIsActive(userActive);
  }, []);

  if (isActive === null) {
    return (
      <PageWrapper>
        <div style={{ padding: "50px", color: "#fff", textAlign: "center" }}>
          <h2>Loading...</h2>
        </div>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper>
      <div className="referral-page" style={{ color: "#fff", padding: "40px" }}>
        {isActive ? (
          <>
            <h2>Your Referral Link</h2>
            <p>Link: https://loopin.vercel.app/?ref=yourcode</p>

            <h3>Team Commission</h3>
            <p>Level 1: $10<br />Level 2: $5</p>
          </>
        ) : (
          <div>
            <h2>Referral System Locked</h2>
            <p>Activate your account to get referral link.</p>
          </div>
        )}
      </div>
    </PageWrapper>
  );
};

export default Referral;
