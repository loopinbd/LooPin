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
  const [debugText, setDebugText] = useState("Starting debug...");

  useEffect(() => {
    const fetchData = async () => {
      if (!currentUser) {
        setDebugText("❌ currentUser is null");
        return;
      }

      setDebugText(`✅ currentUser.uid = ${currentUser.uid}`);

      try {
        const userRef = doc(db, "users", currentUser.uid);
        const userDoc = await getDoc(userRef);

        if (!userDoc.exists()) {
          setDebugText("❌ User document not found in Firestore");
          setIsActive(false);
          return;
        }

        const userData = userDoc.data();
        const activeStatus = userData?.isActive === true;

        setDebugText(
          `✅ Firestore user data loaded\nisActive: ${userData?.isActive}\nactivationStatus: ${userData?.activationStatus}\nType: ${typeof userData?.isActive}`
        );

        setIsActive(activeStatus);

        const teamData = userData?.teamLevels || {};
        const levels = Object.entries(teamData).map(([level, data]) => ({
          level: parseInt(level),
          earned: data.earned || 0,
          teamCount: data.teamCount || 0,
        }));
        setCommissionData(levels);
      } catch (error) {
        console.error("🔥 Error fetching user data:", error);
        setDebugText("🔥 Error: " + error.message);
        setIsActive(false);
      }
    };

    fetchData();
  }, [currentUser]);

  if (isActive === null) {
    return (
      <PageWrapper>
        <div className="referral-page" style={{ color: "#fff", textAlign: "center", padding: "40px" }}>
          <h2>Loading...</h2>
          <pre style={{ marginTop: "20px", color: "#aaa", fontSize: "14px", background: "#111", padding: "10px" }}>
            {debugText}
          </pre>
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
