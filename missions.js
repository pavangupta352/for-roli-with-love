/* Gaurav’s birthday envelopes. The original storage key keeps saved games compatible. */
(() => {
  'use strict';
  const key = 'mission-roli.hunt.v1';
  const photo = n => 'assets/photos/' + String(n).padStart(2, '0') + '.webp';
  const missions = [
    {
      title: 'The First Impression', gift: 'Clothes', photo: 44, place: 'The wardrobe',
      intro: 'Whether it’s your traditional look, your favourite dress or even my oversized T-shirt, you somehow manage to look beautiful in everything. Ready for the first clue, birthday girl?',
      clue: 'I have two doors, but I am not a room. I stand still and hold the things that travel with you. You usually visit me before you step out. What have I been keeping for you today?',
      after: 'I don’t know whether you choose the outfit or the outfit chooses you. I do know you’ll always be my favourite sight.',
      games: ['Three little riddles', 'Crack the secret word', 'The three-digit mystery']
    },
    {
      title: 'The Journey Beyond', gift: 'Shoes & sandals', photo: 27, place: 'The shoe rack or cabinet',
      intro: 'We’ve had unexpected adventures and countless discussions about where to eat. Sometimes the smallest decisions take the longest, don’t they? Ready, partner in crime?',
      clue: 'Some companions wait here for long walks. Others only come out for special occasions. Look where our little journeys begin, just before we step outside.',
      after: 'Here’s to all the places we’ve yet to walk together. And yes, I promise to wait patiently while you get ready. Well… I’ll try!',
      games: ['The traveller’s riddles', 'The journey puzzle', 'The perfect route']
    },
    {
      title: 'The Invisible Signature', gift: 'Perfume', photo: 47, place: 'The dressing table',
      intro: 'A song or a familiar place can take us straight back to a moment. Sometimes the things you remember best are the ones you can’t even see.',
      clue: 'There’s a mirror nearby. I know the little rituals of getting ready and that one last look you take before leaving. Come see what’s waiting there.',
      after: 'If this ever reminds you of someone, I hope that someone is me!',
      games: ['The memory riddles', 'Match the mood', 'The missing memory']
    },
    {
      title: 'The Fourth Key', gift: 'Novels', photo: 77, place: 'The bookshelf',
      intro: 'If someone wrote our story, I’d ask for a few more romantic scenes and a few less of my embarrassing moments. Ready for the next chapter?',
      clue: 'In this quiet corner, whole worlds stand shoulder to shoulder. Pick one up and you could lose an afternoon without leaving home.',
      after: 'If you ever write a story about your life, I hope I get a special chapter. Actually, I want the whole book!',
      games: ['The storyteller’s riddles', 'A message in the margins', 'Put our story in order']
    },
    {
      title: 'Operation Pawprint', gift: 'Munchies & chocolates', photo: 74, place: 'The kitchen cabinet', cooper: true,
      intro: 'Your Hubby let me have an envelope of my own. I’ve inspected the kitchen very thoroughly. All for work, obviously. Paws ready?',
      clue: 'Mumma, follow your nose into the kitchen. Look behind the little door that keeps snacks tucked safely out of my reach.',
      after: 'These are for you, Mumma. I’ll take my own dog biscuit and supervise while you open them.',
      games: ['Cooper’s kitchen riddles', 'The kitchen detective', 'The missing pawprint']
    },
    {
      title: 'The Soundtrack of Us', gift: 'Earphones', photo: 59, place: 'The work desk',
      intro: 'Let’s see how well you know my playlist. Especially those two songs I sing when you’re annoyed with me. You know the ones!',
      clue: 'Look where the working day happens. A screen, a few cables, somewhere to sit. Your next surprise is keeping them company.',
      after: 'Now you can carry our little playlist with you. I’ll still sing the apology songs myself.',
      games: ['Name that song', 'When you’re cross with me', 'My favourite three']
    },
    {
      title: 'The Art of Details', gift: 'Jewellery', photo: 86, place: 'The jewellery box',
      intro: 'I put together a little gallery for you. Take your time looking around. The smallest difference might be the one that counts.',
      clue: 'Some of the things I guard come out on special occasions. Others carry memories. Look inside the small box where your precious little things live.',
      after: 'Among all the beautiful things in this world, you will always be my favourite.',
      games: ['Spot the intruder', 'The style director', 'The curator’s final decision']
    },
    {
      title: 'The Great Getaway', gift: 'A sling bag', photo: 70, place: 'The luggage or travel cupboard',
      intro: 'Imagine a day with no deadlines and absolutely no arguments about where to eat. Well, that last part might be difficult. Come on, my favourite travel partner.',
      clue: 'When a holiday is over, the things that carried it all have to go somewhere. Look where the cases rest between our trips.',
      after: 'I don’t need a perfect destination. I just need you beside me. Next time we travel, please let me handle the packing!',
      games: ['Sixty seconds of chaos', 'The mystery destination', 'Create our perfect day']
    },
    {
      title: 'The Pawfect Surprise', gift: 'Soft toys', photo: 84, place: 'The bed or pillow area', cooper: true,
      intro: 'I got another envelope! Your Hubby thinks he’s the boss of birthday surprises. We both know who the real boss is. ME! I’ve put in a lot of very important tail-wagging work for this one.',
      clue: 'Mumma, I like this cosy spot. We stretch out here when the day is done. Try looking where we rest our heads.',
      after: 'Your Hubby says I’m a big boy now, but between us, I still need my Mumma’s cuddles. You’re my favourite human.',
      games: ['Cooper’s fetch race', 'The Cooper investigation', 'Design Cooper’s adventure']
    },
    {
      title: 'The Final Chapter', gift: 'A water bottle', photo: 88, place: 'The refrigerator',
      intro: 'You’ve made it past my puzzles and Cooper’s mischief. I’ve saved three little challenges for the end. Ready, my love?',
      clue: 'I keep things cool even when the weather is warm. My door opens for something delicious, or sometimes just for a look. Come find your last surprise.',
      after: 'Thank you for being my partner, my best friend and my favourite person. Thank you for making our little family complete, especially with our Cooper.',
      games: ['The hidden treasures', 'The rhythm challenge', 'The last piece']
    }
  ];
  const puzzles = {
    '1.0': [
      ['I have a waist but no legs. I can be long or short, casual or elegant.', ['skirt','a skirt'], 'I hang from the waist, with one opening at the bottom.'],
      ['I have sleeves but no arms. I can be formal or casual.', ['shirt','a shirt','t shirt','tshirt','blouse'], 'Think buttons, a collar and a pair of cuffs.'],
      ['Pair me with jeans, trousers or a skirt and I complete an outfit.', ['top','a top','shirt','blouse'], 'The broad name for the upper half of an outfit.']
    ],
    '2.0': [
      ['I have cities without houses, forests without trees and rivers without water.', ['a map','map'], 'You might unfold me to plan a route.'],
      ['The more you take, the more you leave behind.', ['steps','footsteps','footprints','a footstep','footprint'], 'Check the sand after a walk.'],
      ['I can travel around the world while staying in one corner.', ['stamp','a stamp','postage stamp'], 'Find me on an envelope.']
    ],
    '3.0': [
      ['My petals turn up in bouquets. My thorns make you hold me carefully.', ['rose','roses','a rose'], 'A classic red flower.'],
      ['My beans fill a room with a familiar smell long before the first sip.', ['coffee','coffee beans'], 'You can order me as an espresso.'],
      ['I arrive from the sky and change the smell of the earth.', ['rain','rainfall','the rain'], 'You may need an umbrella.']
    ],
    '4.0': [
      ['I have characters, a beginning and an ending. You can tell me out loud.', ['story','a story','tale','a tale'], 'Many of me start with “Once upon a time.”'],
      ['Follow me from the first page to the last and travel without taking a step. What is the trip itself?', ['journey','a journey','adventure','an adventure'], 'Another word for a voyage.'],
      ['I fill lines on a page. Rearrange my letters and you can change what I mean. What are we?', ['words','word','the words'], 'Sentences are made of us.']
    ],
    '5.0': [
      ['A hard grain gets hot, bursts open and turns light enough to fill a movie bucket.', ['popcorn','pop corn'], 'Think cinema.'],
      ['Cut into my layers while cooking and I can bring tears to your eyes.', ['onion','an onion','onions'], 'My sweeter cousin is a shallot.'],
      ['My shell cracks. After that I might be boiled, scrambled or folded into an omelette.', ['egg','an egg','eggs'], 'A hen lays me.']
    ]
  };
  const pairs = {
    '2.1': {rows:['A romantic dinner','A long walking holiday','An unexpected adventure','What would Your Hubby recommend for all three?'], targets:['Elegant heels','Comfortable sneakers','Walking sandals','Comfortable sneakers'], choices:['Walking sandals','Elegant heels','Comfortable sneakers'], hint:'Dress up for dinner, cushion the long walk, keep the sandals for the adventure. My vote is always for comfort.'},
    '3.1': {rows:['Fresh and energetic','Romantic and delicate','Warm and comforting','Deep and mysterious'], targets:['Citrus','Floral','Vanilla','Woody'], choices:['Woody','Vanilla','Citrus','Floral'], hint:'Think lemon, rose petals, baking and a forest, in that order.'},
    '5.1': {rows:['Yeast','Lemon juice','Salt','Baking powder','Which two can help a bake rise?'], targets:['Ferments dough','Adds acidity','Enhances flavour','Releases gas when wet','Yeast + baking powder'], choices:['Adds acidity','Ferments dough','Releases gas when wet','Enhances flavour'], last:['Yeast + baking powder','Salt + lemon juice','Salt + honey'], hint:'Yeast is alive. The powder works through a chemical reaction. Both can make bubbles.'},
    '7.1': {rows:['Evening brief: two colours, including a neutral','Black base, gold accent, white highlight. Choose the highlight.','How would you keep a display balanced?'], targets:['Beige + champagne','White','Choose one focal point'], options:[['Red + orange + yellow','Beige + champagne','Neon pink + blue + green'],['Gold','Black','White'],['Give everything equal weight','Use every colour','Choose one focal point']], hint:'Choose the restrained palette and keep the brightest accent small.'}
  };
  const music = [
    [
      ['A song about the way someone’s eyes stop you in your tracks.', ['ajab si','aankhon mein teri','ankhon mein teri','ankho me teri','aankhon mein teri ajab si'], ['The film is Om Shanti Om.','Shah Rukh Khan watches Deepika Padukone on a red carpet.','Try “Ajab…” or the three words about her eyes.']],
      ['A dance-floor count with a drink in its title.', ['four bottle vodka','4 bottle vodka','char bottle vodka','chaar bottle vodka','char botal vodka','chaar botal vodka'], ['It features Yo Yo Honey Singh.','The number is one more than three.','Name those four bottles.']],
      ['The moon has a favour to ask on someone’s behalf.', ['chand sifarish','chaand sifarish','chand shifarish','chand sifaarish','chand sifarish jo karta hamari'], ['It’s from Fanaa.','Think Aamir Khan and Kajol.','Use the Hindi words for moon and recommendation.']]
    ],
    [
      ['My first peace offering asks how long you’ll stay cross with me.', ['humse rahoge kya hamesha khafa','humse rahoge','humse rahoge kya hamesha kafa','maaf bhi kar do jaana','maaf bhi kar do jana','hum se rahoge','humse rahoge kya'], ['The line starts with “Humse…”.','Try “Humse rahoge” or finish the plea for forgiveness.'], 'humse-rahoge'],
      ['The second one asks whether you’ve ever seen someone’s life drifting away.', ['tumne kisi ki jaan ko','tumne kisi ki jaan ko jaate hue dekha hai','tumne kisi ki jaan ko jate hue dekha hai','tumne kisi ki jaan','jaan ko','tumne kisi ki'], ['The opening question starts with “Tumne kisi…”.','Add the words “ki jaan” to that beginning.'], 'tumne-kisi']
    ],
    [
      ['My first favourite is a promise in two words.', ['rahogi meri','rahogi mere'], ['It’s from Love Aaj Kal (2020).','The first word is “Rahogi”.']],
      ['My second begins with a little “if”.', ['jo tum mere ho','jo tum mere ho anuv jain'], ['Anuv Jain sings it.','The four-word title begins “Jo tum…”.']],
      ['My third is the one about a heart that beats when you’re here.', ['tu hai toh dil dhadakta hai','tu hai to dil dhadakta hai','tu hai toh dil dhadakta','tu hai to dill dhadakta hai','tu hai toh','tu hain toh','tu hai to','tu hai to dil'], ['Think of a heartbeat.','Gaurav calls it “Tu hai toh dil…”; finish that thought.']]
    ]
  ];
  const paths = {
    star:'<path d="m12 3 2.7 5.5 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.8 1-6.1-4.4-4.3 6.1-.9Z"/>',
    heart:'<path d="M20 5c-3-3-6-1.5-8 1C10 3.5 7 2 4 5c-4 4 0 9 8 15 8-6 12-11 8-15Z"/>',
    key:'<circle cx="7" cy="8" r="4"/><path d="m10 11 10 10m-6-6 3-3m0 6 3-3"/>',
    paw:'<ellipse cx="12" cy="15.7" rx="5" ry="3.8"/><ellipse cx="4.8" cy="10" rx="1.6" ry="2.3"/><ellipse cx="9.4" cy="6.2" rx="1.6" ry="2.5"/><ellipse cx="14.8" cy="6.2" rx="1.6" ry="2.5"/><ellipse cx="19.4" cy="10" rx="1.6" ry="2.3"/>',
    butterfly:'<path d="M12 11C3-2 0 6 5 13c-5 6 2 10 7 1 5 9 12 5 7-1 5-7 2-15-7-2Zm0 0v6"/>',
    ball:'<circle cx="12" cy="12" r="8"/><path d="M4.8 8a7 7 0 0 1 7 11m7.4-3a7 7 0 0 1-7-11"/>',
    mud:'<path d="M3 16c0-2 1.5-3 4-3 0-3 2-5 5-5s2 4 5 4 4 2 4 4c0 3-4 3-9 3s-9 0-9-3Z"/>',
    bag:'<rect x="4" y="8" width="16" height="12" rx="2"/><path d="M8 8V5h8v3m-8 3v6m8-6v6"/>',
    bolt:'<path d="m13 2-9 12h7l-1 8 10-13h-7z"/>',
    flower:'<path d="M12 5c-4-6-8 0-5 4-7 0-6 7 0 7-2 6 5 8 7 2 4 5 10 0 5-5 7-3 2-9-3-7 0-5-4-5-4-1Z"/><circle cx="12" cy="12" r="2"/>',
    diamond:'<path d="m12 2 8 10-8 10-8-10Z"/>', circle:'<circle cx="12" cy="12" r="7"/>',
    leaf:'<path d="M3 20C2 9 7 3 21 3c0 12-5 18-16 16m0 0L16 8"/>',
    check:'<path d="m4 12 5 5L20 6"/>', arrow:'<path d="M4 12h15m-6-6 6 6-6 6"/>',
    lock:'<rect x="5" y="10" width="14" height="11" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/>',
    pin:'<path d="M19 9c0 5-7 12-7 12S5 14 5 9a7 7 0 0 1 14 0Z"/><circle cx="12" cy="9" r="2.5"/>',
    sound:'<path d="M3 9h4l4-4v14l-4-4H3Zm12-1a6 6 0 0 1 0 8m3-11a10 10 0 0 1 0 14"/>',
    rose:'<path d="M12 14v7m0-3c4-5 6-4 7-4-1 3-3 4-7 4ZM8 5l4-2 4 2 2 4c0 6-12 6-12 0l2-4Z"/><path d="m8 6 4 4 4-5"/>',
    lemon:'<path d="M4 16c-3-4 0-9 4-11 4-2 8-1 10 0l2-1 1 2-2 2c1 6-6 14-12 11l-2 1-2-2 1-2Z"/>',
    coffee:'<path d="M4 8h12v7a5 5 0 0 1-5 5H9a5 5 0 0 1-5-5V8Zm12 1h2a3 3 0 0 1 0 6h-2M7 3v2m4-2v2"/>',
    pine:'<path d="m12 2-5 7h3l-5 6h3l-3 3h14l-3-3h3l-5-6h3Z M12 18v4"/>',
    scoop:'<path d="M6 10a6 6 0 0 1 12 0v2H6v-2Zm1 3 5 9 5-9"/>',
    biscuit:'<path d="M6 5h12l3 4-3 7-6 4-6-4-3-7 3-4Z"/><circle cx="8" cy="10" r=".8"/><circle cx="15" cy="10" r=".8"/><circle cx="12" cy="15" r=".8"/>',
    treat:'<path d="m6 8 3-3 10 10-4 4L5 9Zm0 0L3 6m14 12 3 3"/>',
    leash:'<ellipse cx="8" cy="6" rx="4" ry="3"/><path d="M10 8c4 2 0 7 3 9 1 1 4 0 4 2a2 2 0 1 0 4 0v-2"/>',
    bowl:'<path d="M5 9h14l3 10H2Zm0 0c0-3 14-3 14 0"/>'
  };
  const icon = (name, extra='') => '<svg class="rm-icon '+extra+'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">'+(paths[name] || paths.star)+'</svg>';
  const retriever = '<svg class="rm-retriever" viewBox="0 0 84 50" fill="none" stroke="currentColor" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><g class="rm-tail"><path d="M59 27c8 0 14-6 17-16 2 7 0 13-4 17l4-2c-3 6-9 8-17 7" fill="#b5864a"/></g><path d="M20 22c2 6 7 5 15 4l15-3c8-1 13 3 13 11l-2 9h-6l-1-9-7 2-8 1-2 6h-6l1-9-6-1-4 10h-6l3-17" fill="#c09557"/><path d="M7 15c4 0 7-1 11-6 6-4 12-1 15 4 1 3-1 8-5 10-2 5-8 7-12 4l-3-5c-7 0-10-3-10-6l4-1Z" fill="#d7ae72"/><path d="M27 11c5 0 7 4 5 10-2 4-7 4-7 0l2-10Z" fill="#a87742"/><path d="m8 16-3 1m15-2h.3m-3 9c3 1 5 1 7-1m5 2 4 4 6-2"/><circle cx="20" cy="15" r=".8" fill="currentColor"/></svg>';
  const scenery=[[44,56],[27,70],[47,67],[77,78],[74,71],[59,65],[86,56],[69,63],[84,76],[88,87]];
  function backdrop(n){
    const [a,b]=scenery[n-1];
    return '<div class="rm-scenery" aria-hidden="true"><i style="background-image:url('+photo(a)+')"></i><i style="background-image:url('+photo(b)+')"></i></div>';
  }
  function celebration(cooper){
    const icons=cooper?['paw','heart','paw','star']:['flower','star','heart','leaf'];
    return '<div class="rm-celebrate" aria-hidden="true">'+Array.from({length:15},(_,i)=>'<i style="--x:'+((i*29+3)%97)+'%;--delay:'+((i*11)%23)/17+'s;--drift:'+((i%2?1:-1)*(12+i*4))+'px">'+icon(icons[i%icons.length])+'</i>').join('')+'</div>';
  }
  const esc = str => String(str ?? '').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const norm = str => String(str).toLowerCase().normalize('NFKD').replace(/[^a-z0-9]/g,'');
  const clipNumber = (v, min, max) => Math.min(max, Math.max(min, Math.floor(Number(v) || 0)));
  const shuffle = values => {
    const result = [...values];
    for (let i=result.length-1;i>0;i--) {
      const j = Math.floor(Math.random()*(i+1));
      [result[i],result[j]] = [result[j],result[i]];
    }
    return result;
  };
  const button = (text,act,cls='',attrs='') => '<button type="button" class="rm-btn '+cls+'" data-act="'+act+'" '+attrs+'>'+text+'</button>';
  const next = (label='Check answer') => button(label+' '+icon('arrow'),'submit','rm-primary');
  const small = (text, act) => button(text,act,'rm-text');
  let cached = {};
  const read = () => {
    try { const raw=JSON.parse(localStorage.getItem(key)||'{}'); if(raw && typeof raw==='object') cached=raw; } catch {}
    return cached;
  };
  const completed = data => missions.map((_,i)=>i+1).filter(n=>data[n]?.found === true);
  function mount(root, opt={}) {
    if (!(root instanceof Element)) throw new TypeError('Mission root must be an element.');
    root._roliUnmount?.();
    const data = read();
    let limit = clipNumber(opt.unlocked ?? 1,1,10);
    let mission = clipNumber(opt.initial ?? 1,1,10), replay = null;
    let ticker=0, timeout=0, playing=false, celebrate=false;
    let action=()=>{}, liveInput=()=>{}, keyAction=()=>{};
    let lastHeading='';
    const state = () => {
      let s = data[mission];
      if(!s || typeof s!=='object') s=data[mission]={step:-1,found:false,draft:{}};
      if(!Number.isInteger(s.step) || s.step < -1 || s.step>3) s.step=-1;
      if(!s.draft || typeof s.draft!=='object') s.draft={};
      return replay || s;
    };
    const info=()=>missions[mission-1];
    const draft=()=>state().draft;
    const save=() => {
      try {
        const other=JSON.parse(localStorage.getItem(key)||'{}');
        for(const [n,record] of Object.entries(other)){
          if(!record || typeof record!=='object')continue;
          if(Number(n)!==mission){data[n]=record;continue;}
          const local=data[mission];
          if(!local || (record.found&&!local.found) || record.step>local.step ||
            (record.step===local.step && (record.draft?.round||0)>(local.draft?.round||0)))data[mission]=record;
        }
        localStorage.setItem(key,JSON.stringify(data));
      } catch {}
      cached=data;
    };
    const event=()=>({mission,step:state().step,found:!!data[mission]?.found,completed:completed(data)});
    const progress=()=>{save();opt.onProgress?.(event());};
    const clean=()=>{clearInterval(ticker);clearTimeout(timeout);ticker=0;timeout=0;playing=false;};
    const titleFocus=()=>{root.querySelector('.rm-title')?.focus({preventScroll:true});};
    const live=message=>{const el=root.querySelector('.rm-notice');if(el)el.textContent=message;};
    const fail=(message='Try that one again. There’s a hint below if you’d like one.')=>{live(message);};
    const addr=n=>n<=limit || !!data[n]?.found;
    function advance() {
      clean();state().step++;state().draft={};
      progress();render();
    }
    function subAdvance(total) {
      const d=draft();
      if((d.round||0)+1>=total) {advance();return;}
      const round=(d.round||0)+1, score=d.score||0;
      state().draft={round,score};  save();render();
      root.querySelector('.rm-stage h3,.rm-stage .rm-question')?.focus({preventScroll:true});
      live('Correct. Next round.');
    }
    const describe=n=>String(n).padStart(3,'0');
    const roundLine=(i,n)=>'<p class="rm-small">Round '+(i+1)+' of '+n+'</p>';
    const hint=(message,label='Show a hint') => '<details class="rm-hint"><summary>'+label+'</summary><p>'+esc(message)+'</p></details>';
    function choose(items,selected=-1,klass='') {
      return '<div class="rm-choices '+klass+'">'+items.map((x,i)=>button(esc(x),'pick','rm-option '+(selected===i?'is-picked':''),'data-index="'+i+'" aria-pressed="'+(selected===i)+'"')).join('')+'</div>';
    }
    function textField(label='Your answer', placeholder='Type your guess', numeric=false) {
      return '<label class="rm-field">'+esc(label)+'<input class="rm-answer" autocomplete="off" spellcheck="false" '+(numeric?'inputmode="numeric" maxlength="3"':'')+' placeholder="'+esc(placeholder)+'" value="'+esc(draft().answer||'')+'"></label>';
    }
    function typed(prompt,answers,help,opts={}) {
      const d=draft(), finish=opts.finish||advance;
      liveInput=e=>{if(e.target.matches('.rm-answer')){d.answer=e.target.value;save();}};
      action=a=>{
        if(a==='submit'){
          const value=norm(root.querySelector('.rm-answer').value);
          if(answers.some(v=>norm(v)===value)){finish();return;}
          fail(value?'That one doesn’t fit yet. Try another answer.':'Enter a guess first.');
        }
      };
      return (opts.pre||'')+'<p class="rm-question" tabindex="-1">'+esc(prompt)+'</p>'+textField(opts.label,opts.placeholder,opts.numeric)+next()+(help?hint(help):'');
    }
    function chipSequence(items,order,description,help) {
      const d=draft();d.pick=Array.isArray(d.pick)?d.pick:[];
      const selected=d.pick;
      action=(a,i)=>{
        if(a==='tile'&&!selected.includes(i))selected.push(i);
        else if(a==='undo')selected.pop();
        else if(a==='submit') {
          if(selected.map(i=>items[i]).join('|')===order.join('|')) return advance();
          fail(selected.length<order.length?'Choose all the pieces first.':'The order needs another look. Undo your last pick or start again.'); return;
        } else if(a==='clear')selected.length=0;else return;
        save();render();
      };
      return '<p class="rm-question">'+esc(description)+'</p><div class="rm-sequence" aria-label="Your sequence">'+(selected.length?selected.map(i=>'<span>'+esc(items[i])+'</span>').join(''):'<em>Your sequence will appear here</em>')+'</div><div class="rm-tiles">'+items.map((v,i)=>button(esc(v),'tile','rm-tile','data-index="'+i+'" '+(selected.includes(i)?'disabled':''))).join('')+'</div><div class="rm-row">'+next('Check sequence')+small('Undo','undo')+small('Clear','clear')+'</div>'+hint(help);
    }
    function pairing(p) {
      const d=draft();d.pick=Array.isArray(d.pick)?d.pick:[];
      liveInput=e=>{if(e.target.matches('select')){d.pick[Number(e.target.dataset.row)]=e.target.value;save();}};
      action=a=>{
        if(a!=='submit')return;
        const wrong=p.targets.findIndex((v,i)=>v!==d.pick[i]);
        if(wrong!==-1){root.querySelector('[data-row="'+wrong+'"]')?.focus();fail('Take another look at “'+p.rows[wrong]+'”.');return;}
        advance();
      };
      return '<div class="rm-pairs">'+p.rows.map((label,i)=>'<label><span>'+esc(label)+'</span><select data-row="'+i+'"><option value="">Choose an answer</option>'+(p.options?.[i]||((i===p.rows.length-1&&p.last)||p.choices)).map(v=>'<option '+(d.pick[i]===v?'selected':'')+'>'+esc(v)+'</option>').join('')+'</select></label>').join('')+'</div>'+next('Check my choices')+hint(p.hint);
    }
    function route() {
      const d=draft(),r=d.round||0;
      action=(a,i)=>{if(a==='pick'){d.choice=i;save();render();}if(a==='submit'){if(d.choice===1)subAdvance(2);else fail('All three routes get there. Which one would still feel comfortable after a whole day?');}};
      return roundLine(r,2)+'<p class="rm-question">'+(r?'Which route would Your Hubby choose for you?':'Choose a route for a full day on your feet.')+'</p>'+choose(['A · The pretty route with steep stairs','B · The longer, smooth path','C · The short, rocky track'],d.choice)+next('Take this route')+hint('Distance is only part of the journey. Think about the ground underfoot.');
    }
    function memory() {
      const d=draft(), dog=mission===5;
      const objects=dog?[['biscuit','Biscuit'],['treat','Treat'],['leash','Leash'],['ball','Ball'],['bowl','Food bowl']]:[['rose','Rose'],['lemon','Lemon'],['coffee','Coffee'],['pine','Pine'],['scoop','Vanilla']];
      const missing=dog?2:1, choices=dog?['Teddy','Leash','Food bowl','Bone']:['Coffee','Vanilla','Lemon','Rose'];
      const phase=d.phase||'start';
      const hideNow=()=>{d.phase='guess';save();render();};
      action=(a,i)=>{
        if(a==='look'){d.phase='study';save();render();}
        else if(a==='ready')hideNow();
        else if(a==='pick'){if(choices[i]===objects[missing][1])advance();else fail('That one wasn’t missing. Try looking once more.');}
      };
      if(phase==='study'){timeout=setTimeout(hideNow,8000);}
      return '<p class="rm-question">'+(phase==='start'?'Study five things for eight seconds. Then tell me which one disappeared.':phase==='study'?'Look closely. One of these is about to disappear.':'Which one is missing?')+'</p>'+(phase==='start'?button('Let me look','look','rm-primary'):'<div class="rm-memory">'+objects.map(([ic,label],i)=>'<span>'+(phase==='guess'&&i===missing?'<b>?</b><small>Missing</small>':icon(ic)+'<small>'+esc(label)+'</small>')+'</span>').join('')+'</div>'+(phase==='study'?button('I’m ready','ready'):choose(choices)+small('Look again','look')));
    }
    function songRound(step) {
      const d=draft(), r=d.round||0, songs=music[step], [prompt,aliases,hints,clip]=songs[r];
      if(!Array.isArray(d.hints))d.hints=[];
      const revealed=clipNumber(d.hints[r],0,hints.length);
      const justRight=()=>{
        d.score=(d.score||0)+Math.max(1,5-revealed);
        if(step===2 && r===songs.length-1){d.sing=true;save();render();return;}
        const oldHints=d.hints;
        subAdvance(songs.length);
        if(state().step===step){draft().hints=oldHints;save();}
      };
      if(d.sing){
        action=a=>{if(a==='sang')advance();};
        return '<p class="rm-small">'+d.score+' points for the final three</p><p class="rm-question">Sing a little of your favourite one with me?</p><p>Pick Rahogi Meri, Jo Tum Mere Ho, or Tu Hai Toh Dil Dhadakta Hai. No microphone needed. This part is just for us.</p>'+button('On to the treasure clue','sang','rm-primary');
      }
      const input=typed(prompt,aliases,null,{finish:justRight,label:step===1?'Song title or opening words':'Song title',placeholder:'Type the song',pre:roundLine(r,songs.length)});
      const base=action;
      action=(a,i)=>{
        if(a==='songhint'){if(revealed<hints.length){d.hints[r]=revealed+1;save();render();}return;}
        if(a==='clip'){playClip(clip,12);return;}
        base(a,i);
      };
      return (clip?button(icon('sound')+' Listen to mystery clip '+(r+1),'clip','rm-clip'):'')+input+'<div class="rm-song-hints"><p class="rm-small">'+Math.max(1,5-revealed)+' points for this guess. Each hint costs one point.</p>'+hints.slice(0,revealed).map((h,i)=>'<p>Hint '+(i+1)+' · '+esc(h)+'</p>').join('')+(revealed<hints.length?small('Reveal hint '+(revealed+1),'songhint'):'')+'</div>';
    }
    async function playClip(id,seconds) {
      const snapshot=mission, step=state().step, holder=root.querySelector('.rm-stage');
      try {
        const ok=await opt.onAudio?.({type:'clip',id,seconds});
        if(mission===snapshot && step===state().step && holder===root.querySelector('.rm-stage'))live(ok?'Playing the mystery clip.':'Use the written clues whenever you’re ready.');
      } catch {if(holder===root.querySelector('.rm-stage'))live('The clip couldn’t play. The written clues still work.');}
    }
    function galleryTest() {
      const d=draft(),r=d.round||0;
      const names=[['diamond','diamond','circle','diamond'],['diamond','diamond','diamond','diamond'],['leaf','leaf','leaf','leaf']];
      const labels=[['Gold diamond','Gold diamond','Gold circle','Gold diamond'],['Copper stone','Gold stone','Gold stone','Gold stone'],['Leaf leaning right','Leaf leaning left','Leaf leaning right','Leaf leaning right']];
      const correct=[2,0,1];
      action=(a,i)=>{if(a==='case'){if(i===correct[r])subAdvance(3);else fail('That detail matches the others. Try another display.');}};
      return roundLine(r,3)+'<p class="rm-question">'+['One shape breaks the pattern. Select its display.','One stone is a different metal. Which one?','Three leaves lean the same way. Find the exception.'][r]+'</p><div class="rm-gallery">'+names[r].map((v,i)=>button(icon(v)+(String.fromCharCode(65+i)),'case','rm-exhibit '+(r===1&&i===0?'rm-copper':'')+' '+(r===2&&i===1?'rm-flip':''),'data-index="'+i+'" aria-label="Display '+String.fromCharCode(65+i)+', '+labels[r][i]+'"')).join('')+'</div>'+hint(['Look at the edges, then the curves.','Compare A with its neighbours.','Notice where the pointed tip goes.'][r]);
    }
    function curator() {
      const d=draft();
      action=(a,i)=>{if(a==='pick'){d.choice=i;save();render();}if(a==='submit'){if(d.choice===1)advance();else fail('Test that case against all three statements. Exactly one must be true.');}};
      return '<p class="rm-question">One case holds a secret. Exactly one statement is true.</p><ol class="rm-ledger"><li>A says, “It isn’t in A.”</li><li>B says, “It is in A.”</li><li>C says, “It isn’t in B.”</li></ol>'+choose(['Case A','Case B','Case C'],d.choice)+next('Open this case')+hint('A and B contradict each other, so one of them is already true. What must that make C?');
    }
    function arcade() {
      const d=draft(),fetch=mission===9,seconds=fetch?45:60,target=fetch?5:8;
      const idNames=fetch?['lane 1','lane 2','lane 3']:['top left','top centre','top right','middle left','centre','middle right','lower left','lower centre','lower right'];
      if(!d.started) {
        action=a=>{
          if(!['timer','practice'].includes(a))return;
          Object.assign(d,{started:true,mode:a,left:seconds,score:0,catches:0,ticks:0,lane:1,active:fetch?1:4,kind:'regular',fall:0});save();render();
        };
        return '<p class="rm-question">'+(fetch?'Move Cooper into the lane under the falling ball. Dodge the mud!':'Catch the stars as they appear. Gold stars are worth more. Leave the lightning alone.')+'</p><p>'+(fetch?'A ball earns 10 points and a golden ball earns 30. Mud costs 10. Move with the lane buttons or arrow keys.':'A star earns 10 points, a gold star earns 25 and lightning costs 15. Tap a square or press its number key.')+'</p><div class="rm-row">'+button('Play for '+seconds+' seconds','timer','rm-primary')+button('Play without a timer','practice')+'</div>';
      }
      if(d.finished) {
        action=a=>{if(a==='collect')advance();if(a==='retry'){state().draft={};save();render();}};
        if(!d.catches)return '<p class="rm-question">Give it another go?</p><p>Catch at least one '+(fetch?'ball':'star')+' to complete this round. You can choose to play at your own pace.</p>'+button('Try again','retry','rm-primary');
        return '<p class="rm-question">'+(fetch?'Fetch complete, Mumma!':'Time to pack up!')+'</p><div class="rm-score">'+d.score+' <small>points</small></div><p>'+d.catches+' '+(fetch?'balls caught.':'stars collected.')+'</p><div class="rm-row">'+button('Continue','collect','rm-primary')+small('Play again','retry')+'</div>';
      }
      const finish=()=>{clean();d.finished=true;save();render();};
      const nextItem=()=>{
        const previous=d.active;
        d.active=(previous+1+Math.floor(Math.random()*(idNames.length-1)))%idNames.length;
        const chance=Math.random();d.kind=chance<.19?'hazard':chance>.78?'gold':'regular';d.fall=0;
      };
      function capture(){
        if(d.kind==='hazard')d.score=Math.max(0,d.score-(fetch?10:15));
        else {d.score+=d.kind==='gold'?(fetch?30:25):10;d.catches++;}
        if(d.mode==='practice'&&d.catches>=target){finish();return true;}
        return false;
      }
      function contents(i) {
        const current=i===d.active;
        const obj=d.kind==='hazard'?(fetch?'mud':'bolt'):(fetch?'ball':'star');
        if(fetch)return '<span class="rm-falling '+(d.kind==='gold'?'is-gold':'')+'" style="top:'+(8+Math.min(1,d.fall/4)*49)+'%">'+(current?icon(obj):'')+'</span><span class="rm-dog-chip">'+(i===d.lane?'<img alt="Cooper" src="'+photo(71)+'">':'')+'</span><small>'+String(i+1)+'</small>';
        return (current?'<span class="'+(d.kind==='gold'?'is-gold':'')+'">'+icon(obj)+'</span>':'')+'<small>'+String(i+1)+'</small>';
      }
      const update=()=>{
        root.querySelectorAll('.rm-arc-cell').forEach((el,i)=>{
          el.innerHTML=contents(i);
          const item=d.kind==='hazard'?(fetch?'mud':'lightning'):(d.kind==='gold'?'golden ':'')+(fetch?'ball':'star');
          el.setAttribute('aria-label',idNames[i]+(i===d.active?', '+item:'')+(fetch&&i===d.lane?', Cooper is here':''));
          el.classList.toggle('is-gold',i===d.active&&d.kind==='gold');
        });
        const score=root.querySelector('.rm-arc-score'),time=root.querySelector('.rm-arc-time');
        if(score)score.textContent=d.score+' pts';if(time)time.textContent=d.mode==='practice'?d.catches+' / '+target:d.left+' s';
      };
      function hit(i){
        if(d.paused || d.finished || i<0 || i>=idNames.length)return;
        if(fetch){d.lane=i;if(d.mode==='practice'){if(d.lane===d.active && capture())return;nextItem();}}
        else if(i===d.active){if(capture())return;nextItem();}
        save();update();
      }
      action=(a,i)=>{
        if(a==='lane')hit(i);
        if(a==='pause'){d.paused=!d.paused;save();render();}
      };
      keyAction=e=>{
        if(!d.paused && fetch && ['ArrowLeft','ArrowRight'].includes(e.key)){e.preventDefault();hit(clipNumber(d.lane+(e.key==='ArrowLeft'?-1:1),0,2));}
        else if(/^[1-9]$/.test(e.key)&&!e.altKey&&!e.metaKey&&!e.ctrlKey){e.preventDefault();hit(Number(e.key)-1);}
      };
      let last=performance.now(), elapsed=0, stepTime=0;
      if(!d.paused && d.mode==='timer'){
        ticker=setInterval(()=>{
          const now=performance.now(),dt=Math.min(now-last,500);last=now;
          if(document.hidden || !root.isConnected)return;
          elapsed+=dt;stepTime+=dt;
          if(elapsed>=1000){elapsed-=1000;d.left--;save();if(d.left<=0){finish();return;}}
          const pace=fetch?330:Math.max(420,1250-Math.floor((seconds-d.left)/15)*180);
          if(stepTime>=pace){stepTime=0;
            if(fetch){if(++d.fall>4){if(d.lane===d.active && capture())return;nextItem();}}
            else nextItem();
          }
          update();
        },170);
      }
      return '<div class="rm-scorebar"><strong class="rm-arc-score">'+d.score+' pts</strong><span class="rm-arc-time">'+(d.mode==='practice'?d.catches+' / '+target:d.left+' s')+'</span>'+small(d.paused?'Resume':'Pause','pause')+'</div><div class="rm-arcade '+(fetch?'rm-fetch':'')+'" aria-label="'+(fetch?'Fetch lanes':'Star field')+'">'+idNames.map((label,i)=>button(contents(i),'lane','rm-arc-cell','data-index="'+i+'" aria-label="'+label+'" '+(d.paused?'disabled':''))).join('')+'</div><p class="rm-small">'+(d.paused?'Paused.':d.mode==='practice'?(fetch?'Choose the lane with the ball. Catch five balls to finish.':'Collect eight stars at your own pace.'):(fetch?'Tap a lane to move Cooper. Use left and right arrow keys on a keyboard.':'Tap the star or press its square number.'))+'</p>';
    }
    const journeys=[
      {line:'Where shall we begin?',names:['Sunny coast','Rainy hills'],scenes:['Along the shore, a shell catches the sunlight.','Beyond the wet hillside, a little brass compass gleams.'],tokens:['Shell','Compass']},
      {line:'The road is closed. Choose a detour.',names:['Mountain shortcut','Scenic route','Hidden village'],scenes:['At the summit you find a trail badge.','At the viewpoint a ribbon flutters from the sign.','A tiny brass key waits beside the village gate.'],tokens:['Trail badge','Ribbon','Brass key']},
      {line:'The last stop is yours to choose.',names:['Harbour lights','Hilltop lookout','Courtyard café'],scenes:['The ticket counter has one last stamp for your journey.','At the lookout, the last pocket map is yours.','There’s a postcard tucked beneath your saucer.'],tokens:['Harbour stamp','Pocket map','Postcard']}
    ];
    function travel() {
      const d=draft();d.stamps=Array.isArray(d.stamps)?d.stamps:[];
      const r=d.stamps.length, scene=journeys[Math.min(r,2)];
      if(r===3){action=a=>{if(a==='arrive')advance();};return '<p class="rm-question">You’ve arrived.</p><p>Your route brought home '+esc(d.stamps.join(', '))+'.</p>'+button('Make our postcard','arrive','rm-primary');}
      action=(a,i)=>{
        if(a==='pick'){d.branch=i;save();render();}
        if(a==='stamp'&&scene.tokens[d.branch]){d.stamps.push(scene.tokens[d.branch]);delete d.branch;save();render();}
      };
      const branched=Number.isInteger(d.branch);
      return roundLine(r,3)+'<div class="rm-travel"><div class="rm-stamps">'+[0,1,2].map(i=>'<span class="'+(i<r?'is-stamped':'')+'">'+(i<r?icon('check'):i+1)+'</span>').join('')+'</div><p class="rm-question">'+esc(branched?scene.scenes[d.branch]:scene.line)+'</p>'+(branched?button('Collect '+esc(scene.tokens[d.branch]),'stamp','rm-primary'):choose(scene.names))+'</div>';
    }
    const postcardFields=[
      ['Destination',['Beach','Mountains','City','Countryside']],['Mood',['Romantic','Adventurous','Relaxed','Playful']],['Activity',['Sunset walk','Café date','Sightseeing','Movie night']],['Soundtrack',['Romantic','Upbeat','Calm','Nostalgic']],['A line for Your Hubby',['Meet me there.','Save me a seat.','Take the long way with me.','Let’s get a little lost.']]
    ];
    const posterFields=[
      ['Adventure',['Beach explorer','Mountain adventurer','Garden detective','Royal birthday king']],['Accessory',['Red bandana','Blue bow','Birthday crown','Cool sunglasses']],['Superpower',['Super speed','Super cuddles','Infinite tail wagging','Treat detector']],['Destination',['A magical garden','A cosy cottage','A beautiful beach','A giant playground']]
    ];
    function maker(){
      const d=draft(),dog=mission===9, fields=dog?posterFields:postcardFields;
      d.selections=Array.isArray(d.selections)?d.selections:[];
      liveInput=e=>{if(e.target.matches('select')){d.selections[Number(e.target.dataset.row)]=e.target.value;save();}};
      const name=dog?'Cooper’s adventure':'Our perfect day';
      action=a=>{
        if(a==='create'){
          const invalid=fields.findIndex((f,i)=>!f[1].includes(d.selections[i]));
          if(invalid>=0){root.querySelector('[data-row="'+invalid+'"]').focus();fail('Choose '+fields[invalid][0].toLowerCase()+' first.');return;}
          d.made=true;state().keepsake=d.selections.slice();save();render();
        }
        if(a==='edit'){d.made=false;save();render();}
        if(a==='savecard')downloadCard(name,d.selections,dog);
        if(a==='keep')advance();
      };
      if(d.made)return '<article class="rm-made" style="--rm-card:url(&quot;'+photo(dog?71:69)+'&quot;)"><div><p class="rm-small">'+(dog?'Adventure poster':'A postcard for Your Hubby')+'</p><h3>'+esc(name)+'</h3><p>'+esc(d.selections.join(' · '))+'</p></div></article><div class="rm-row">'+button('Keep it & continue','keep','rm-primary')+button('Save picture','savecard')+small('Change choices','edit')+'</div>';
      return '<div class="rm-pairs">'+fields.map(([label,options],i)=>'<label><span>'+esc(label)+'</span><select data-row="'+i+'"><option value="">Choose '+esc(label.toLowerCase())+'</option>'+options.map(v=>'<option '+(v===d.selections[i]?'selected':'')+'>'+esc(v)+'</option>').join('')+'</select></label>').join('')+'</div>'+button(dog?'Make Cooper’s poster':'Make our postcard','create','rm-primary');
    }
    async function downloadCard(name, selections, dog) {
      const canvas=document.createElement('canvas');canvas.width=1100;canvas.height=800;
      const c=canvas.getContext('2d');if(!c){fail('Your browser couldn’t create the picture. You can take a screenshot of the card.');return;}
      function paint(img){
        c.fillStyle='#54252b';c.fillRect(0,0,1100,800);
        if(img){const k=Math.max(1060/img.width,448/img.height),w=img.width*k,h=img.height*k;c.save();c.beginPath();c.rect(20,20,1060,448);c.clip();c.drawImage(img,20+(1060-w)/2,20+(448-h)*.35,w,h);c.restore();}
        else{c.fillStyle='#35261f';c.fillRect(20,20,1060,448);c.font='98px Georgia';c.fillStyle='#d4b075';c.textAlign='center';c.fillText(dog?'Cooper':'Roli + Gaurav',550,275);}
        c.textAlign='left';c.fillStyle='#e3c28c';c.font='24px sans-serif';c.fillText(dog?'FOR MUMMA, FROM COOPER  ·  30 NOVEMBER':'FOR GAURAV, FROM ROLI  ·  30 NOVEMBER',42,521);
        c.fillStyle='#fff2d7';c.font='64px Georgia';c.fillText(name,40,600);
        c.font='29px sans-serif';c.fillText(selections.slice(0,2).join('  ·  '),42,660);
        c.fillText(selections.slice(2,4).join('  ·  '),42,711);
        if(selections[4]){c.font='italic 30px Georgia';c.fillText(selections[4],42,758);}
      }
      let img=new Image();img.src=photo(dog?71:69);
      try{await img.decode();}catch{img=null;}
      paint(img);
      const anchor=document.createElement('a');
      try{anchor.href=canvas.toDataURL('image/png');}catch{canvas.width=1100;paint(null);anchor.href=canvas.toDataURL('image/png');}
      anchor.download=dog?'coopers-adventure.png':'our-perfect-day.png';anchor.click();live('Your picture is ready to save.');
    }
    const floorProps=[
      ['ball','Tennis ball'],['bowl','Food bowl'],['leaf','Leaf'],['key','Key'],['biscuit','Dog biscuit'],['flower','Flower']
    ];
    function investigate() {
      const d=draft(),r=d.round||0;
      if(r===0){
        const changed=[0,2,4], later=[4,1,0,3,2,5];
        d.found=Array.isArray(d.found)?d.found:[];
        const after=!!d.inspect;
        action=(a,i)=>{
          if(a==='inspect'||a==='before'){d.inspect=a==='inspect';save();render();}
          if(a==='spot'&&after){if(!changed.includes(i)){fail('That object is still in its old place. Compare the room again.');return;}
            if(!d.found.includes(i))d.found.push(i);
            if(d.found.length===3){subAdvance(3);return;}save();render();live('Found '+d.found.length+' of 3 moved objects.');}
        };
        return roundLine(r,3)+'<p class="rm-question">'+(after?'The room after Cooper’s visit. Tap the three objects that moved.':'Study the room before Cooper comes in.')+'</p><div class="rm-room">'+floorProps.map((_,i)=>{
          const [ic,name]=floorProps[after?later[i]:i];return button(icon(ic)+'<span>'+esc(name)+'</span>','spot','rm-prop '+(after&&d.found.includes(i)?'is-found':''),'data-index="'+i+'" '+(!after||d.found.includes(i)?'disabled':''));
        }).join('')+'</div>'+button(after?'Compare with the room before':'Let Cooper in',after?'before':'inspect',after?'':'rm-primary')+'<p class="rm-small">'+d.found.length+' of 3 found</p>';
      }
      if(r===1){
        const trail=[0,1,4,7,8];d.track=Array.isArray(d.track)?d.track:[];
        action=(a,i)=>{if(a!=='trace')return;if(i!==trail[d.track.length]){fail('Follow the direction on the last pawprint.');return;}
          d.track.push(i);if(d.track.length===trail.length){subAdvance(3);return;}save();render();};
        return roundLine(r,3)+'<p class="rm-question">Follow Cooper’s trail, one pawprint at a time.</p><p>Start at the upper-left gate. Each arrow points to the next print.</p><div class="rm-trail">'+['→','↓','←','↑','↓','↑','↑','→','★'].map((v,i)=>button(icon('paw')+'<b>'+v+'</b>','trace','rm-track '+(d.track.includes(i)?'is-found':''),'data-index="'+i+'" aria-label="Square '+(i+1)+', '+esc(v)+'" '+(d.track.includes(i)?'disabled':''))).join('')+'</div>';
      }
      action=(a,i)=>{if(a==='spot'){if(i===5)subAdvance(3);else fail('Look for a pad with four little toes.');}};
      return roundLine(r,3)+'<p class="rm-question">One mark in the corner belongs to Cooper. Find his print.</p><div class="rm-prints">'+['flower','leaf','flower','butterfly','flower','paw','leaf','butterfly','flower'].map((v,i)=>button(icon(v),'spot','rm-mark','data-index="'+i+'" aria-label="Mark '+(i+1)+', '+v+'"')).join('')+'</div>';
    }
    const treasureTargets=['star','heart','butterfly','key','paw'];
    const treasureLabels=['Golden star','Little heart','Blue butterfly','Miniature key','Pawprint'];
    const roomClues=[
      ['star',16,18],['heart',81,78],['butterfly',84,28],['key',40,72],['paw',55,36],
      ['flower',28,42],['rose',70,59],['leaf',14,68],['diamond',40,22],['circle',64,84],['leaf',92,55]
    ];
    function treasure() {
      const d=draft();
      if(!d.started||d.timeup){
        action=a=>{if(a==='timer'||a==='practice'){
          Object.assign(d,{started:true,timeup:false,mode:a,seconds:90,found:d.timeup?[]:(d.found||[])});save();render();
        }};
        return '<p class="rm-question">'+(d.timeup?'The room is ready for another look.':'Five little treasures are tucked into the birthday photograph.')+'</p><p>Find a golden star, a heart, a blue butterfly, a key and a pawprint. Each mark is selectable.</p><div class="rm-row">'+button('Search for 90 seconds','timer','rm-primary')+button('Search at my own pace','practice')+'</div>';
      }
      d.found=Array.isArray(d.found)?d.found:[];
      action=(a,i)=>{if(a!=='search')return;
        const name=roomClues[i][0];
        if(!treasureTargets.includes(name)){fail('A little decoration. Look for one of the five shapes below.');return;}
        if(!d.found.includes(name))d.found.push(name);
        if(d.found.length===5){advance();return;}save();render();live('Found '+d.found.length+' of 5.');
      };
      if(d.mode==='timer'){ticker=setInterval(()=>{if(document.hidden||!root.isConnected)return;d.seconds--;save();
        if(d.seconds<=0){d.timeup=true;save();render();return;}
        const clock=root.querySelector('.rm-time');if(clock)clock.textContent=d.seconds+' s';
      },1000);}
      return '<div class="rm-scorebar"><span>'+d.found.length+' of 5 found</span><span class="rm-time">'+(d.mode==='timer'?d.seconds+' s':'Take your time')+'</span></div><div class="rm-search" style="--rm-scene:url(&quot;'+photo(1)+'&quot;)">'+roomClues.map(([shape,x,y],i)=>button(icon(shape),'search','rm-secret rm-'+shape+' '+(d.found.includes(shape)?'is-found':''),'data-index="'+i+'" style="left:'+x+'%;top:'+y+'%" aria-label="Inspect '+esc(shape)+'" '+(d.found.includes(shape)?'disabled':''))).join('')+'</div><p class="rm-checklist">'+treasureTargets.map((v,i)=>'<span class="'+(d.found.includes(v)?'is-found':'')+'">'+icon(d.found.includes(v)?'check':v)+esc(treasureLabels[i])+'</span>').join('')+'</p>';
    }
    const beatNames=['Moon','Leaf','Heart','Star'];
    const beatIcons=['circle','leaf','heart','star'];
    const sequences=[[0,2,1],[3,1,0,2,3],[1,3,2,0,2,1,3]];
    function rhythm() {
      const d=draft(),r=d.round||0,seq=sequences[r],pace=[620,520,440][r];
      let heard=false, entered=[];
      function light(i) {
        root.querySelectorAll('.rm-pad').forEach((el,j)=>{el.classList.toggle('is-lit',i===j);});
        if(i!==-1){try{opt.onAudio?.({type:'tone',hz:[262,330,392,523][i],duration:.13});}catch{}}
      }
      function watch(){
        clean();playing=true;heard=false;entered=[];let p=0;
        const status=root.querySelector('.rm-beat-state');
        const button=root.querySelector('[data-act="listen"]');
        button.disabled=true;
        const loop=()=>{
          if(p>=seq.length){light(-1);playing=false;heard=true;button.disabled=false;status.textContent='Your turn. Repeat all '+seq.length+' beats.';return;}
          const which=seq[p++];light(which);status.textContent='Beat '+p+' · '+beatNames[which];
          timeout=setTimeout(()=>{light(-1);timeout=setTimeout(loop,Math.round(pace*.36));},Math.round(pace*.64));
        };
        loop();
      }
      function tap(i){
        if(!heard||playing){fail('Play the sequence first. Wait for “Your turn”.');return;}
        if(i!==seq[entered.length]){entered=[];heard=false;light(-1);fail('That beat was different. Play the sequence again.');return;}
        light(i);clearTimeout(timeout);timeout=setTimeout(()=>light(-1),170);entered.push(i);
        if(entered.length===seq.length){subAdvance(3);return;}
        root.querySelector('.rm-beat-state').textContent=entered.length+' of '+seq.length+' beats repeated.';
      }
      action=(a,i)=>{if(a==='listen')watch();if(a==='beat')tap(i);};
      keyAction=e=>{if(/^[1-4]$/.test(e.key)){e.preventDefault();tap(Number(e.key)-1);}};
      return roundLine(r,3)+'<p class="rm-question">Watch the '+seq.length+' beats, then play them back.</p><div class="rm-pads">'+beatNames.map((v,i)=>button(icon(beatIcons[i])+'<span>'+v+'</span>','beat','rm-pad','data-index="'+i+'" aria-label="Key '+(i+1)+', '+v+'"')).join('')+'</div><p class="rm-beat-state" aria-live="polite">The shapes light up in order. Listen or watch.</p>'+button('Play the sequence','listen','rm-primary')+hint('On a keyboard, use 1 to 4 from left to right. You can replay a sequence as often as you like.');
    }
    function jigsaw() {
      const d=draft(),r=d.round||0,cols=[2,4,4][r],rows=[2,2,3][r],total=cols*rows;
      if(!Array.isArray(d.tiles)||d.tiles.length!==total){
        d.tiles=shuffle([...Array(total).keys()]);
        if(d.tiles.every((v,i)=>v===i))[d.tiles[0],d.tiles[1]]=[d.tiles[1],d.tiles[0]];
        save();
      }
      action=(a,i)=>{
        if(a==='reference'){d.show=!d.show;save();render();return;}
        if(a!=='piece')return;
        if(d.selected===undefined)d.selected=i;
        else if(d.selected===i)delete d.selected;
        else {const prev=d.selected;[d.tiles[prev],d.tiles[i]]=[d.tiles[i],d.tiles[prev]];delete d.selected;
          if(d.tiles.every((v,j)=>v===j)){if(r<2){subAdvance(3);return;}advance();return;}
        }save();render();
        root.querySelector('[data-act="piece"][data-index="'+i+'"]')?.focus({preventScroll:true});
      };
      return roundLine(r,3)+'<p class="rm-question">Put our '+total+'-piece picture back together.</p><p>Tap two pieces to swap them. Each little number tells you where its piece belongs, reading left to right.</p><div class="rm-jigsaw" style="--rm-cols:'+cols+';--rm-rows:'+rows+'">'+d.tiles.map((piece,i)=>{
        const x=piece%cols,y=Math.floor(piece/cols);
        return button('<span>'+(piece+1)+'</span>','piece','rm-piece '+(d.selected===i?'is-picked':''),'data-index="'+i+'" aria-label="Position '+(i+1)+', piece '+(piece+1)+'" aria-pressed="'+(d.selected===i)+'" style="background-image:url('+photo(88)+');background-size:'+(cols*100)+'% '+(rows*100)+'%;background-position:'+(x*100/(cols-1))+'% '+(y*100/(rows-1))+'%"');
      }).join('')+'</div><div class="rm-row">'+small(d.show?'Hide the full picture':'Peek at the full picture','reference')+'</div>'+(d.show?'<img class="rm-reference" src="'+photo(88)+'" alt="Roli and Gaurav making a heart with their hands at their wedding.">':'');
    }
    function game(){
      const s=state(), n=s.step, id=mission+'.'+n;
      if(puzzles[id]){
        const set=puzzles[id],r=draft().round||0,[q,answers,h]=set[r];
        return typed(q,answers,h,{pre:roundLine(r,set.length),finish:()=>subAdvance(set.length)});
      }
      if(pairs[id])return pairing(pairs[id]);
      if(id==='1.1')return chipSequence(['T','U','O','F','I','T'],['O','U','T','F','I','T'],'Build a six-letter word out of the letters below. Use each tile once.','It means a whole set of clothes worn together. It starts with O.');
      if(id==='1.2')return typed('Five clues, one three-digit lock. What’s the code?',['042'],'738 rules out all three of those digits. Look at what that leaves in 780.',{numeric:true,placeholder:'000',label:'Three-digit code',pre:'<dl class="rm-codeboard">'+[['682','One right digit, in the right place.'],['614','One right digit, in the wrong place.'],['206','Two right digits, both in the wrong place.'],['738','No digits are correct.'],['780','One right digit, in the wrong place.']].map(([n,h])=>'<div><dt>'+n+'</dt><dd>'+h+'</dd></div>').join('')+'</dl>'});
      if(id==='2.2')return route();
      if(id==='3.2'||id==='5.2')return memory();
      if(id==='4.1')return typed('Take one letter from each word in order. What’s the hidden message?',['love'],'Count from one, starting on the left.',{pre:'<dl class="rm-codeboard">'+[['CLOUD','2nd letter'],['BOOK','3rd letter'],['LOVE','3rd letter'],['READ','2nd letter']].map(([w,h])=>'<div><dt>'+w+'</dt><dd>'+h+'</dd></div>').join('')+'</dl>'});
      if(id==='4.2')return chipSequence(['A promise to stay together','Two strangers meet','Trust begins to grow','A friendship becomes special'],['Two strangers meet','A friendship becomes special','Trust begins to grow','A promise to stay together'],'Choose the four moments in the order you’d tell this little story.','Begin with the meeting. Put friendship before trust, and save the promise for last.');
      if(mission===6)return songRound(n);
      if(id==='7.0')return galleryTest();
      if(id==='7.2')return curator();
      if(id==='8.0'||id==='9.0')return arcade();
      if(id==='8.1')return travel();
      if(id==='8.2'||id==='9.2')return maker();
      if(id==='9.1')return investigate();
      if(id==='10.0')return treasure();
      if(id==='10.1')return rhythm();
      return jigsaw();
    }
    function bonus() {
      const copy=[
        ['Finish the line','Play the opening, pause it and sing the next bit together.','humse-rahoge',8],
        ['Three-second challenge','Listen for just three seconds. Name the song before you reveal it.','ajab-si',3],
        ['Hum that tune','Choose a favourite in your head and hum it for Your Hubby. Swap roles after he guesses.'],
        ['Picture clue','A moon makes a request. Can you name the song?']
      ];
      return '<details class="rm-bonus"><summary>Four optional music encores</summary>'+copy.map(([title,body,id,sec],i)=>'<details><summary>'+esc(title)+'</summary><p>'+esc(body)+'</p>'+(id?button(icon('sound')+' Play '+sec+' seconds','bonusclip','','data-id="'+id+'" data-sec="'+sec+'"'):'')+(i===1||i===3?'<details><summary>Reveal answer</summary><p>'+(i===1?'Ajab Si':'Chand Sifarish')+'</p></details>':'')+'</details>').join('')+'</details>';
    }
    function personalNote(m, found) {
      const image=window.RoliPhotos?.[m.photo-1];
      const greeting=m.cooper?'Mumma,':(mission===1?'Dearest Roli,':mission===10?'My love,':'Roli,');
      const signoff=m.cooper?(mission===5?'With a very clean paw,':'Lots of licks,'):(mission===10?'Forever yours,':'With love,');
      const signature=m.cooper?'Cooper':'Gaurav';
      const picture='<figure><img src="'+photo(m.photo)+'" alt="'+esc(image?.alt||'A photograph from your album.')+'">'+(image?.caption?'<figcaption>'+esc(image.caption)+'</figcaption>':'')+'</figure>';
      return '<article class="rm-intro" aria-label="A note from '+signature+'">'+picture+'<div class="rm-ink"><p class="rm-greeting">'+greeting+'</p><p class="rm-letter">'+esc(found?m.after:m.intro)+'</p><p class="rm-sign"><span>'+signoff+'</span><b>'+signature+'</b>'+(m.cooper?retriever:'<small>Your Hubby</small>')+'</p></div></article>';
    }
    function envelopeIndex() {
      const items=missions.map((_,i)=>{
        const n=i+1, found=data[n]?.found, suffix=found?', surprise found':!addr(n)?', still sealed':'';
        return button(describe(n)+(found?' '+icon('check'):addr(n)?'':' '+icon('lock')),'open','rm-nav '+(n===mission?'is-current':''),'data-index="'+n+'" aria-label="Envelope '+n+suffix+'" '+(n===mission?'aria-current="step" ':'')+(!addr(n)?'disabled':''));
      });
      return '<details class="rm-ledger-menu"><summary>All envelopes</summary><nav aria-label="Your birthday envelopes">'+items.join('')+'</nav></details>';
    }
    function render() {
      const focused=root.contains(document.activeElement)?document.activeElement:null;
      const previousAction=focused?.dataset.act, previousIndex=focused?.dataset.index;
      clean();action=()=>{};liveInput=()=>{};keyAction=()=>{};
      const s=state(), m=info(), found=!!s.found,locked=!addr(mission),step=s.step;
      const view=locked?'locked':found?'found':step===-1?'intro':step===3?'clue':'game';
      const top=view==='game'?m.games[step]:view==='locked'?'Still sealed':view==='clue'?(m.cooper?'My last clue, Mumma.':'Where I hid your surprise'):view==='found'?m.gift:m.title;
      let content;
      if(view==='locked')content='<p>There’s another envelope to open first. You’ll find it on your birthday itinerary.</p>'+button('Find my next envelope','exit','rm-primary');
      else if(view==='intro')content=personalNote(m,false)+button('Open the first challenge '+icon('arrow'),'begin','rm-primary');
      else if(view==='game')content=game();
      else if(view==='clue')content=(mission===6?bonus():'')+'<div class="rm-find">'+icon(m.cooper?'paw':'pin')+'<p>'+esc(m.clue)+'</p></div>'+hint(m.place,'Tell me where to look')+button('I found my surprise! '+icon('heart'),'found','rm-primary');
      else content=personalNote(m,true)+'<div class="rm-row">'+button('Continue my birthday '+icon('arrow'),'exit','rm-primary')+button('Play this envelope again','replay')+'</div>'+(Array.isArray(data[mission]?.keepsake)?button('Save my '+(mission===9?'poster':'postcard'),'savedcard','rm-text'):'');
      const stepText=view==='game'?'Challenge '+(step+1)+' of 3':view==='found'?'Surprise found':view==='clue'?'Ready to find':view==='intro'?(m.cooper?'From Cooper':'From Gaurav'):'Sealed';
      root.innerHTML='<section class="rm-shell" aria-label="Ten birthday envelopes"><div class="rm-tools">'+button('‹ &nbsp; Birthday itinerary','exit','rm-text')+envelopeIndex()+'</div><div class="rm-stage" data-view="'+view+'" data-dog="'+!!m.cooper+'"><div class="rm-step"><span>Envelope '+describe(mission)+'</span><span>'+stepText+(replay?' · Replay':'')+'</span></div><h2 class="rm-title" tabindex="-1">'+esc(top)+'</h2><div class="rm-gamebody">'+content+'</div><p class="rm-notice" aria-live="polite" role="status"></p></div></section>';
      const stage=root.querySelector('.rm-stage');
      if(view==='game')stage.insertAdjacentHTML('afterbegin',backdrop(mission));
      if(view==='found' && celebrate){stage.insertAdjacentHTML('afterbegin',celebration(m.cooper));celebrate=false;}
      const heading=mission+'.'+view+'.'+step;
      if(lastHeading!==heading && lastHeading!==''){titleFocus();root.querySelector('.rm-tools')?.scrollIntoView?.({behavior:'instant',block:'nearest'});}
      else if(previousAction){
        const sameAction=[...root.querySelectorAll('[data-act]')].filter(el=>el.dataset.act===previousAction&&!el.disabled);
        (sameAction.find(el=>el.dataset.index===previousIndex)||sameAction[0])?.focus({preventScroll:true});
      }
      lastHeading=heading;
    }
    function onClick(e){
      const el=e.target.closest('[data-act]');if(!el||!root.contains(el)||el.disabled)return;
      const a=el.dataset.act,i=Number(el.dataset.index);
      if(a==='exit'){clean();save();opt.onExit?.(mission);return;}
      if(a==='open'){if(!addr(i))return;mission=i;replay=null;progress();render();opt.onAudio?.({type:'enter',mission});return;}
      if(a==='replay'){replay={step:-1,found:false,draft:{}};render();return;}
      if(a==='savedcard'){downloadCard(mission===9?'Cooper’s adventure':'Our perfect day',data[mission].keepsake,mission===9);return;}
      if(a==='begin'){advance();return;}
      if(a==='found'){
        if(replay){replay=null;render();return;}
        data[mission].found=true;celebrate=true;progress();
        if(typeof opt.getUnlocked==='function')limit=clipNumber(opt.getUnlocked(),1,10);
        else if(mission===limit && mission!==5 && mission<10)limit=mission+1;
        opt.onAudio?.({type:'reveal',mission});render();return;
      }
      if(a==='bonusclip'){playClip(el.dataset.id,Number(el.dataset.sec));return;}
      action(a,i);
    }
    function onKey(e){
      if(e.key==='Enter'&&e.target.matches('.rm-answer')){e.preventDefault();action('submit');}
      else if(!e.target.matches('input,select,textarea'))keyAction(e);
    }
    function onInput(e){liveInput(e);}
    root.addEventListener('click',onClick);root.addEventListener('input',onInput);root.addEventListener('change',onInput);root.addEventListener('keydown',onKey);
    function unmount(){clean();save();root.removeEventListener('click',onClick);root.removeEventListener('input',onInput);root.removeEventListener('change',onInput);root.removeEventListener('keydown',onKey);if(root._roliUnmount===unmount)delete root._roliUnmount;}
    root._roliUnmount=unmount;
    render();opt.onAudio?.({type:'enter',mission});
    return {unmount,destroy:unmount,getProgress:()=>event()};
  }
  window.RoliMissions={mount,getCompleted:()=>completed(read())};
})();
