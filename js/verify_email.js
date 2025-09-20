// js/verify_email.js

import { auth } from './firebase_init.js';
import { onAuthStateChanged, sendEmailVerification } from "https://www.gstatic.com/firebasejs/8.10.0/firebase-auth.js";

document.addEventListener('DOMContentLoaded', () => {
    const messageDiv = document.getElementById('message');
    const resendEmailLink = document.getElementById('resendEmail');

    // মেসেজ দেখানোর ফাংশন
    function showMessage(msg, type) {
        messageDiv.textContent = msg;
        messageDiv.className = `message ${type}`;
        messageDiv.style.display = 'block';
    }

    // ইউজার অথেন্টিকেশন স্টেট পরিবর্তন পর্যবেক্ষণ করা
    onAuthStateChanged(auth, async (user) => {
        if (user) {
            // ইউজার লগইন করা আছে
            if (user.emailVerified) {
                // ইমেল ভেরিফাই করা হয়ে গেছে, লগইন পেজে রিডাইরেক্ট
                showMessage("Email verified successfully! Redirecting to login page...", 'success');
                setTimeout(() => {
                    window.location.href = 'login.html';
                }, 3000); // 3 সেকেন্ড পর রিডাইরেক্ট
            } else {
                // ইমেল এখনো ভেরিফাই হয়নি, মেসেজ দেখাও
                showMessage("Your email is not yet verified. Please check your inbox.", 'info');
                // প্রতি 5 সেকেন্ড পর ইমেল ভেরিফিকেশন স্ট্যাটাস চেক করা
                const checkInterval = setInterval(async () => {
                    await user.reload(); // ইউজারের সর্বশেষ তথ্য লোড করা
                    if (user.emailVerified) {
                        clearInterval(checkInterval); // ইন্টারভাল বন্ধ করা
                        showMessage("Email verified successfully! Redirecting to login page...", 'success');
                        setTimeout(() => {
                            window.location.href = 'login.html';
                        }, 3000);
                    }
                }, 5000); // প্রতি 5 সেকেন্ডে চেক করবে
            }
        } else {
            // কোন ইউজার লগইন করা নেই, লগইন পেজে পাঠানো
            showMessage("No user logged in. Redirecting to login page...", 'error');
            setTimeout(() => {
                window.location.href = 'login.html';
            }, 3000);
        }
    });

    // রেসেন্ট ইমেল লিংকে ক্লিক করলে
    resendEmailLink.addEventListener('click', async (e) => {
        e.preventDefault();
        const user = auth.currentUser;
        if (user) {
            try {
                await sendEmailVerification(user);
                showMessage("Verification email sent again. Please check your inbox.", 'success');
            } catch (error) {
                console.error("Error resending email:", error);
                showMessage(`Error sending email: ${error.message}`, 'error');
            }
        } else {
            showMessage("No user found. Please register or login first.", 'error');
            setTimeout(() => {
                window.location.href = 'login.html';
            }, 3000);
        }
    });
});
