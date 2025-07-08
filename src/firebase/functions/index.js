const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();

const db = admin.firestore();

// Notification on new activation request
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
      createdAt: admin.firestore.FieldValue.serverTimestamp()
    };

    try {
      await db.collection("notifications").add(message);
      console.log("Notification sent for activation request");
    } catch (err) {
      console.error("Failed to send notification:", err);
    }
  });

// Commission rates per level
const commissionRates = {
  1: 3,
  2: 2,
  3: 1
};

// Add commission to a user's totalCommission field transactionally
async function addCommissionToUser(userId, amount) {
  const userRef = db.collection("users").doc(userId);
  await db.runTransaction(async (tx) => {
    const userDoc = await tx.get(userRef);
    if (!userDoc.exists) return;
    const prevCommission = userDoc.data().totalCommission || 0;
    tx.update(userRef, { totalCommission: prevCommission + amount });
  });
}

// Trigger on user document update to check activation status change
exports.onUserActivated = functions.firestore
  .document("users/{userId}")
  .onUpdate(async (change, context) => {
    const before = change.before.data();
    const after = change.after.data();
    const userId = context.params.userId;

    // Run only if isActive changed from false (or undefined) to true
    if (before.isActive !== true && after.isActive === true) {
      let currentUserId = userId;

      for (let level = 1; level <= 3; level++) {
        const currentUserDoc = await db.collection("users").doc(currentUserId).get();
        if (!currentUserDoc.exists) break;

        const refererId = currentUserDoc.data().referer;
        if (!refererId) break;

        await addCommissionToUser(refererId, commissionRates[level]);

        currentUserId = refererId;
      }
    }

    return null;
  });
