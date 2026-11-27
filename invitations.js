(function () {
  'use strict';

  const plans = {
    breakfast: {
      title: 'Breakfast with you',
      intro: 'Good morning, Roli!',
      question: 'Aaj birthday breakfast mein kya khana pasand karogi?',
      choices: ['North Indian', 'South Indian', 'English Breakfast', 'Korean Breakfast', 'Homemade Food'],
      venue: 'Roastery Coffee House · Banashankari',
      times: ['9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM'],
      photo: '50',
      alt: 'Roli and Gaurav smiling together at a wooden restaurant table.',
      reveal: 'Thanks for choosing our breakfast, birthday girl. It’s a date.',
    },
    afternoon: {
      title: 'An afternoon for two',
      intro: 'Games or a movie?',
      question: 'Roli, what shall we do together this afternoon?',
      choices: ['Play Games', 'Watch a Movie'],
      venues: ['Whitefield Nexus', 'Phoenix Mall', 'Nexus Koramangala', 'Nexus Shantiniketan'],
      times: ['3:00 PM', '3:30 PM', '4:00 PM', '4:30 PM'],
      photo: '54',
      alt: 'The group together beneath the heart sign at a go-kart track.',
      reveal: 'Thanks for picking our afternoon. Ready for a rematch?',
    },
    dinner: {
      title: 'Dinner, just us',
      intro: 'Dinner with me, Roli?',
      question: 'What would you love to have for our birthday dinner date?',
      choices: ['Italian', 'North Indian', 'Asian / Chinese', 'Fine Dining / Multi-cuisine'],
      venue: 'FOO · Indiranagar',
      times: ['8:30 PM', '9:00 PM', '9:30 PM', '10:00 PM'],
      photo: '61',
      alt: 'Gaurav kisses Roli on the cheek beside their table.',
      reveal: 'Thanks for choosing dinner. One more birthday date, just the two of us.',
    },
  };
  const places = ['Ghar pe', 'Bahar'];
  const day = 'Monday, 30 November 2026';
  let nextId = 0;

  function element(tag, className, text) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined) node.textContent = text;
    return node;
  }

  function button(label, className, action) {
    const control = element('button', className, label);
    control.type = 'button';
    control.addEventListener('click', action);
    return control;
  }

  function imageFor(plan) {
    const image = element('img', 'ri-photo');
    image.alt = plan.alt;
    image.src = 'assets/photos/' + plan.photo + '.webp';
    image.decoding = 'async';
    return image;
  }

  function mount(root, options) {
    const { type } = options;
    const plan = plans[type];
    if (!root || !plan) return;
    const afternoon = type === 'afternoon';
    const placeOptions = afternoon ? plan.venues : places;
    const id = 'ri-' + (++nextId);
    let saved = null;
    let state;
    let ticketOpen;

    function clean(source) {
      const data = source && source.type === type ? source : {};
      const choice = plan.choices.includes(data.choice) ? data.choice : '';
      const place = placeOptions.includes(data.place) ? data.place : '';
      const time = plan.times.includes(data.time) ? data.time : '';
      const maxStep = !choice ? 0 : !place ? 1 : 2;
      const step = Number.isInteger(data.step) ? Math.max(0, Math.min(maxStep, data.step)) : 0;
      return { version: 1, type, step, choice, place, time, editing: data.editing === true };
    }

    function venueFor(data) {
      if (afternoon) return (data.choice === 'Play Games' ? 'Timezone · ' : 'Cinema · ') + data.place;
      return data.place === 'Bahar' ? plan.venue : 'At home';
    }

    function ticketData(data) {
      const title = afternoon ? (data.choice === 'Play Games' ? 'Arcade date for two' : 'Movie date for two') : plan.title;
      const venue = venueFor(data);
      return {
        version: 1, type, date: '2026-11-30', title, choice: data.choice, place: data.place,
        venue, time: data.time, [afternoon ? 'activity' : 'food']: data.choice,
        summary: [data.choice, venue, data.time].join(' · '),
      };
    }

    const savedChoices = clean(options.saved);
    if (savedChoices.choice && savedChoices.place && savedChoices.time) saved = ticketData(savedChoices);
    const draft = clean(options.draft);
    state = saved && !draft.editing ? clean(saved) : draft;
    ticketOpen = Boolean(saved && !draft.editing);

    function persist() {
      options.onDraft?.({ ...state });
    }

    function photoPanel() {
      const figure = element('figure', 'ri-cover');
      const picture = imageFor(plan);
      const caption = element('figcaption', 'ri-cover-caption');
      caption.append(element('span', 'ri-cover-title', plan.title), element('span', 'ri-cover-date', day));
      figure.append(picture, caption);
      return figure;
    }

    function goTo(step) {
      state.step = step;
      persist();
      render(true);
    }

    function steps() {
      return [
        { key: 'choice', title: plan.intro, prompt: plan.question, choices: plan.choices },
        {
          key: 'place',
          title: afternoon ? (state.choice === 'Play Games' ? 'Which Timezone?' : 'Which mall for the movie?') : 'Ghar pe or bahar?',
          prompt: afternoon ? 'Pick the mall for our afternoon together.' : 'Shall we stay in or go out together?',
          choices: placeOptions,
        },
        {
          key: 'time',
          title: afternoon ? 'What time shall we go?' : type === 'breakfast' ? 'What time for breakfast?' : 'What time for dinner?',
          prompt: state.place ? state.choice + ' · ' + venueFor(state) : day,
          choices: plan.times,
        },
      ];
    }

    function editor(main) {
      const details = steps();
      const current = details[state.step];
      main.append(photoPanel());
      const page = element('div', 'ri-page');
      const progress = element('div', 'ri-progress');
      const label = element('span', 'ri-progress-label', 'Step ' + (state.step + 1) + ' of 3');
      const line = element('span', 'ri-progress-track');
      line.setAttribute('aria-hidden', 'true');
      line.style.setProperty('--ri-progress', String((state.step + 1) / 3));
      progress.append(label, line);
      const title = element('h2', 'ri-heading', current.title);
      title.id = id + '-title';
      title.tabIndex = -1;
      const form = element('form', 'ri-form');
      const fields = element('fieldset', 'ri-fieldset');
      fields.append(element('legend', 'ri-question', current.prompt));
      const list = element('div', 'ri-choices' + (current.key === 'time' ? ' ri-times' : ''));
      const next = element('button', 'ri-primary', state.step === 2 ? 'Make my invitation' : 'Continue');
      next.type = 'submit';
      next.disabled = !state[current.key];
      current.choices.forEach((value) => {
        const option = element('label', 'ri-option');
        const control = element('input');
        control.type = 'radio';
        control.name = id + '-' + current.key;
        control.value = value;
        control.required = true;
        control.checked = state[current.key] === value;
        const copy = element('span', 'ri-option-copy');
        copy.append(element('span', 'ri-option-title', value));
        if (!afternoon && current.key === 'place') {
          copy.append(element('small', 'ri-option-detail', value === 'Ghar pe' ? 'At home, together' : plan.venue));
        }
        option.append(control, copy);
        control.addEventListener('change', () => {
          state[current.key] = value;
          next.disabled = false;
          persist();
        });
        list.append(option);
      });
      fields.append(list);
      const controls = element('div', 'ri-controls');
      if (state.step > 0) controls.append(button('Back', 'ri-text-button', () => goTo(state.step - 1)));
      controls.append(next);
      form.append(fields, controls);
      form.addEventListener('submit', (event) => {
        event.preventDefault();
        if (!state[current.key]) return;
        if (state.step < 2) {
          goTo(state.step + 1);
          return;
        }
        saved = ticketData(state);
        state.editing = false;
        ticketOpen = true;
        persist();
        options.onSave?.({ ...saved });
        render(true);
      });
      page.append(progress, title, form);
      main.append(page);
    }

    function ticket(main) {
      const paper = element('article', 'ri-ticket');
      const portrait = element('div', 'ri-ticket-image');
      portrait.append(imageFor(plan));
      const letter = element('div', 'ri-ticket-letter');
      const title = element('h2', 'ri-ticket-title', saved.title);
      title.id = id + '-title';
      title.tabIndex = -1;
      const dateline = element('p', 'ri-ticket-date', day);
      const to = element('p', 'ri-ticket-salute', 'Dear Roli,');
      const invitation = element('p', 'ri-ticket-note',
        afternoon && saved.choice === 'Watch a Movie' ? 'Thanks for picking a movie. I’ll take the seat next to you.' : plan.reveal);
      const info = element('dl', 'ri-ticket-details');
      [[afternoon ? 'Activity' : 'Food preference', saved.choice], ['Where', saved.venue], ['When', saved.time]].forEach(([term, value]) => {
        const row = element('div');
        row.append(element('dt', '', term), element('dd', '', value));
        info.append(row);
      });
      const signature = element('p', 'ri-signature', 'Your Hubby');
      letter.append(dateline, title, to, invitation, info, signature);
      paper.append(portrait, letter);
      const controls = element('div', 'ri-ticket-controls');
      controls.append(
        button('Edit my choices', 'ri-text-button', () => {
          state = { ...clean(saved), editing: true };
          ticketOpen = false;
          persist();
          render(true);
        }),
        button('Continue my birthday', 'ri-primary', () => options.onContinue?.()),
      );
      main.append(paper, controls);
    }

    function render(focus) {
      const shell = element('section', 'ri ri-' + type + (ticketOpen ? ' ri-saved' : ''));
      shell.setAttribute('aria-labelledby', id + '-title');
      const head = element('div', 'ri-top');
      head.append(button('Back to my birthday', 'ri-exit', () => options.onExit?.()));
      const main = element('div', ticketOpen ? 'ri-ticket-stage' : 'ri-editor');
      if (ticketOpen) ticket(main);
      else editor(main);
      shell.append(head, main);
      root.replaceChildren(shell);
      if (focus) {
        const heading = root.querySelector('h2');
        heading.focus({ preventScroll: true });
        if (shell.getBoundingClientRect().top < -48) shell.scrollIntoView({ block: 'start' });
      }
    }
    render(false);
  }

  window.RoliInvitations = { mount };
})();
