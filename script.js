(function () {
  'use strict';

  /* ---- Header ---- */
  var header = document.querySelector('.site-header');
  if (header) {
    var onScroll = function () {
      header.classList.toggle('scrolled', window.scrollY > 60);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ---- Mobile nav ---- */
  var toggle = document.querySelector('.nav-toggle');
  var menu = document.querySelector('.nav-menu');
  var overlay = document.createElement('div');
  overlay.id = 'nav-overlay';
  document.body.appendChild(overlay);

  function openNav() {
    menu.classList.add('open');
    overlay.classList.add('active');
    toggle.classList.add('open');
  }
  function closeNav() {
    menu.classList.remove('open');
    overlay.classList.remove('active');
    toggle.classList.remove('open');
  }

  if (toggle && menu) {
    toggle.addEventListener('click', function () {
      menu.classList.contains('open') ? closeNav() : openNav();
    });
    menu.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', closeNav);
    });
    overlay.addEventListener('click', closeNav);
    window.addEventListener('popstate', function () {
      if (menu.classList.contains('open')) closeNav();
    });
  }

  /* ---- Video modal ---- */
  var modal = document.getElementById('video-modal');
  var vid = document.getElementById('modal-video');
  var backdrop = modal && modal.querySelector('.modal-backdrop');
  var closeBtn = modal && modal.querySelector('.modal-close');

  function openModal(src) {
    if (!modal || !vid) return;
    vid.src = src;
    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    vid.play();
  }
  function closeModal() {
    if (!modal || !vid) return;
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    vid.pause();
    vid.src = '';
    document.body.style.overflow = '';
  }

  document.querySelectorAll('.reel-card').forEach(function (card) {
    var src = card.getAttribute('data-video');
    if (src) card.addEventListener('click', function () { openModal(src); });
  });
  if (backdrop) backdrop.addEventListener('click', closeModal);
  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && modal && modal.classList.contains('open')) closeModal();
  });

  /* ---- Footer year ---- */
  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---- GSAP ---- */
  window.addEventListener('load', function () {
    if (typeof gsap === 'undefined') return;
    gsap.registerPlugin(ScrollTrigger);

    // Hero
    var heroTl = gsap.timeline();
    heroTl
      .from('.masthead-grid img', { scale: 1.15, opacity: 0, duration: 1.1, stagger: .06, ease: 'power3.out' })
      .from('.masthead-name', { y: 24, opacity: 0, duration: .8, ease: 'power3.out' }, '-=.55')
      .from('.masthead-role', { y: 12, opacity: 0, duration: .6, ease: 'power3.out' }, '-=.45')
      .from('.masthead-scroll', { opacity: 0, duration: .5, ease: 'power2.out' }, '-=.3');

    // Work cards
    gsap.from('.showcase-card', {
      y: 40, opacity: 0, duration: .7, stagger: .12, ease: 'power3.out',
      scrollTrigger: { trigger: '.work-showcase', start: 'top 80%' }
    });
    gsap.from('.work-count', {
      opacity: 0, duration: .5, ease: 'power2.out',
      scrollTrigger: { trigger: '.work-header', start: 'top 85%' }
    });

    // Services
    gsap.from('.service-item', {
      y: 24, opacity: 0, duration: .6, stagger: .1, ease: 'power3.out',
      scrollTrigger: { trigger: '.services-list', start: 'top 82%' }
    });

    // Photography gallery
    gsap.from('.photo-item', {
      y: 40, opacity: 0, duration: .7, stagger: .06, ease: 'power3.out',
      scrollTrigger: { trigger: '.gallery-grid', start: 'top 85%' }
    });

    // About
    gsap.from('.about-statement', {
      y: 25, opacity: 0, duration: .7, ease: 'power3.out',
      scrollTrigger: { trigger: '.about-right', start: 'top 80%' }
    });
    gsap.from('.about-text', {
      y: 20, opacity: 0, duration: .6, ease: 'power3.out',
      scrollTrigger: { trigger: '.about-text', start: 'top 85%' }
    });
    gsap.from('.about-tools span', {
      y: 10, opacity: 0, duration: .35, stagger: .05, ease: 'power2.out',
      scrollTrigger: { trigger: '.about-tools', start: 'top 90%' }
    });

    // Contact
    gsap.from('.contact-heading', {
      y: 30, opacity: 0, duration: .8, ease: 'power3.out',
      scrollTrigger: { trigger: '.contact', start: 'top 80%' }
    });

    // Inner pages
    var ph = document.querySelector('.page-header');
    if (ph) {
      gsap.timeline()
        .from('.page-back', { x: -10, opacity: 0, duration: .4, ease: 'power3.out', delay: .1 })
        .from('.page-title', { y: 25, opacity: 0, duration: .6, ease: 'power3.out' }, '-=.2')
        .from('.page-desc', { y: 12, opacity: 0, duration: .5, ease: 'power3.out' }, '-=.3');
    }
    var rg = document.querySelector('.reel-grid');
    if (rg) {
      gsap.from('.reel-card', {
        y: 40, opacity: 0, duration: .7, stagger: .1, ease: 'power3.out',
        scrollTrigger: { trigger: rg, start: 'top 80%' }
      });
    }
  });
})();

/* ---- Message bubble ---- */
(function () {
  var bubble = document.getElementById('msg-bubble');
  var panel = document.getElementById('msg-panel');
  if (!bubble || !panel) return;

  function open() { panel.classList.add('open'); bubble.classList.add('open'); panel.setAttribute('aria-hidden', 'false'); }
  function close() { panel.classList.remove('open'); bubble.classList.remove('open'); panel.setAttribute('aria-hidden', 'true'); }

  bubble.addEventListener('click', function (e) { e.stopPropagation(); panel.classList.contains('open') ? close() : open(); });
  document.addEventListener('click', function (e) {
    if (panel.classList.contains('open') && !panel.contains(e.target) && !bubble.contains(e.target)) close();
  });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && panel.classList.contains('open')) close(); });
})();

/* ---- EmailJS ---- */
(function () {
  var PK = 'i3x9hweYoV2xLDSeR';
  var SID = 'service_bp3gj29';
  var TID = 'template_7ofpzkg';

  if (typeof emailjs !== 'undefined') emailjs.init({ publicKey: PK });

  var form = document.getElementById('contact-form');
  var btn = document.getElementById('cf-submit');
  var status = document.getElementById('cf-status');
  var btnTxt = btn && btn.querySelector('.form-submit-text');
  var btnLoad = btn && btn.querySelector('.form-submit-loading');
  if (!form) return;

  function setMsg(m, t) { status.textContent = m; status.className = 'form-status ' + (t || ''); }
  function setLoading(v) { btn.disabled = v; if (btnTxt) btnTxt.hidden = v; if (btnLoad) btnLoad.hidden = !v; }
  function valid(f) { var ok = f.checkValidity() && f.value.trim() !== ''; f.classList.toggle('invalid', !ok); return ok; }

  form.querySelectorAll('input, textarea').forEach(function (f) {
    f.addEventListener('blur', function () { valid(f); });
    f.addEventListener('input', function () { if (f.classList.contains('invalid')) valid(f); });
  });

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var fields = Array.from(form.querySelectorAll('[required]'));
    if (!fields.every(valid)) { setMsg('Please fill in all fields.', 'error'); return; }
    if (typeof emailjs === 'undefined') { setMsg('Service not loaded. Try refreshing.', 'error'); return; }

    setLoading(true); setMsg('');
    emailjs.send(SID, TID, {
      from_name: document.getElementById('cf-name').value.trim(),
      from_email: document.getElementById('cf-email').value.trim(),
      message: document.getElementById('cf-message').value.trim()
    }).then(function () {
      setLoading(false); setMsg('Sent!', 'success'); form.reset();
      form.querySelectorAll('.invalid').forEach(function (el) { el.classList.remove('invalid'); });
    }).catch(function (err) {
      setLoading(false); console.error(err); setMsg('Failed. Email me directly.', 'error');
    });
  });
})();
