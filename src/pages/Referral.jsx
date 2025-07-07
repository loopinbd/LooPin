import React, { useState, useEffect, useContext } from "react";
import PageWrapper from "../components/PageWrapper";
import ReferralLink from "../components/ReferralLink";
import TeamCommission from "../components/TeamCommission";
import { AuthContext } from "../context/AuthContext";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import "../styles/referral.css";

const Referral = () => {
  const { currentUser } = useContext(AuthContext);
  const [isActive, setIsActive] = useState(null);
  const [commissionData, setCommissionData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      // Wait until currentUser is loaded
      if (!currentUser || !currentUser.uid) return;

      try {
        const userRef = doc(db, "users", currentUser.uid);
        const userDoc = await getDoc(userRef);

        if (userDoc.exists()) {
          const userData = userDoc.data();
          const activeStatus = userData?.isActive === true;
          setIsActive(activeStatus);

          const teamData = userData?.teamLevels || {};
          const levels = Object.entries(teamData).map(([level, data]) => ({
            level: parseInt(level),
            earned: data.earned || 0,
            teamCount: data.teamCount || 0,
          }));
          setCommissionData(levels);
        } else {
          setIsActive(false);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        setIsActive(false);
      }
    };

    fetchData();
  }, [currentUser]);

  if (currentUser === null || isActive === null) {
    return (
      <PageWrapper>
        <div className="referral-page" style={{ color: "#fff", textAlign: "center", padding: "40px" }}>
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
            <ReferralLink userId={currentUser.uid} isActive={isActive} />
            <h3 style={{ marginTop: "30px", marginBottom: "10px" }}>Your Team Commission</h3>
            <TeamCommission levels={commissionData} />
          </>
        ) : (
          <div>
            <h2>Referral System Locked</h2>
            <p>Activate your account to get your referral link and team commission data.</p>
          </div>
        )}
      </div>
    </PageWrapper>
  );
};

export default Referral;
