import React, { useEffect, useState } from "react";
import { auth, db } from "../firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

export default function Referral() {
  const [referralId, setReferralId] = useState("");
  const [level1, setLevel1] = useState(0);
  const [level2, setLevel2] = useState(0);
  const [level3, setLevel3] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {
    const user = auth.currentUser;

    if (!user) {
      navigate("/login");
      return;
    }

    const fetchReferralData = async () => {
      try {
        const userRef = doc(db, "users", user.uid);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
          const data = userSnap.data();

          setReferralId(data.referralId || "");
          setLevel1(data.team1 || 0);
          setLevel2(data.team2 || 0);
          setLevel3(data.team3 || 0);
        }
      } catch (error) {
        console.error("Error loading referral data:", error);
      }
    };

    fetchReferralData();
  }, [navigate]);

  const copyText = () => {
    navigator.clipboard.writeText(referralId);
    alert("Referral ID copied!");
  };

  return (
    <div className="referral-container">
      <h2 className="page-title">Referral System</h2>

      <div className="referral-box">
        <p><strong>Your Referral ID:</strong></p>
        <div className="referral-code-box">
          <span>{referralId}</span>
          <button className="copy-btn" onClick={copyText}>
            Copy
          </button>
        </div>
      </div>

      <div className="levels-container">
        <h3>Your Team</h3>

        <div className="level-card">
          <p><strong>Level 1 Team:</strong> {level1}</p>
        </div>

        <div className="level-card">
          <p><strong>Level 2 Team:</strong> {level2}</p>
        </div>

        <div className="level-card">
          <p><strong>Level 3 Team:</strong> {level3}</p>
        </div>
      </div>
    </div>
  );
    }
