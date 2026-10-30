// Buzz: a small keyword chatbot about Gia. No network, no tracking.
(function () {
  const fab = document.getElementById('buzz-fab');
  const panel = document.getElementById('buzz-panel');
  const closeBtn = document.getElementById('buzz-close');
  const log = document.getElementById('buzz-log');
  const form = document.getElementById('buzz-form');
  const input = document.getElementById('buzz-input');

  // Fill in the repo link once the site is on GitHub.
  const REPO_URL = 'https://github.com/Z15-N/gia-portfolio';
  const repoLink = document.getElementById('repo-link');
  if (repoLink) repoLink.href = REPO_URL;

  let opened = false;
  let quiz = null; // { q: [...], i, score }
  let name = null;

  const HELP = "Things I can do:\n• 'projects' or 'what did Gia build?'\n• 'maths', 'tutoring', 'battlecode', 'skills'\n• 'quiz me' (3 quick maths questions)\n• 'joke', 'fact', 'contact'\n• 'bye'";

  const JOKES = [
    "Why did the bee get married? Because it found its honey.",
    "What do you call a bee that can't make up its mind? A maybe.",
    "Parallel lines have so much in common. It's a shame they'll never meet.",
    "I told a maths joke in class once. Nobody got it. The class average was a median.",
  ];
  const FACTS = [
    "Gia tutors two students every single day, a Year 1 and a Year 7, 30 minutes each.",
    "Gia's SAT Math score is 790 out of 800.",
    "The original Buzz was built with 615 drag-and-drop blocks in mBlock.",
    "Gia has worked a register at peak hour in both a convenience store and a restaurant. Nothing on this page scares him.",
    "In UNSW Battlecode, Gia's team ran hundreds of self-play games before trusting any change to the bot.",
  ];

  function say(text, who = 'bot') {
    const el = document.createElement('div');
    el.className = 'msg ' + who;
    el.textContent = text;
    log.appendChild(el);
    log.scrollTop = log.scrollHeight;
  }
  function typing() {
    const el = document.createElement('div');
    el.className = 'msg bot typing';
    el.innerHTML = '<span></span><span></span><span></span>';
    log.appendChild(el);
    log.scrollTop = log.scrollHeight;
    return () => el.remove();
  }
  const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];
  const rnd = (a, b) => a + Math.floor(Math.random() * (b - a + 1));

  function startQuiz() {
    const a = rnd(12, 30), b = rnd(12, 30), c = rnd(3, 12), d = rnd(3, 12), e = rnd(20, 60), f = rnd(2, 19);
    quiz = { i: 0, score: 0, q: [
      { t: `What is ${a} + ${b}?`, ans: a + b },
      { t: `What is ${c} × ${d}?`, ans: c * d },
      { t: `What is ${e} − ${f}?`, ans: e - f },
    ]};
    say("Quiz time! Three questions, no calculator. " + quiz.q[0].t);
  }

  function reply(raw) {
    const q = raw.trim().toLowerCase();
    if (!q) return;

    if (quiz) {
      const n = parseInt(q.replace(/[^-\d]/g, ''), 10);
      const cur = quiz.q[quiz.i];
      if (q === 'stop' || q === 'quit') { quiz = null; say("Quiz stopped. Ask me anything else."); return; }
      if (Number.isNaN(n)) { say("Just the number, please. " + cur.t); return; }
      if (n === cur.ans) { quiz.score++; say("Correct!"); } else { say(`Not quite. It's ${cur.ans}.`); }
      quiz.i++;
      if (quiz.i < quiz.q.length) { say(quiz.q[quiz.i].t); }
      else {
        const s = quiz.score;
        say(s === 3 ? "3 out of 3! Gia would be proud." : `You got ${s} out of 3. Gia's students would say: try again tomorrow.`);
        quiz = null;
      }
      return;
    }

    const has = (...w) => w.some((x) => q.includes(x));
    const exact = (...w) => w.includes(q);

    if (has('help')) return say(HELP);
    if (has('quiz', 'test me', 'maths question')) return startQuiz();
    if (has('bye', 'goodbye', 'see you')) return say("Bye! Buzz off now. (Click the bee any time.)");
    if (has('call me ', 'my name is ', "i'm ", 'i am ')) {
      name = raw.trim().replace(/^(call me|my name is|i'm|i am)\s+/i, '').replace(/[^\w\s-]/g, '').trim();
      if (name) return say(`Nice to meet you, ${name}!`);
    }
    if (has('your name', 'who are you', 'what are you')) return say("I'm Buzz, Gia's chatbot. I started life as 615 blocks in mBlock, now I'm a few hundred lines of JavaScript.");
    if (has('project', 'built', 'build', 'made', 'work on')) return say("Gia's projects: Buzz the Bee (mBlock chatbot), a UNSW Battlecode 2026 tournament bot, Cambridge Battlecode (ongoing), a flight-delay model in KNIME, and this site on AWS Amplify. Scroll to Projects for links.");
    if (has('battlecode', 'bot', 'tournament')) return say("UNSW Battlecode 2026: a team of three writing a game bot. The rule was simple: a change ships only after it wins hundreds of self-play games and passes a statistical test. He's now competing in Cambridge Battlecode too.");
    if (has('math', 'tutor', 'teach', 'amc', 'student')) return say("Maths is Gia's home turf: SAT Math 790/800, and he coached a Year 7 student to two Australian Mathematics Competition first prizes plus a selective-school place. He tutors two students daily.");
    if (has('skill', 'python', 'java', 'code', 'program', 'claude', 'ai')) return say("Python and Java foundations, HTML/CSS/JS, KNIME for data workflows, and Claude Code as a pair programmer. Plus the non-tech ones: explaining things simply and staying calm at peak hour.");
    if (has('aws', 'amplify', 'host', 'website', 'site')) return say("This site is static HTML, CSS and JavaScript hosted on AWS Amplify Hosting, built for the AWS Student Builder Challenge.");
    if (has('contact', 'email', 'linkedin', 'hire', 'reach')) return say("Best route is LinkedIn: linkedin.com/in/gia-bach-nguyen-737049423. He's in Sydney and available part-time.");
    if (has('where', 'sydney', 'live', 'from')) return say("Sydney, Australia, since 2026. Originally from Ho Chi Minh City, Vietnam.");
    if (has('uts', 'study', 'degree', 'university', 'uni')) return say("Bachelor of Artificial Intelligence at the University of Technology Sydney, started 2026. First year is the maths underneath AI, which suits him.");
    if (has('joke', 'funny', 'laugh')) return say(pick(JOKES));
    if (has('fact', 'tell me something', 'secret')) return say(pick(FACTS));
    if (has('aiesec', 'club', 'consult')) return say("AIESEC in UTS marketing team (Most Improved Member, and the Instagram push that sold out a mentoring event) and the UTS Consulting Society's Aspiring Consultant Program.");
    if (has('thank')) return say("You're welcome!");
    if (has('love', 'cool', 'awesome', 'nice')) return say("Aw, thanks. Gia says hi.");
    if (exact('hi', 'hello', 'hey', 'yo', 'sup', 'hiya') || has('hello', 'good morning', 'good afternoon', 'good evening'))
      return say(`Hello${name ? ', ' + name : ''}! Ask me about Gia's projects, maths, or type 'quiz me'.`);
    if (has('how are you')) return say("Buzzing, thanks. Ask me something about Gia!");
    say("Hmm, I'm not sure about that one. Type 'help' to see what I know, or 'quiz me' if you're feeling brave.");
  }

  function open() {
    panel.hidden = false;
    fab.setAttribute('aria-expanded', 'true');
    if (!opened) {
      opened = true;
      say("Hi! I'm Buzz, Gia's bee. Ask me what he's built, or type 'quiz me' for three quick maths questions.");
    }
    input.focus();
  }
  function close() { panel.hidden = true; fab.setAttribute('aria-expanded', 'false'); fab.focus(); }

  fab.addEventListener('click', () => (panel.hidden ? open() : close()));
  closeBtn.addEventListener('click', close);
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && !panel.hidden) close(); });
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const v = input.value;
    if (!v.trim()) return;
    say(v, 'user');
    input.value = '';
    const done = typing();
    setTimeout(() => { done(); reply(v); }, 450);
  });
  document.getElementById('buzz-chips').addEventListener('click', (e) => {
    const b = e.target.closest('button[data-say]');
    if (!b) return;
    input.value = b.dataset.say;
    form.requestSubmit();
  });
  // Clicking the flying bee opens Buzz too.
  const flyer = document.getElementById('flyer');
  if (flyer) { flyer.style.pointerEvents = 'auto'; flyer.style.cursor = 'pointer'; flyer.addEventListener('click', open); }
})();

// Page effects: scroll progress, reveal-on-scroll, counting stats, active nav.
(function () {
  const bar = document.getElementById('progress');
  const onScroll = () => {
    const h = document.documentElement;
    const max = h.scrollHeight - h.clientHeight;
    bar.style.width = (max > 0 ? (h.scrollTop / max) * 100 : 0) + '%';
  };
  document.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const io = new IntersectionObserver((entries) => {
    entries.forEach((en) => {
      if (!en.isIntersecting && en.boundingClientRect.top > 0) return;
      en.target.classList.add('in');
      en.target.querySelectorAll('[data-count]').forEach(countUp);
      io.unobserve(en.target);
    });
  }, { threshold: 0.15 });
  document.querySelectorAll('.reveal, .stats').forEach((el) => io.observe(el));
  // Belt and braces: anything whose top has passed the fold gets revealed, even if the observer missed it
  // (fast scrolls and anchor jumps can skip an element without it ever intersecting).
  const sweep = () => document.querySelectorAll('.reveal:not(.in)').forEach((el) => {
    if (el.getBoundingClientRect().top < window.innerHeight) { el.classList.add('in'); el.querySelectorAll('[data-count]').forEach(countUp); }
  });
  let ticking = false;
  document.addEventListener('scroll', () => { if (!ticking) { ticking = true; requestAnimationFrame(() => { sweep(); ticking = false; }); } }, { passive: true });
  setTimeout(sweep, 1200);

  function countUp(el) {
    const target = parseInt(el.dataset.count, 10);
    if (reduce) { el.textContent = target; return; }
    const dur = 1200, t0 = performance.now();
    const tick = (t) => {
      const k = Math.min(1, (t - t0) / dur);
      const eased = 1 - Math.pow(1 - k, 3);
      el.textContent = Math.round(target * eased);
      if (k < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }

  const links = [...document.querySelectorAll('.top nav a')];
  const secs = links.map((a) => document.querySelector(a.getAttribute('href'))).filter(Boolean);
  const nav = new IntersectionObserver((entries) => {
    entries.forEach((en) => {
      if (!en.isIntersecting) return;
      links.forEach((a) => a.classList.toggle('active', a.getAttribute('href') === '#' + en.target.id));
    });
  }, { rootMargin: '-40% 0px -50% 0px' });
  secs.forEach((s) => nav.observe(s));
})();
