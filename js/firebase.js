import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, sendEmailVerification, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { getDatabase, ref, set, get, update, onValue } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-analytics.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCxTDZ1tt-JRnrMNeOg-xLkmDUvi0xux1M",
  authDomain: "loopin-1a5d5.firebaseapp.com",
  databaseURL: "https://loopin-1a5d5-default-rtdb.firebaseio.com",
  projectId: "loopin-1a5d5",
  storageBucket: "loopin-1a5d5.firebasestorage.app",
  messagingSenderId: "214343287930",
  appId: "1:214343287930:web:2db4b1f532939a870067c3",
  measurementId: "G-Z850NQP1J0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);
const analytics = getAnalytics(app);

// Exporting the services for use in other files
export { 
    auth, 
    database, 
    createUserWithEmailAndPassword, 
    sendEmailVerification, 
    signInWithEmailAndPassword, 
    onAuthStateChanged, 
    signOut,
    ref, 
    set, 
    get,
    update,
    onValue
};
