/* ==========================================================
   AMAZULU PRIME SOLUTIONS — MAIN JS
   ========================================================== */

document.addEventListener('DOMContentLoaded', () => {

  /* ---- Mobile Menu ---- */
  const hamburger = document.getElementById('nav-hamburger');
  const mobileMenu = document.getElementById('mobile-menu');
  const overlay = document.getElementById('nav-overlay');
  const mobileClose = document.getElementById('mobile-close');

  function openMenu() {
    if (!mobileMenu) return;
    mobileMenu.classList.add('open');
    overlay && overlay.classList.add('show');
    document.body.style.overflow = 'hidden';
  }
  function closeMenu() {
    if (!mobileMenu) return;
    mobileMenu.classList.remove('open');
    overlay && overlay.classList.remove('show');
    document.body.style.overflow = '';
  }
  hamburger && hamburger.addEventListener('click', openMenu);
  mobileClose && mobileClose.addEventListener('click', closeMenu);
  overlay && overlay.addEventListener('click', closeMenu);
  document.querySelectorAll('.mobile-nav-links a, .mobile-nav-cta').forEach(a => {
    a.addEventListener('click', closeMenu);
  });

  /* ---- Hero Carousel ---- */
  const heroSlides = document.querySelectorAll('.hero-slide');
  const heroDots = document.querySelectorAll('.hero-dot');
  let heroIdx = 0;
  if (heroSlides.length > 1) {
    function showHeroSlide(n) {
      heroSlides.forEach(s => s.classList.remove('active'));
      heroDots.forEach(d => d.classList.remove('active'));
      heroIdx = (n + heroSlides.length) % heroSlides.length;
      heroSlides[heroIdx].classList.add('active');
      heroDots[heroIdx] && heroDots[heroIdx].classList.add('active');
    }
    heroDots.forEach((dot, i) => dot.addEventListener('click', () => showHeroSlide(i)));
    setInterval(() => showHeroSlide(heroIdx + 1), 5000);
  }

  /* ---- Scroll Animations ---- */
  const animEls = document.querySelectorAll('.animate-up, .animate-fade');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
          observer.unobserve(e.target);
        }
      });
    }, { threshold: 0.12 });
    animEls.forEach(el => observer.observe(el));
  } else {
    animEls.forEach(el => el.classList.add('visible'));
  }

  /* ---- Footer Year ---- */
  const yearEl = document.getElementById('current-year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---- Active Nav Link ---- */
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a, .mobile-nav-links a').forEach(a => {
    const href = a.getAttribute('href');
    if (href && (href === currentPath || (currentPath === '' && href === 'index.html'))) {
      a.classList.add('active');
    }
  });

  /* ---- Smooth Scroll ---- */
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const target = document.querySelector(a.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  /* ---- Form Validation Feedback ---- */
  document.querySelectorAll('form[data-netlify]').forEach(form => {
    const inputs = form.querySelectorAll('input[required], select[required], textarea[required]');
    inputs.forEach(input => {
      input.addEventListener('blur', () => {
        if (!input.value.trim()) {
          input.style.borderColor = '#ef4444';
        } else {
          input.style.borderColor = '#22c55e';
        }
      });
      input.addEventListener('focus', () => {
        input.style.borderColor = '';
      });
    });
  });

});
