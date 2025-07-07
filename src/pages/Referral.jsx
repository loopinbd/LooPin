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
  const [debugText, setDebugText] = useState("⏳ Initializing...");

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
          setDebugText("❌ Firestore user document not found");
          setIsActive(false);
          return;
        }

        const userData = userDoc.data();
        const activeStatus = userData?.isActive === true;
        setDebugText(
          `✅ Firestore user found\nisActive: ${userData?.isActive} (${typeof userData?.isActive})\nactivationStatus: ${userData?.activationStatus}`
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
        console.error("🔥 Error fetching Firestore data:", error);
        setDebugText("🔥 Firestore error: " + error.message);
        setIsActive(false);
      }
    };

    fetchData();
  }, [currentUser]);

  if (isActive === null) {
    return (
      <PageWrapper>
        <div className="referral-page" style={{ color: "#fff", padding: "40px" }}>
          <h2>Loading...</h2>
          <pre style={{ color: "#ccc", background: "#111", padding: "15px", fontSize: "14px", marginTop: "20px" }}>
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
        )}
      </div>
    </PageWrapper>
  );
};

export default Referral;
