import React, { useState, useEffect } from "react";
import PageWrapper from "../components/PageWrapper";
import ReferralLink from "../components/ReferralLink";
import TeamCommission from "../components/TeamCommission";
import "../styles/referral.css";

const Referral = () => {
  const [isActive, setIsActive] = useState(null); // null = loading

  // Simulate activation check (replace with Firebase logic later)
  useEffect(() => {
    const userActive = true; // change to false to test
    setIsActive(userActive);
  }, []);

  // ✅ Safe rendering: show loading while checking user
  if (isActive === null) {
    return (
      <PageWrapper>
        <div className="referral-page" style={{ color: "#fff", textAlign: "center", padding: "50px" }}>
          <h2>Checking account status...</h2>
        </div>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper>
      <div className="referral-page">
        {isActive ? (
          <>
            <h2 className="referral-heading">Your Referral Link</h2>
            <ReferralLink />

            <section className="team-section">
              <h3>Level Wise Team & Commission</h3>
              <TeamCommission />
            </section>
          </>
        ) : (
          <div className="inactive-box">
            <h2>Referral System Locked</h2>
            <p>Activate your account to get referral link and earn commission.</p>
          </div>
        )}
      </div>
    </PageWrapper>
  );
};

export default Referral;
