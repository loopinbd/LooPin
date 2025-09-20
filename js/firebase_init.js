// js/firebase_init.js

// Firebase SDKs-এর মডিউলগুলি ইম্পোর্ট করুন
// Firebase App, Analytics, Auth এবং Firestore এর জন্য প্রয়োজন।
import { initializeApp } from "https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/8.10.0/firebase-analytics.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/8.10.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/8.10.0/firebase-firestore.js";

// তোমার Firebase ওয়েব অ্যাপের কনফিগারেশন
const firebaseConfig = {
  apiKey: "AIzaSyDt9xNeLtNpkmkYozzJ6TnaY7iBGSX3Dgk",
  authDomain: "loopin-53d69.firebaseapp.com",
  projectId: "loopin-53d69",
  storageBucket: "loopin-53d69.firebasestorage.app",
  messagingSenderId: "498363600491",
  appId: "1:498363600491:web:a733b58774fde7a133ab2e",
  measurementId: "G-RHQYDPVESD"
};

// Firebase অ্যাপ ইনিশিয়ালাইজ করুন
const app = initializeApp(firebaseConfig);

// Firebase সার্ভিসগুলি ইনিশিয়ালাইজ করুন
const analytics = getAnalytics(app); // Google Analytics
const auth = getAuth(app);           // Firebase Authentication
const db = getFirestore(app);        // Cloud Firestore Database

// এই সার্ভিসগুলি অন্যান্য জাভাস্ক্রিপ্ট ফাইল থেকে ব্যবহার করার জন্য এক্সপোর্ট করুন
export { app, analytics, auth, db };

// দ্রষ্টব্য: তুমি যদি Realtime Database ব্যবহার করতে চাও, তাহলে:
// 1. "https://www.gstatic.com/firebasejs/8.10.0/firebase-database.js" CDN টি HTML-এ যুক্ত করতে হবে।
// 2. import { getDatabase } from "https://www.gstatic.com/firebasejs/8.10.0/firebase-database.js"; যোগ করতে হবে।
// 3. const rtdb = getDatabase(app); যোগ করতে হবে।
// 4. export { app, analytics, auth, db, rtdb }; এ rtdb যোগ করতে হবে।
