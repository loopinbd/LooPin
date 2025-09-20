// js/login.js

import { auth } from './firebase_init.js';
import { signInWithEmailAndPassword, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/8.10.0/firebase-auth.js";
// Firestore থেকে ডেটা পড়ার জন্য
import { doc, getDoc } from "https://www.gstatic.com/firebasejs/8.10.0/firebase-firestore.js";
import { db } from './firebase_init.js'; // Firestore db অবজেক্ট ইম্পোর্ট


document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const loginButton = document.getElementById('loginButton');
    const messageDiv = document.getElementById('message');

    // মেসেজ দেখানোর ফাংশন
    function showMessage(msg, type) {
        messageDiv.textContent = msg;
        messageDiv.className = `message ${type}`;
        messageDiv.style.display = 'block';
    }

    // অথেন্টিকেশন স্টেট পরিবর্তন পর্যবেক্ষণ করা
    // এই পেজ লোড হওয়ার সময় বা ইউজার লগইন করার পর অটোমেটিকভাবে নেভিগেট করার জন্য
    onAuthStateChanged(auth, async (user) => {
        if (user) {
            // ইউজার লগইন করা আছে, ড্যাশবোর্ডে রিডাইরেক্ট করুন
            // এখানে অতিরিক্ত ভেরিফিকেশন চেক করতে পারি, যেমন ইমেল ভেরিফাই হয়েছে কিনা
            if (!user.emailVerified) {
                showMessage("Your email is not verified. Please check your email to verify your account.", 'error');
                // ভেরিফিকেশন পেজে পাঠিয়ে দিতে পারো
                setTimeout(() => {
                    window.location.href = 'verify_email.html';
                }, 3000);
                return;
            }

            // অ্যাডমিন লগইন চেক
            if (user.email === 'loopinbd@gmail.com') {
                showMessage("Admin login successful! Redirecting to admin dashboard...", 'success');
                setTimeout(() => {
                    window.location.href = 'admin_dashboard.html'; // অ্যাডমিন ড্যাশবোর্ড
                }, 2000);
            } else {
                showMessage("Login successful! Redirecting to dashboard...", 'success');
                setTimeout(() => {
                    window.location.href = 'dashboard.html'; // ইউজার ড্যাশবোর্ড
                }, 2000);
            }
        }
        // যদি ইউজার লগইন করা না থাকে, তাহলে ফর্মটি দেখাবে এবং কিছু করবে না।
    });


    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        // বাটন ডিসেবল
        loginButton.disabled = true;
        loginButton.style.backgroundColor = 'var(--button-bg-disabled)';
        loginButton.textContent = 'Logging in...';
        showMessage("Attempting to log in...", 'info');

        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            if (!user.emailVerified) {
                // ইমেল ভেরিফাই না হলে
                showMessage("Please verify your email address before logging in. Redirecting to verification page...", 'error');
                // লগইন করা ইউজারকে Firebase থেকে সাইন আউট করা
                await auth.signOut();
                setTimeout(() => {
                    window.location.href = 'verify_email.html';
                }, 3000);
                return;
            }

            // ইমেল ভেরিফাই হয়ে গেলে
            if (user.email === 'loopinbd@gmail.com') {
                showMessage("Admin login successful! Redirecting to admin dashboard...", 'success');
                setTimeout(() => {
                    window.location.href = 'admin_dashboard.html';
                }, 2000);
            } else {
                showMessage("Login successful! Redirecting to dashboard...", 'success');
                setTimeout(() => {
                    window.location.href = 'dashboard.html';
                }, 2000);
            }

        } catch (error) {
            let errorMessage = "An unknown error occurred.";
            if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
                errorMessage = "Invalid email or password.";
            } else if (error.code === 'auth/invalid-email') {
                errorMessage = "Invalid email address.";
            } else {
                errorMessage = `Error: ${error.message}`;
            }
            showMessage(errorMessage, 'error');
        } finally {
            // বাটন আবার এনেবল করুন
            setTimeout(() => {
                loginButton.disabled = false;
                loginButton.style.backgroundColor = 'var(--button-bg-normal)';
                loginButton.textContent = 'Login';
            }, 3000);
        }
    });
});
