// src/firebaseConfig.js

// Import Firebase functions
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Firebase configuration (Replace with your own project info if needed)
const firebaseConfig = {
  apiKey: "AIzaSyDt9xNeLtNpkmkYozzJ6TnaY7iBGSX3Dgk",
  authDomain: "loopin-53d69.firebaseapp.com",
  projectId: "loopin-53d69",
  storageBucket: "loopin-53d69.appspot.com",
  messagingSenderId: "498363600491",
  appId: "1:498363600491:web:8f772699a297f5a233ab2e",
  measurementId: "G-C48TTX5J6J"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Firebase services exports
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);

export { app, analytics, auth, db };
