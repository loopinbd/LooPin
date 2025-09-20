import { auth, database, ref, get, onAuthStateChanged } from './firebase.js';

// Slidebar Toggle Function
window.toggleSlidebar = function() {
    const slidebar = document.querySelector('.slidebar');
    slidebar.classList.toggle('open');
}

document.addEventListener('DOMContentLoaded', () => {
    const referralLinkElement = document.getElementById('referral-link');
    const copyButton = document.getElementById('copyLinkButton');
    const totalReferralsElement = document.getElementById('total-referrals');
    const totalCommissionElement = document.getElementById('total-commission');
    const referralTableBody = document.querySelector('#referral-table tbody');

    onAuthStateChanged(auth, async (user) => {
        if (!user) {
            window.location.href = 'login.html';
            return;
        }

        const userRef = ref(database, 'users/' + user.uid);
        const userSnapshot = await get(userRef);
        if (userSnapshot.exists()) {
            const userData = userSnapshot.val();
            document.querySelector('.user-name').textContent = `Welcome, ${userData.name}!`;

            // Generate and display referral link
            const referralCode = user.uid.substring(0, 8); // Use a part of the user's UID as the code
            const referralLink = `${window.location.origin}/registration.html?ref=${referralCode}`;
            referralLinkElement.textContent = referralLink;

            // Fetch and display referral data
            const allUsersRef = ref(database, 'users');
            const allUsersSnapshot = await get(allUsersRef);
            let totalReferrals = 0;
            let totalCommission = 0;
            let referredUsers = [];

            if (allUsersSnapshot.exists()) {
                allUsersSnapshot.forEach(childSnapshot => {
                    const referredUser = childSnapshot.val();
                    if (referredUser.referCode === referralCode) {
                        totalReferrals++;
                        // Placeholder for commission logic
                        // Commission amount will depend on your business rules (e.g., a fixed amount for each activation)
                        const commission = referredUser.is_active ? 2 : 0; // Example: $2 commission for each active user
                        totalCommission += commission;

                        referredUsers.push({
                            name: referredUser.name,
                            status: referredUser.is_active ? 'Active' : 'Inactive',
                            // You would need to determine the level here, which requires more complex logic.
                            // For simplicity, we'll assume they are Level 1.
                            level: 1
                        });
                    }
                });
            }

            totalReferralsElement.textContent = totalReferrals;
            totalCommissionElement.textContent = `$${totalCommission.toFixed(2)}`;
            
            // Populate the referral table
            referralTableBody.innerHTML = ''; // Clear previous data
            if (referredUsers.length > 0) {
                referredUsers.forEach(user => {
                    const row = document.createElement('tr');
                    row.innerHTML = `
                        <td>${user.name}</td>
                        <td class="${user.status.toLowerCase()}">${user.status}</td>
                        <td>${user.level}</td>
                    `;
                    referralTableBody.appendChild(row);
                });
            } else {
                const noDataRow = document.createElement('tr');
                noDataRow.innerHTML = `<td colspan="3">No referrals yet. Share your link!</td>`;
                referralTableBody.appendChild(noDataRow);
            }
        }
    });

    // Copy to Clipboard functionality
    copyButton.addEventListener('click', () => {
        const link = referralLinkElement.textContent;
        navigator.clipboard.writeText(link).then(() => {
            alert("Referral link copied!");
        }).catch(err => {
            console.error("Failed to copy link:", err);
            alert("Could not copy the link. Please copy it manually.");
        });
    });
});
