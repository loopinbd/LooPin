import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";

/**
 * Sends a notification to a specific user.
 * 
 * @param {string} userId - The user's UID
 * @param {string} title - Notification title (e.g., "Support Reply")
 * @param {string} message - The content/message
 */
const sendNotification = async (userId, title, message) => {
  try {
    await addDoc(collection(db, "notifications"), {
      userId,
      title,
      message,
      seen: false,
      createdAt: serverTimestamp(),
    });
    console.log("Notification sent to:", userId);
  } catch (err) {
    console.error("Failed to send notification:", err);
  }
};

export default sendNotification;
