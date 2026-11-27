(() => {
  'use strict';
  // A packaged recording plays in its scene. Keep a path empty when no file was supplied.
  const files = Object.assign({
    heeriye: '', 'rahogi-meri': '', 'humse-rahoge': '', 'tumne-kisi': '', 'ajab-si': ''
  }, window.ROLI_AUDIO_FILES || {});
  const songs = {
    heeriye: ['Heeriye','Jasleen Royal & Arijit Singh','heeriye/1690466350?i=1690466656'],
    'rahogi-meri': ['Rahogi Meri','Pritam & Arijit Singh','rahogi-meri/1499107781?i=1499107796'],
    'humse-rahoge': ['Hum Se Rahoge','Sonu Nigam','hum-se-rahoge/1364384104?i=1364385083'],
    'tumne-kisi': ['Tumne Kisi Ki Jaan Ko','Mohd. Rafi','tumne-kisi-ki-jaan-ko/1327825238?i=1327826213'],
    'ajab-si': ['Ajab Si','KK, Vishal & Shekhar','ajab-si/1071079468?i=1071079478']
  };
  const scores = {cover:'letter',letter:'letter',album:'album',breakfast:'breakfast',afternoon:'afternoon',dinner:'dinner',mystery:'mystery',cooper:'cooper',finale:'finale'};
  const featured = {cover:'heeriye',letter:'heeriye',album:'rahogi-meri',finale:'rahogi-meri'};
  const local = {};
  const source = id => local[id] || files[id] || '';
  let scene='cover', enabled=false, preference='', soundtrack=null, activeSource='', generation=0;
  let snippet=null, snippetTimer=0, context=null, panel=null, panelResolve=null, inPlayer=false;
  try { preference=localStorage.getItem('roli-sound-choice') || ''; } catch {}
  function notify(){
    window.dispatchEvent(new CustomEvent('roli-sound-change',{detail:{enabled,scene}}));
  }
  function remember(value){
    preference=value;
    try {localStorage.setItem('roli-sound-choice',value);} catch {}
  }
  const fades=new WeakMap();
  function fade(audio, to, duration, done){
    clearInterval(fades.get(audio));
    const from=audio.volume, start=performance.now();
    if(!duration || document.hidden){audio.volume=to;done?.();return;}
    const handle=setInterval(() => {
      const t=Math.min(1,(performance.now()-start)/duration);
      audio.volume=Math.min(1,Math.max(0,from+(to-from)*t));
      if(t===1){clearInterval(handle);done?.();}
    },30);
    fades.set(audio,handle);
  }
  function dispose(audio){
    if(!audio)return;
    clearInterval(fades.get(audio)); audio.pause(); audio.removeAttribute('src'); audio.load();
  }
  function pauseMusic(){
    ++generation;
    const old=soundtrack;
    soundtrack=null; activeSource='';
    if(old)fade(old,0,140,()=>dispose(old));
  }
  async function playMusic(fallback=false){
    if(!enabled || document.hidden || inPlayer || snippet)return;
    const original=fallback?'':source(featured[scene]);
    const path=original || 'assets/audio/'+(scores[scene]||'mystery')+'.mp3';
    if(activeSource===path && soundtrack)return;
    pauseMusic();
    const token=generation;
    const next=new Audio(path);next.loop=true;next.volume=0;
    soundtrack=next;activeSource=path;
    try {
      await next.play();
      if(token!==generation){dispose(next);return;}
      fade(next,.54,440);notify();
    } catch {
      if(token!==generation)return;
      dispose(next);soundtrack=null;activeSource='';
      if(original){await playMusic(true);return;}
      enabled=false;notify();
      const notice=document.getElementById('notice');
      if(notice)notice.textContent='Tap Sound to start the birthday music.';
    }
  }
  function unlockTone(){
    try {
      const Ctx=window.AudioContext||window.webkitAudioContext;
      if(!context && Ctx)context=new Ctx();
      if(context && context.state!=='running')context.resume().catch(()=>{});
    } catch {}
  }
  function tone(hz=440,duration=.14){
    if(!enabled || !Number.isFinite(hz) || hz<=0)return;
    unlockTone();if(!context)return;
    const now=context.currentTime, end=now+Math.min(2,Math.max(.06,Number(duration)||.14));
    const osc=context.createOscillator(),gain=context.createGain();
    osc.frequency.value=Math.min(4800,hz);
    gain.gain.setValueAtTime(.0001,now);gain.gain.exponentialRampToValueAtTime(.10,now+.012);
    gain.gain.exponentialRampToValueAtTime(.0001,end);
    osc.connect(gain);gain.connect(context.destination);
    osc.onended=()=>{osc.disconnect();gain.disconnect();};
    osc.start(now);osc.stop(end+.012);
  }
  function stopClip(resume=true){
    clearTimeout(snippetTimer);
    dispose(snippet);snippet=null;
    if(resume)playMusic();
  }
  function closePanel(resume=true){
    if(!panel)return;
    panel.close();panel.remove();panel=null;inPlayer=false;
    if(panelResolve){panelResolve(false);panelResolve=null;}
    if(resume)playMusic();
  }
  function setScene(name){
    const next=Object.hasOwn(scores,name)?name:'mystery';
    if(scene!==next){scene=next;stopClip(false);if(panel)closePanel(false);}
    if(enabled)playMusic();
  }
  function start(name=scene){
    if(preference==='off')return false;
    unlockTone();enabled=true;setScene(name);notify();return true;
  }
  function toggle(name=scene){
    if(enabled){enabled=false;remember('off');stopClip(false);closePanel(false);pauseMusic();}
    else{remember('on');start(name);}
    notify();return enabled;
  }

  const database=new Promise(resolve=>{
    try {
      const req=indexedDB.open('mission-roli-recordings',1);
      req.onupgradeneeded=()=>req.result.createObjectStore('songs');
      req.onsuccess=()=>resolve(req.result);
      req.onerror=req.onblocked=()=>resolve(null);
    } catch {resolve(null);}
  });
  function transaction(db,mode,operation){
    return new Promise((resolve,reject)=>{
      const tx=db.transaction('songs',mode),req=operation(tx.objectStore('songs'));
      tx.oncomplete=()=>resolve(req.result);
      tx.onerror=tx.onabort=()=>reject(tx.error);
    });
  }
  database.then(async db=>{
    if(!db)return;
    await Promise.all(Object.keys(songs).map(async id=>{
      try {
        const blob=await transaction(db,'readonly',s=>s.get(id));
        if(blob && !local[id])local[id]=URL.createObjectURL(blob);
      } catch {}
    }));
    if(enabled && local[featured[scene]])playMusic();
  });
  function node(tag,text,cls){
    const item=document.createElement(tag);
    if(text)item.textContent=text;
    if(cls)item.className=cls;
    return item;
  }
  function button(label,click){
    const item=node('button',label,'rs-button');item.type='button';item.addEventListener('click',click);return item;
  }
  function picker(id){
    const label=node('label',source(id)?'Replace audio file':'Choose an audio file','rs-picker');
    const input=node('input');input.type='file';input.accept='audio/*,.mp3,.m4a,.wav,.aac,.ogg,.flac';
    const info=node('span','','rs-status');info.setAttribute('role','status');label.append(input,info);
    input.addEventListener('change',async()=>{
      const file=input.files[0];if(!file)return;
      if(file.type && !new Audio().canPlayType(file.type)){info.textContent='Choose an audio format this browser can play.';return;}
      const old=local[id];local[id]=URL.createObjectURL(file);if(old)URL.revokeObjectURL(old);
      if(enabled && featured[scene]===id)playMusic();
      try {
        const db=await database;
        if(!db)throw Error();
        await transaction(db,'readwrite',s=>s.put(file,id));info.textContent='Ready on this device.';
      } catch {info.textContent='Ready for this visit.';}
    });
    return label;
  }
  function openPanel(title){
    closePanel(false);
    panel=node('dialog','','rs-dialog');
    panel.setAttribute('aria-labelledby','rs-title');
    const head=node('div','','rs-head'),heading=node('h2',title);heading.id='rs-title';
    const close=button('Close',()=>closePanel());close.classList.add('rs-close');head.append(heading,close);
    panel.append(head);
    panel.addEventListener('cancel',e=>{e.preventDefault();closePanel();});
    document.body.append(panel);panel.showModal();return panel;
  }
  function publisher(container,id){
    panel.querySelectorAll('iframe').forEach(f=>f.remove());
    inPlayer=true;pauseMusic();
    const frame=node('iframe','','rs-player');
    frame.title='Apple Music · '+songs[id][0];
    frame.src='https://embed.music.apple.com/in/album/'+songs[id][2];
    frame.allow='autoplay *; encrypted-media *; fullscreen *';frame.referrerPolicy='strict-origin-when-cross-origin';
    container.append(frame);
  }
  function openLibrary(selected){
    const p=openPanel('Gaurav’s soundtrack');
    p.append(node('p','The songs Gaurav chose for your birthday. Each chapter also has its own instrumental music.','rs-intro'));
    const ids=selected==='rahogi-meri'?['rahogi-meri','heeriye']:['heeriye','rahogi-meri'];
    for(const id of ids){
      const row=node('section','','rs-track');
      row.append(node('span',id==='heeriye'?'Opening letter':'Photo album and finale','rs-moment'),node('h3',songs[id][0]),node('p',songs[id][1]));
      row.append(button('Listen on this page',()=>publisher(row,id)));
      const settings=node('details');settings.append(node('summary','Play your own file in this scene'),picker(id));row.append(settings);p.append(row);
      if(selected===id)publisher(row,id);
    }
  }
  function offerOriginal(id,seconds){
    const p=openPanel('The original recording');
    p.append(node('p','The official player shows the song title. You can listen after your guess, or keep solving with Gaurav’s hints.','rs-intro'));
    const host=node('div');
    p.append(button('Open the official player',()=>publisher(host,id)),host);
    const options=node('details'),info=node('p','','rs-status');info.setAttribute('role','status');
    const retry=button('Play my file',()=>{
      if(!source(id)){info.textContent='Choose an audio file first.';return;}
      const resolve=panelResolve;panelResolve=null;closePanel(false);clip(id,seconds).then(resolve);
    });
    options.append(node('summary','Use a title-free audio file'),picker(id),retry,info);p.append(options);
    return new Promise(resolve=>{panelResolve=resolve;});
  }
  async function clip(id,seconds=12){
    if(!songs[id])return false;
    stopClip(false);closePanel(false);
    const src=source(id);
    if(!src)return offerOriginal(id,seconds);
    pauseMusic();const audio=new Audio(src);snippet=audio;
    try {
      await audio.play();
      if(snippet!==audio){dispose(audio);return false;}
      const finish=()=>{if(snippet===audio)stopClip();};
      audio.onended=finish;snippetTimer=setTimeout(finish,Math.min(45,Math.max(1,Number(seconds)||12))*1000);
      return true;
    } catch {
      if(snippet!==audio)return false;
      stopClip();return offerOriginal(id,seconds);
    }
  }
  document.addEventListener('visibilitychange',()=>{
    if(document.hidden){stopClip(false);pauseMusic();if(inPlayer)closePanel(false);}
    else if(enabled)playMusic();
  });
  window.addEventListener('pagehide',()=>{stopClip(false);closePanel(false);pauseMusic();});
  window.addEventListener('pageshow',()=>{if(enabled)playMusic();});
  window.RoliSound={start,setScene,toggle,isOn:()=>enabled,clip,tone,stopClip,openLibrary};
})();
