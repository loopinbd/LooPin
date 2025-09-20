import { auth, signInWithEmailAndPassword } from './firebase.js';

document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const loginButton = document.getElementById('loginButton');

    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        loginButton.disabled = true;
        loginButton.style.backgroundColor = '#555';

        try {
            // Sign in user with email and password
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            // Check for admin login
            if (email === 'loopinbd@gmail.com') {
                alert("Admin login successful!");
                window.location.href = 'admin.html'; // Redirect to admin panel
            } else {
                // Check if email is verified
                if (user.emailVerified) {
                    alert("Login successful!");
                    window.location.href = 'dashboard.html'; // Redirect to dashboard
                } else {
                    // If email is not verified, show a message and re-enable button
                    alert("Your email is not verified. Please check your email for the verification link.");
                    loginButton.disabled = false;
                    loginButton.style.backgroundColor = '#FFD700';
                }
            }

        } catch (error) {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.error("Login Error:", errorCode, errorMessage);
            
            if (errorCode === 'auth/wrong-password' || errorCode === 'auth/user-not-found') {
                alert("Invalid email or password. Please try again.");
            } else if (errorCode === 'auth/invalid-email') {
                alert("The email address is not valid.");
            } else {
                alert(`Login failed: ${errorMessage}`);
            }

            loginButton.disabled = false;
            loginButton.style.backgroundColor = '#FFD700';
        }
    });
});
