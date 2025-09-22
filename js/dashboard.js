//dashboard.js

import { auth, database, ref, get, onAuthStateChanged } from './firebase.js';

// Slidebar Toggle Function - Made globally accessible
window.toggleSlidebar = function() {
    const slidebar = document.querySelector('.slidebar');
    slidebar.classList.toggle('open');
};

// Check user login state and fetch data
onAuthStateChanged(auth, async (user) => {
    if (user) {
        // User is logged in, fetch data from database
        const userRef = ref(database, 'users/' + user.uid);
        const snapshot = await get(userRef);
        if (snapshot.exists()) {
            const userData = snapshot.val();
            document.querySelector('.user-name').textContent = `Welcome, ${userData.name}!`;
            document.getElementById('account-balance').textContent = `$${userData.balance.toFixed(2)}`;
            
            // You will add more logic here to display team and commission data
            // For now, let's assume this data is also in the database
            // e.g., document.getElementById('level1-team').textContent = `Team: ${userData.team.level1}`;
        }
    } else {
        // User is not logged in, redirect to login page
        window.location.href = 'login.html';
    }
});
