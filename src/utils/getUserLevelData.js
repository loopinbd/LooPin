import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase";

// Recursive function to fetch team tree up to max level
const getUserLevelData = async (referrerId, maxLevel = 10) => {
  const levels = {}; // { level1: [], level2: [], ... }

  const fetchLevel = async (parentIds, level) => {
    if (level > maxLevel || parentIds.length === 0) return;

    const q = query(
      collection(db, "users"),
      where("referredBy", "in", parentIds)
    );

    const snapshot = await getDocs(q);
    const currentLevelUsers = [];
    const nextLevelIds = [];

    snapshot.forEach((doc) => {
      const data = doc.data();
      currentLevelUsers.push({ uid: doc.id, ...data });
      nextLevelIds.push(doc.id);
    });

    levels[`level${level}`] = currentLevelUsers;

    await fetchLevel(nextLevelIds, level + 1);
  };

  await fetchLevel([referrerId], 1);
  return levels; // Example: { level1: [users], level2: [users], ... }
};

export default getUserLevelData;
