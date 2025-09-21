import { auth, database, ref, get, update, onValue, signOut } from './firebase.js';

document.addEventListener('DOMContentLoaded', () => {
    const activationTableBody = document.querySelector('#activation-table tbody');
    const withdrawalTableBody = document.querySelector('#withdrawal-table tbody');
    const logoutButton = document.getElementById('logoutButton');
    const settingsForm = document.getElementById('settingsForm');

    // Check if the admin is logged in
    auth.onAuthStateChanged(user => {
        if (!user || user.email !== 'loopinbd@gmail.com') {
            window.location.href = 'login.html';
        } else {
            document.getElementById('admin-user-info').textContent = `Welcome, ${user.email}!`;
        }
    });

    // Logout function
    logoutButton.addEventListener('click', async () => {
        try {
            await signOut(auth);
            window.location.href = 'login.html';
        } catch (error) {
            console.error("Logout failed:", error);
            alert("Logout failed. Please try again.");
        }
    });

    // Fetch and display dashboard stats
    const usersRef = ref(database, 'users');
    const activationReqRef = ref(database, 'activation_requests');
    const withdrawalReqRef = ref(database, 'withdrawal_requests');

    onValue(usersRef, (snapshot) => {
        const users = snapshot.val();
        document.getElementById('total-users').textContent = users ? Object.keys(users).length : 0;
    });

    onValue(activationReqRef, (snapshot) => {
        const requests = snapshot.val();
        let pendingCount = 0;
        if (requests) {
            Object.values(requests).forEach(req => {
                if (req.status === 'pending') {
                    pendingCount++;
                }
            });
        }
        document.getElementById('pending-activations').textContent = pendingCount;
        renderActivationRequests(requests);
    });

    onValue(withdrawalReqRef, (snapshot) => {
        const requests = snapshot.val();
        let pendingCount = 0;
        if (requests) {
            Object.values(requests).forEach(req => {
                if (req.status === 'pending') {
                    pendingCount++;
                }
            });
        }
        document.getElementById('pending-withdrawals').textContent = pendingCount;
        renderWithdrawalRequests(requests);
    });

    // Render Activation Requests Table
    function renderActivationRequests(requests) {
        activationTableBody.innerHTML = '';
        if (requests) {
            Object.entries(requests).forEach(([key, request]) => {
                if (request.status === 'pending') {
                    const row = document.createElement('tr');
                    row.innerHTML = `
                        <td>${request.email || 'N/A'}</td>
                        <td>$${request.amount}</td>
                        <td>${request.method}</td>
                        <td>${request.trxnId || 'N/A'}</td>
                        <td class="action-buttons">
                            <button class="approve" data-request-id="${key}" data-user-id="${request.userId}">Approve</button>
                            <button class="decline" data-request-id="${key}" data-user-id="${request.userId}">Decline</button>
                        </td>
                    `;
                    activationTableBody.appendChild(row);
                }
            });
        }
    }

    // Handle Activation Approval/Decline
    activationTableBody.addEventListener('click', async (e) => {
        if (e.target.classList.contains('approve')) {
            const requestId = e.target.dataset.requestId;
            const userId = e.target.dataset.userId;

            // Update user status
            await update(ref(database, 'users/' + userId), { is_active: true });
            
            // Update request status
            await update(ref(database, 'activation_requests/' + requestId), { status: 'approved' });
            
            alert("Activation approved!");
        } else if (e.target.classList.contains('decline')) {
            const requestId = e.target.dataset.requestId;
            // Update request status
            await update(ref(database, 'activation_requests/' + requestId), { status: 'declined' });
            alert("Activation declined!");
        }
    });

    // Render Withdrawal Requests Table
    function renderWithdrawalRequests(requests) {
        withdrawalTableBody.innerHTML = '';
        if (requests) {
            Object.entries(requests).forEach(([key, request]) => {
                if (request.status === 'pending') {
                    const row = document.createElement('tr');
                    row.innerHTML = `
                        <td>${request.email || 'N/A'}</td>
                        <td>$${request.amount}</td>
                        <td>${request.method}</td>
                        <td>${request.account}</td>
                        <td class="action-buttons">
                            <button class="approve" data-request-id="${key}" data-user-id="${request.userId}" data-amount="${request.amount}">Approve</button>
                            <button class="decline" data-request-id="${key}" data-user-id="${request.userId}" data-amount="${request.amount}">Decline</button>
                        </td>
                    `;
                    withdrawalTableBody.appendChild(row);
                }
            });
        }
    }

    // Handle Withdrawal Approval/Decline
    withdrawalTableBody.addEventListener('click', async (e) => {
        if (e.target.classList.contains('approve')) {
            const requestId = e.target.dataset.requestId;
            const userId = e.target.dataset.userId;
            const amount = parseFloat(e.target.dataset.amount);

            // Update request status
            await update(ref(database, 'withdrawal_requests/' + requestId), { status: 'approved' });
            
            alert("Withdrawal approved!");
        } else if (e.target.classList.contains('decline')) {
            const requestId = e.target.dataset.requestId;
            const userId = e.target.dataset.userId;
            const amount = parseFloat(e.target.dataset.amount);
            
            // Revert the balance
            const userRef = ref(database, 'users/' + userId);
            const userSnapshot = await get(userRef);
            const currentBalance = userSnapshot.val().balance;
            const newBalance = currentBalance + amount;
            await update(userRef, { balance: newBalance });

            // Update request status
            await update(ref(database, 'withdrawal_requests/' + requestId), { status: 'declined' });
            alert("Withdrawal declined and balance reverted!");
        }
    });

    // Fetch and display current settings
    const settingsRef = ref(database, 'admin_settings');
    onValue(settingsRef, (snapshot) => {
        if (snapshot.exists()) {
            const settings = snapshot.val();
            document.getElementById('dollarRate').value = settings.dollarRate || '';
            document.getElementById('bkashNagadWallet').value = settings.bkashNagadWallet || '';
            document.getElementById('usdtWallet').value = settings.usdtWallet || '';
        }
    });

    // Handle settings form submission
    settingsForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const dollarRate = parseFloat(document.getElementById('dollarRate').value);
        const bkashNagadWallet = document.getElementById('bkashNagadWallet').value;
        const usdtWallet = document.getElementById('usdtWallet').value;
        
        await update(settingsRef, {
            dollarRate: dollarRate,
            bkashNagadWallet: bkashNagadWallet,
            usdtWallet: usdtWallet
        });
        alert("Settings saved successfully!");
    });
});
