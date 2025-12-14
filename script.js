// =====================================================
// KRREVIVEÉLITE Universe - Fully Integrated Script
// =====================================================

const OPENAI_API_KEY = 'YOUR_OPENAI_API_KEY'; // replace with your key

document.addEventListener('DOMContentLoaded', function() {
    initializeNavigation();
    initializeScrollEffects();
    initializeButtonInteractions();
    initializeEmailForm();
    loadGamingSessions();
    loadSocialFeed();
    initVideoGrid();
    initAIToolsInteractions();
    initContactForm();
    initFuturisticCanvas();
    setupFuturisticControls();
    initAI();
    setupMobileMenu();
});

// =====================================================
// NAVIGATION FUNCTIONALITY
// =====================================================
function initializeNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (hamburger) hamburger.addEventListener('click', () => {
        if (navMenu) navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
    });

    navLinks.forEach(link => link.addEventListener('click', () => {
        if (navMenu) navMenu.classList.remove('active');
        if (hamburger) hamburger.classList.remove('active');
    }));
}

function scrollToSection(id) {
    const sec = document.getElementById(id);
    if (sec) sec.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// =====================================================
// SCROLL EFFECTS & ANIMATIONS
// =====================================================
function initializeScrollEffects() {
    const observerOptions = { threshold: 0.1, rootMargin: '0px 0px -50px 0px' };
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => { if (entry.isIntersecting) entry.target.classList.add('visible'); });
    }, observerOptions);

    document.querySelectorAll('section, .lore-card, .character-card, .book-card, .tool-card, .feature').forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });

    window.addEventListener('scroll', () => {
        const bg = document.querySelector('.cosmic-background');
        if (bg) bg.style.transform = `translateY(${window.scrollY * 0.5}px)`;
    });
}

// =====================================================
// BUTTON INTERACTIONS
// =====================================================
function initializeButtonInteractions() {
    document.querySelectorAll('.btn').forEach(btn => {
        btn.addEventListener('mouseenter', () => btn.style.transform='scale(1.05)');
        btn.addEventListener('mouseleave', () => btn.style.transform='scale(1)');
    });
    document.querySelectorAll('.character-card').forEach(card => {
        card.addEventListener('mouseenter', () => card.style.transform='translateY(-15px) scale(1.02)');
        card.addEventListener('mouseleave', () => card.style.transform='translateY(0) scale(1)');
    });
    document.querySelectorAll('.book-card').forEach(card => {
        const cover = card.querySelector('.book-cover');
        card.addEventListener('mouseenter', () => { if (cover) cover.style.transform='rotateY(-10deg) rotateX(5deg)'; });
        card.addEventListener('mouseleave', () => { if (cover) cover.style.transform='rotateY(0) rotateX(0)'; });
    });
}

// =====================================================
// EMAIL FORM
// =====================================================
function initializeEmailForm() {
    const form = document.querySelector('.email-form');
    if (!form) return;
    form.addEventListener('submit', e => {
        e.preventDefault();
        const email = form.querySelector('input[type="email"]').value;
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { alert('Enter valid email'); return; }
        const btn = form.querySelector('button');
        const orig = btn.textContent;
        btn.textContent='✓ Welcome to the Elite!';
        btn.style.background='linear-gradient(135deg,#00d9ff 0%,#0066ff 100%)';
        form.reset();
        setTimeout(() => { btn.textContent=orig; btn.style.background=''; }, 3000);
        console.log('Email submitted:', email);
        // TODO: sendEmailToBackend(email);
    });
}

// =====================================================
// GAMING SECTION
// =====================================================
let gamingData=null, currentPage=1, pageSize=6;
async function loadGamingSessions() {
    try {
        const res = await fetch('data/gaming.json');
        if (!res.ok) return console.warn('No gaming data');
        const data = await res.json();
        gamingData = data;
        renderFeaturedVideo(data.featured||data.pastSessions[0]);
        renderSchedule(data.upcoming||[]);
        renderThumbnailsPaginated(data.pastSessions||[], currentPage);
        initGamingFiltersAndPagination(data);
    } catch(e){console.error(e);}
}
function renderFeaturedVideo(item){
    const c=document.getElementById('featuredVideo');
    if(!c||!item) return;
    c.innerHTML='';
    const f=document.createElement('iframe');
    f.setAttribute('loading','lazy');
    f.setAttribute('allowfullscreen','');
    f.title=item.title||'Featured';
    f.src=item.youtubeId?`https://www.youtube.com/embed/${item.youtubeId}?rel=0`:item.videoUrl||'';
    c.appendChild(f);
}
function renderSchedule(list){
    const ul=document.getElementById('streamSchedule');
    if(!ul) return; ul.innerHTML='';
    list.forEach(s=>{
        const li=document.createElement('li');
        li.innerHTML=`<strong>${s.title}</strong> - ${s.platform||'YouTube'} <time>${new Date(s.iso).toLocaleString()}</time>`;
        ul.appendChild(li);
    });
}
function renderThumbnailsPaginated(list,page){
    const grid=document.getElementById('sessionThumbnails');
    if(!grid) return;
    const start=(page-1)*pageSize;
    grid.innerHTML='';
    list.slice(start,start+pageSize).forEach(item=>{
        const div=document.createElement('div');
        div.className='session-thumb';
        div.innerHTML=`<img src='${item.thumbnail||'https://via.placeholder.com/320x180'}'><div>${item.title}</div>`;
        div.onclick=()=>openVideoModal(item);
        grid.appendChild(div);
    });
}
function openVideoModal(item){
    const modal=document.createElement('div'); modal.className='video-modal';
    const inner=document.createElement('div'); inner.className='modal-inner';
    const close=document.createElement('button'); close.textContent='Close'; close.onclick=()=>document.body.removeChild(modal);
    const f=document.createElement('iframe'); f.allowFullscreen=true; f.title=item.title||'Video';
    f.src=item.youtubeId?`https://www.youtube.com/embed/${item.youtubeId}?rel=0&autoplay=1`:(item.videoUrl||'');
    f.style.width='100%'; f.style.height='100%';
    inner.appendChild(f); modal.appendChild(inner); modal.appendChild(close);
    modal.onclick=e=>{if(e.target===modal) document.body.removeChild(modal);};
    document.body.appendChild(modal);
}
function initGamingFiltersAndPagination(data){
    const charSelect=document.getElementById('filterCharacter');
    const protoSelect=document.getElementById('filterProtocol');
    const searchInput=document.getElementById('filterSearch');
    const sessions=data.pastSessions||[];
    if(charSelect){ new Set(sessions.flatMap(s=>s.characters||[])).forEach(c=>charSelect.appendChild(Object.assign(document.createElement('option'),{value:c,textContent:c}))); }
    if(protoSelect){ new Set(sessions.flatMap(s=>s.protocols||[])).forEach(p=>protoSelect.appendChild(Object.assign(document.createElement('option'),{value:p,textContent:p}))); }
    const onChange=()=>{currentPage=1; renderThumbnailsPaginated(applyFiltersToList(sessions),currentPage);};
    if(charSelect) charSelect.onchange=onChange; if(protoSelect) protoSelect.onchange=onChange; if(searchInput) searchInput.oninput=onChange;
}
function applyFiltersToList(list){
    const char=document.getElementById('filterCharacter')?.value||'';
    const proto=document.getElementById('filterProtocol')?.value||'';
    const search=(document.getElementById('filterSearch')?.value||'').toLowerCase();
    return list.filter(item=>{
        let ok=true;
        if(char) ok=ok&&(item.characters||[]).includes(char);
        if(proto) ok=ok&&(item.protocols||[]).includes(proto);
        if(search) ok=ok&&((item.title||'').toLowerCase().includes(search)||(item.description||'').toLowerCase().includes(search));
        return ok;
    });
}

// =====================================================
// SOCIAL FEED
// =====================================================
async function loadSocialFeed(){
    try{
        const res=await fetch('data/social.json');
        if(!res.ok) return;
        const data=await res.json();
        renderSocialPosts(data.posts||[]);
        renderSuggestedAccounts(data.suggested||[]);
    }catch(e){console.error(e);}
}
function renderSocialPosts(posts){
    const feed=document.getElementById('socialFeed'); if(!feed) return; feed.innerHTML='';
    posts.forEach(p=>{
        const card=document.createElement('article'); card.className='post-card';
        card.innerHTML=`<div>${p.author}</div><div>${p.content}</div>`;
        feed.appendChild(card);
    });
}
function renderSuggestedAccounts(list){
    const container=document.getElementById('suggestedAccounts'); if(!container) return; container.innerHTML='';
    list.forEach(acc=>{
        const row=document.createElement('div'); row.className='suggested';
        row.innerHTML=`<div>${acc.name}</div><button>${acc.following?'Following':'Follow'}</button>`;
        container.appendChild(row);
    });
}

// =====================================================
// FUTURISTIC CANVAS
// =====================================================
function initFuturisticCanvas(){
    const canvas=document.getElementById('futuristicCanvas');
    if(!canvas||!canvas.getContext) return;
    const ctx=canvas.getContext('2d');
    let w=canvas.clientWidth, h=canvas.clientHeight, particles=[], animId=null;
    function resize(){w=canvas.clientWidth;h=canvas.clientHeight; canvas.width=w; canvas.height=h; initParticles();}
    function initParticles(){particles=[]; for(let i=0;i<100;i++) particles.push({x:Math.random()*w,y:Math.random()*h,vx:(Math.random()-0.5)*0.35,vy:(Math.random()-0.5)*0.35,r:1+Math.random()*2});}
    function draw(){ctx.clearRect(0,0,w,h); particles.forEach(p=>{ctx.beginPath();ctx.arc(p.x,p.y,p.r,0,Math.PI*2);ctx.fillStyle='rgba(124,58,237,0.6)';ctx.fill();});}
    function step(){particles.forEach(p=>{p.x+=p.vx;p.y+=p.vy;if(p.x<0)p.x=w;if(p.x>w)p.x=0;if(p.y<0)p.y=h;if(p.y>h)p.y=0;}); draw(); animId=requestAnimationFrame(step);}
    function start(){if(animId) cancelAnimationFrame(animId); step();}
    function stop(){if(animId) cancelAnimationFrame(animId); animId=null;}
    window.addEventListener('resize',resize); resize(); start();
    canvas.__futuristic={start,stop,resize};
}

function setupFuturisticControls(){
    const canvas=document.getElementById('futuristicCanvas');
    const enable=document.getElementById('bgControlEnable');
    const opacity=document.getElementById('bgControlOpacity');
    if(!canvas||!enable||!opacity) return;
    enable.onchange=()=>{canvas.style.display=enable.checked?'block':'none'; if(enable.checked) canvas.__futuristic?.start(); else canvas.__futuristic?.stop();};
    opacity.oninput=()=>canvas.style.opacity=opacity.value;
}

// =====================================================
// VIDEO GRID
// =====================================================
function initVideoGrid(){
    document.querySelectorAll('.video-card').forEach(card=>{
        card.onclick=()=>openVideoModal({youtubeId:card.dataset.youtube,title:card.dataset.title,thumbnail:card.dataset.thumb});
    });
}

// =====================================================
// AI ASSISTANT MODAL
// =====================================================
function initAI(){
    const aiBtn=document.getElementById('openAI');
    if(!aiBtn) return;
    aiBtn.onclick=()=>{
        const modal=document.createElement('div'); modal.className='ai-modal';
        modal.innerHTML=`<div class='ai-inner'><button class='close'>Close</button><textarea placeholder='Ask me anything...'></textarea><button class='send'>Send</button><div class='response'></div></div>`;
        document.body.appendChild(modal);
        modal.querySelector('.close').onclick=()=>document.body.removeChild(modal);
        modal.querySelector('.send').onclick=async()=>{
            const txt=modal.querySelector('textarea').value;
            const respDiv=modal.querySelector('.response');
            respDiv.textContent='Thinking...';
            try{
                const res=await fetch('https://api.openai.com/v1/chat/completions',{method:'POST',headers:{'Content-Type':'application/json','Authorization':`Bearer ${OPENAI_API_KEY}`},body:JSON.stringify({model:'gpt-5-mini',messages:[{role:'user',content:txt}]})});
                const data=await res.json();
                respDiv.textContent=data.choices?.[0]?.message?.content||'No response';
            }catch(e){respDiv.textContent='Error';console.error(e);}
        };
    };
}

// =====================================================
// CONTACT FORM
// =====================================================
function initContactForm(){
    const form=document.getElementById('contactForm'); if(!form) return;
    form.onsubmit=e=>{
        e.preventDefault();
        alert('Demo: contact form submitted');
        form.reset();
    };
}

// =====================================================
// MOBILE MENU & THEME SWITCHER
// =====================================================
function setupMobileMenu(){
    const hamburger=document.querySelector('.hamburger');
    const navMenu=document.querySelector('.nav-menu');
    window.addEventListener('resize',()=>{if(window.innerWidth<=768){hamburger.style.display='flex';navMenu.style.display='none';}else{hamburger.style.display='none';navMenu.style.display='flex';}});
}
function toggleDarkMode(){
    document.body.classList.toggle('dark-mode');
    localStorage.setItem('theme',document.body.classList.contains('dark-mode')?'dark':'light');
}
window.addEventListener('load',()=>{if(localStorage.getItem('theme')==='dark') document.body.classList.add('dark-mode');});

// =====================================================
// LOADING STATE
// =====================================================
document.body.classList.add('loading');
window.addEventListener('load',()=>{document.body.classList.remove('loading'); console.log('KRREVIVEÉLITE Universe Loaded');});
