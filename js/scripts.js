/*
 * KRREVIVÉELITE - GLOBAL SCRIPTS
 * Contains interactive functionality for all pages.
 */

// --- 1. Audio and Performance Logic (From user input) ---
document.addEventListener('DOMContentLoaded', function () {
    // Note: Audio files must be located at 'assets/media/hover.wav' and 'assets/media/click.wav'
    const hoverSound = new Audio('assets/media/hover.wav');
    const clickSound = new Audio('assets/media/click.wav');

    // Selectors for interactive elements (product cards and buttons)
    // .product-item class was added to .product-card in shop.html
    document.querySelectorAll('.product-item, .btn-glow').forEach(item => {
        item.addEventListener('mouseover', () => {
            // Reset and play hover sound (Handling browser security/restrictions)
            hoverSound.currentTime = 0;
            hoverSound.play().catch(e => { /* Audio playback error handling */ });
        });

        item.addEventListener('click', () => {
            // Reset and play click sound
            clickSound.currentTime = 0;
            clickSound.play().catch(e => { /* Audio playback error handling */ });
        });
    });

    // Performance optimization for low-end devices
    if (window.matchMedia('(max-width: 768px)').matches) {
        const video = document.querySelector('#background-video');
        if (video) {
            video.remove();
            console.log("Background video removed for mobile performance.");
        }
    }
});


// --- 2. Shop Page Functionality (Product Detail View) ---
// Functions required by shop.html to open/close the holographic modal.

const pdv = document.getElementById('productDetail');
const pdvName = document.getElementById('pdv-name');
const pdvPrice = document.getElementById('pdv-price');
// Check if the PDV elements exist before defining properties to avoid errors on other pages
if (pdv) {
    var pdvDesc = pdv.querySelector('.description');
    var pdvImg = pdv.querySelector('.pdv-main-img');
}

// Function to open the PDV modal
function openProductDetail(name, price, description, imgUrl) {
    if (!pdv) return; // Exit if not on shop page

    // 1. Update Content
    pdvName.textContent = name;
    pdvPrice.textContent = price;
    pdvDesc.textContent = description;
    pdvImg.src = imgUrl;

    // 2. Activate Holographic View
    pdv.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// Function to close the PDV modal
function closeProductDetail() {
    if (!pdv) return;
    
    // 1. Deactivate Holographic View
    pdv.classList.remove('active');
    document.body.style.overflow = 'auto';
}
