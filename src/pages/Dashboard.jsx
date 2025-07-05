import React, { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import { useAuth } from "../context/AuthContext";
import PageWrapper from "../components/PageWrapper";
import BalanceCard from "../components/BalanceCard";
import TeamCommission from "../components/TeamCommission";
import ReferralLink from "../components/ReferralLink";
import "../styles/dashboard.css";

const Dashboard = () => {
  const { user } = useAuth();
  const [balance, setBalance] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [teamLevels, setTeamLevels] = useState([]);

  useEffect(() => {
    const fetchUserData = async () => {
      if (!user) return;

      const userRef = doc(db, "users", user.uid);
      const userSnap = await getDoc(userRef);

      if (userSnap.exists()) {
        const data = userSnap.data();
        setBalance(data.availableBalance || 0);
        setIsActive(data.isActive || false);

        const levels = [];
        if (data.teamLevels) {
          for (const [levelKey, levelData] of Object.entries(data.teamLevels)) {
            levels.push({
              level: levelKey,
              teamCount: levelData.count || 0,
              earned: levelData.earned || 0,
            });
          }
        }

        setTeamLevels(levels);
      }
    };

    fetchUserData();
  }, [user]);

  return (
    <PageWrapper>
      <div className="dashboard-container">
        <section className="balance-section">
          <BalanceCard balance={balance} />
        </section>

        <section className="team-commission-section">
          <h3 className="section-heading">Team Commission</h3>
          <TeamCommission levels={teamLevels} />
        </section>

        <section className="referral-section">
          <ReferralLink userId={user?.uid} isActive={isActive} />
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
