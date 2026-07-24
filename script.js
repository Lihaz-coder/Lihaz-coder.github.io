/* ============================================================
   DATA — edit these arrays to update the site. Nothing else
   in this file needs to change when content changes.
   ============================================================ */
const certificates = [
  {
    title: "Elements of AI",
    org: "University of Helsinki / MinnaLearn",
    date: "Jul 11, 2025",
    category: "Elements of AI",
    thumb: "assets/certificates/elements-of-ai.png",
    file: "assets/certificates/elements-of-ai.png",
    verify: "https://certificates.mooc.fi/validate/siok39wfafs"
  },
  {
    title: "AI for Beginners",
    org: "HP LIFE / HP Foundation",
    date: "Aug 3, 2025",
    category: "AI Certificates",
    thumb: "assets/certificates/ai-for-beginners.jpeg",
    file: "assets/certificates/ai-for-beginners.jpeg",
    verify: "assets/certificates/ai-for-beginners.jpeg"
  },
  {
    title: "Data Analytics and Business Intelligence",
    org: "DigiSkills.pk · Ignite / Virtual University",
    date: "Dec 17, 2025",
    category: "Data Analytics & Business Intelligence",
    thumb: "assets/certificates/digiskills-analytics.jpeg",
    file: "assets/certificates/digiskills-analytics.jpeg",
    verify: "https://digiskills.pk/verify"
  },
  {
    title: "Freelancer",
    org: "DigiSkills.pk · Ignite / Virtual University",
    date: "Dec 17, 2025",
    category: "Freelancer",
    thumb: "assets/certificates/digiskills-freelancing.jpeg",
    file: "assets/certificates/digiskills-freelancing.jpeg",
    verify: "https://digiskills.pk/verify"
  },
  {
    title: "Trading",
    org: "DigiSkills.pk · Ignite / Virtual University",
    date: "Dec 17, 2025",
    category: "Trading",
    thumb: "assets/certificates/trading certificate.jpeg",
    file: "assets/certificates/trading certificate.jpeg",
    verify: "https://Trading.binance/verify"
  }
];

const projects = []; // add { title, desc, tech:[], github, demo } objects here as projects ship

const achievements = [
  { icon:"🎓", title:"BS AI — 6th Semester", desc:"Completed at Bacha Khan University Charsadda" },
  { icon:"🧠", title:"Elements of AI", desc:"University of Helsinki / MinnaLearn, 2 ECTS" },
  { icon:"📊", title:"Data Analytics & BI", desc:"DigiSkills.pk training program, 2025" },
  { icon:"🤖", title:"AI for Beginners", desc:"HP LIFE certification, 2025" },
  { icon:"🏅", title:"Grade B — HSSC", desc:"722/1100, Govt. Degree College Badragga" },
];

/* Each social entry carries its own accent color so the glass card can
   glow with a brand-true tint on hover, instead of one flat fill icon. */
const socials = [
  {
    icon:"fa-brands fa-tiktok",
    name:"TikTok",
    handle:"@lihazahmad",
    url:"https://www.tiktok.com/@lihazahmad4000?_r=1&_t=ZS-98EqgJ2Hm2U",
    color:"#e8e8ea",
    tint:"rgba(232,232,234,.22)"
  },
  {
    icon:"fa-brands fa-facebook-f",
    name:"Facebook",
    handle:"/lihazahmad",
    url:"https://www.facebook.com/share/1GE2CSxAS5/",
    color:"#5b9bf0",
    tint:"rgba(91,155,240,.22)"
  },
  {
    icon:"fa-brands fa-whatsapp",
    name:"WhatsApp",
    handle:"+92 347 9253967",
    url:"https://wa.me/923479253967",
    color:"#3fce8a",
    tint:"rgba(63,206,138,.22)"
  },
  {
    icon:"fa-brands fa-instagram",
    name:"Instagram",
    handle:"@ai_prompting_master",
    url:"https://www.instagram.com/ai_prompting_master",
    color:"#e0729a",
    tint:"rgba(224,114,154,.22)"
  },
  {
    icon:"fa-brands fa-linkedin-in",
    name:"LinkedIn",
    handle:"Lihaz Ahmad",
    url:"https://www.linkedin.com/in/lihaz-ahmad-354068325",
    color:"#4f9fe8",
    tint:"rgba(79,159,232,.22)"
  }
];

const roles = ["Artificial Intelligence Student","Python Developer","Machine Learning Enthusiast","Data Analytics Learner","Future AI Engineer","Generative AI Explorer"];

const faqs = [
  { q:"What is Lihaz studying?", a:"BS Artificial Intelligence at Bacha Khan University Charsadda (BKUC), Pakistan — currently past the 6th semester." },
  { q:"What certificates does he have?", a:"Elements of AI (University of Helsinki/MinnaLearn), AI for Beginners (HP LIFE), and Data Analytics & Business Intelligence (DigiSkills.pk). See the Certificates section for verification links and downloads." },
  { q:"What skills is he building?", a:"Python, AI fundamentals, machine learning, generative AI, and data analytics/BI — plus problem solving, research, and communication." },
  { q:"Is he available for internships?", a:"Yes — Lihaz is looking for his first internship or research assistantship in AI or data. Use the Contact section to reach out." },
  { q:"How is this site kept up to date?", a:"Certificates, projects, and achievements are stored as simple data lists in the site's code, so new entries can be added without a redesign." },
];

/* ============================================================
   RENDER — certificates
   ============================================================ */
function renderCerts(list){
  const grid = document.getElementById('certGrid');
  if(!list.length){ grid.innerHTML = '<div class="emptystate">No certificates match your search.</div>'; return; }
  grid.innerHTML = list.map(c => `
    <div class="certcard">
      <div class="certthumb">
        ${c.thumb ? `<img src="${c.thumb}" alt="${c.title}">` : `<div class="noimg"><span class="glyph">📄</span>${c.title}</div>`}
        <div class="certcat">${c.category}</div>
      </div>
      <div class="certbody">
        <h4>${c.title}</h4>
        <div class="org">${c.org}</div>
        <div class="date">${c.date}</div>
        <div class="certactions">
          <a class="view" href="${c.file}" target="_blank" rel="noopener">View</a>
          <a class="dl" href="${c.file}" download>Download</a>
        </div>
      </div>
    </div>
  `).join('');
}

const cats = ["All", ...new Set(certificates.map(c=>c.category))];
document.getElementById('certFilters').innerHTML = cats.map((c,i)=>
  `<div class="chip ${i===0?'on':''}" data-cat="${c}">${c}</div>`).join('');
document.getElementById('certCountId').textContent = certificates.length + " Verified";
document.getElementById('certArchiveCount').textContent = certificates.length + " verified certificates";

let activeCat = "All";
function applyFilters(){
  const q = document.getElementById('certSearch').value.toLowerCase();
  const filtered = certificates.filter(c =>
    (activeCat === "All" || c.category === activeCat) &&
    (c.title.toLowerCase().includes(q) || c.org.toLowerCase().includes(q))
  );
  renderCerts(filtered);
}
document.getElementById('certFilters').addEventListener('click', e=>{
  const chip = e.target.closest('.chip'); if(!chip) return;
  document.querySelectorAll('.chip').forEach(c=>c.classList.remove('on'));
  chip.classList.add('on'); activeCat = chip.dataset.cat; applyFilters();
});
document.getElementById('certSearch').addEventListener('input', applyFilters);
renderCerts(certificates);

/* ============================================================
   RENDER — projects
   ============================================================ */
function renderProjects(){
  const grid = document.getElementById('projGrid');
  let html = projects.map((p,i)=>`
    <div class="projcard">
      <div class="pnum">0${i+1}</div>
      <h4>${p.title}</h4>
      <p>${p.desc}</p>
      <div class="projtech">${(p.tech||[]).map(t=>`<span>${t}</span>`).join('')}</div>
      <div class="projlinks">
        ${p.github?`<a href="${p.github}" target="_blank">GitHub →</a>`:''}
        ${p.demo?`<a href="${p.demo}" target="_blank">Live Demo →</a>`:''}
      </div>
    </div>`).join('');
  html += `<div class="addcard"><div class="plus">+</div>Future projects will appear here. Add entries to the <span class="mono">projects</span> array in the site data.</div>`;
  grid.innerHTML = html;
}
renderProjects();

/* ============================================================
   RENDER — achievements
   ============================================================ */
document.getElementById('achWrap').innerHTML = achievements.map(a=>`
  <div class="achcard"><div class="aicon">${a.icon}</div><h5>${a.title}</h5><p>${a.desc}</p></div>
`).join('');

/* ============================================================
   RENDER — social (single source of truth, brand-tinted glass cards)
   ============================================================ */
function renderSocialGrid(){
  const container = document.getElementById('socialGrid');
  if(!container) return;
  container.innerHTML = socials.map(s => `
    <a href="${s.url}" target="_blank" rel="noopener noreferrer" class="social-card reveal show"
       style="--card-color:${s.color}; --card-tint:${s.tint};">
      <div class="social-card-icon"><i class="${s.icon}"></i></div>
      <div class="social-card-info">
        <span class="social-card-name">${s.name}</span>
        <span class="social-card-handle">${s.handle}</span>
      </div>
      <div class="social-card-arrow"><i class="fa-solid fa-arrow-up-right-from-square"></i></div>
    </a>
  `).join('');
}
renderSocialGrid();

/* ============================================================
   MOBILE MENU
   ============================================================ */
const burger = document.getElementById('burger');
const mobileMenu = document.getElementById('mobileMenu');
burger.addEventListener('click', ()=>{
  const open = mobileMenu.classList.toggle('open');
  burger.classList.toggle('on', open);
  burger.setAttribute('aria-expanded', open ? 'true' : 'false');
});
mobileMenu.querySelectorAll('a').forEach(a=>a.addEventListener('click', ()=>{
  mobileMenu.classList.remove('open');
  burger.classList.remove('on');
  burger.setAttribute('aria-expanded', 'false');
}));

/* ============================================================
   SCROLL REVEAL
   ============================================================ */
const io = new IntersectionObserver(entries=>{
  entries.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add('show'); } });
},{threshold:.15});
document.querySelectorAll('.reveal').forEach(el=>io.observe(el));

document.querySelectorAll('.fill').forEach(el=>{
  const io2 = new IntersectionObserver(entries=>{
    entries.forEach(e=>{ if(e.isIntersecting){ e.target.style.width = e.target.dataset.w + '%'; io2.disconnect(); } });
  },{threshold:.4});
  io2.observe(el);
});

/* ============================================================
   SIGNAL RAIL — scroll progress (signature element)
   ============================================================ */
const signalFill = document.getElementById('signalFill');
function updateSignalRail(){
  const doc = document.documentElement;
  const scrolled = doc.scrollTop;
  const max = doc.scrollHeight - doc.clientHeight;
  const pct = max > 0 ? (scrolled / max) * 100 : 0;
  if(signalFill) signalFill.style.height = pct + '%';
}
window.addEventListener('scroll', updateSignalRail, { passive:true });
updateSignalRail();

/* active nav-link highlight, tied to the same scroll-spy idea */
const navLinks = document.querySelectorAll('[data-nav]');
const spySections = [...navLinks].map(a => document.querySelector(a.getAttribute('href'))).filter(Boolean);
const spyObserver = new IntersectionObserver(entries=>{
  entries.forEach(entry=>{
    const id = '#' + entry.target.id;
    const link = document.querySelector(`[data-nav][href="${id}"]`);
    if(!link) return;
    if(entry.isIntersecting){
      navLinks.forEach(l=>l.style.color = '');
      link.style.color = 'var(--ink)';
    }
  });
},{ rootMargin: '-40% 0px -50% 0px' });
spySections.forEach(s=>spyObserver.observe(s));

/* ============================================================
   NEURAL NETWORK BACKGROUND
   ============================================================ */
const canvas = document.getElementById('netbg');
const ctx = canvas.getContext('2d');
let W, H, nodes = [];
function resize(){
  W = canvas.width = window.innerWidth;
  H = canvas.height = window.innerHeight;
}
resize();
window.addEventListener('resize', resize);

const NODE_COUNT = window.innerWidth < 700 ? 32 : 58;
for(let i=0;i<NODE_COUNT;i++){
  nodes.push({
    x: Math.random()*W, y: Math.random()*H,
    vx: (Math.random()-0.5)*0.22, vy:(Math.random()-0.5)*0.22,
    r: Math.random()*1.6+0.6
  });
}
const linkColors = ['201,146,47','43,182,149','201,123,90'];
function animate(){
  ctx.clearRect(0,0,W,H);
  for(let i=0;i<nodes.length;i++){
    const n = nodes[i];
    n.x += n.vx; n.y += n.vy;
    if(n.x<0||n.x>W) n.vx*=-1;
    if(n.y<0||n.y>H) n.vy*=-1;
  }
  for(let i=0;i<nodes.length;i++){
    for(let j=i+1;j<nodes.length;j++){
      const a=nodes[i], b=nodes[j];
      const d = Math.hypot(a.x-b.x, a.y-b.y);
      if(d < 150){
        ctx.strokeStyle = `rgba(${linkColors[(i+j)%3]},${(1-d/150)*0.16})`;
        ctx.lineWidth = 0.6;
        ctx.beginPath(); ctx.moveTo(a.x,a.y); ctx.lineTo(b.x,b.y); ctx.stroke();
      }
    }
  }
  for(const n of nodes){
    ctx.beginPath();
    ctx.arc(n.x, n.y, n.r, 0, Math.PI*2);
    ctx.fillStyle = `rgba(230,220,200,0.5)`;
    ctx.fill();
  }
  requestAnimationFrame(animate);
}
animate();

/* ============================================================
   TYPING ROLE ROTATOR
   ============================================================ */
const typingEl = document.getElementById('typingText');
let rIdx=0, cIdx=0, deleting=false;
function typeLoop(){
  const word = roles[rIdx];
  if(!deleting){
    cIdx++;
    typingEl.textContent = word.slice(0,cIdx);
    if(cIdx === word.length){ deleting = true; setTimeout(typeLoop, 1400); return; }
  } else {
    cIdx--;
    typingEl.textContent = word.slice(0,cIdx);
    if(cIdx === 0){ deleting = false; rIdx = (rIdx+1) % roles.length; }
  }
  setTimeout(typeLoop, deleting ? 35 : 65);
}
typeLoop();

/* ============================================================
   DASHBOARD COUNTERS
   ============================================================ */
const dashStats = [
  { num: certificates.length, lbl: "Verified certificates" },
  { num: 5, lbl: "Core AI/technical skills tracked" },
  { num: projects.length, lbl: "Projects shipped so far" },
  { num: 6, lbl: "Semesters completed of BS AI" },
];
document.getElementById('dashGrid').innerHTML = dashStats.map(s=>
  `<div class="statcard"><div class="num" data-target="${s.num}">0</div><div class="lbl">${s.lbl}</div></div>`).join('');
const dashObs = new IntersectionObserver(entries=>{
  entries.forEach(e=>{
    if(e.isIntersecting){
      e.target.querySelectorAll('.num').forEach(el=>{
        const target = parseInt(el.dataset.target,10);
        let cur = 0;
        const step = Math.max(1, Math.ceil(target/40));
        const t = setInterval(()=>{ cur += step; if(cur>=target){cur=target; clearInterval(t);} el.textContent = cur; }, 30);
      });
      dashObs.disconnect();
    }
  });
},{threshold:.3});
dashObs.observe(document.getElementById('dashGrid'));

/* ============================================================
   ASK ABOUT LIHAZ (static FAQ)
   ============================================================ */
document.getElementById('faqBody').innerHTML = faqs.map(f=>`<button class="faqQ" data-a="${encodeURIComponent(f.a)}">${f.q}</button>`).join('') + `<p class="faqNote">Static Q&A — not a live AI backend.</p>`;
const faqBtn = document.getElementById('faqBtn');
const faqPanel = document.getElementById('faqPanel');
document.getElementById('faqClose').addEventListener('click', ()=> faqPanel.classList.remove('open'));
faqBtn.addEventListener('click', ()=> faqPanel.classList.toggle('open'));
document.getElementById('faqBody').addEventListener('click', e=>{
  const btn = e.target.closest('.faqQ'); if(!btn) return;
  const existing = document.querySelector('.faqA'); if(existing) existing.remove();
  const ans = document.createElement('div');
  ans.className='faqA';
  ans.textContent = decodeURIComponent(btn.dataset.a);
  btn.insertAdjacentElement('afterend', ans);
});