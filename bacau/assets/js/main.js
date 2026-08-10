/* ══════════════════════════════════════════════════════════
   BILKAROOFART — interaction layer
   ══════════════════════════════════════════════════════════ */
(function () {
  'use strict';

  const $  = (s, c) => (c || document).querySelector(s);
  const $$ = (s, c) => Array.from((c || document).querySelectorAll(s));

  /* ── nav: solid on scroll ── */
  const nav = $('#nav');
  if (nav) {
    const onScroll = () => nav.classList.toggle('solid', window.scrollY > 24);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ── mobile drawer ── */
  const burger = $('#burger');
  const drawer = $('#drawer');
  if (burger && drawer) {
    const close = () => {
      drawer.classList.remove('on');
      burger.classList.remove('on');
      burger.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    };
    burger.addEventListener('click', () => {
      const open = drawer.classList.toggle('on');
      burger.classList.toggle('on', open);
      burger.setAttribute('aria-expanded', String(open));
      document.body.style.overflow = open ? 'hidden' : '';
    });
    $$('a', drawer).forEach(a => a.addEventListener('click', close));
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' && drawer.classList.contains('on')) close();
    });
  }

  /* ── reveal on scroll ── */
  const revealables = $$('.rv, .rv-line');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(en => {
        if (en.isIntersecting) {
          en.target.classList.add('in');
          io.unobserve(en.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });
    revealables.forEach(el => io.observe(el));
  } else {
    revealables.forEach(el => el.classList.add('in'));
  }

  /* ── hero parallax ── */
  const heroImg = $('.hero-media img');
  if (heroImg && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    let ticking = false;
    const par = () => {
      const y = window.scrollY;
      if (y < window.innerHeight * 1.2) {
        heroImg.style.transform = `translate3d(0, ${y * 0.24}px, 0)`;
      }
      ticking = false;
    };
    window.addEventListener('scroll', () => {
      if (!ticking) { requestAnimationFrame(par); ticking = true; }
    }, { passive: true });
  }

  /* ── counters ── */
  const counters = $$('[data-to]');
  if (counters.length && 'IntersectionObserver' in window) {
    const cio = new IntersectionObserver((entries) => {
      entries.forEach(en => {
        if (!en.isIntersecting) return;
        const el = en.target;
        const to = parseFloat(el.dataset.to);
        const dec = (el.dataset.to.split('.')[1] || '').length;
        const dur = 1700;
        const t0 = performance.now();
        const tick = (now) => {
          const p = Math.min((now - t0) / dur, 1);
          const e = 1 - Math.pow(1 - p, 3);
          el.textContent = (to * e).toFixed(dec);
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
        cio.unobserve(el);
      });
    }, { threshold: 0.55 });
    counters.forEach(el => cio.observe(el));
  }

  /* ── pricing switch ── */
  $$('.pr-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const key = btn.dataset.pane;
      $$('.pr-btn').forEach(b => b.classList.remove('on'));
      $$('.pr-pane').forEach(p => p.classList.remove('on'));
      btn.classList.add('on');
      const pane = $('#pane-' + key);
      if (pane) pane.classList.add('on');
    });
  });

  /* ── video players ── */
  $$('.vid').forEach(box => {
    const v = $('video', box);
    const b = $('.vid-play', box);
    if (!v || !b) return;
    b.addEventListener('click', () => {
      $$('.vid video').forEach(o => {
        if (o !== v && !o.paused) {
          o.pause();
          const ob = $('.vid-play', o.closest('.vid'));
          if (ob) ob.classList.remove('off');
        }
      });
      v.play();
      b.classList.add('off');
    });
    v.addEventListener('play',  () => b.classList.add('off'));
    v.addEventListener('pause', () => b.classList.remove('off'));
    v.addEventListener('ended', () => b.classList.remove('off'));
  });

  /* ── lightbox ── */
  const lb = $('#lb');
  if (lb) {
    const lbImg  = $('#lb-img');
    const items  = $$('[data-lb]');
    let idx = 0;

    const open = (i) => {
      idx = (i + items.length) % items.length;
      const src = items[idx].dataset.lb || $('img', items[idx]).src;
      lbImg.src = src;
      lbImg.alt = $('img', items[idx]) ? $('img', items[idx]).alt : '';
      lb.classList.add('on');
      document.body.style.overflow = 'hidden';
    };
    const close = () => {
      lb.classList.remove('on');
      document.body.style.overflow = '';
    };

    items.forEach((el, i) => el.addEventListener('click', () => open(i)));
    $('#lb-x').addEventListener('click', close);
    $('#lb-p').addEventListener('click', () => open(idx - 1));
    $('#lb-n').addEventListener('click', () => open(idx + 1));
    lb.addEventListener('click', e => { if (e.target === lb) close(); });
    document.addEventListener('keydown', e => {
      if (!lb.classList.contains('on')) return;
      if (e.key === 'Escape')     close();
      if (e.key === 'ArrowLeft')  open(idx - 1);
      if (e.key === 'ArrowRight') open(idx + 1);
    });
  }

  /* ── contact form ── */
  const form = $('#form');
  if (form) {
    const msg = $('#form-msg');
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const nume = $('#f-nume');
      const tel  = $('#f-tel');

      if (!nume.value.trim()) {
        msg.textContent = 'Completați numele.';
        msg.className = 'form-msg err';
        nume.focus(); return;
      }
      if (tel.value.replace(/\D/g, '').length < 9) {
        msg.textContent = 'Completați un număr de telefon valid.';
        msg.className = 'form-msg err';
        tel.focus(); return;
      }

      const btn = $('button[type="submit"]', form);
      const html = btn.innerHTML;
      btn.disabled = true;
      btn.textContent = 'Se trimite…';
      msg.textContent = '';
      msg.className = 'form-msg';

      // Simulare. Pentru trimitere reală: Formspree / Web3Forms / webhook.
      setTimeout(() => {
        msg.textContent = 'Cererea a fost înregistrată. Vă contactăm în cel mai scurt timp.';
        msg.className = 'form-msg ok';
        form.reset();
        btn.disabled = false;
        btn.innerHTML = html;
        setTimeout(() => { msg.textContent = ''; msg.className = 'form-msg'; }, 7000);
      }, 900);
    });
  }

  /* ── year ── */
  $$('[data-year]').forEach(el => { el.textContent = new Date().getFullYear(); });

})();
