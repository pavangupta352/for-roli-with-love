(() => {
  'use strict';
  const stories = [
    {title:'The selfie in the wrapper', short:'The keepsake', ids:['09','11'], labels:['The original selfie','The chocolate print'],
     note:'Recognise my red collar, Roli? That’s us again, right there on the chocolate.'},
    {title:'One minute, fifty-nine seconds', short:'Our wedding', ids:['87','88'], labels:['3:51:21 in the afternoon','3:53:20 in the afternoon'],
     note:'That’s how long it took us to go from sticking our tongues out to making a heart with our hands.'},
    {title:'He still fits. Just.', short:'Cooper', ids:['74','84'], labels:['Small enough to sit by your cheek','Big enough to fill your lap'],
     note:'I had to put these two side by side. Look how much of your lap our little boy takes up now.'},
    {title:'Two thirtieths of November', short:'Your birthdays', ids:['29','81'], labels:['The little crown, 2018','Your name in red icing, 2025'],
     note:'I put your birthdays seven years apart on facing pages. Look at your name in red beside the second cake.'}
  ];
  const escape = value => String(value ?? '').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const arrow = direction => '<svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="'+(direction==='back'?'m13 5-7 7 7 7M7 12h14':'m11 5 7 7-7 7m6-7H3')+'"/></svg>';
  const play = '<svg aria-hidden="true" width="13" height="13" viewBox="0 0 16 16"><path d="m4 2 9 6-9 6z" fill="currentColor"/></svg>';
  function mount(root,{photos,photoURL,openPhoto,openLibrary,onBack}) {
    const byId=new Map(photos.map(p=>[p.id,p]));
    const available=stories.filter(s=>s.ids.every(id=>byId.has(id)));
    if(!available.length || !photos.length)return () => {};
    const groups=['All',...new Set(photos.map(p=>p.group))];
    let index=0, selected='All';
    const collection=()=>selected==='All'?photos:photos.filter(p=>p.group===selected);
    root.innerHTML=`<section class="ra-album" aria-labelledby="ra-title">
      <div class="ra-wrap"><button class="ra-back" data-ra="back">${arrow('back')} Birthday cover</button>
      <header class="ra-opening"><h1 id="ra-title">Our photo <em>album.</em></h1>
      <div class="ra-actions"><button data-ra="jump">All ${photos.length} photographs <span aria-hidden="true">↓</span></button><button data-ra="music"><span aria-hidden="true">♫</span> Rahogi Meri</button></div></header>
      <section class="ra-stories" aria-label="Four pairs of photographs from Gaurav">
      <nav class="ra-tabs" aria-label="Album spreads">${available.map((s,i)=>`<button data-ra="spread" data-index="${i}" aria-pressed="${i===0}">${escape(s.short)}</button>`).join('')}</nav>
      <div class="ra-bound"><div class="ra-spread" tabindex="0" aria-label="Photo book. Use the left and right arrow keys to turn pages."></div></div>
      <div class="ra-below"><div class="ra-annotation" aria-live="polite" aria-atomic="true"></div><div class="ra-turn">
      <button aria-label="Previous spread" data-ra="prev">${arrow('back')}</button><span class="ra-position"></span><button aria-label="Next spread" data-ra="next">${arrow('next')}</button></div></div>
      </section></div>
      <section class="ra-archive" aria-labelledby="ra-archive-title"><div class="ra-wrap"><div class="ra-archive-heading"><h2 id="ra-archive-title" tabindex="-1">Every photograph</h2>
      <button class="ra-play" data-ra="play">${play} Play slideshow</button></div>
      <div class="ra-filters" role="group" aria-label="Filter photographs">${groups.map(g=>`<button data-ra="filter" data-group="${escape(g)}" aria-pressed="${g==='All'}">${g==='All'?'All photos':escape(g)}</button>`).join('')}</div>
      <p class="ra-total" role="status"></p><div class="ra-plates"></div></div></section>
    </section>`;
    const get = s => root.querySelector(s);
    function spread() {
      const s=available[index];
      get('.ra-spread').innerHTML=s.ids.map((id,i)=>{
        const p=byId.get(id);
        return `<figure class="ra-sheet ra-sheet-${i}"><button class="ra-print ${p.w>p.h?'ra-landscape':''}" data-ra="pair-photo" data-id="${id}" aria-label="View ${escape(s.labels[i])}">
          <img src="${escape(photoURL(id))}" alt="${escape(p.alt)}" width="${p.w}" height="${p.h}" decoding="async">
        </button><figcaption><span>${escape(s.labels[i])}</span>${p.date?`<small>${escape(p.date)}</small>`:''}</figcaption>
        <span class="ra-folio" aria-hidden="true">${index*2+i+1}</span></figure>`;
      }).join('');
      get('.ra-annotation').innerHTML=`<h2>${escape(s.title)}</h2><p>${escape(s.note)}</p>`;
      get('.ra-position').textContent=(index+1)+' / '+available.length;
      get('[data-ra="prev"]').disabled=index===0;
      get('[data-ra="next"]').disabled=index===available.length-1;
      root.querySelectorAll('[data-ra="spread"]').forEach((b,i)=>b.setAttribute('aria-pressed',String(i===index)));
    }
    function gallery() {
      const list=collection();
      root.querySelectorAll('[data-ra="filter"]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.group===selected)));
      get('.ra-total').textContent=list.length+' photograph'+(list.length===1?'':'s')+(selected==='All'?'':' · '+selected);
      get('.ra-plates').innerHTML=list.map(p=>`<button class="ra-card" data-ra="photo" data-id="${escape(p.id)}" aria-label="View ${escape(p.caption)}">
        <span class="ra-thumb"><img src="${escape(photoURL(p.id,true))}" alt="${escape(p.alt)}" loading="lazy" decoding="async" width="${p.w}" height="${p.h}"></span>
        <span class="ra-card-title">${escape(p.caption)}</span><small>${escape(p.group)}${p.date?' · '+escape(p.date):''}</small></button>`).join('');
    }
    function pageTo(i) {const next=Math.max(0,Math.min(available.length-1,i));if(next!==index){index=next;spread();}}
    function clicked(e) {
      const b=e.target.closest('button[data-ra]');if(!b || !root.contains(b))return;
      switch(b.dataset.ra) {
        case 'back':onBack();break;
        case 'jump':get('#ra-archive-title').focus({preventScroll:true});get('.ra-archive').scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});break;
        case 'music':openLibrary();break;
        case 'prev':pageTo(index-1);break;
        case 'next':pageTo(index+1);break;
        case 'spread':pageTo(Number(b.dataset.index));break;
        case 'filter':selected=b.dataset.group;gallery();break;
        case 'pair-photo':openPhoto(b.dataset.id,false,available[index].ids.map(id=>byId.get(id)));break;
        case 'photo':openPhoto(b.dataset.id,false,collection());break;
        case 'play':openPhoto(collection()[0].id,true,collection());break;
      }
    }
    function keyed(e) {
      if(!e.target.closest('.ra-spread') || !['ArrowLeft','ArrowRight'].includes(e.key))return;
      e.preventDefault();pageTo(index+(e.key==='ArrowLeft'?-1:1));get('.ra-spread').focus({preventScroll:true});
    }
    spread();gallery();root.addEventListener('click',clicked);root.addEventListener('keydown',keyed);
    return ()=>{root.removeEventListener('click',clicked);root.removeEventListener('keydown',keyed);};
  }
  window.RoliAlbum={mount};
})();
