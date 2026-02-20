(function () {
  'use strict';

  // Header scroll state
  var header = document.querySelector('.header');
  if (header) {
    function onScroll() {
      header.classList.toggle('scrolled', window.scrollY > 50);
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  // Mobile nav toggle
  var toggle = document.querySelector('.nav-toggle');
  var navLinks = document.querySelector('.nav-links');
  if (toggle && navLinks) {
    toggle.addEventListener('click', function () {
      navLinks.classList.toggle('open');
      toggle.setAttribute('aria-expanded', navLinks.classList.contains('open'));
    });
    navLinks.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        navLinks.classList.remove('open');
      });
    });
  }

  // Video modal
  var modal = document.getElementById('video-modal');
  var iframe = document.getElementById('modal-iframe');
  var backdrop = modal && modal.querySelector('.modal-backdrop');
  var closeBtn = modal && modal.querySelector('.modal-close');

  function openModal(src) {
    if (!modal || !iframe) return;
    iframe.src = src;
    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    if (!modal || !iframe) return;
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    iframe.src = '';
    document.body.style.overflow = '';
  }

  document.querySelectorAll('.reel-card').forEach(function (card) {
    var src = card.getAttribute('data-video');
    if (src) {
      card.addEventListener('click', function () {
        openModal(src);
      });
    }
  });

  if (backdrop) backdrop.addEventListener('click', closeModal);
  if (closeBtn) closeBtn.addEventListener('click', closeModal);

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && modal && modal.classList.contains('open')) {
      closeModal();
    }
  });

  // Footer year
  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
})();
