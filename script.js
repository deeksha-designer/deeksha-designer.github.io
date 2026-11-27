const menuButton=document.querySelector('.menu-toggle');
const nav=document.querySelector('#primary-nav');
const menuClose=document.querySelector('.menu-close');
let menuReturnFocus=null;
function setMenu(open){
  if(!menuButton||!nav)return;
  menuButton.setAttribute('aria-expanded',String(open));
  menuButton.setAttribute('aria-label',open?'Close full menu':'Open full menu');
  nav.classList.toggle('is-open',open);
  nav.setAttribute('aria-hidden',String(!open));
  document.body.classList.toggle('menu-open',open);
  if(open){menuReturnFocus=document.activeElement;requestAnimationFrame(()=>menuClose?.focus())}
  else if(menuReturnFocus instanceof HTMLElement){menuReturnFocus.focus()}
}
menuButton?.addEventListener('click',()=>setMenu(menuButton.getAttribute('aria-expanded')!=='true'));
menuClose?.addEventListener('click',()=>setMenu(false));
nav?.addEventListener('click',event=>{if(event.target.closest('a'))setMenu(false)});
document.addEventListener('keydown',event=>{if(event.key==='Escape'&&nav?.classList.contains('is-open'))setMenu(false)});

const stageContent={
  pre:{label:'Pre-Primary',title:'Early foundations, thoughtfully begun.',body:'The school serves learners from Pre-Nursery onward. Detailed stage curriculum, assessment and activity information awaits academic approval.',image:'assets/gallery-joy.jpg',alt:'A young Scholars Pride learner'},
  primary:{label:'Primary · Classes I–V',title:'Foundations grow into confident learning.',body:'The official class-wise syllabus is available through the school. Stage-specific teaching, assessment and activity information awaits academic approval.',image:'https://www.scholarspride.edu.in/wp-content/uploads/2025/11/IMG_20251018_110417-scaled.jpg',alt:'Primary learners from the official Scholars Pride gallery'},
  middle:{label:'Middle · Classes VI–VIII',title:'Curiosity meets greater independence.',body:'Subject pathways, teaching methods and verified co-curricular links require confirmation from the academic team before publication.',image:'https://www.scholarspride.edu.in/wp-content/uploads/2025/11/IMG_20251029_104337568-scaled.jpg',alt:'Middle-school learners from the official Scholars Pride gallery'},
  secondary:{label:'Secondary · Classes IX–X',title:'Focused learning with clear resources.',body:'Published syllabus, examination information and verified results are available through the school’s official sources.',image:'https://www.scholarspride.edu.in/wp-content/uploads/2025/11/IMG_20251029_104738681-scaled.jpg',alt:'Secondary learners from the official Scholars Pride gallery'},
  senior:{label:'Senior Secondary · Classes XI–XII',title:'Senior learning, easier to navigate.',body:'Streams, subject combinations, eligibility and counselling information must be confirmed by the school before publication.',image:'https://www.scholarspride.edu.in/wp-content/uploads/2025/11/DSC09951-1-scaled.jpg',alt:'Senior learners from the official Scholars Pride gallery'}
};
const stageTabs=[...document.querySelectorAll('.stage-tabs [role="tab"]')];
const stagePanel=document.querySelector('#stage-panel');
const journeyImage=document.querySelector('.journey-image');
function selectStage(key,focus=false){const tab=stageTabs.find(item=>item.dataset.stage===key);if(!tab)return;stageTabs.forEach(item=>item.setAttribute('aria-selected',String(item===tab)));const item=stageContent[key];stagePanel.innerHTML=`<p class="section-context">${item.label}</p><h3>${item.title}</h3><p>${item.body}</p><div><a class="text-link" href="https://www.scholarspride.edu.in/academics-overview/">Academic overview <span>→</span></a><a class="text-link" href="https://www.scholarspride.edu.in/academic-syllabus/">View syllabus <span>↗</span></a></div>`;if(journeyImage){journeyImage.classList.add('is-changing');requestAnimationFrame(()=>{journeyImage.src=item.image;journeyImage.alt=item.alt;journeyImage.classList.remove('is-changing')})}if(focus)tab.focus()}
stageTabs.forEach((tab,index)=>{tab.addEventListener('click',()=>selectStage(tab.dataset.stage));tab.addEventListener('keydown',event=>{if(!['ArrowRight','ArrowLeft','ArrowDown','ArrowUp','Home','End'].includes(event.key))return;event.preventDefault();let next=index;if(event.key==='Home')next=0;else if(event.key==='End')next=stageTabs.length-1;else if(['ArrowRight','ArrowDown'].includes(event.key))next=(index+1)%stageTabs.length;else next=(index-1+stageTabs.length)%stageTabs.length;selectStage(stageTabs[next].dataset.stage,true)})});
document.querySelectorAll('[data-select-stage]').forEach(link=>link.addEventListener('click',()=>selectStage(link.dataset.selectStage)));

const results={x:{year:'2025–26',title:'Class X results',body:'Open the school-published result image for the stated academic year.',href:'https://www.scholarspride.edu.in/wp-content/uploads/2026/04/Class-X-Insta.jpg'},xii:{year:'2024–25',title:'Class XII results',body:'Open the official result PDF published by the school.',href:'https://www.scholarspride.edu.in/wp-content/uploads/2025/12/Result-Class-XII.pdf'},jee:{year:'2024–25',title:'JEE Main achievements',body:'Open the official JEE Main achievement PDF published by the school.',href:'https://www.scholarspride.edu.in/wp-content/uploads/2025/12/Jee-Mains-2024-25.pdf'}};
const resultTabs=[...document.querySelectorAll('.result-tabs button')];
const resultPanel=document.querySelector('#result-panel');
resultTabs.forEach(tab=>tab.addEventListener('click',()=>{resultTabs.forEach(item=>item.setAttribute('aria-selected',String(item===tab)));const item=results[tab.dataset.result];resultPanel.innerHTML=`<p class="result-year">${item.year}</p><h3>${item.title}</h3><p>${item.body}</p><a class="button" href="${item.href}">View original source ↗</a>`}));

const slides=[...document.querySelectorAll('.slide')];
const dotsWrap=document.querySelector('.slider-dots');
const pauseButton=document.querySelector('.slider-pause');
let slideIndex=0,slideTimer,isPaused=false;
slides.forEach((slide,index)=>{const dot=document.createElement('button');dot.type='button';dot.setAttribute('aria-label',`Show banner ${index+1}`);dot.addEventListener('click',()=>showSlide(index,true));dotsWrap?.append(dot)});
const sliderDots=[...document.querySelectorAll('.slider-dots button')];
function showSlide(index,restart=false){slides[slideIndex]?.classList.remove('is-active');slideIndex=(index+slides.length)%slides.length;slides.forEach((slide,i)=>slide.setAttribute('aria-hidden',String(i!==slideIndex)));slides[slideIndex]?.classList.add('is-active');sliderDots.forEach((dot,i)=>dot.setAttribute('aria-current',String(i===slideIndex)));if(restart)startSlider()}
function startSlider(){clearInterval(slideTimer);if(!isPaused&&!matchMedia('(prefers-reduced-motion: reduce)').matches)slideTimer=setInterval(()=>showSlide(slideIndex+1),6500)}
document.querySelector('.slider-arrow.next')?.addEventListener('click',()=>showSlide(slideIndex+1,true));
document.querySelector('.slider-arrow.prev')?.addEventListener('click',()=>showSlide(slideIndex-1,true));
pauseButton?.addEventListener('click',()=>{isPaused=!isPaused;pauseButton.setAttribute('aria-pressed',String(isPaused));pauseButton.textContent=isPaused?'Play':'Pause';startSlider()});
if(slides.length){showSlide(0);startSlider();const slider=document.querySelector('.hero-slider');slider.addEventListener('keydown',event=>{if(event.key==='ArrowRight')showSlide(slideIndex+1,true);if(event.key==='ArrowLeft')showSlide(slideIndex-1,true)});new IntersectionObserver(([entry])=>{if(!entry.isIntersecting){clearInterval(slideTimer)}else startSlider()},{threshold:.1}).observe(slider)}

const campusButtons=[...document.querySelectorAll('[data-campus-title]')].filter(button=>button.getAttribute('aria-hidden')!=='true');
const campusDetail=document.querySelector('.campus-detail');
campusButtons.forEach(button=>button.addEventListener('click',()=>{
  campusButtons.forEach(item=>item.setAttribute('aria-pressed',String(item===button)));
}));
campusButtons[0]?.setAttribute('aria-pressed','true');

const heroSlider=document.querySelector('.hero-slider');
let swipeStartX=0;
heroSlider?.addEventListener('pointerdown',event=>{swipeStartX=event.clientX});
heroSlider?.addEventListener('pointerup',event=>{const distance=event.clientX-swipeStartX;if(Math.abs(distance)>55)showSlide(slideIndex+(distance<0?1:-1),true)});

if(!matchMedia('(prefers-reduced-motion: reduce)').matches){const sections=document.querySelectorAll('main .section');sections.forEach(section=>section.classList.add('reveal'));const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('is-visible');observer.unobserve(entry.target)}}),{threshold:.08});sections.forEach(section=>observer.observe(section))}

const countNumbers=[...document.querySelectorAll('[data-count]')];
if(countNumbers.length&&!matchMedia('(prefers-reduced-motion: reduce)').matches){
  countNumbers.forEach(number=>number.textContent='0');
  const countObserver=new IntersectionObserver(entries=>entries.forEach(entry=>{
    if(!entry.isIntersecting)return;
    const number=entry.target;
    const target=Number(number.dataset.count);
    const start=performance.now();
    const duration=1100;
    const update=now=>{
      const progress=Math.min((now-start)/duration,1);
      const eased=1-Math.pow(1-progress,3);
      number.textContent=Math.round(target*eased).toLocaleString('en-IN',{useGrouping:false});
      if(progress<1)requestAnimationFrame(update);
    };
    requestAnimationFrame(update);
    countObserver.unobserve(number);
  }),{threshold:.55});
  countNumbers.forEach(number=>countObserver.observe(number));
}

const searchDialog=document.querySelector('#site-search');
const searchOpen=document.querySelector('.search-open');
const searchInput=document.querySelector('#site-search-input');
const searchResults=document.querySelector('.search-results');
const searchableLinks=[...document.querySelectorAll('#primary-nav a,.footer-links a,main a[href]')]
  .filter((link,index,links)=>link.textContent.trim()&&links.findIndex(item=>item.href===link.href)===index)
  .map(link=>({label:link.textContent.replace(/[↗→]/g,'').trim(),href:link.getAttribute('href')}));

function renderSearch(query=''){
  if(!searchResults)return;
  const term=query.trim().toLowerCase().replace(/\bfees\b/g,'fee');
  const matches=(term?searchableLinks.filter(item=>`${item.label} ${item.href}`.toLowerCase().includes(term)):searchableLinks.slice(0,8)).slice(0,12);
  searchResults.innerHTML=matches.length?matches.map(item=>`<a href="${item.href}">${item.label}</a>`).join(''):'<p class="search-empty">No matching resource found. Try “fees”, “calendar”, “results” or “campus”.</p>';
}
searchOpen?.addEventListener('click',()=>{renderSearch();searchDialog.showModal();requestAnimationFrame(()=>searchInput?.focus())});
searchInput?.addEventListener('input',()=>renderSearch(searchInput.value));
searchResults?.addEventListener('click',event=>{if(event.target.closest('a'))searchDialog.close()});
searchDialog?.addEventListener('click',event=>{if(event.target===searchDialog)searchDialog.close()});

const starTrack=document.querySelector('.star-track');
const moveStarTrack=direction=>{
  if(!starTrack)return;
  const card=starTrack.querySelector('.star-profile');
  const gap=parseFloat(getComputedStyle(starTrack).columnGap)||0;
  const distance=(card?.getBoundingClientRect().width||starTrack.clientWidth*.8)+gap;
  starTrack.scrollBy({left:direction*distance,behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth'});
};
document.querySelector('.star-prev')?.addEventListener('click',()=>moveStarTrack(-1));
document.querySelector('.star-next')?.addEventListener('click',()=>moveStarTrack(1));

const principalSlides=[...document.querySelectorAll('.principal-slide')];
const principalStatus=document.querySelector('.principal-status');
let principalIndex=0;
function showPrincipal(index){
  if(!principalSlides.length)return;
  principalIndex=(index+principalSlides.length)%principalSlides.length;
  principalSlides.forEach((slide,i)=>{
    const active=i===principalIndex;
    slide.classList.toggle('is-active',active);
    slide.setAttribute('aria-hidden',String(!active));
  });
  if(principalStatus)principalStatus.textContent=`${principalIndex+1} / ${principalSlides.length}`;
}
document.querySelector('.principal-prev')?.addEventListener('click',()=>showPrincipal(principalIndex-1));
document.querySelector('.principal-next')?.addEventListener('click',()=>showPrincipal(principalIndex+1));
showPrincipal(0);

const alumniTrack=document.querySelector('.alumni-track');
const moveAlumni=direction=>{
  if(!alumniTrack)return;
  const card=alumniTrack.querySelector('.alumni-card');
  const gap=parseFloat(getComputedStyle(alumniTrack).columnGap)||22;
  const distance=(card?.getBoundingClientRect().width||alumniTrack.clientWidth*.8)+gap;
  alumniTrack.scrollBy({left:direction*distance,behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth'});
};
document.querySelector('.alumni-prev')?.addEventListener('click',()=>moveAlumni(-1));
document.querySelector('.alumni-next')?.addEventListener('click',()=>moveAlumni(1));

// Class XII profiles are explicitly marked samples until the school supplies
// verified student names, exact scores and approved portraits.
const starProfileCopy=[
  ['Ananya Mehta','99.9%','Science stream · Consistent academic focus.'],
  ['Aarav Sharma','98.6%','Commerce stream · Thoughtful, disciplined progress.'],
  ['Meher Kapoor','98.4%','Humanities stream · Clear ideas and steady effort.'],
  ['Kabir Malhotra','98.2%','Science stream · Curiosity backed by commitment.'],
  ['Ira Bansal','98.0%','Commerce stream · Focused learning across subjects.'],
  ['Vihaan Gupta','97.9%','Humanities stream · Confident expression and insight.'],
  ['Myra Sethi','97.8%','Science stream · Precise thinking and perseverance.'],
  ['Arjun Khanna','97.7%','Commerce stream · Strong concepts and consistency.'],
  ['Aadhya Verma','97.6%','Humanities stream · Engaged learning with purpose.'],
  ['Reyansh Arora','97.5%','Science stream · Patient effort, strong outcomes.'],
  ['Saanvi Goel','97.4%','Commerce stream · Analytical and self-motivated.'],
  ['Rohan Nanda','97.2%','Humanities stream · Independent thought and rigour.']
];
document.querySelectorAll('.star-profile').forEach((profile,index)=>{
  const [name,score,description]=starProfileCopy[index]||['Demo student','97%+','Verified details required.'];
  const scoreNode=profile.querySelector('strong');
  const nameNode=profile.querySelector('h3');
  const descriptionNode=profile.querySelector('p');
  if(scoreNode)scoreNode.textContent=score;
  if(nameNode)nameNode.textContent=name;
  if(descriptionNode)descriptionNode.textContent=description;
});

