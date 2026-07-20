/* ==========================================================================
   BookHaven - Custom Vanilla JS Image & Card Carousel Slider
   ========================================================================== */

(function () {
  'use strict';

  function initSlider(sliderContainerId) {
    const container = document.getElementById(sliderContainerId);
    if (!container) return;

    const track = container.querySelector('.testimonial-track');
    const slides = container.querySelectorAll('.testimonial-card');
    const dotsContainer = container.querySelector('.slider-dots');
    
    if (!track || slides.length === 0) return;

    let currentIndex = 0;
    let autoSlideTimer = null;

    // Create pagination dots
    if (dotsContainer) {
      dotsContainer.innerHTML = '';
      slides.forEach((_, idx) => {
        const dot = document.createElement('div');
        dot.className = `dot ${idx === 0 ? 'active' : ''}`;
        dot.addEventListener('click', () => goToSlide(idx));
        dotsContainer.appendChild(dot);
      });
    }

    function goToSlide(index) {
      if (index < 0) index = slides.length - 1;
      if (index >= slides.length) index = 0;
      currentIndex = index;

      track.style.transform = `translateX(-${currentIndex * 100}%)`;

      // Update dots
      if (dotsContainer) {
        const dots = dotsContainer.querySelectorAll('.dot');
        dots.forEach((d, i) => {
          d.classList.toggle('active', i === currentIndex);
        });
      }
    }

    function startAutoSlide() {
      stopAutoSlide();
      autoSlideTimer = setInterval(() => {
        goToSlide(currentIndex + 1);
      }, 5000);
    }

    function stopAutoSlide() {
      if (autoSlideTimer) clearInterval(autoSlideTimer);
    }

    // Touch & Swipe Support
    let startX = 0;
    let isDragging = false;

    track.addEventListener('touchstart', (e) => {
      startX = e.touches[0].clientX;
      isDragging = true;
      stopAutoSlide();
    });

    track.addEventListener('touchmove', (e) => {
      if (!isDragging) return;
    });

    track.addEventListener('touchend', (e) => {
      if (!isDragging) return;
      isDragging = false;
      const endX = e.changedTouches[0].clientX;
      const diff = startX - endX;
      if (diff > 40) {
        goToSlide(currentIndex + 1);
      } else if (diff < -40) {
        goToSlide(currentIndex - 1);
      }
      startAutoSlide();
    });

    container.addEventListener('mouseenter', stopAutoSlide);
    container.addEventListener('mouseleave', startAutoSlide);

    startAutoSlide();
  }

  document.addEventListener('DOMContentLoaded', () => {
    initSlider('testimonials-slider');
  });

})();
