// Universe Map Data
const universeMap = [
    {category:"1. Home & Overview",subs:["Dashboard","Mission Brief","Announcements","System Status","Quick Links"]},
    {category:"2. Technology & Artifacts",subs:["Tech Tree","Ancient Artifacts","Blueprints","Research Lab","Inventory"]},
    {category:"3. Story & Media",subs:["Lore Archive","Cinematics","Audio Logs","Character Bios","Timeline"]},
    {category:"4. Faction & Mission",subs:["Faction Selection","Mission Board","Rankings","Reputation","Squad Management"]},
    {category:"5. Gaming Hub",subs:["Official Library","Indie Games","Fan-made Games","Launchers","Patch Notes","Multiplayer Lobby","VR/AR Zone"]},
    {category:"6. Engineering Hub",subs:["CAD Tools","Simulators","Project Portfolio","Code Repository","Hardware Specs"]},
    {category:"7. Gameplay Interactive",subs:["Live Events","Mini-Games","Daily Challenges","Achievement Tracker","Interactive Maps"]},
    {category:"8. Multimedia",subs:["Music Player","Gallery","Wallpapers","Soundboards","Asset Store"]},
    {category:"9. Community",subs:["Forums","Clans","Wiki","Fan Art","Polls & Voting"]},
    {category:"10. Social Hub",subs:["Feed","Direct Messages","Friend List","Voice Chat","Streaming Integration"]},
    {category:"11. Learning & Education",subs:["Tutorials","Documentation","Knowledge Base","Mentorship","Certification"]},
    {category:"12. Problem Solving",subs:["Bug Tracker","Feature Requests","Hackathons","Collaboration Board","Idea Incubator"]},
    {category:"13. Support Center",subs:["FAQ","Ticket System","Live Support","Account Recovery","Billing"]},
    {category:"14. Services Market",subs:["Freelance Board","Coaching","Design Services","Dev for Hire","Escrow"]},
    {category:"15. Analytics",subs:["Player Stats","Site Metrics","Performance Graphs","Heatmaps","Trend Analysis"]},
    {category:"16. Events",subs:["Tournament Brackets","Calendar","RSVP System","Virtual Convention","Prize Pools"]},
    {category:"17. Innovation Lab",subs:["Beta Tests","Experimental Features","Sandbox Mode","Dev Logs","Feedback Loop"]},
    {category:"18. User Feedback",subs:["Surveys","Suggestion Box","Rating System","Focus Groups","Roadmap Voting"]},
    {category:"19. Video & Streaming",subs:["Live Channels","VOD Archive","Streamer Tools","Overlays","Donation Setup"]},
    {category:"20. Courses Hub",subs:["Engineering Paths","Game Dev 101","Media Production","Leadership","Gamified Learning"]},
    {category:"21. Health & Wellness",subs:["Ergonomics","Eye Care","Focus Timers","Mental Health Resources","Break Reminders"]},
    {category:"22. Accessibility",subs:["Contrast Settings","Screen Reader Mode","Keybinding Remap","Colorblind Modes","Text Scaling"]},
    {category:"23. Personalization",subs:["Theme Editor","Avatar Creator","Interface Layout","Notification Config","Privacy"]},
    {category:"24. Safety & Security",subs:["2FA Setup","Login History","Block List","Report User","Data Export"]},
    {category:"25. Movie & Streaming",subs:["Watch Parties","Film Library","Director Commentary","Short Films","Reviews"]}
];

// DOM Elements
const sitemapOverlay = document.getElementById('sitemapOverlay');
const sitemapGrid = document.getElementById('sitemapGrid');
const sitemapSearch = document.getElementById('sitemapSearch');
const openMapBtn = document.getElementById('openMapBtn');
const closeMap = document.getElementById('closeMap');

// Render Sitemap
function renderSitemap(filter=""){
    sitemapGrid.innerHTML="";
    const lowerFilter = filter.toLowerCase();
    universeMap.forEach(section=>{
        const catMatch = section.category.toLowerCase().includes(lowerFilter);
        const subMatch = section.subs.some(sub=>sub.toLowerCase().includes(lowerFilter));
        if(catMatch || subMatch){
            const card = document.createElement('div');
            card.className='map-category';
            let subHtml = section.subs.map(sub=>{
                if(filter && !sub.toLowerCase().includes(lowerFilter) && !catMatch) return '';
                return `<div class="map-link-item" onclick="navigateTo('${sub}')">${sub}</div>`;
            }).join('');
            if(subHtml==='') subHtml=`<div style="color:#666;font-style:italic;padding:1rem;">No direct matches in subsections</div>`;
            card.innerHTML=`<h4>${section.category}</h4><div class="map-links">${subHtml}</div>`;
            sitemapGrid.appendChild(card);
        }
    });
}

// Open/Close Logic
function openSystemMap(){
    sitemapOverlay.classList.add('active');
    renderSitemap();
    setTimeout(()=>sitemapSearch.focus(),100);
}
openMapBtn.addEventListener('click',openSystemMap);
closeMap.addEventListener('click',()=>{sitemapOverlay.classList.remove('active');});
sitemapSearch.addEventListener('input',(e)=>{renderSitemap(e.target.value);});
window.navigateTo=(dest)=>{
    sitemapOverlay.classList.remove('active');
    alert(`Initializing Protocol: ${dest}\nLoading modules...`);
};

// Canvas Background
const canvas=document.getElementById('futuristicCanvas');
const ctx=canvas.getContext('2d');
let particles=[];
function resizeCanvas(){canvas.width=window.innerWidth;canvas.height=window.innerHeight;}
window.addEventListener('resize',resizeCanvas);
resizeCanvas();
class Particle{constructor(){this.x=Math.random()*canvas.width;this.y=Math.random()*canvas.height;this.vx=(Math.random()-0.5)*0.5;this.vy=(Math.random()-0.5)*0.5;}update(){this.x+=this.vx;this.y+=this.vy;if(this.x<0||this.x>canvas.width)this.vx*=-1;if(this.y<0||this.y>canvas.height)this.vy*=-1;}draw(){ctx.fillStyle='rgba(0,243,255,0.3)';ctx.beginPath();ctx.arc(this.x,this.y,1,0,Math.PI*2);ctx.fill();}}
function initParticles(){particles=[];for(let i=0;i<80;i++)particles.push(new Particle());}
function animate(){ctx.clearRect(0,0,canvas.width,canvas.height);particles.forEach(p=>{p.update();p.draw();});requestAnimationFrame(animate);}
initParticles();animate();
