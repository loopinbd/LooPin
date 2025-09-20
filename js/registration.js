import { auth, database, createUserWithEmailAndPassword, sendEmailVerification, ref, set } from './firebase.js';

document.addEventListener('DOMContentLoaded', () => {
    const registrationForm = document.getElementById('registrationForm');
    const registerButton = document.getElementById('registerButton');
    const referCodeInput = document.getElementById('referCode');
    const urlParams = new URLSearchParams(window.location.search);

    // Auto-fill referral code if present in the URL
    const referralCode = urlParams.get('ref');
    if (referralCode) {
        referCodeInput.value = referralCode;
    }

    registrationForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirmPassword').value;
        const referCode = referCodeInput.value;

        // Disable button and change color
        registerButton.disabled = true;
        registerButton.style.backgroundColor = '#555';

        if (password !== confirmPassword) {
            alert("Passwords do not match. Please try again.");
            // Enable button
            registerButton.disabled = false;
            registerButton.style.backgroundColor = '#FFD700';
            return;
        }

        try {
            // Create user with email and password
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            
            // Send email verification
            await sendEmailVerification(user);

            // Save user data to Realtime Database
            await set(ref(database, 'users/' + user.uid), {
                name: name,
                email: email,
                phone: phone,
                referCode: referCode,
                balance: 0,
                is_active: false
            });

            alert("Registration successful! A verification link has been sent to your email. Please check your spam folder.");
            window.location.href = 'verification.html'; // Redirect to verification page

        } catch (error) {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.error("Registration Error:", errorCode, errorMessage);
            
            if (errorCode === 'auth/email-already-in-use') {
                alert("This email is already in use. Please use a different email.");
            } else {
                alert(`Registration failed: ${errorMessage}`);
            }

            // Re-enable button
            registerButton.disabled = false;
            registerButton.style.backgroundColor = '#FFD700';
        }
    });
});
