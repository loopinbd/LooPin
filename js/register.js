// js/register.js

import { auth, db } from './firebase_init.js'; // firebase_init.js থেকে auth এবং db ইম্পোর্ট

// Firebase Auth ফাংশনগুলো
import { createUserWithEmailAndPassword, sendEmailVerification } from "https://www.gstatic.com/firebasejs/8.10.0/firebase-auth.js";
// Firebase Firestore ফাংশনগুলো
import { doc, setDoc } from "https://www.gstatic.com/firebasejs/8.10.0/firebase-firestore.js";


document.addEventListener('DOMContentLoaded', () => {
    const registrationForm = document.getElementById('registrationForm');
    const registerButton = document.getElementById('registerButton');
    const messageDiv = document.getElementById('message');
    const termsCheckbox = document.getElementById('termsCheckbox');

    // URL থেকে রেফার কোড অটো-ফিল করা
    const urlParams = new URLSearchParams(window.location.search);
    const referrerCode = urlParams.get('ref');
    if (referrerCode) {
        document.getElementById('referCode').value = referrerCode;
    }

    registrationForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirmPassword').value;
        const referCode = document.getElementById('referCode').value;

        // ইনপুট ভ্যালিডেশন
        if (password.length < 6) {
            showMessage("Password should be at least 6 characters.", 'error');
            return;
        }
        if (password !== confirmPassword) {
            showMessage("Passwords do not match.", 'error');
            return;
        }
        if (!termsCheckbox.checked) {
            showMessage("You must agree to the Terms & Conditions.", 'error');
            return;
        }

        // বাটন ডিসেবল ও রঙ পরিবর্তন
        registerButton.disabled = true;
        registerButton.style.backgroundColor = 'var(--button-bg-disabled)';
        registerButton.textContent = 'Registering...';
        showMessage("Processing registration...", 'info'); // 'info' ক্লাস CSS এ যোগ করতে পারো

        try {
            // Firebase Auth দিয়ে ইউজার তৈরি
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            // ইমেল ভেরিফিকেশন পাঠান
            await sendEmailVerification(user);

            // Firestore এ ইউজার ডেটা সেভ করুন
            await setDoc(doc(db, "users", user.uid), {
                name: name,
                email: email,
                phone: phone,
                referralCode: referCode, // রেফার কোড যে ইউজার রেফার করেছে, তার আইডি হবে
                myReferralCode: user.uid.substring(0, 8), // এই ইউজারের নিজস্ব রেফার কোড
                balance: 0,
                isActive: false, // অ্যাকাউন্ট অ্যাক্টিভেশন স্ট্যাটাস
                activationStatus: "pending", // "pending", "approved", "rejected"
                createdAt: new Date()
            });

            // রেজিস্ট্রেশন সফল হলে
            showMessage("Registration successful! Please check your email for verification. Redirecting to verification page...", 'success');
            setTimeout(() => {
                window.location.href = 'verify_email.html'; // ভেরিফিকেশন পেজে রিডাইরেক্ট
            }, 3000); // 3 সেকেন্ড পর রিডাইরেক্ট

        } catch (error) {
            // ত্রুটি হ্যান্ডেল করুন
            let errorMessage = "An unknown error occurred.";
            if (error.code === 'auth/email-already-in-use') {
                errorMessage = "This email is already registered. Please login.";
            } else if (error.code === 'auth/invalid-email') {
                errorMessage = "Invalid email address.";
            } else if (error.code === 'auth/weak-password') {
                errorMessage = "Password is too weak. Choose a stronger one.";
            } else {
                errorMessage = `Error: ${error.message}`;
            }
            showMessage(errorMessage, 'error');
        } finally {
            // বাটন আবার এনেবল করুন
            setTimeout(() => {
                registerButton.disabled = false;
                registerButton.style.backgroundColor = 'var(--button-bg-normal)';
                registerButton.textContent = 'Register';
            }, 3000); // 3 সেকেন্ড পর বাটন এনেবল হবে, যাতে ইউজার মেসেজটি দেখতে পায়
        }
    });

    function showMessage(msg, type) {
        messageDiv.textContent = msg;
        messageDiv.className = `message ${type}`; // 'message error' বা 'message success'
        messageDiv.style.display = 'block';

        // 5 সেকেন্ড পর মেসেজ হাইড করে দিতে পারো
        // setTimeout(() => {
        //     messageDiv.style.display = 'none';
        // }, 5000);
    }
});
