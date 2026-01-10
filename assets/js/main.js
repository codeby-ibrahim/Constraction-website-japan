/**
* Template Name: Constructo
* Template URL: https://bootstrapmade.com/constructo-bootstrap-construction-template/
* Updated: Aug 30 2025 with Bootstrap v5.3.8
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/

(function () {
  "use strict";

  /* ================================
   SCROLL HEADER
  ================================= */
  function toggleScrolled() {
    const body = document.querySelector('body');
    const header = document.querySelector('#header');
    if (!header) return;
    if (!header.classList.contains('scroll-up-sticky') &&
      !header.classList.contains('sticky-top') &&
      !header.classList.contains('fixed-top')) return;

    window.scrollY > 100
      ? body.classList.add('scrolled')
      : body.classList.remove('scrolled');
  }

  document.addEventListener('scroll', toggleScrolled);
  window.addEventListener('load', toggleScrolled);

  /* ================================
   MOBILE NAV
  ================================= */
  const mobileNavToggleBtn = document.querySelector('.mobile-nav-toggle');

  function mobileNavToggle() {
    document.body.classList.toggle('mobile-nav-active');
    mobileNavToggleBtn.classList.toggle('bi-list');
    mobileNavToggleBtn.classList.toggle('bi-x');
  }

  if (mobileNavToggleBtn) {
    mobileNavToggleBtn.addEventListener('click', mobileNavToggle);
  }

  document.querySelectorAll('#navmenu a').forEach(link => {
    link.addEventListener('click', () => {
      if (document.body.classList.contains('mobile-nav-active')) {
        mobileNavToggle();
      }
    });
  });

  document.querySelectorAll('.navmenu .toggle-dropdown').forEach(toggle => {
    toggle.addEventListener('click', function (e) {
      e.preventDefault();
      this.parentNode.classList.toggle('active');
      this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
      e.stopImmediatePropagation();
    });
  });

  /* ================================
   PRELOADER
  ================================= */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => preloader.remove());
  }

  /* ================================
   SCROLL TOP
  ================================= */
  const scrollTop = document.querySelector('.scroll-top');
  function toggleScrollTop() {
    if (!scrollTop) return;
    window.scrollY > 100
      ? scrollTop.classList.add('active')
      : scrollTop.classList.remove('active');
  }

  if (scrollTop) {
    scrollTop.addEventListener('click', e => {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  /* ================================
   AOS
  ================================= */
  window.addEventListener('load', () => {
    if (window.AOS) {
      AOS.init({
        duration: 600,
        easing: 'ease-in-out',
        once: true,
        mirror: false
      });
    }
  });

  /* ================================
   SWIPER INIT
  ================================= */
  window.addEventListener("load", () => {
    document.querySelectorAll(".init-swiper").forEach(swiperElement => {
      const configEl = swiperElement.querySelector(".swiper-config");
      if (!configEl) return;

      const config = JSON.parse(configEl.innerHTML.trim());
      new Swiper(swiperElement, config);
    });
  });

  /* ================================
   GLIGHTBOX
  ================================= */
  if (window.GLightbox) {
    GLightbox({ selector: '.glightbox' });
  }

})();

/* ==========================================================
   🔥 SAFE TESTIMONIAL SLIDER PAUSE / PLAY
   (NO BREAKING, WAITS FOR SWIPER)
========================================================== */
window.addEventListener("load", () => {

  const checkSwiper = setInterval(() => {
    const swiperEl = document.querySelector(".testimonials-slider");

    if (swiperEl && swiperEl.swiper) {
      const swiper = swiperEl.swiper;
      let isPaused = false;

      // function for always updated slides
      const getSlides = () => document.querySelectorAll(".lux-slide");

      // CLICK → TOGGLE (but ignore arrows + dots click)
      swiperEl.addEventListener("click", (e) => {
        if (
          e.target.closest(".swiper-button-prev") ||
          e.target.closest(".swiper-button-next") ||
          e.target.closest(".swiper-pagination")
        ) return;

        const slides = getSlides();

        if (!isPaused) {
          swiper.autoplay.stop();
          slides.forEach(s => s.style.animationPlayState = "paused");
          isPaused = true;
        } else {
          swiper.autoplay.start();
          slides.forEach(s => s.style.animationPlayState = "running");
          isPaused = false;
        }
      });

      // HOVER → PAUSE
      swiperEl.addEventListener("mouseenter", () => {
        const slides = getSlides();
        swiper.autoplay.stop();
        slides.forEach(s => s.style.animationPlayState = "paused");
      });

      // LEAVE → PLAY
      swiperEl.addEventListener("mouseleave", () => {
        const slides = getSlides();
        if (!isPaused) {
          swiper.autoplay.start();
          slides.forEach(s => s.style.animationPlayState = "running");
        }
      });

      clearInterval(checkSwiper);
    }
  }, 100);

});

