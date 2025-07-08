import { doc, getDoc, updateDoc, increment } from "firebase/firestore";
import { db } from "../firebase";

export const handleReferralCommissionUpdate = async (userId) => {
  try {
    let currentRefId = userId;
    const levelCommission = [3, 2, 1]; // ✅ Updated commission

    for (let level = 0; level < levelCommission.length; level++) {
      const userDoc = await getDoc(doc(db, "users", currentRefId));
      if (!userDoc.exists()) break;

      const referrerId = userDoc.data().referrerId;
      if (!referrerId) break;

      const referrerRef = doc(db, "users", referrerId);
      await updateDoc(referrerRef, {
        teamCount: increment(1),
        [`commission.level${level + 1}`]: increment(levelCommission[level]),
        totalCommission: increment(levelCommission[level]),
      });

      currentRefId = referrerId; // go up the chain
    }

    console.log("Referral commission updated ✅");
  } catch (error) {
    console.error("Error updating referral commission:", error);
  }
};
