const menuButton=document.querySelector('.menu-toggle');
const nav=document.querySelector('#primary-nav');
const navTriggers=[...document.querySelectorAll('.nav-trigger')];

function closeMenus(except=null){navTriggers.forEach(trigger=>{if(trigger!==except)trigger.setAttribute('aria-expanded','false')})}
navTriggers.forEach(trigger=>{
  trigger.addEventListener('click',()=>{const open=trigger.getAttribute('aria-expanded')==='true';closeMenus(trigger);trigger.setAttribute('aria-expanded',String(!open))});
  trigger.parentElement.addEventListener('mouseenter',()=>{if(innerWidth>1180){closeMenus(trigger);trigger.setAttribute('aria-expanded','true')}});
  trigger.parentElement.addEventListener('mouseleave',()=>{if(innerWidth>1180)trigger.setAttribute('aria-expanded','false')});
  trigger.addEventListener('keydown',event=>{
    const menu=document.querySelector(`#${trigger.getAttribute('aria-controls')}`);
    if(['ArrowDown','Enter',' '].includes(event.key)){
      event.preventDefault();closeMenus(trigger);trigger.setAttribute('aria-expanded','true');menu.querySelector('a')?.focus();
    }
    if(event.key==='Escape'){trigger.setAttribute('aria-expanded','false');trigger.focus()}
  })
});
document.addEventListener('click',event=>{if(!event.target.closest('.nav-item'))closeMenus()});
document.addEventListener('keydown',event=>{if(event.key==='Escape'){const openTrigger=navTriggers.find(trigger=>trigger.getAttribute('aria-expanded')==='true');if(openTrigger){closeMenus();openTrigger.focus()}}});
menuButton.addEventListener('click',()=>{const open=menuButton.getAttribute('aria-expanded')==='true';menuButton.setAttribute('aria-expanded',String(!open));nav.classList.toggle('open',!open);document.body.classList.toggle('menu-open',!open)});
nav.addEventListener('click',event=>{if(event.target.closest('a')&&innerWidth<=1180){menuButton.setAttribute('aria-expanded','false');nav.classList.remove('open');document.body.classList.remove('menu-open')}});

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
  const term=query.trim().toLowerCase();
  const matches=(term?searchableLinks.filter(item=>`${item.label} ${item.href}`.toLowerCase().includes(term)):searchableLinks.slice(0,8)).slice(0,12);
  searchResults.innerHTML=matches.length?matches.map(item=>`<a href="${item.href}">${item.label}</a>`).join(''):'<p class="search-empty">No matching resource found. Try “fees”, “calendar”, “results” or “campus”.</p>';
}
searchOpen?.addEventListener('click',()=>{renderSearch();searchDialog.showModal();requestAnimationFrame(()=>searchInput?.focus())});
searchInput?.addEventListener('input',()=>renderSearch(searchInput.value));
searchResults?.addEventListener('click',event=>{if(event.target.closest('a'))searchDialog.close()});
searchDialog?.addEventListener('click',event=>{if(event.target===searchDialog)searchDialog.close()});

