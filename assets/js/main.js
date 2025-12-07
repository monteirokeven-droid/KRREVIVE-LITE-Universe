document.addEventListener('DOMContentLoaded', () => {
    const codeCheckBtn = document.getElementById('codeCheckBtn');
    const enterNetworkBtn = document.getElementById('enterNetworkBtn');
    const statusMessage = document.getElementById('statusMessage');

    // Assume the user starts without Code 001 access
    let hasCode001 = localStorage.getItem('krrevive_code_001') === 'true';

    // Initial state check
    if (hasCode001) {
        unlockNetworkAccess();
        statusMessage.textContent = '[CODE 001: AWARENESS] Protocol Verified. Access Granted.';
        codeCheckBtn.style.display = 'none'; // Hide the check button once verified
    } else {
        enterNetworkBtn.classList.add('disabled');
        statusMessage.textContent = 'INITIATING CODE CHECK... AWAITING USER INPUT.';
    }

    // --- Core Function: The CODE 001 Check Simulation ---
    codeCheckBtn.addEventListener('click', () => {
        // Prevent multiple checks while processing
        if (codeCheckBtn.disabled) return;

        codeCheckBtn.disabled = true;
        codeCheckBtn.textContent = 'VERIFYING SIGNATURE...';
        statusMessage.textContent = 'ACCESSING CENTRAL NETWORK DATABASE... STAND BY.';

        // Simulate a complex, high-latency verification process
        setTimeout(() => {
            // --- LOGIC GATE: In a real system, this checks server credentials ---
            const success = Math.random() > 0.3; // Simulate 70% chance of success for initial access

            if (success) {
                // SUCCESS: CODE 001 ACQUIRED
                hasCode001 = true;
                localStorage.setItem('krrevive_code_001', 'true');
                unlockNetworkAccess();
                
                statusMessage.innerHTML = '[<span style="color:var(--color-gold-neon);">CODE 001: AWARENESS</span>] PROTOCOL VERIFIED. ACCESS GRANTED.';
                codeCheckBtn.textContent = 'ACCESS GRANTED';
                codeCheckBtn.style.backgroundColor = 'var(--color-gold-neon)';
                codeCheckBtn.style.color = 'var(--color-black-obsidian)';
                codeCheckBtn.style.borderColor = 'var(--color-gold-neon)';
                
            } else {
                // FAILURE: CODE 001 PENDING
                statusMessage.innerHTML = '[<span style="color:#f00;">ACCESS DENIED</span>] CODE 001 PENDING. INITIATE THE 7-DAY DISCIPLINE PROTOCOL VIA THE ACADEMY.';
                codeCheckBtn.textContent = 'CHECK FAILED. RETRY.';
                codeCheckBtn.disabled = false; // Allow retry
            }
        }, 3000); // 3-second cinematic delay
    });


    // --- Function to Unlock the Main CTA ---
    function unlockNetworkAccess() {
        enterNetworkBtn.classList.remove('disabled');
        enterNetworkBtn.href = 'universe.html'; // Set the actual link
        enterNetworkBtn.addEventListener('click', () => {
             // Optional: Add a transition animation here before navigating
             console.log("Entering the KRREVIVEÉLITE Universe...");
        });
    }

    // --- Glitch Effect on H1 (Aesthetic Enhancement) ---
    const h1 = document.querySelector('h1.glitch-text');
    let glitchInterval;

    function applyGlitch() {
        const originalText = h1.textContent;
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890!@#$%^&*()_+-=';
        let iterations = 0;

        glitchInterval = setInterval(() => {
            h1.textContent = originalText.split('').map((char, index) => {
                if (index < iterations) {
                    return originalText[index];
                }
                return chars[Math.floor(Math.random() * chars.length)];
            }).join('');

            iterations += 1;
            if (iterations >= originalText.length + 5) {
                clearInterval(glitchInterval);
                h1.textContent = originalText; // Reset to the correct text
            }
        }, 75);
    }
    
    // Apply the glitch once on page load for cinematic effect
    applyGlitch(); 
});
