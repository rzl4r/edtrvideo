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
  // Video modal (MP4 version)
  var modal = document.getElementById('video-modal');
  var video = document.getElementById('modal-video');
  var backdrop = modal && modal.querySelector('.modal-backdrop');
  var closeBtn = modal && modal.querySelector('.modal-close');

  function openModal(src) {
    if (!modal || !video) return;
    video.src = src;
    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    video.play();
  }

  function closeModal() {
    if (!modal || !video) return;
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    video.pause();
    video.src = '';
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

  // --- GSAP Animations ---
  window.addEventListener('load', function () {
    if (typeof gsap !== 'undefined') {
      gsap.registerPlugin(ScrollTrigger);

      // Initial Hero Animation
      var heroTl = gsap.timeline();

      heroTl.from('.hero-label', {
        y: 20,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        delay: 0.2
      })
        .from('.hero-title', {
          y: 40,
          opacity: 0,
          duration: 1,
          ease: 'power4.out',
          stagger: 0.2
        }, "-=0.6")
        .from('.hero-desc', {
          y: 20,
          opacity: 0,
          duration: 0.8,
          ease: 'power3.out'
        }, "-=0.6")
        .from('.video-ui-overlay', {
          opacity: 0,
          duration: 1.5,
          ease: 'power2.inOut'
        }, "-=0.4")
        .from('.hero-scroll', {
          y: -20,
          opacity: 0,
          duration: 0.8,
          ease: 'power3.out'
        }, "-=0.4");

      // Dynamic Timecode Animation
      var timecodeEl = document.querySelector('.timecode');
      if (timecodeEl) {
        var frames = 0;
        var seconds = 0;
        var minutes = 0;
        var hours = 0;

        setInterval(function () {
          frames += 1;
          if (frames >= 24) {
            frames = 0;
            seconds += 1;
          }
          if (seconds >= 60) {
            seconds = 0;
            minutes += 1;
          }
          if (minutes >= 60) {
            minutes = 0;
            hours += 1;
          }

          var h = String(hours).padStart(2, '0');
          var m = String(minutes).padStart(2, '0');
          var s = String(seconds).padStart(2, '0');
          var f = String(frames).padStart(2, '0');

          timecodeEl.textContent = `${h}:${m}:${s}:${f}`;
        }, 1000 / 24); // Assuming 24fps
      }

      // Parallax effect on Hero Background
      gsap.to('.hero-bg', {
        yPercent: 30,
        ease: 'none',
        scrollTrigger: {
          trigger: '.hero',
          start: 'top top',
          end: 'bottom top',
          scrub: true
        }
      });

      // Intro Section Animation
      gsap.from('.intro-photo', {
        x: -50,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.intro',
          start: 'top 80%',
        }
      });

      gsap.from('.intro-text', {
        x: 50,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.intro',
          start: 'top 80%',
        }
      });

      gsap.from('.tool-tag', {
        y: 20,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: 'back.out(1.7)',
        scrollTrigger: {
          trigger: '.intro-tools',
          start: 'top 85%',
        }
      });

      // About Section Animation
      gsap.from('.section-title', {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.about',
          start: 'top 85%',
        }
      });

      gsap.from('.experience-item', {
        y: 20,
        opacity: 0,
        duration: 0.5,
        stagger: 0.1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.about-experience',
          start: 'top 95%',
          onEnter: function () {
            gsap.set('.experience-item', { opacity: 1 });
          }
        }
      });

      // Fallback: force visible after 2s in case ScrollTrigger never fires
      setTimeout(function () {
        document.querySelectorAll('.experience-item').forEach(function (el) {
          el.style.opacity = '1';
          el.style.transform = 'none';
        });
      }, 2000);

      // Work / Category Cards Animation
      gsap.from('.category-card', {
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.category-grid',
          start: 'top 80%',
        }
      });

      // Work CTA Animation
      if (document.querySelector('.work-cta')) {
        gsap.from('.work-cta', {
          scale: 0.95,
          opacity: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.work-cta',
            start: 'top 85%',
          }
        });
      }

      // Inner Pages Hero Animation
      if (document.querySelector('.page-hero')) {
        var pageHeroTl = gsap.timeline();

        pageHeroTl.from('.page-back', {
          x: -20,
          opacity: 0,
          duration: 0.6,
          ease: 'power3.out',
          delay: 0.2
        })
          .from('.page-hero-title', {
            y: 30,
            opacity: 0,
            duration: 0.8,
            ease: 'power4.out'
          }, "-=0.4")
          .from('.page-hero-desc', {
            y: 20,
            opacity: 0,
            duration: 0.8,
            ease: 'power3.out'
          }, "-=0.6");
      }

      // Inner Pages Reel Cards Animation
      if (document.querySelector('.reel-grid')) {
        gsap.from('.reel-card', {
          y: 50,
          opacity: 0,
          duration: 0.8,
          stagger: 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.reel-grid',
            start: 'top 80%',
          }
        });
      }

      // Header Blur Effect on Scroll
      gsap.to('.header', {
        backgroundColor: 'rgba(12, 12, 12, 0.9)',
        backdropFilter: 'blur(12px)',
        duration: 0.3,
        scrollTrigger: {
          trigger: 'body',
          start: '50px top',
          toggleActions: 'play none none reverse'
        }
      });
      // --- Custom Cursor ---
      var cursor = document.createElement('div');
      cursor.classList.add('custom-cursor');
      document.body.appendChild(cursor);

      // Position cursor
      var cursorVisible = false;
      document.addEventListener('mousemove', function (e) {
        if (!cursorVisible) {
          gsap.to(cursor, { opacity: 1, duration: 0.3 });
          cursorVisible = true;
        }
        gsap.to(cursor, {
          x: e.clientX,
          y: e.clientY,
          duration: 0.1,
          ease: 'power2.out'
        });
      });

      // Cursor hover effects on links, buttons and cards
      var hoverElements = document.querySelectorAll('a, button, .category-card, .reel-card');
      hoverElements.forEach(function (el) {
        el.addEventListener('mouseenter', function () {
          cursor.classList.add('hover');
        });
        el.addEventListener('mouseleave', function () {
          cursor.classList.add('hover-remove');
          setTimeout(() => {
            cursor.classList.remove('hover');
            cursor.classList.remove('hover-remove');
          }, 150); // wait for removal animation
        });
      });
    }
  });
})();
