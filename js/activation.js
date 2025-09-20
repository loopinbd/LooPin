import { auth, database, ref, get, set, onAuthStateChanged } from './firebase.js';

// Slidebar Toggle Function
window.toggleSlidebar = function() {
    const slidebar = document.querySelector('.slidebar');
    slidebar.classList.toggle('open');
}

// Global variable to store admin-set data
let adminData = {};

// Copy to Clipboard function
window.copyToClipboard = function(elementId) {
    const element = document.getElementById(elementId);
    const textToCopy = element.textContent;
    navigator.clipboard.writeText(textToCopy).then(() => {
        alert("Copied to clipboard: " + textToCopy);
    }).catch(err => {
        console.error('Failed to copy text: ', err);
    });
}

// Show/Hide payment forms
function showPaymentForm(formId) {
    document.querySelectorAll('.payment-form').forEach(form => form.classList.add('hidden'));
    document.getElementById(formId).classList.remove('hidden');
}

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    // Check user login state
    onAuthStateChanged(auth, async (user) => {
        if (!user) {
            window.location.href = 'login.html';
            return;
        }

        const adminRef = ref(database, 'admin_settings');
        const adminSnapshot = await get(adminRef);
        if (adminSnapshot.exists()) {
            adminData = adminSnapshot.val();
            // Assuming the dollar rate is fetched successfully
            const bdtAmount = 12 * adminData.dollarRate;
            document.getElementById('bdt-amount').textContent = bdtAmount.toFixed(2);
            document.getElementById('wallet-address-bdt').textContent = adminData.bkashNagadWallet;
            document.getElementById('usdt-address').textContent = adminData.usdtWallet;
        } else {
            console.error("Admin settings not found.");
            alert("Admin settings are not available. Please try again later.");
        }

        // Check if account is already active
        const userRef = ref(database, 'users/' + user.uid);
        const userSnapshot = await get(userRef);
        if (userSnapshot.exists() && userSnapshot.val().is_active) {
            document.getElementById('activation-status').innerHTML = `
                <div class="activation-active">
                    <h2>Your Account is Active!</h2>
                    <p>Total Earning: <span id="total-earning">$${userSnapshot.val().balance.toFixed(2)}</span></p>
                </div>
            `;
            document.getElementById('payment-options').classList.add('hidden');
        } else {
            // Check for pending activation request
            const pendingRef = ref(database, 'activation_requests/' + user.uid);
            const pendingSnapshot = await get(pendingRef);
            if (pendingSnapshot.exists()) {
                document.getElementById('activation-status').innerHTML = `
                    <div class="activation-pending">
                        <h2>Activation Pending</h2>
                        <p>Your activation request is awaiting admin approval.</p>
                        <p>Please wait some time for the process to complete.</p>
                    </div>
                `;
                document.getElementById('payment-options').classList.add('hidden');
                document.getElementById('payNowButton').classList.add('hidden');
            }
        }
    });

    // Pay Now Button
    document.getElementById('payNowButton').addEventListener('click', () => {
        document.getElementById('payment-options').classList.remove('hidden');
    });

    // Bkash/Nagad and USDT card clicks
    document.getElementById('bkash-nagad').addEventListener('click', () => {
        document.querySelectorAll('.method-card').forEach(card => card.classList.remove('selected'));
        document.getElementById('bkash-nagad').classList.add('selected');
        // This will now use the old manual form
        showPaymentForm('payment-form-bkash-nagad');
    });

    document.getElementById('usdt').addEventListener('click', () => {
        document.querySelectorAll('.method-card').forEach(card => card.classList.remove('selected'));
        document.getElementById('usdt').classList.add('selected');
        showPaymentForm('payment-form-usdt');
    });

    // Bkash/Nagad Form Submission
    document.getElementById('bkashNagadForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        const accountNumber = document.getElementById('accountNumber').value;
        const trxnId = document.getElementById('trxnId').value;
        const user = auth.currentUser;

        if (user) {
            await set(ref(database, 'activation_requests/' + user.uid), {
                userId: user.uid,
                method: 'Bkash/Nagad',
                amount: (12 * adminData.dollarRate),
                accountNumber: accountNumber,
                trxnId: trxnId,
                status: 'pending',
                timestamp: Date.now()
            });
            alert("Payment request submitted. Please wait for admin approval.");
            window.location.href = 'dashboard.html';
        }
    });

    // USDT Done Button
    document.getElementById('usdtDoneButton').addEventListener('click', async () => {
        const user = auth.currentUser;
        if (user) {
            await set(ref(database, 'activation_requests/' + user.uid), {
                userId: user.uid,
                method: 'USDT',
                amount: 12,
                status: 'pending',
                timestamp: Date.now()
            });
            alert("Payment request submitted. Please wait for admin approval.");
            window.location.href = 'dashboard.html';
        }
    });
});
