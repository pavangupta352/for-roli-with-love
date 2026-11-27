(function birthdayApp(){
'use strict';
const $=id=>document.getElementById(id);
const main=$('content'), drawer=$('drawer'), lightbox=$('lightbox');
const photos=window.RoliPhotos, photoById=new Map(photos.map(p=>[p.id,p]));
const storage='mission-roli.birthday.2026.v1';
const empty={opened:false,completed:[],invitations:{},drafts:{},route:'cover',mission:1,finalRead:false};
function read(){try{return JSON.parse(localStorage.getItem(storage))||{}}catch{return {}}}
const state={...empty,...read()}; let memoryOnly=false;
function save(){try{const old=read();state.completed=[...new Set([...(old.completed||[]),...state.completed])].sort((a,b)=>a-b);localStorage.setItem(storage,JSON.stringify(state))}catch{memoryOnly=true}}
window.addEventListener('storage',e=>{if(e.key===storage&&e.newValue){const incoming=read();state.completed=[...new Set([...state.completed,...(incoming.completed||[])])];state.invitations={...state.invitations,...incoming.invitations}}});
const icons={envelope:'<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m4 7 8 6 8-6"/>',sound:'<path d="M3 9h4l5-4v14l-5-4H3zM16 8a6 6 0 0 1 0 8m3-11a10 10 0 0 1 0 14"/>',mute:'<path d="M3 9h4l5-4v14l-5-4H3zM17 9l5 6m0-6-5 6"/>',grid:'<rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>',heart:'<path d="M20 5.6c-2-2.2-5.6-1.6-8 1.8-2.4-3.4-6-4-8-1.8-3 3.2-.5 7.5 3.3 10.5l4.7 3.6 4.7-3.6C20.5 13.1 23 8.8 20 5.6Z"/>',album:'<rect x="3" y="4" width="18" height="16" rx="2"/><circle cx="8.5" cy="9" r="1.5"/><path d="m4 18 6-6 3 3 4-5 4 5"/>',coffee:'<path d="M4 8h12v5a6 6 0 0 1-12 0V8ZM16 8h2a3 3 0 0 1 0 6h-2M2 21h17M7 3v2m4-2v2"/>',game:'<path d="M7.5 6h9c2 0 3.3 1.4 3.8 3.5l1.6 7c.5 2.3-2 3.8-3.6 2.3L15 16H9l-3.3 2.8c-1.6 1.5-4.1 0-3.6-2.3l1.6-7C4.2 7.4 5.5 6 7.5 6Z"/><path d="M8 9v5m-2.5-2.5h5M16 11h.1m2 2h.1"/>',dinner:'<path d="M4 3v5c0 3 6 3 6 0V3m-3 0v18M18 3c-2 2-4 6-4 10h4m0-10v18"/>',map:'<path d="m3 5 6-2 6 3 6-2v15l-6 2-6-3-6 2Zm6-2v15m6-12v15"/>',lock:'<rect x="5" y="10" width="14" height="11" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/>',left:'<path d="m14.5 5-7 7 7 7"/>',right:'<path d="m9.5 5 7 7-7 7"/>',play:'<path d="m7 4 13 8-13 8Z"/>',pause:'<path d="M8 5v14m8-14v14"/>',home:'<path d="m2 11 10-8 10 8m-3-2v12H5V9"/>',paw:'<ellipse cx="7" cy="8" rx="2.1" ry="2.7"/><ellipse cx="13" cy="6" rx="2" ry="2.7"/><ellipse cx="18.5" cy="9.8" rx="2" ry="2.4"/><path d="M7 13c2-2.7 4.8-3.1 7 .2 1.3 1.9 3.8 2.9 3.5 5-.2 1.6-1.7 2.3-3.6 1.7-1.6-.6-2.5-.9-4.8-.3-2.9 1-4.8.4-4.9-1.5-.1-1.7 1.7-3.5 2.8-5.1Z"/>'};
const icon=(name)=>`<svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round" stroke-linecap="round">${icons[name]||''}</svg>`;
const esc=value=>String(value??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const photoURL=(id,small=false)=>`assets/photos/${String(id).padStart(2,'0')}${small?'-sm':''}.webp`;
const focus={'29':'50% 33%','71':'50% 18%','24':'50% 43%','09':'50% 28%','07':'50% 30%','15':'50% 30%','32':'50% 35%','84':'50% 40%','85':'50% 38%'};
const pic=(id,small=false,loading='lazy')=>`<img style="object-position:${focus[id]||'50% 45%'}" src="${photoURL(id,small)}" alt="${esc(photoById.get(String(id).padStart(2,'0'))?.alt||'')}" loading="${loading}" decoding="async">`;
const footer=()=>`<footer class="fine-footer"><em>With love, Your Hubby</em><span>30 November 2026</span></footer>`;
const back=(to,label)=>`<button class="back-link" data-go="${to}">${icon('left')}${label}</button>`;
let dispose=null,route=state.route, slideshowTimer=null, gallerySet=[], galleryIndex=0, previousScene='cover';
const nextMission=()=>Array.from({length:10},(_,i)=>i+1).find(n=>!state.completed.includes(n))||11;
function can(routeName){
  switch(routeName){
    case 'breakfast':return state.opened;
    case 'afternoon':return nextMission()>5;
    case 'finale':return nextMission()>10;
    case 'dinner':return state.finalRead;
    case 'mission':return !!state.invitations.breakfast;
    default:return true;
  }
}
function highest(){return Math.min(nextMission(),state.invitations.afternoon?10:5)}
function nextRoute(){
  if(!state.opened)return 'letter';
  if(!state.invitations.breakfast)return 'breakfast';
  if(nextMission()<6)return 'mission';
  if(!state.invitations.afternoon)return 'afternoon';
  if(nextMission()<11)return 'mission';
  if(!state.finalRead)return 'finale';
  if(!state.invitations.dinner)return 'dinner';
  return 'album';
}
const scene=()=>route==='mission'?([5,9].includes(state.mission)?'cooper':'mystery'):route;
function syncSound(){
 const enabled=Boolean(window.RoliSound?.isOn());
 const symbol=icon(enabled?'sound':'mute'),label=enabled?'Sound on':'Sound off';
 $('sound-icon').innerHTML=symbol;$('sound-label').textContent=label;
 $('sound').setAttribute('aria-pressed',String(enabled));
 const viewerSound=$('v-sound');
 if(viewerSound){
   viewerSound.innerHTML=symbol+'<span>'+label+'</span>';
   viewerSound.setAttribute('aria-pressed',String(enabled));
   viewerSound.setAttribute('aria-label',enabled?'Mute album music':'Unmute album music');
 }
}
function toggleSound(){window.RoliSound?.toggle(lightbox.open?'album':scene());syncSound()}
function toNext(){const next=nextRoute();go(next,next==='mission'?nextMission():undefined)}
function renderCover(){
 const birthdays=[['29','2018','The candlelit cakes'],['24','2023','Your midnight cake'],['81','2025','Your name in icing']];
 main.innerHTML=`<section class="love-cover" aria-labelledby="dedication"><div class="rose-art" role="img" aria-label="A cream envelope addressed to Roli, tied with a garnet ribbon and sealed with Gaurav’s initial, among garden roses."></div><div class="love-copy"><h1 id="dedication">My dearest<br> <em>Roli,</em></h1><p>Happy birthday, my love. Before I give you the first clue, there’s something I want you to read.</p><div class="love-actions"><button class="letter-opener" id="open-gift">${icon('envelope')}${state.opened?'Continue your birthday':'Open my letter'}</button><span class="sender-signature">Yours, Gaurav</span></div></div><button class="seal-hotspot" aria-label="Break Gaurav’s wax seal and read his letter"></button></section>
 <section class="birthday-shelf"><div class="shelf-text"><h2>Birthdays<br> <em>with you.</em></h2><button class="album-door" data-go="album">${icon('album')}Open our album</button></div><div class="birthday-prints">${birthdays.map(([id,year,title])=>`<button class="birthday-print" data-photo="${id}" aria-label="View ${title}, ${year}"><span class="print-window">${pic(id,true)}</span><span class="print-legend"><i>${title}</i><small>${year}</small></span></button>`).join('')}</div></section>${footer()}`;
 function unseal(reread=false){
   const cover=main.querySelector('.love-cover');
   if(!cover||cover.classList.contains('unsealing'))return;
   window.RoliSound?.start('letter');syncSound();
   if(state.opened&&!reread){toNext();return}
   cover.classList.add('unsealing');
   setTimeout(()=>{if(route==='cover')go('letter')},matchMedia('(prefers-reduced-motion: reduce)').matches?0:550);
 }
 $('open-gift').onclick=()=>unseal();main.querySelector('.seal-hotspot').onclick=()=>unseal(true);
}
const opening=[
"So, it's finally your special day!",
"Today isn't going to be just another birthday. I've planned something a little different for you. A little adventure, a few surprises, some tricky challenges, lots of laughter and, of course, a whole lot of love.",
"You might think you know what's waiting for you, but trust me, there's more to this than meets the eye!",
"There are 10 special gifts waiting for you, and each one comes with its own little mission.",
"Some challenges will test your memory, some will test your intelligence, and a few might make you question your decision to marry me!",
"And yes, Cooper has his own missions too. He has been very excited about this, although I'm not entirely sure how much help he'll be.",
"So take your time, enjoy every moment, solve the challenges and collect your surprises.",
"One little request: don't skip ahead. Every surprise has a story behind it.",
"Ready, birthday girl?"
];
const closing=[
"If I could go back in time and relive one thing, I would choose our journey all over again.",
"Not because everything has always been perfect, but because even the imperfect moments became beautiful when I had you beside me.",
"Thank you for being my partner, my best friend, my favourite person to annoy and the person I want to come home to.",
"Thank you for making our little family complete, and for loving our Cooper as much as I do.",
"I don't know what the future holds, but I know who I want beside me when we discover it.",
"I hope you never stop smiling, dreaming, laughing and being the wonderful person you are.",
"Happy Birthday, my love. I choose you. Today, tomorrow and every day after that."
];
function letter(final=false){
 const first=!state.opened;state.opened=true;if(final)state.finalRead=true;save();
 const chapter=final?'Happy birthday, <em>my forever Roli.</em>':'Happy Birthday, <em>My Love!</em>';
 main.innerHTML=`<section class="letter-page"><div class="letter-wrap">${back('map','Your birthday')}<div class="stationery"><article class="${final?'final-paper':'letter-paper'}"><h1>${chapter}</h1><p>${final?'Dear Roli,':'Hey Roli!'}</p>${(final?closing:opening).map(t=>`<p>${esc(t)}</p>`).join('')}<p class="paper-sign">${final?'Forever yours,':'With all my love,'}<br>Your Hubby</p><button class="track-link" data-soundtrack="${final?'rahogi-meri':'heeriye'}">${icon('sound')}${final?'Rahogi Meri':'Heeriye'} · Gaurav’s soundtrack</button><button class="dark-btn" data-go="${final?'dinner':'breakfast'}">${icon(final?'dinner':'coffee')}${final?'Plan our dinner date':'Choose our breakfast'}</button></article><figure class="letter-frame">${pic(final?'88':'25',false,'eager')}<figcaption>${final?'Our wedding day':'Your name in lights'}</figcaption></figure></div></div></section>${footer()}`;
 if(first||final)petals();
}
function petals(){if(matchMedia('(prefers-reduced-motion: reduce)').matches)return;const shower=document.createElement('div');shower.className='petals';shower.setAttribute('aria-hidden','true');for(let i=0;i<19;i++){const leaf=document.createElement('i');leaf.style.setProperty('--x',(i*37%100)+'%');leaf.style.setProperty('--delay',(i%6)*.09+'s');shower.append(leaf)}document.body.append(shower);setTimeout(()=>shower.remove(),3500)}
const stages=[['letter','Opening letter','envelope'],['breakfast','Breakfast together','coffee'],['mission','Your ten envelopes','map'],['afternoon','An afternoon out','game'],['finale','Your final letter','heart'],['dinner','Dinner for two','dinner'],['album','Our photo album','album']];
function menuRows(){return [['cover','The cover','home'],['map','Your birthday','map'],...stages].map(([id,label,sym])=>`<button class="nav-row" data-go="${id}" ${can(id)?'':'disabled'}>${icon(sym)}${label}<span>${can(id)?'':icon('lock')}</span></button>`).join('')}
function map(){
 const rows=[];
 const row=(title,id,sym,sub,available,n)=>`<button class="map-row" ${available?`data-go="${id}" ${n?`data-mission="${n}"`:''}`:'disabled'}><span class="map-index">${n?String(n).padStart(2,'0'):icon(sym)}</span><strong>${title}</strong><small>${sub}</small></button>`;
 const add=(id,title,sym,sub)=>rows.push(row(title,id,sym,sub,can(id)));
 add('letter','The opening letter','envelope',state.opened?'Read again':'Open');
 add('breakfast','Breakfast for two','coffee',state.invitations.breakfast?'View invitation':state.opened?'Choose':'After the letter');
 for(let i=1;i<=10;i++){if(i===6)add('afternoon','The afternoon outing','game',state.invitations.afternoon?'View invitation':'After envelope 05');const got=state.completed.includes(i);const allowed=can('mission')&&i<=highest();rows.push(row(`Envelope ${String(i).padStart(2,'0')}`,'mission','map',got?'Found':allowed?'Play':icon('lock'),allowed,i))}
 add('finale','A letter from Your Hubby','heart',state.finalRead?'Read again':'After envelope 10');add('dinner','Our dinner date','dinner',state.invitations.dinner?'View invitation':state.finalRead?'Choose':'After the final letter');
 main.innerHTML=`<section class="page">${back('cover','The cover')}<h1>Your <em>birthday</em></h1><p class="page-intro">${state.completed.length} of 10 surprises found. ${memoryOnly?'This browser cannot save progress between visits.':'Pick up here whenever you come back on this browser.'}</p><div class="map-layout"><div class="map-list">${rows.join('')}</div><figure class="map-aside">${pic('01')}<figcaption>A little something for you…</figcaption></figure></div></section>${footer()}`;
}
function invitations(type){
 main.innerHTML='<div id="invite-host"></div>'+footer();
 dispose=window.RoliInvitations.mount($('invite-host'),{type,saved:state.invitations[type]||null,draft:state.drafts[type]||null,onDraft:v=>{state.drafts[type]=v;save()},onSave:v=>{state.invitations[type]=v;delete state.drafts[type];save()},onContinue:toNext,onExit:()=>go('map')});
}
function mission(n){
 state.mission=n;save();main.innerHTML='<div class="mission-host" id="missions-host"></div>'+footer();
 let stopFilm;
 const result=window.RoliMissions.mount($('missions-host'),{
   initial:n,unlocked:highest(),getUnlocked:highest,
   onProgress:ev=>{
     if(ev.completed)state.completed=[...new Set([...state.completed,...ev.completed])];
     state.mission=ev.mission;save();
   },
   onExit:id=>{
     if(state.completed.includes(id)&&id===5)go('afternoon');
     else if(state.completed.includes(id)&&id===10)go('finale');
     else go('map');
   },
   onAudio:ev=>{
     const audio=window.RoliSound;
     if(ev.type==='clip')return audio?.clip(ev.id,ev.seconds)||false;
     if(ev.type==='tone')audio?.tone(ev.hz,ev.duration);
     if(ev.type==='enter'){
       if(state.mission!==ev.mission){state.mission=ev.mission;save()}
       updateURL('mission',ev.mission,'push');
       stopFilm?.();stopFilm=startBackdrop(ev.mission);
       audio?.setScene(scene());
     }else if(ev.type==='reveal')audio?.tone(740,.32);
     return true;
   }
 });
 dispose=()=>{stopFilm?.();if(typeof result==='function')result();else result?.unmount?.()};
}
function startBackdrop(n){
 const host=$('missions-host');
 if(!host)return;
 const ids=([5,9].includes(n)?['74','76','71','84']:{1:['44','47','56'],2:['27','69','68'],3:['25','61','59'],4:['77','28','12'],6:['59','45','79'],7:['86','07','88'],8:['69','70','27'],10:['88','87','07']}[n])||['34','61','87'];
 const bg=document.createElement('div');bg.className='mission-film';bg.setAttribute('aria-hidden','true');
 const a=new Image(),b=new Image();a.alt=b.alt='';bg.append(a,b);host.before(bg);main.classList.add('with-film');
 a.src=photoURL(ids[0]);a.className='visible';let idx=0;
 const timer=matchMedia('(prefers-reduced-motion: reduce)').matches?null:setInterval(()=>{idx=(idx+1)%ids.length;const incoming=a.classList.contains('visible')?b:a,old=incoming===a?b:a;incoming.onload=()=>{incoming.className='visible';old.className=''};incoming.src=photoURL(ids[idx])},14000);
 return ()=>{clearInterval(timer);a.onload=b.onload=null;bg.remove();main.classList.remove('with-film')};
}
function album(){
 main.innerHTML='<div id="album-pages"></div>'+footer();
 dispose=window.RoliAlbum.mount($('album-pages'),{
   photos,photoURL,openPhoto,
   openLibrary:()=>window.RoliSound?.openLibrary('rahogi-meri'),
   onBack:()=>go('cover')
 });
}
function updateURL(id,n,mode='push'){
 const hash='#'+id+(id==='mission'?'-'+n:'');
 if(location.hash===hash)return;
 try{history[mode==='push'?'pushState':'replaceState']({route:id},'',hash)}catch{}
}
function go(id,n,historyMode='push'){
 if(id==='mission'&&!n)n=Math.min(nextMission(),highest());
 if(!can(id)||id==='mission'&&(n<1||n>highest()))id='map';
 if(typeof dispose==='function')dispose();dispose=null;if(drawer.open)drawer.close();
 route=id;state.route=id;
 updateURL(id,n,historyMode);
 save();window.scrollTo({top:0,behavior:'instant'});
 if(id==='cover')renderCover();else if(id==='letter'||id==='finale')letter(id==='finale');else if(id==='album')album();else if(id==='map')map();else if(['breakfast','afternoon','dinner'].includes(id))invitations(id);else if(id==='mission')mission(n);else{route='cover';renderCover()}
 document.title=(id==='cover'?'For Roli, with love · 30 November':(stages.find(s=>s[0]===id)?.[1]||'Your birthday')+' · For Roli, with love');main.focus({preventScroll:true});window.RoliSound?.setScene(scene());syncSound();
}
function pauseSlide(){clearInterval(slideshowTimer);slideshowTimer=null}
function setViewerImage(){
 const p=gallerySet[galleryIndex];$('v-image').src=photoURL(p.id);$('v-image').alt=p.alt;$('v-cap').textContent=p.caption+(p.date?' · '+p.date:'');$('v-count').textContent=`${p.group} · ${galleryIndex+1} of ${gallerySet.length}`;$('v-desc').textContent=p.alt;
}
function changePhoto(direction){galleryIndex=(galleryIndex+direction+gallerySet.length)%gallerySet.length;setViewerImage()}
function controlSlide(){if(slideshowTimer)pauseSlide();else slideshowTimer=setInterval(()=>changePhoto(1),5500);$('toggle-slide').innerHTML=icon(slideshowTimer?'pause':'play')+(slideshowTimer?'Pause slideshow':'Play slideshow');$('toggle-slide').setAttribute('aria-pressed',String(!!slideshowTimer))}
function openPhoto(id,play=false,currentSet=photos){
 gallerySet=currentSet;galleryIndex=Math.max(0,gallerySet.findIndex(x=>x.id===id));previousScene=scene();window.RoliSound?.start('album');
 $('viewer').innerHTML=`<div class="view-top"><span id="v-count"></span><div class="mast-actions"><button class="quiet" id="v-sound" aria-pressed="false">Sound off</button><button class="icon-btn" id="v-close" aria-label="Close photograph" autofocus>×</button></div></div><figure class="view-figure"><img id="v-image" alt=""><figcaption id="v-cap"></figcaption><span class="sr-only" id="v-desc"></span></figure><div class="view-controls"><button class="icon-btn" id="v-prev" aria-label="Previous photograph">${icon('left')}</button><button class="text-btn" id="toggle-slide" aria-pressed="false">${icon('play')}Play slideshow</button><button class="icon-btn" id="v-next" aria-label="Next photograph">${icon('right')}</button></div>`;
 setViewerImage();lightbox.showModal();$('v-close').onclick=()=>lightbox.close();$('v-sound').onclick=toggleSound;$('v-prev').onclick=()=>changePhoto(-1);$('v-next').onclick=()=>changePhoto(1);$('toggle-slide').onclick=controlSlide;if(play)controlSlide();syncSound();
}
lightbox.addEventListener('close',()=>{pauseSlide();window.RoliSound?.setScene(previousScene);syncSound()});
lightbox.addEventListener('keydown',e=>{if(e.key==='ArrowRight'||e.key==='ArrowLeft'){e.preventDefault();changePhoto(e.key==='ArrowRight'?1:-1)}});
let startXY=null;lightbox.addEventListener('touchstart',e=>{startXY=[e.touches[0].clientX,e.touches[0].clientY]},{passive:true});lightbox.addEventListener('touchend',e=>{if(!startXY)return;const dx=e.changedTouches[0].clientX-startXY[0],dy=e.changedTouches[0].clientY-startXY[1];startXY=null;if(Math.abs(dx)>60&&Math.abs(dy)<Math.abs(dx)*.6)changePhoto(dx<0?1:-1)},{passive:true});
$('menu').onclick=()=>{$('menu-links').innerHTML=menuRows();drawer.showModal()};drawer.querySelector('.close').onclick=()=>drawer.close();
drawer.addEventListener('click',e=>{if(e.target!==drawer)return;const b=drawer.getBoundingClientRect();if(e.clientX<b.left||e.clientY<b.top||e.clientX>b.right||e.clientY>b.bottom)drawer.close()});
$('sound').onclick=toggleSound;
document.addEventListener('click',e=>{const el=e.target.closest('button');if(!el||el.disabled)return;if(el.dataset.go){if(el.dataset.go==='letter'&&!state.opened)window.RoliSound?.start('letter');go(el.dataset.go,Number(el.dataset.mission)||undefined)}else if(el.dataset.soundtrack)window.RoliSound?.openLibrary(el.dataset.soundtrack);else if(el.dataset.photo)openPhoto(el.dataset.photo);});
window.addEventListener('roli-sound-change',syncSound);
document.addEventListener('pointerdown',event=>{
 if(route!=='cover'&&!event.target.closest('#sound,#v-sound,dialog'))window.RoliSound?.start(scene());
},{once:true});
function fromLocation(initial){
 const match=location.hash.match(/^#(cover|map|letter|album|breakfast|afternoon|dinner|finale|mission)(?:-(\d+))?$/);
 go(match?match[1]:initial?state.route||'cover':'cover',match?.[2]?Number(match[2]):Number(state.mission)||1,'replace');
}
window.addEventListener('popstate',()=>{if(lightbox.open)lightbox.close();fromLocation(false)});
fromLocation(true);
})();
