const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();

const db = admin.firestore();

exports.onNewActivationRequest = functions.firestore
  .document("activationRequests/{requestId}")
  .onCreate(async (snap, context) => {
    const requestData = snap.data();
    const { userId, email } = requestData;

    const message = {
      title: "Activation Submitted",
      message: `Dear ${email}, your activation request is received.`,
      userId,
      seen: false,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    };

    try {
      await db.collection("notifications").add(message);
      console.log("Notification sent for activation request");
    } catch (err) {
      console.error("Failed to send notification:", err);
    }
  });
