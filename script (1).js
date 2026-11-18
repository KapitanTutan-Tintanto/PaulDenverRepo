// Scroll reveal
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('show');io.unobserve(e.target)}}),{threshold:.2});
document.querySelectorAll('.reveal').forEach(el=>io.observe(el));

// Toast helper
const toast=document.getElementById('toast');
function showToast(t){toast.textContent=t;toast.classList.add('on');setTimeout(()=>toast.classList.remove('on'),2500)}

// Search: highlight matches on the page and jump to the first one
document.getElementById('searchForm').addEventListener('submit',e=>{
  e.preventDefault();
  document.querySelectorAll('mark').forEach(m=>m.replaceWith(document.createTextNode(m.textContent)));
  document.body.normalize();
  const q=document.getElementById('searchInput').value.trim();
  if(!q) return;
  const re=new RegExp(q.replace(/[.*+?^${}()|[\]\\]/g,'\\$&'),'i');
  let first=null;
  document.querySelectorAll('.hero-sub,.about-text,.card p,.contact-msg,.title,h1').forEach(el=>{
    const w=document.createTreeWalker(el,NodeFilter.SHOW_TEXT);const nodes=[];
    while(w.nextNode())nodes.push(w.currentNode);
    nodes.forEach(n=>{const m=n.textContent.match(re);if(!m)return;
      const r=document.createRange();r.setStart(n,m.index);r.setEnd(n,m.index+m[0].length);
      const mk=document.createElement('mark');r.surroundContents(mk);first=first||mk});
  });
  first?first.scrollIntoView({behavior:'smooth',block:'center'}):showToast('No results found');
});

// Contact form (front-end only)
document.getElementById('contactForm').addEventListener('submit',e=>{
  e.preventDefault();
  const m=document.getElementById('message');
  if(!m.value.trim()){showToast('Please enter your message first');m.focus();return}
  showToast('Thanks! Your message was sent.');m.value='';
});

// Gentle parallax on hero logo
addEventListener('scroll',()=>{document.querySelector('.logo').style.translate='0 '+(scrollY*.12)+'px'},{passive:true});
