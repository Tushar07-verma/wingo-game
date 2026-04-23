/* Landing Page Logic */

document.addEventListener('DOMContentLoaded', () => {
    const landingView = document.getElementById('view-landing');
    const loader = document.getElementById('landing-loader');
    const enterBtn = document.getElementById('landing-enter-btn');
    const welcomeText = document.getElementById('landing-welcome-text');

    // Timer logic: 7 seconds
    const splashTimeout = 7000;
    
    // Betting Chip Spawner
    let chipInterval = setInterval(() => {
        if (!landingView.classList.contains('active')) return;
        createFloatingChip();
    }, 600);

    function createFloatingChip() {
        const chip = document.createElement('div');
        const types = ['', 'red', 'violet'];
        const labels = ['₹10', '₹100', '₹500', '₹1K', 'BIG', 'SMALL', 'RED', 'G'];
        
        const type = types[Math.floor(Math.random() * types.length)];
        chip.className = `floating-chip ${type}`;
        chip.innerText = labels[Math.floor(Math.random() * labels.length)];
        
        // Random target X for wider spread
        const targetX = Math.floor(Math.random() * 100) + '%';
        chip.style.setProperty('--target-x', targetX);
        chip.style.left = '50%'; // Start from center-ish bottom
        
        landingView.appendChild(chip);
        
        // Remove after animation
        setTimeout(() => chip.remove(), 3000);
    }

    setTimeout(() => {
        if (loader) loader.style.display = 'none';
        if (enterBtn) enterBtn.style.display = 'block';
        if (welcomeText) welcomeText.style.display = 'block';
    }, splashTimeout);

    // Enter Button Handler
    if (enterBtn) {
        enterBtn.addEventListener('click', () => {
             clearInterval(chipInterval);
             // Transition to home
             if (typeof switchView === 'function') {
                 switchView('view-home');
             } else {
                 document.querySelectorAll('.view-section').forEach(v => v.classList.remove('active'));
                 document.getElementById('view-home').classList.add('active');
             }
        });
    }
});
