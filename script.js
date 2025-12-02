// =====================================================
// KRREVIVEÉLITE Universe - Interactive Script
// =====================================================

document.addEventListener('DOMContentLoaded', function() {
    initializeNavigation();
    initializeScrollEffects();
    initializeButtonInteractions();
    initializeEmailForm();
});

// =====================================================
// NAVIGATION FUNCTIONALITY
// =====================================================

function initializeNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Toggle mobile menu
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            if (navMenu) navMenu.classList.toggle('active');
            hamburger.classList.toggle('active');
        });
    }

    // Close menu when link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (navMenu) navMenu.classList.remove('active');
            if (hamburger) hamburger.classList.remove('active');
        });
    });
}

// =====================================================
// SMOOTH SCROLLING TO SECTIONS
// =====================================================

function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

// =====================================================
// SCROLL EFFECTS & ANIMATIONS
// =====================================================

function initializeScrollEffects() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add visible class to trigger CSS transition
                entry.target.classList.add('visible');
                // Optional: stop observing after animation
                // observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all sections
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        // set initial hidden state using CSS class
        section.classList.add('fade-in');
        observer.observe(section);
    });

    // Add parallax effect on scroll
    window.addEventListener('scroll', applyParallaxEffect);
}

function applyParallaxEffect() {
    const scrollY = window.scrollY;
    const cosmicBackground = document.querySelector('.cosmic-background');
    
    if (cosmicBackground) {
        cosmicBackground.style.transform = `translateY(${scrollY * 0.5}px)`;
    }
}

// =====================================================
// BUTTON INTERACTIONS
// =====================================================

function initializeButtonInteractions() {
    const buttons = document.querySelectorAll('.btn');

    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
        });

        button.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });

    // Character cards hover effect
    const characterCards = document.querySelectorAll('.character-card');
    characterCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-15px) scale(1.02)';
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Book cards flip effect
    const bookCards = document.querySelectorAll('.book-card');
    bookCards.forEach(card => {
        const bookCover = card.querySelector('.book-cover');
        
        card.addEventListener('mouseenter', function() {
            bookCover.style.transform = 'rotateY(-10deg) rotateX(5deg)';
        });

        card.addEventListener('mouseleave', function() {
            bookCover.style.transform = 'rotateY(0) rotateX(0)';
        });
    });
}

// =====================================================
// EMAIL FORM SUBMISSION
// =====================================================

function initializeEmailForm() {
    const emailForm = document.querySelector('.email-form');
    
    if (emailForm) {
        emailForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const emailInput = this.querySelector('input[type="email"]');
            const email = emailInput.value;
            
            // Validate email
            if (validateEmail(email)) {
                // Show success message
                const button = this.querySelector('button');
                const originalText = button.textContent;
                
                button.textContent = '✓ Welcome to the Elite!';
                button.style.background = 'linear-gradient(135deg, #00d9ff 0%, #0066ff 100%)';
                
                // Clear form
                emailInput.value = '';
                
                // Reset button after 3 seconds
                setTimeout(function() {
                    button.textContent = originalText;
                    button.style.background = '';
                }, 3000);
                
                // Here you would typically send the email to a backend
                console.log('Email submitted:', email);
                sendEmailToBackend(email);
            } else {
                alert('Please enter a valid email address.');
            }
        });
    }
}

function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function sendEmailToBackend(email) {
    // This would be implemented with your actual backend
    // Example using fetch API:
    /*
    fetch('/api/subscribe', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: email })
    })
    .then(response => response.json())
    .then(data => console.log('Success:', data))
    .catch((error) => console.error('Error:', error));
    */
}

// =====================================================
// DYNAMIC CONTENT ANIMATION
// =====================================================

function animateCountUp(element, target, duration = 2000) {
    let current = 0;
    const increment = target / (duration / 16);
    
    const updateCount = () => {
        if (current < target) {
            current += increment;
            element.textContent = Math.floor(current);
            requestAnimationFrame(updateCount);
        } else {
            element.textContent = target;
        }
    };
    
    updateCount();
}

// =====================================================
// NAVBAR EFFECTS
// =====================================================

window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;
    if (window.scrollY > 100) {
        navbar.style.boxShadow = '0 10px 30px rgba(212, 175, 55, 0.3)';
    } else {
        navbar.style.boxShadow = '0 0 20px rgba(212, 175, 55, 0.2)';
    }
});

// =====================================================
// DYNAMIC ELEMENT VISIBILITY ON SCROLL
// =====================================================

function observeElements() {
    const observerOptions = {
        threshold: 0.2
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // use CSS classes for fade-in instead of inline styles
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Add to all cards and elements that should fade in
    const cards = document.querySelectorAll('.lore-card, .character-card, .book-card, .tool-card, .feature');
    cards.forEach(card => {
        // prepare cards for CSS-driven fade-in
        card.classList.add('fade-in');
        observer.observe(card);
    });
}

// Initialize element visibility
observeElements();

// =====================================================
// GAMING SECTION INTERACTIVITY
// =====================================================

async function loadGamingSessions() {
    try {
        const res = await fetch('data/gaming.json');
        if (!res.ok) return console.warn('No gaming data found');
        const data = await res.json();

        renderFeaturedVideo(data.featured || data.pastSessions[0]);
        renderSchedule(data.upcoming || []);
        renderThumbnails(data.pastSessions || []);
    } catch (err) {
        console.error('Error loading gaming data', err);
    }
}

function renderFeaturedVideo(item) {
    const container = document.getElementById('featuredVideo');
    if (!container || !item) return;

    container.innerHTML = '';
    const iframe = document.createElement('iframe');
    iframe.setAttribute('loading', 'lazy');
    iframe.setAttribute('allowfullscreen', '');
    iframe.setAttribute('title', item.title || 'Featured session');

    if (item.youtubeId) {
        iframe.src = `https://www.youtube.com/embed/${item.youtubeId}?rel=0`;
    } else if (item.videoUrl) {
        iframe.src = item.videoUrl;
    }

    container.appendChild(iframe);
}

function renderSchedule(list) {
    const ul = document.getElementById('streamSchedule');
    if (!ul) return;
    ul.innerHTML = '';

    list.forEach(s => {
        const li = document.createElement('li');
        li.className = 'stream-item';
        li.innerHTML = `<div class="stream-meta"><strong>${escapeHtml(s.title)}</strong><div class="stream-desc" style="color:var(--text-muted);">${escapeHtml(s.platform || 'YouTube')}</div></div><time datetime="${s.iso}">${formatStreamTime(s.iso)}</time>`;
        ul.appendChild(li);
    });
}

// Initialize filter controls and pagination
function initGamingFiltersAndPagination(data) {
    const chars = new Set();
    const prots = new Set();
    const sessions = data.pastSessions || [];

    sessions.forEach(s => {
        (s.characters || []).forEach(c => chars.add(c));
        (s.protocols || []).forEach(p => prots.add(p));
    });

    const charSelect = document.getElementById('filterCharacter');
    const protoSelect = document.getElementById('filterProtocol');
    const searchInput = document.getElementById('filterSearch');

    // Populate options
    if (charSelect) {
        chars.forEach(c => {
            const opt = document.createElement('option');
            opt.value = c; opt.textContent = c; charSelect.appendChild(opt);
        });
    }

    if (protoSelect) {
        prots.forEach(p => {
            const opt = document.createElement('option');
            opt.value = p; opt.textContent = p; protoSelect.appendChild(opt);
        });
    }

    // Event listeners
    const onFilterChange = debounce(() => {
        currentPage = 1;
        const filtered = applyFiltersToList(sessions);
        renderThumbnailsPaginated(filtered, currentPage);
    }, 250);

    if (charSelect) charSelect.addEventListener('change', onFilterChange);
    if (protoSelect) protoSelect.addEventListener('change', onFilterChange);
    if (searchInput) searchInput.addEventListener('input', onFilterChange);

    // initial render
    const filtered = applyFiltersToList(sessions);
    renderThumbnailsPaginated(filtered, currentPage);
}

// small debounce helper
function debounce(fn, wait) {
    let t;
    return function(...args) {
        clearTimeout(t);
        t = setTimeout(() => fn.apply(this, args), wait);
    };
}


// Pagination & Filtering state
let gamingData = null;
let currentPage = 1;
const pageSize = 6;

function renderThumbnails(list) {
    // new entry point kept for compatibility
    renderThumbnailsPaginated(list, currentPage);
}

function renderThumbnailsPaginated(list, page = 1) {
    gamingData = gamingData || { pastSessions: list };
    const grid = document.getElementById('sessionThumbnails');
    if (!grid) return;

    const start = (page - 1) * pageSize;
    const pageItems = list.slice(start, start + pageSize);
    grid.innerHTML = '';

    pageItems.forEach(item => {
        const div = document.createElement('div');
        div.className = 'session-thumb';
        div.setAttribute('role', 'listitem');
        div.innerHTML = `
            <img src="${item.thumbnail || 'https://via.placeholder.com/320x180'}" alt="${escapeHtml(item.title)} thumbnail">
            <div class="thumb-caption">${escapeHtml(item.title)}</div>
            <div class="thumb-overlay">${escapeHtml(item.title)}</div>
            <div class="thumb-tags">${(item.characters||[]).slice(0,2).map(t=>`<span class=\"thumb-tag\">${escapeHtml(t)}</span>`).join('')}</div>
            <div class="play-marker">▶</div>
        `;

        div.addEventListener('click', () => openVideoModal(item));
        grid.appendChild(div);
    });

    renderPagination(list.length, page);
}

function renderPagination(totalItems, page) {
    const container = document.getElementById('gamingPagination');
    if (!container) return;
    container.innerHTML = '';

    const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));

    // Prev button
    const prevBtn = document.createElement('button');
    prevBtn.textContent = 'Prev';
    prevBtn.disabled = page <= 1;
    prevBtn.addEventListener('click', () => changePage(Math.max(1, page - 1)));
    container.appendChild(prevBtn);

    // page numbers (show up to 7 centered)
    const maxButtons = 7;
    let start = Math.max(1, page - Math.floor(maxButtons / 2));
    let end = Math.min(totalPages, start + maxButtons - 1);
    if (end - start < maxButtons - 1) start = Math.max(1, end - maxButtons + 1);

    for (let i = start; i <= end; i++) {
        const btn = document.createElement('button');
        btn.textContent = String(i);
        if (i === page) btn.classList.add('active');
        btn.addEventListener('click', () => changePage(i));
        container.appendChild(btn);
    }

    // Next button
    const nextBtn = document.createElement('button');
    nextBtn.textContent = 'Next';
    nextBtn.disabled = page >= totalPages;
    nextBtn.addEventListener('click', () => changePage(Math.min(totalPages, page + 1)));
    container.appendChild(nextBtn);
}

function changePage(page) {
    currentPage = page;
    const filtered = applyFiltersToList(gamingData?.pastSessions || []);
    renderThumbnailsPaginated(filtered, currentPage);
}

function applyFiltersToList(list) {
    const char = document.getElementById('filterCharacter')?.value || '';
    const proto = document.getElementById('filterProtocol')?.value || '';
    const search = (document.getElementById('filterSearch')?.value || '').toLowerCase().trim();

    return list.filter(item => {
        let ok = true;
        if (char) ok = ok && (item.characters || []).includes(char);
        if (proto) ok = ok && (item.protocols || []).includes(proto);
        if (search) {
            ok = ok && ((item.title||'').toLowerCase().includes(search) || (item.description||'').toLowerCase().includes(search));
        }
        return ok;
    });
}

function openVideoModal(item) {
    const modal = document.createElement('div');
    modal.className = 'video-modal';

    const inner = document.createElement('div');
    inner.className = 'modal-inner';

    const closeBtn = document.createElement('button');
    closeBtn.className = 'close-btn';
    closeBtn.textContent = 'Close';
    closeBtn.addEventListener('click', () => { document.body.removeChild(modal); });

    const iframe = document.createElement('iframe');
    iframe.setAttribute('allowfullscreen', '');
    iframe.setAttribute('title', item.title || 'Session');
    iframe.src = item.youtubeId ? `https://www.youtube.com/embed/${item.youtubeId}?rel=0&autoplay=1` : (item.videoUrl || '');
    iframe.style.width = '100%';
    iframe.style.height = '100%';

    inner.appendChild(iframe);
    modal.appendChild(inner);
    modal.appendChild(closeBtn);

    modal.addEventListener('click', (e) => {
        if (e.target === modal) document.body.removeChild(modal);
    });

    document.body.appendChild(modal);
}

function formatStreamTime(iso) {
    try {
        const d = new Date(iso);
        return d.toLocaleString();
    } catch (e) {
        return iso;
    }
}

function escapeHtml(str) {
    if (!str) return '';
    return String(str).replace(/[&<>"'`]/g, function (s) {
        return ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":"&#39;","`":"&#x60;"})[s];
    });
}

// load gaming data on DOM ready
document.addEventListener('DOMContentLoaded', function() {
    loadGamingSessions();
    loadSocialFeed();
    initVideoGrid();
    initAIToolsInteractions();
    initContactForm();
    initFuturisticCanvas();
    setupFuturisticControls();
});

// =====================================================
// Futuristic Canvas Background (lightweight particle system)
// =====================================================

function initFuturisticCanvas() {
    // If system prefers reduced motion, or user set reduced-motion override in localStorage, don't start
    const userReduced = localStorage.getItem('futuristicReduced');
    if (userReduced === '1') return;
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        return; // respect system reduced motion
    }

    const canvas = document.getElementById('futuristicCanvas');
    if (!canvas || !canvas.getContext) return;

    const ctx = canvas.getContext('2d');
    let w = 0, h = 0, dpr = window.devicePixelRatio || 1;
    let particles = [];
    let animId = null;
    let intensityMultiplier = 1; // 1.0 default, modified by control (0.0 - 1.6)

    function resize() {
        dpr = window.devicePixelRatio || 1;
        w = canvas.clientWidth || window.innerWidth;
        h = canvas.clientHeight || window.innerHeight;
        canvas.width = Math.floor(w * dpr);
        canvas.height = Math.floor(h * dpr);
        canvas.style.width = w + 'px';
        canvas.style.height = h + 'px';
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        initParticles();
    }

    function initParticles() {
        const area = w * h;
        const base = Math.floor(area / 24000);
        const raw = Math.max(12, Math.min(240, Math.floor(base * intensityMultiplier)));
        const count = Math.max(12, Math.min(240, raw));
        particles = [];
        for (let i = 0; i < count; i++) {
            particles.push({
                x: Math.random() * w,
                y: Math.random() * h,
                vx: (Math.random() - 0.5) * 0.35,
                vy: (Math.random() - 0.5) * 0.35,
                r: 1 + Math.random() * 2
            });
        }
    }

    function draw() {
        ctx.clearRect(0, 0, w, h);

        // draw lines
        for (let i = 0; i < particles.length; i++) {
            const p = particles[i];
            for (let j = i + 1; j < particles.length; j++) {
                const q = particles[j];
                const dx = p.x - q.x;
                const dy = p.y - q.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 140) {
                    const alpha = 0.12 * (1 - dist / 140);
                    ctx.strokeStyle = `rgba(124,58,237,${alpha})`;
                    ctx.lineWidth = 0.8;
                    ctx.beginPath();
                    ctx.moveTo(p.x, p.y);
                    ctx.lineTo(q.x, q.y);
                    ctx.stroke();
                }
            }
        }

        // draw particles
        for (let i = 0; i < particles.length; i++) {
            const p = particles[i];
            ctx.beginPath();
            const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 6);
            grad.addColorStop(0, 'rgba(240,183,0,0.9)');
            grad.addColorStop(0.4, 'rgba(124,58,237,0.5)');
            grad.addColorStop(1, 'rgba(124,58,237,0)');
            ctx.fillStyle = grad;
            ctx.arc(p.x, p.y, p.r * 1.2, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    function step() {
        for (let i = 0; i < particles.length; i++) {
            const p = particles[i];
            p.x += p.vx;
            p.y += p.vy;
            if (p.x < -10) p.x = w + 10;
            if (p.x > w + 10) p.x = -10;
            if (p.y < -10) p.y = h + 10;
            if (p.y > h + 10) p.y = -10;
        }
        draw();
        animId = requestAnimationFrame(step);
    }

    function start() {
        if (animId) cancelAnimationFrame(animId);
        animId = requestAnimationFrame(step);
    }

    function stop() {
        if (animId) cancelAnimationFrame(animId);
        animId = null;
    }

    window.addEventListener('resize', resize);
    document.addEventListener('visibilitychange', () => { document.hidden ? stop() : start(); });

    resize();
    start();

    // expose for debugging
    canvas.__futuristic = { start, stop, resize, setIntensity: (v)=>{ intensityMultiplier = Math.max(0, v); initParticles(); } };
}

// Background controls wiring: toggle + opacity slider + reduce-motion
function setupFuturisticControls() {
    const canvas = document.getElementById('futuristicCanvas');
    const enable = document.getElementById('bgControlEnable');
    const opacity = document.getElementById('bgControlOpacity');
    const reduced = document.getElementById('bgControlReduced');
    if (!canvas || !enable || !opacity || !reduced) return;

    const enabledKey = 'futuristicEnabled';
    const opacityKey = 'futuristicOpacity';
    const reducedKey = 'futuristicReduced';

    // Initialize enabled
    const storedEnabled = localStorage.getItem(enabledKey);
    const isEnabled = storedEnabled === null ? true : storedEnabled === '1';
    enable.checked = isEnabled;
    if (!isEnabled) {
        canvas.style.display = 'none';
        if (canvas.__futuristic && canvas.__futuristic.stop) canvas.__futuristic.stop();
    } else {
        canvas.style.display = 'block';
        if (canvas.__futuristic && canvas.__futuristic.start) canvas.__futuristic.start();
    }

    // Initialize intensity/opacity
    const storedOpacity = localStorage.getItem(opacityKey);
    const op = storedOpacity === null ? opacity.value : storedOpacity;
    opacity.value = op;
    canvas.style.opacity = op;

    // map opacity slider to an intensity multiplier (0.3 - 1.6)
    const intensityKey = 'futuristicIntensity';
    const storedIntensity = localStorage.getItem(intensityKey);
    let intensity = storedIntensity === null ? mapRange(parseFloat(op), 0, 1, 0.4, 1.2) : parseFloat(storedIntensity);
    // expose to controls via canvas.__futuristic after canvas init
    if (canvas.__futuristic && canvas.__futuristic.setIntensity) canvas.__futuristic.setIntensity(intensity);

    // Initialize reduced-motion override
    const storedReduced = localStorage.getItem(reducedKey);
    const isReduced = storedReduced === '1';
    reduced.checked = isReduced;
    if (isReduced) {
        // stop animation and hide canvas
        if (canvas.__futuristic && canvas.__futuristic.stop) canvas.__futuristic.stop();
        canvas.style.display = 'none';
    }

    // Handlers
    enable.addEventListener('change', () => {
        const on = enable.checked;
        localStorage.setItem(enabledKey, on ? '1' : '0');
        if (on && !(localStorage.getItem(reducedKey) === '1')) {
            canvas.style.display = 'block';
            if (canvas.__futuristic && canvas.__futuristic.start) canvas.__futuristic.start();
        } else {
            if (canvas.__futuristic && canvas.__futuristic.stop) canvas.__futuristic.stop();
            canvas.style.display = 'none';
        }
    });

    opacity.addEventListener('input', () => {
        const v = opacity.value;
        localStorage.setItem(opacityKey, v);
        canvas.style.opacity = v;
        // also map to intensity multiplier
        const mapped = mapRange(parseFloat(v), 0, 1, 0.4, 1.2);
        localStorage.setItem(intensityKey, String(mapped));
        if (canvas.__futuristic && canvas.__futuristic.setIntensity) canvas.__futuristic.setIntensity(mapped);
    });

    // Reset button
    const resetBtn = document.getElementById('bgControlReset');
    if (resetBtn) {
        resetBtn.addEventListener('click', () => {
            // defaults
            const defEnabled = true;
            const defReduced = false;
            const defOpacity = '0.9';
            const defIntensity = mapRange(parseFloat(defOpacity), 0, 1, 0.4, 1.2);

            enable.checked = defEnabled; localStorage.setItem(enabledKey, defEnabled ? '1' : '0');
            reduced.checked = defReduced; localStorage.setItem(reducedKey, defReduced ? '1' : '0');
            opacity.value = defOpacity; localStorage.setItem(opacityKey, defOpacity);
            localStorage.setItem(intensityKey, String(defIntensity));
            canvas.style.opacity = defOpacity;

            if (defReduced) {
                if (canvas.__futuristic && canvas.__futuristic.stop) canvas.__futuristic.stop();
                canvas.style.display = 'none';
            } else {
                canvas.style.display = 'block';
                if (canvas.__futuristic && canvas.__futuristic.setIntensity) canvas.__futuristic.setIntensity(defIntensity);
                if (canvas.__futuristic && canvas.__futuristic.start) canvas.__futuristic.start();
            }
        });
    }

    reduced.addEventListener('change', () => {
        const on = reduced.checked;
        localStorage.setItem(reducedKey, on ? '1' : '0');
        if (on) {
            // force stop regardless of enable
            if (canvas.__futuristic && canvas.__futuristic.stop) canvas.__futuristic.stop();
            canvas.style.display = 'none';
        } else {
            // only start if enabled is checked and system pref doesn't reduce
            const sysPref = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
            if (enable.checked && !sysPref) {
                canvas.style.display = 'block';
                if (canvas.__futuristic && canvas.__futuristic.start) canvas.__futuristic.start();
            }
        }
    });
}

// small helper to map one range to another
function mapRange(v, inMin, inMax, outMin, outMax) {
    const t = (v - inMin) / (inMax - inMin);
    return outMin + t * (outMax - outMin);
}

// Background controls wiring: toggle + opacity slider
function setupFuturisticControls() {
    const canvas = document.getElementById('futuristicCanvas');
    const enable = document.getElementById('bgControlEnable');
    const opacity = document.getElementById('bgControlOpacity');
    if (!canvas || !enable || !opacity) return;

    const enabledKey = 'futuristicEnabled';
    const opacityKey = 'futuristicOpacity';

    // Initialize from localStorage (if present)
    const storedEnabled = localStorage.getItem(enabledKey);
    const storedOpacity = localStorage.getItem(opacityKey);

    const isEnabled = storedEnabled === null ? true : storedEnabled === '1';
    enable.checked = isEnabled;
    if (!isEnabled) {
        canvas.style.display = 'none';
        if (canvas.__futuristic && canvas.__futuristic.stop) canvas.__futuristic.stop();
    } else {
        canvas.style.display = 'block';
        if (canvas.__futuristic && canvas.__futuristic.start) canvas.__futuristic.start();
    }

    const op = storedOpacity === null ? opacity.value : storedOpacity;
    opacity.value = op;
    canvas.style.opacity = op;

    // Handlers
    enable.addEventListener('change', () => {
        const on = enable.checked;
        localStorage.setItem(enabledKey, on ? '1' : '0');
        if (on) {
            canvas.style.display = 'block';
            if (canvas.__futuristic && canvas.__futuristic.start) canvas.__futuristic.start();
        } else {
            if (canvas.__futuristic && canvas.__futuristic.stop) canvas.__futuristic.stop();
            canvas.style.display = 'none';
        }
    });

    opacity.addEventListener('input', () => {
        const v = opacity.value;
        localStorage.setItem(opacityKey, v);
        canvas.style.opacity = v;
    });
}

// Initialize video grid click handlers for luxury video cards
function initVideoGrid() {
    const cards = document.querySelectorAll('.video-card');
    cards.forEach(card => {
        card.addEventListener('click', () => {
            const id = card.getAttribute('data-youtube');
            const title = card.getAttribute('data-title') || 'Video';
            const thumb = card.getAttribute('data-thumb');
            openVideoModal({ youtubeId: id, title, thumbnail: thumb });
        });
    });
}

// AI Tools interactions: simple toggles to show luxury micro-interactions
function initAIToolsInteractions() {
    document.querySelectorAll('.toggle-auto').forEach(btn => {
        btn.addEventListener('click', () => {
            btn.classList.toggle('active');
            btn.textContent = btn.classList.contains('active') ? 'Enabled' : 'Enable';
        });
    });
    document.querySelectorAll('.toggle-ai').forEach(btn => {
        btn.addEventListener('click', () => {
            alert('AI Assistant panel would open here in a full build.');
        });
    });
}

// Contact form handler (local demo)
function initContactForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(form);
        const name = formData.get('name');
        const email = formData.get('email');
        const message = formData.get('message');
        if (!name || !email || !message) { alert('Please complete required fields'); return; }
        const btn = form.querySelector('button');
        const orig = btn.textContent;
        btn.textContent = 'Sending…';
        setTimeout(() => { btn.textContent = 'Sent ✓'; setTimeout(()=>{ btn.textContent = orig; }, 2200); }, 900);
        console.log('Contact form (demo):', { name, email, message });
        form.reset();
    });
}

// =====================================================
// SOCIAL FEED: load local posts, render, like & follow
// =====================================================

async function loadSocialFeed() {
    const loader = document.getElementById('feedLoader');
    if (loader) loader.hidden = false;
    try {
        const res = await fetch('data/social.json');
        if (!res.ok) return console.warn('No social data');
        const data = await res.json();
        renderSocialPosts(data.posts || []);
        renderSuggestedAccounts(data.suggested || []);
    } catch (e) {
        console.error('social load err', e);
    } finally {
        if (loader) loader.hidden = true;
    }
}

function renderSocialPosts(posts) {
    const feed = document.getElementById('socialFeed');
    if (!feed) return;
    feed.innerHTML = '';

    posts.forEach(p => {
        const card = document.createElement('article');
        card.className = 'post-card';
        card.innerHTML = `
            <div class="post-avatar"><img src="${p.avatar||'https://via.placeholder.com/56'}" alt="${escapeHtml(p.author)} avatar"></div>
            <div class="post-body">
                <div class="post-header">
                    <div class="post-author">${escapeHtml(p.author)}</div>
                    <div class="post-handle">@${escapeHtml(p.handle)}</div>
                    <div class="post-time">${timeAgo(p.iso)}</div>
                </div>
                <div class="post-content">${escapeHtml(p.content)}</div>
                <div class="post-actions">
                    <button class="action-btn like-btn" data-id="${p.id}">❤ <span class="count">${p.likes||0}</span></button>
                    <button class="action-btn" onclick="alert('Share not implemented in demo')">🔗 Share</button>
                </div>
            </div>
        `;

        // like button handler
        const likeBtn = card.querySelector('.like-btn');
        if (likeBtn) {
            const id = likeBtn.getAttribute('data-id');
            const liked = localStorage.getItem('liked_'+id) === '1';
            if (liked) likeBtn.classList.add('liked');
            likeBtn.addEventListener('click', () => {
                const isLiked = likeBtn.classList.toggle('liked');
                const countEl = likeBtn.querySelector('.count');
                let count = parseInt(countEl.textContent || '0', 10);
                count = isLiked ? count+1 : Math.max(0, count-1);
                countEl.textContent = String(count);
                localStorage.setItem('liked_'+id, isLiked ? '1' : '0');
            });
        }

        feed.appendChild(card);
    });
}

function renderSuggestedAccounts(list) {
    const container = document.getElementById('suggestedAccounts');
    if (!container) return;
    container.innerHTML = '';

    list.forEach(acc => {
        const row = document.createElement('div');
        row.className = 'suggested';
        row.innerHTML = `
            <div class="s-avatar"><img src="${acc.avatar||'https://via.placeholder.com/40'}" alt="${escapeHtml(acc.name)} avatar"></div>
            <div class="s-meta"><div class="s-name">${escapeHtml(acc.name)}</div><div class="s-handle">@${escapeHtml(acc.handle)}</div></div>
            <button class="follow-btn" data-handle="${acc.handle}">${acc.following? 'Following' : 'Follow'}</button>
        `;

        const btn = row.querySelector('.follow-btn');
        if (btn) {
            const h = btn.getAttribute('data-handle');
            const isFollowing = localStorage.getItem('follow_'+h) === '1' || acc.following;
            if (isFollowing) { btn.classList.add('following'); btn.textContent = 'Following'; }
            btn.addEventListener('click', () => {
                const following = btn.classList.toggle('following');
                btn.textContent = following ? 'Following' : 'Follow';
                localStorage.setItem('follow_'+h, following ? '1' : '0');
            });
        }

        container.appendChild(row);
    });
}

function timeAgo(iso) {
    try {
        const d = new Date(iso);
        const diff = Date.now() - d.getTime();
        const mins = Math.floor(diff/60000);
        if (mins < 60) return `${mins}m`;
        const hrs = Math.floor(mins/60);
        if (hrs < 24) return `${hrs}h`;
        const days = Math.floor(hrs/24);
        return `${days}d`;
    } catch (e) { return iso; }
}

// =====================================================
// RESPONSIVE MOBILE MENU
// =====================================================

function setupMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    if (window.innerWidth <= 768) {
        if (hamburger && navMenu) {
            hamburger.style.display = 'flex';
            navMenu.style.display = 'none';
        }
    } else {
        if (hamburger && navMenu) {
            hamburger.style.display = 'none';
            navMenu.style.display = 'flex';
        }
    }
}

window.addEventListener('resize', setupMobileMenu);
setupMobileMenu();

// =====================================================
// KEYBOARD NAVIGATION
// =====================================================

document.addEventListener('keydown', function(e) {
    // Close mobile menu on escape
    if (e.key === 'Escape') {
        const navMenu = document.querySelector('.nav-menu');
        const hamburger = document.querySelector('.hamburger');
        if (navMenu) navMenu.classList.remove('active');
        if (hamburger) hamburger.classList.remove('active');
    }
});

// =====================================================
// ACCESSIBILITY ENHANCEMENTS
// =====================================================

// Focus management
const links = document.querySelectorAll('a, button');
links.forEach(link => {
    link.addEventListener('focus', function() {
        this.style.outline = '2px solid #00d9ff';
        this.style.outlineOffset = '2px';
    });

    link.addEventListener('blur', function() {
        this.style.outline = 'none';
    });
});

// =====================================================
// PERFORMANCE OPTIMIZATION
// =====================================================

// Debounce scroll events
let scrollTimeout;
window.addEventListener('scroll', function() {
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(function() {
        // Any scroll-based logic here
    }, 100);
}, { passive: true });

// =====================================================
// THEME SWITCHER (Optional)
// =====================================================

function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    localStorage.setItem('theme', document.body.classList.contains('dark-mode') ? 'dark' : 'light');
}

// Load saved theme preference
window.addEventListener('load', function() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
    }
});

// =====================================================
// LOADING STATE MANAGEMENT
// =====================================================

window.addEventListener('load', function() {
    document.body.classList.remove('loading');
    console.log('%cKRREVIVEÉLITE Universe Loaded', 'color: #d4af37; font-size: 16px; font-weight: bold;');
});

// Add loading class on page load
document.body.classList.add('loading');
