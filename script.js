const profiles = {
  gaurav: {
    number: "01", name: "Gaurav", role: "TEAM LEADER",
    image: "assets/team/gaurav.jpg",
    description: "Coordinates the team, keeps the work aligned and turns four individual strengths into one clear direction.",
    tags: ["Leadership", "Coordination", "Decision making"]
  },
  shruthik: {
    number: "02", name: "Shruthik", role: "ANALYST",
    image: "assets/team/shruthik.jpg",
    description: "Transforms information into structured insight and gives the team a strong analytical foundation.",
    tags: ["Research", "Analysis", "Insights"]
  },
  palak: {
    number: "03", name: "Palak", role: "PRESENTER",
    image: "assets/team/palak.jpg",
    description: "Turns the team's work into a clear, engaging story that is easy to understand and remember.",
    tags: ["Communication", "Storytelling", "Presentation"]
  },
  shraddha: {
    number: "04", name: "Shraddha", role: "CODER",
    image: "assets/team/shraddha.jpg",
    description: "Translates ideas into digital experiences and gives the team's concepts a functional form.",
    tags: ["Development", "Technology", "Implementation"]
  }
};

profiles.gaurav.email = "gaurav24extc@student.mes.ac.in";
profiles.gaurav.phone = "7824359219";
profiles.shruthik.email = "shruthik24extc@student.mes.ac.in";
profiles.shruthik.phone = "9234710934";
profiles.palak.email = "palak24extc@student.mes.ac.in";
profiles.palak.phone = "9XXXXXXXXX";
profiles.palak.placeholder = true;
profiles.shraddha.email = "shraddha24extc@student.mes.ac.in";
profiles.shraddha.phone = "9XXXXXXXXX";
profiles.shraddha.placeholder = true;
profiles.gaurav.projects = ["Team Portfolio — planning and team coordination", "Campus Event Planner — requirements and delivery planning"];
profiles.shruthik.projects = ["Student Feedback Analysis — research and insight summaries", "Team Portfolio — content research and structure"];
profiles.palak.projects = ["Team Portfolio — presentation and storytelling", "Campus Innovation Pitch — slides and concept communication"];
profiles.shraddha.projects = ["Team Portfolio — responsive interface development", "Student Task Tracker — interface and interactions"];
let previousFocus;
const modal = document.getElementById("profileModal");
const modalImage = document.getElementById("modalImage");
const modalName = document.getElementById("modalName");
const modalRole = document.getElementById("modalRole");
const modalNumber = document.getElementById("modalNumber");
const modalDescription = document.getElementById("modalDescription");
const modalTags = document.getElementById("modalTags");

document.querySelectorAll("[data-open]").forEach(btn => {
  btn.addEventListener("click", () => {
    previousFocus = btn;
    const p = profiles[btn.dataset.open];
    modalImage.src = p.image;
    modalImage.alt = `${p.name} portrait`;
    modalName.textContent = p.name;
    modalRole.textContent = p.role;
    modalNumber.textContent = p.number;
    modalDescription.textContent = p.description;
    modalTags.innerHTML = p.tags.map(t => `<span>${t}</span>`).join("");
    document.getElementById("modalProjects").replaceChildren(...p.projects.map(project => {const li=document.createElement("li");li.textContent=project;return li;}));
    const details=document.getElementById("contactDetails");
    details.hidden=true;
    document.getElementById("contactBtn").setAttribute("aria-expanded","false");
    details.replaceChildren();
    if(p.placeholder){const note=document.createElement("p");note.className="contact-note";note.textContent="Suggested email and placeholder phone — replace with verified details.";details.append(note);}
    for(const [label,value,scheme] of [["Email",p.email,"mailto:"],["Phone",p.phone,"tel:"]]){const row=document.createElement("p");const title=document.createElement("strong");title.textContent=label+": ";const link=document.createElement(p.placeholder?"span":"a");link.textContent=value;if(!p.placeholder)link.href=scheme+value;row.append(title,link);details.append(row);}
    modal.classList.add("open");
    modal.setAttribute("aria-hidden", "false");
    document.body.classList.add("modal-open");
    document.querySelector(".modal-close").focus();
  });
});

document.querySelectorAll("[data-close]").forEach(el => el.addEventListener("click", closeModal));
document.addEventListener("keydown", e => { if (e.key === "Escape") closeModal(); });
function closeModal(){
  modal.classList.remove("open");
  modal.setAttribute("aria-hidden", "true");
  document.body.classList.remove("modal-open");
  if(previousFocus){previousFocus.focus();previousFocus=null;}
}

const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");
menuBtn.addEventListener("click", () => {
  const open = navLinks.classList.toggle("open");
  menuBtn.setAttribute("aria-expanded", String(open));
});
document.querySelectorAll(".nav-links a").forEach(a => a.addEventListener("click", () => {navLinks.classList.remove("open");menuBtn.setAttribute("aria-expanded","false");}));

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
},{threshold:.12});
document.querySelectorAll(".reveal").forEach(el => observer.observe(el));

const counters = document.querySelectorAll("[data-count]");
const counterObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if(!entry.isIntersecting) return;
    const el = entry.target;
    const target = Number(el.dataset.count);
    let start = 0;
    const duration = 900;
    const startTime = performance.now();
    const tick = now => {
      const progress = Math.min((now - startTime) / duration, 1);
      el.textContent = Math.floor(progress * target);
      if(progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
    counterObserver.unobserve(el);
  });
},{threshold:.5});
counters.forEach(c => counterObserver.observe(c));

document.getElementById("year").textContent = new Date().getFullYear();

const themeButton=document.getElementById("themeToggle");
function updateTheme(){const light=document.documentElement.dataset.theme==="light";themeButton.innerHTML=light?'☾ <span>Dark mode</span>':'☀ <span>Light mode</span>';themeButton.setAttribute("aria-label",light?"Switch to dark mode":"Switch to light mode");document.querySelector('meta[name="theme-color"]').content=light?"#f7f8fb":"#090d14";}
themeButton.addEventListener("click",()=>{const next=document.documentElement.dataset.theme==="light"?"dark":"light";document.documentElement.dataset.theme=next;try{localStorage.setItem("4thrivers-theme",next)}catch(e){}updateTheme();});updateTheme();
document.getElementById("contactBtn").addEventListener("click",event=>{const details=document.getElementById("contactDetails");details.hidden=!details.hidden;event.currentTarget.setAttribute("aria-expanded",String(!details.hidden));if(!details.hidden)details.scrollIntoView({block:"nearest",behavior:"smooth"});});
modal.addEventListener("keydown",e=>{if(e.key!=="Tab")return;const focusable=[...modal.querySelectorAll('button,a[href],[tabindex="0"]')].filter(el=>el.getClientRects().length);const first=focusable[0],last=focusable[focusable.length-1];if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus();}else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus();}});
const sections=[...document.querySelectorAll('main > section[id]')];
const activeObserver=new IntersectionObserver(entries=>{entries.forEach(entry=>{if(entry.isIntersecting)document.querySelectorAll('.nav-links a').forEach(a=>{const active=a.hash==='#'+entry.target.id;a.classList.toggle('active',active);if(active)a.setAttribute('aria-current','location');else a.removeAttribute('aria-current');});});},{threshold:.5});sections.forEach(s=>activeObserver.observe(s));
