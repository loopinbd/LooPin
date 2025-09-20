import { auth, database, ref, get, onAuthStateChanged } from './firebase.js';

// Slidebar Toggle Function
window.toggleSlidebar = function() {
    const slidebar = document.querySelector('.slidebar');
    slidebar.classList.toggle('open');
}

document.addEventListener('DOMContentLoaded', () => {
    onAuthStateChanged(auth, async (user) => {
        if (!user) {
            window.location.href = 'login.html';
            return;
        }

        const userRef = ref(database, 'users/' + user.uid);
        const snapshot = await get(userRef);
        if (snapshot.exists()) {
            const userData = snapshot.val();
            document.querySelector('.user-name').textContent = `Welcome, ${userData.name}!`;
        } else {
            console.error("User data not found.");
            alert("User data not found. Please contact support.");
            window.location.href = 'dashboard.html';
        }
    });
});
