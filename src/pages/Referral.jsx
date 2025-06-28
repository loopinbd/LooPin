import React, { useState, useEffect } from "react";
import PageWrapper from "../components/PageWrapper";
import ReferralLink from "../components/ReferralLink";
import TeamCommission from "../components/TeamCommission";
import "../styles/referral.css";

const Referral = () => {
  const [isActive, setIsActive] = useState(false); // pretend from user data

  // Simulate activation check
  useEffect(() => {
    // Later replace with actual activation state from Firebase
    const userActive = true; // change to false to test inactive view
    setIsActive(userActive);
  }, []);

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
            <p>Active your account to get referral link and earn commission.</p>
          </div>
        )}
      </div>
    </PageWrapper>
  );
};

export default Referral;
