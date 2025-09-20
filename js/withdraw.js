import { auth, database, ref, get, set, onAuthStateChanged, update } from './firebase.js';

// Slidebar Toggle Function
window.toggleSlidebar = function() {
    const slidebar = document.querySelector('.slidebar');
    slidebar.classList.toggle('open');
}

document.addEventListener('DOMContentLoaded', () => {
    const withdrawForm = document.getElementById('withdrawForm');
    const balanceElement = document.getElementById('account-balance');

    // Check user login state and fetch balance
    onAuthStateChanged(auth, async (user) => {
        if (!user) {
            window.location.href = 'login.html';
            return;
        }

        const userRef = ref(database, 'users/' + user.uid);
        const snapshot = await get(userRef);
        if (snapshot.exists()) {
            const userData = snapshot.val();
            balanceElement.textContent = `$${userData.balance.toFixed(2)}`;
            document.querySelector('.user-name').textContent = `Welcome, ${userData.name}!`;
        } else {
            console.error("User data not found.");
            alert("User data not found. Please contact support.");
            window.location.href = 'dashboard.html';
        }
    });

    // Handle form submission
    withdrawForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const user = auth.currentUser;
        if (!user) {
            alert("You must be logged in to make a withdrawal request.");
            return;
        }

        const amount = parseFloat(document.getElementById('amount').value);
        const method = document.getElementById('method').value;
        const account = document.getElementById('account').value;
        const submitButton = document.getElementById('submitWithdrawal');

        submitButton.disabled = true;
        submitButton.textContent = "Processing...";

        // Fetch current user balance
        const userRef = ref(database, 'users/' + user.uid);
        const snapshot = await get(userRef);
        const currentBalance = snapshot.val().balance;

        if (amount < 5) {
            alert("The minimum withdrawal amount is $5.");
            submitButton.disabled = false;
            submitButton.textContent = "Submit Request";
            return;
        }
        
        if (amount > currentBalance) {
            alert("Insufficient balance for this withdrawal amount.");
            submitButton.disabled = false;
            submitButton.textContent = "Submit Request";
            return;
        }

        try {
            // Check for existing pending requests
            const existingRequestsRef = ref(database, 'withdrawal_requests');
            const requestsSnapshot = await get(existingRequestsRef);
            let hasPendingRequest = false;
            if (requestsSnapshot.exists()) {
                requestsSnapshot.forEach(childSnapshot => {
                    const request = childSnapshot.val();
                    if (request.userId === user.uid && request.status === 'pending') {
                        hasPendingRequest = true;
                    }
                });
            }

            if (hasPendingRequest) {
                alert("You already have a pending withdrawal request. Please wait for it to be processed.");
                submitButton.disabled = false;
                submitButton.textContent = "Submit Request";
                return;
            }

            // Create a new withdrawal request
            const withdrawalId = Date.now().toString(); // Use a timestamp as a unique ID
            await set(ref(database, 'withdrawal_requests/' + withdrawalId), {
                userId: user.uid,
                email: user.email,
                amount: amount,
                method: method,
                account: account,
                status: 'pending',
                timestamp: Date.now()
            });

            // Deduct the amount from the user's balance
            const newBalance = currentBalance - amount;
            await update(userRef, { balance: newBalance });

            alert("Withdrawal request submitted successfully! Your request is pending admin approval.");
            window.location.href = 'dashboard.html';

        } catch (error) {
            console.error("Withdrawal failed:", error);
            alert(`Withdrawal request failed: ${error.message}`);
            submitButton.disabled = false;
            submitButton.textContent = "Submit Request";
        }
    });
});
