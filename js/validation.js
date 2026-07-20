/* ==========================================================================
   BookHaven - Form Validation & Toast Notification System
   ========================================================================== */

(function () {
  'use strict';

  // Global Toast Notification Helper
  window.showToast = function (message, type = 'success') {
    let container = document.getElementById('toast-container');
    if (!container) {
      container = document.createElement('div');
      container.id = 'toast-container';
      document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    const icon = type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle';
    toast.innerHTML = `<i class="fas ${icon}"></i> <span>${message}</span>`;

    container.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateX(100%)';
      toast.style.transition = 'all 0.3s ease';
      setTimeout(() => toast.remove(), 350);
    }, 4000);
  };

  // Helper validation regexes
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^[\d\s\-\+\(\)]{7,20}$/;

  document.addEventListener('DOMContentLoaded', () => {

    // A. Contact Form Validation
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
      contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const nameInput = document.getElementById('contact-name');
        const emailInput = document.getElementById('contact-email');
        const phoneInput = document.getElementById('contact-phone');
        const subjectInput = document.getElementById('contact-subject');
        const messageInput = document.getElementById('contact-message');

        let isValid = true;

        if (!nameInput || nameInput.value.trim().length < 2) {
          window.showToast('Please enter a valid full name (at least 2 characters).', 'error');
          isValid = false;
        } else if (!emailInput || !emailRegex.test(emailInput.value.trim())) {
          window.showToast('Please enter a valid email address.', 'error');
          isValid = false;
        } else if (phoneInput && phoneInput.value.trim() && !phoneRegex.test(phoneInput.value.trim())) {
          window.showToast('Please enter a valid phone number.', 'error');
          isValid = false;
        } else if (!subjectInput || subjectInput.value.trim().length < 3) {
          window.showToast('Please enter a subject (at least 3 characters).', 'error');
          isValid = false;
        } else if (!messageInput || messageInput.value.trim().length < 10) {
          window.showToast('Please enter a detailed message (at least 10 characters).', 'error');
          isValid = false;
        }

        if (isValid) {
          const submitBtn = contactForm.querySelector('button[type="submit"]');
          if (submitBtn) {
            submitBtn.disabled = true;
            submitBtn.innerHTML = `<i class="fas fa-spinner fa-spin"></i> Sending...`;
          }

          setTimeout(() => {
            window.showToast('Thank you! Your message has been sent successfully. We will get back to you within 24 hours.', 'success');
            contactForm.reset();
            if (submitBtn) {
              submitBtn.disabled = false;
              submitBtn.innerHTML = `Send Message <i class="fas fa-paper-plane"></i>`;
            }
          }, 1200);
        }
      });
    }

    // B. Newsletter Subscription Form Validation
    const newsletterForms = document.querySelectorAll('.newsletter-form');
    newsletterForms.forEach(form => {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        const input = form.querySelector('input[type="email"]');
        if (!input || !emailRegex.test(input.value.trim())) {
          window.showToast('Please provide a valid email address to subscribe.', 'error');
          return;
        }

        window.showToast('Welcome to BookHaven VIP Club! You are now subscribed to our newsletter.', 'success');
        input.value = '';
      });
    });

  });

})();
