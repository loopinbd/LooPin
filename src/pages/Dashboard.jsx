import React from "react";
import PageWrapper from "../components/PageWrapper";
import BalanceCard from "../components/BalanceCard";
import TeamCommission from "../components/TeamCommission";
import ReferralLink from "../components/ReferralLink";
import "../styles/dashboard.css";

const Dashboard = () => {
  return (
    <PageWrapper>
      <div className="dashboard-container">
        <section className="balance-section">
          <BalanceCard />
        </section>

        <section className="team-commission-section">
          <TeamCommission />
        </section>

        <section className="referral-section">
          <ReferralLink />
        </section>
      </div>

      <footer className="dashboard-footer">
        <p>All Rights Reserved © 2025</p>
        <p className="watermark">Powered by Blockchain</p>
      </footer>
    </PageWrapper>
  );
};

export default Dashboard;
