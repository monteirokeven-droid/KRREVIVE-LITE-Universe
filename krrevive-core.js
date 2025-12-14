/* --- KRREVIVE-CORE.JS --- */

// -------------------------
// Configuration
// -------------------------
const CONFIG = {
    defaultPage: "home",
    pages: {
        home: "pages/home.html",
        marketplace: "pages/shop.html",
        dashboard: "pages/dashboard.html",
        gaming: "pages/mini-game.html",
        wallet: "pages/wallet.html",
        support: "pages/support.html",
        terms: "pages/terms.html",
        privacy: "pages/privacy.html"
    },
    marketplaceItems: [
        { id: "planet-nft", name: "Planet NFT", price: 19.99, type: "nft", description: "Claim your planet in the Universe." },
        { id: "galaxy-nft", name: "Galaxy NFT", price: 29.99, type: "nft", description: "Own a galaxy and explore possibilities." },
        { id: "starship-nft", name: "Starship NFT", price: 49.99, type: "nft", description: "Travel through the stars." }
    ]
};

// -------------------------
// Marketplace Dynamic Loader
// -------------------------
function populateMarketplace() {
    const marketplaceGrid = document.getElementById("marketplace-grid");
    if (!marketplaceGrid) return;

    marketplaceGrid.innerHTML = "";

    CONFIG.marketplaceItems.forEach(item => {
        const box = document.createElement("div");
        box.className = "dimension-box cosmic-dim";
        box.innerHTML = `
            <h3>${item.name}</h3>
            <p>${item.description}</p>
            <p>Price: $${item.price}</p>
            <button class="btn-revive-code" onclick="addToCart('${item.id}')">Add to Cart</button>
        `;
        marketplaceGrid.appendChild(box);
    });
}

// -------------------------
// Shopping Cart Logic
// -------------------------
let CART = [];

function addToCart(itemId) {
    const item = CONFIG.marketplaceItems.find(i => i.id === itemId);
    if (!item) return;

    CART.push(item);
    showToast(`Added ${item.name} to cart.`);
    console.log("Cart:", CART);
}

// Simple toast notification
function showToast(message) {
    const toast = document.getElementById("toast");
    toast.textContent = message;
    toast.style.opacity = 1;
    setTimeout(() => toast.style.opacity = 0, 2000);
}

// -------------------------
// Mini-Game Logic
// -------------------------
let miniProgress = 0;
const miniCounter = document.getElementById("miniCounter");

function miniGameClick() {
    miniProgress += Math.floor(Math.random() * 10) + 5;
    if (miniProgress > 100) miniProgress = 100;
    miniCounter.textContent = `Progress: ${miniProgress}%`;

    if (miniProgress === 100) {
        alert("Planet Terraform Complete! Reward unlocked.");
        miniProgress = 0;
        miniCounter.textContent = `Progress: ${miniProgress}%`;
    }
}

// -------------------------
// AI Panel Logic
// -------------------------
function sendAI() {
    const input = document.getElementById("aiInput").value;
    const output = document.getElementById("aiOutput");

    if (!input) {
        output.textContent = "Enter a question to the AI.";
        return;
    }

    output.textContent = `Processing "${input}"...`;

    // Simulated AI response
    setTimeout(() => {
        output.textContent = `KRREVIVEÉLITE AI Response: "${input.split('').reverse().join('')}"`;
    }, 1000);
}

// -------------------------
// SPA Navigation
// -------------------------
document.querySelectorAll("[data-link]").forEach(btn => {
    btn.addEventListener("click", e => {
        const page = e.currentTarget.dataset.link;
        loadPage(page);
    });
});

async function loadPage(page) {
    const app = document.getElementById("app");
    const pagePath = CONFIG.pages[page] || CONFIG.pages.home;

    try {
        const res = await fetch(pagePath);
        if (!res.ok) throw new Error("Page not found");

        const html = await res.text();
        app.innerHTML = html;
        window.scrollTo({ top: 0, behavior: 'smooth' });

        // Re-populate Marketplace if loaded
        if (page === "marketplace") populateMarketplace();

        // Re-attach mini-game counter if loaded
        if (page === "gaming") {
            miniCounter.textContent = `Progress: ${miniProgress}%`;
        }

    } catch (err) {
        app.innerHTML = `<p style="color:red; text-align:center;">Failed to load ${page}</p>`;
    }
}

// -------------------------
// Universe Particles Background
// -------------------------
const universe = document.getElementById("universe");
const canvas = document.createElement("canvas");
const ctx = canvas.getContext("2d");
universe.appendChild(canvas);

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];
const PARTICLE_COUNT = 150;

function createParticles() {
    particles = [];
    for (let i = 0; i < PARTICLE_COUNT; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            radius: Math.random() * 2 + 0.5,
            vx: (Math.random() - 0.5) * 0.3,
            vy: (Math.random() - 0.5) * 0.3,
            color: Math.random() > 0.5 ? "#FFD700" : "#00BFFF"
        });
    }
}

function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 8;
        ctx.fill();
    });

    requestAnimationFrame(animateParticles);
}

window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    createParticles();
});

// -------------------------
// Initialization
// -------------------------
document.addEventListener("DOMContentLoaded", () => {
    createParticles();
    animateParticles();
    loadPage(CONFIG.defaultPage);
});
