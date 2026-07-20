/* ==========================================================================
   BookHaven - Core Application Script
   Contains Navigation, Preloader, Cart Drawer, Accordions, Search & Utilities
   ========================================================================== */

(function () {
  'use strict';

  /* --------------------------------------------------------------------------
     1. Sample Books Dataset (for Cart, Search & Quick View)
     -------------------------------------------------------------------------- */
  const BOOKS_DATA = [
    { id: 1, title: 'The Pragmatic Programmer', author: 'Andrew Hunt & David Thomas', price: 29.99, oldPrice: 39.99, category: 'technology', rating: 4.9, cover: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=500&q=80' },
    { id: 2, title: 'Clean Architecture', author: 'Robert C. Martin', price: 34.50, oldPrice: 45.00, category: 'technology', rating: 4.8, cover: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=500&q=80' },
    { id: 3, title: 'Designing Data Systems', author: 'Martin Kleppmann', price: 39.99, oldPrice: 49.99, category: 'technology', rating: 4.9, cover: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=500&q=80' },
    { id: 4, title: 'Artificial Intelligence Era', author: 'Dr. Stuart Russell', price: 27.80, oldPrice: 35.00, category: 'science', rating: 4.7, cover: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=500&q=80' },
    { id: 5, title: 'Psychology of Money', author: 'Morgan Housel', price: 22.00, oldPrice: 28.00, category: 'business', rating: 4.9, cover: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=500&q=80' },
    { id: 6, title: 'Atomic Habits', author: 'James Clear', price: 24.99, oldPrice: 32.00, category: 'selfhelp', rating: 5.0, cover: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=500&q=80' },
    { id: 7, title: 'Sapiens: A Brief History', author: 'Yuval Noah Harari', price: 26.50, oldPrice: 34.00, category: 'history', rating: 4.8, cover: 'https://images.unsplash.com/photo-1461360370896-922624d12aa1?auto=format&fit=crop&w=500&q=80' },
    { id: 8, title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', price: 15.99, oldPrice: 19.99, category: 'fiction', rating: 4.6, cover: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=500&q=80' },
    { id: 9, title: 'Quantum Physics 101', author: 'Dr. Michio Kaku', price: 31.00, oldPrice: 40.00, category: 'science', rating: 4.7, cover: 'https://images.unsplash.com/photo-1507413245164-6160d8298b31?auto=format&fit=crop&w=500&q=80' },
    { id: 10, title: 'Creative UI/UX Design', author: 'Sarah Jenkins', price: 36.00, oldPrice: 45.00, category: 'technology', rating: 4.9, cover: 'https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?auto=format&fit=crop&w=500&q=80' },
    { id: 11, title: 'Cybersecurity Fundamentals', author: 'Marcus Sterling', price: 32.50, oldPrice: 42.00, category: 'technology', rating: 4.8, cover: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=500&q=80' },
    { id: 12, title: 'Deep Work Masterclass', author: 'Cal Newport', price: 21.99, oldPrice: 27.99, category: 'selfhelp', rating: 4.9, cover: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=500&q=80' }
  ];

  /* --------------------------------------------------------------------------
     2. Shopping Cart Management State
     -------------------------------------------------------------------------- */
  let cart = JSON.parse(localStorage.getItem('bookhaven_cart')) || [
    { id: 1, qty: 1 },
    { id: 6, qty: 2 }
  ];

  function saveCart() {
    localStorage.setItem('bookhaven_cart', JSON.stringify(cart));
    updateCartUI();
  }

  function addToCart(bookId) {
    const existing = cart.find(item => item.id === bookId);
    if (existing) {
      existing.qty += 1;
    } else {
      cart.push({ id: bookId, qty: 1 });
    }
    saveCart();
    if (window.showToast) {
      const book = BOOKS_DATA.find(b => b.id === bookId);
      window.showToast(`"${book ? book.title : 'Book'}" added to your shopping cart!`, 'success');
    }
  }

  function updateQuantity(bookId, delta) {
    const item = cart.find(i => i.id === bookId);
    if (!item) return;
    item.qty += delta;
    if (item.qty <= 0) {
      cart = cart.filter(i => i.id !== bookId);
    }
    saveCart();
  }

  function removeFromCart(bookId) {
    cart = cart.filter(i => i.id !== bookId);
    saveCart();
  }

  function updateCartUI() {
    const cartCountBadges = document.querySelectorAll('.cart-count');
    const totalCount = cart.reduce((sum, item) => sum + item.qty, 0);
    cartCountBadges.forEach(b => b.textContent = totalCount);

    const cartBody = document.getElementById('cart-body');
    const cartSubtotal = document.getElementById('cart-subtotal');
    
    if (!cartBody) return;

    if (cart.length === 0) {
      cartBody.innerHTML = `
        <div style="text-align: center; padding: 3rem 1rem; color: var(--text-muted);">
          <i class="fas fa-shopping-basket" style="font-size: 3rem; margin-bottom: 1rem; color: var(--primary);"></i>
          <p style="font-weight: 600;">Your cart is empty</p>
          <p style="font-size: 0.85rem; margin-top: 0.4rem;">Explore our store and add books to read!</p>
        </div>`;
      if (cartSubtotal) cartSubtotal.textContent = '$0.00';
      return;
    }

    let subtotal = 0;
    let html = '';

    cart.forEach(item => {
      const book = BOOKS_DATA.find(b => b.id === item.id);
      if (!book) return;
      const itemTotal = book.price * item.qty;
      subtotal += itemTotal;

      html += `
        <div class="cart-item">
          <img src="${book.cover}" alt="${book.title}" class="cart-item-img" />
          <div class="cart-item-info">
            <h5 class="cart-item-title">${book.title}</h5>
            <div class="cart-item-price">$${book.price.toFixed(2)}</div>
            <div class="cart-qty-ctrl">
              <button class="qty-btn" onclick="window.BookStore.updateQty(${book.id}, -1)">-</button>
              <span style="font-size: 0.9rem; font-weight: 600; min-width: 20px; text-align: center;">${item.qty}</span>
              <button class="qty-btn" onclick="window.BookStore.updateQty(${book.id}, 1)">+</button>
              <button style="margin-left: auto; color: #E63946; font-size: 0.85rem;" onclick="window.BookStore.removeItem(${book.id})">
                <i class="fas fa-trash-alt"></i>
              </button>
            </div>
          </div>
        </div>`;
    });

    cartBody.innerHTML = html;
    if (cartSubtotal) cartSubtotal.textContent = `$${subtotal.toFixed(2)}`;
  }

  /* --------------------------------------------------------------------------
     3. DOM Content Loaded Initialization
     -------------------------------------------------------------------------- */
  document.addEventListener('DOMContentLoaded', () => {

    // A. Preloader
    const preloader = document.getElementById('preloader');
    if (preloader) {
      window.addEventListener('load', () => {
        setTimeout(() => {
          preloader.classList.add('fade-out');
        }, 400);
      });
    }

    // B. Sticky Navbar & Active Navigation
    const header = document.querySelector('.header');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');

    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }

      // Active Section Link Highlight
      let currentSectionId = '';
      sections.forEach(sec => {
        const top = sec.offsetTop - 120;
        const height = sec.offsetHeight;
        if (window.scrollY >= top && window.scrollY < top + height) {
          currentSectionId = sec.getAttribute('id');
        }
      });

      if (currentSectionId) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href').includes(currentSectionId)) {
            link.classList.add('active');
          }
        });
      }

      // Back-to-Top Button Visibility
      const backToTopBtn = document.getElementById('back-to-top');
      if (backToTopBtn) {
        if (window.scrollY > 400) {
          backToTopBtn.classList.add('visible');
        } else {
          backToTopBtn.classList.remove('visible');
        }
      }
    });

    // Back-to-Top Click Event
    const backToTopBtn = document.getElementById('back-to-top');
    if (backToTopBtn) {
      backToTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }

    // C. Mobile Hamburger Menu Toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    if (hamburger && navMenu) {
      hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
      });

      navLinks.forEach(link => {
        link.addEventListener('click', () => {
          hamburger.classList.remove('active');
          navMenu.classList.remove('active');
        });
      });
    }

    // D. Cart Drawer Toggle
    const cartToggleBtns = document.querySelectorAll('.cart-toggle-btn');
    const cartDrawer = document.getElementById('cart-drawer');
    const cartCloseBtn = document.getElementById('cart-close-btn');
    const modalOverlay = document.getElementById('modal-overlay');

    function openCart() {
      cartDrawer.classList.add('active');
      modalOverlay.classList.add('active');
    }

    function closeModals() {
      if (cartDrawer) cartDrawer.classList.remove('active');
      const searchModal = document.getElementById('search-modal');
      if (searchModal) searchModal.classList.remove('active');
      if (modalOverlay) modalOverlay.classList.remove('active');
    }

    cartToggleBtns.forEach(btn => btn.addEventListener('click', openCart));
    if (cartCloseBtn) cartCloseBtn.addEventListener('click', closeModals);
    if (modalOverlay) modalOverlay.addEventListener('click', closeModals);

    // E. Search Modal Setup
    const searchToggleBtns = document.querySelectorAll('.search-toggle-btn');
    const searchModal = document.getElementById('search-modal');
    const searchCloseBtn = document.getElementById('search-close-btn');
    const searchInput = document.getElementById('modal-search-input');
    const searchResultsList = document.getElementById('search-results-list');

    function openSearch() {
      searchModal.classList.add('active');
      modalOverlay.classList.add('active');
      if (searchInput) {
        setTimeout(() => searchInput.focus(), 150);
      }
    }

    searchToggleBtns.forEach(btn => btn.addEventListener('click', openSearch));
    if (searchCloseBtn) searchCloseBtn.addEventListener('click', closeModals);

    if (searchInput && searchResultsList) {
      searchInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase().trim();
        if (!query) {
          searchResultsList.innerHTML = `<p style="text-align: center; color: var(--text-muted); font-size: 0.9rem; padding: 1rem;">Start typing to search for books by title or author...</p>`;
          return;
        }

        const filtered = BOOKS_DATA.filter(b => 
          b.title.toLowerCase().includes(query) || 
          b.author.toLowerCase().includes(query) ||
          b.category.toLowerCase().includes(query)
        );

        if (filtered.length === 0) {
          searchResultsList.innerHTML = `<p style="text-align: center; color: var(--text-muted); font-size: 0.9rem; padding: 1rem;">No books match your query "${query}"</p>`;
          return;
        }

        let html = '';
        filtered.forEach(b => {
          html += `
            <div style="display: flex; align-items: center; gap: 1rem; padding: 0.8rem; border-radius: var(--radius-sm); background: var(--bg-alt); cursor: pointer;" onclick="window.BookStore.addCart(${b.id})">
              <img src="${b.cover}" alt="${b.title}" style="width: 45px; height: 60px; object-fit: cover; border-radius: 4px;" />
              <div>
                <h5 style="font-size: 0.95rem; font-weight: 600;">${b.title}</h5>
                <p style="font-size: 0.8rem; color: var(--text-muted);">${b.author}</p>
                <span style="font-weight: 700; color: var(--primary); font-size: 0.88rem;">$${b.price.toFixed(2)}</span>
              </div>
              <button class="btn btn-primary btn-sm" style="margin-left: auto;">Add to Cart</button>
            </div>`;
        });
        searchResultsList.innerHTML = html;
      });
    }

    // F. Accordion FAQ logic
    const accordionHeaders = document.querySelectorAll('.accordion-header');
    accordionHeaders.forEach(header => {
      header.addEventListener('click', () => {
        const item = header.parentElement;
        const isActive = item.classList.contains('active');

        // Close other items
        document.querySelectorAll('.accordion-item').forEach(i => i.classList.remove('active'));

        if (!isActive) {
          item.classList.add('active');
        }
      });
    });

    // G. Category Filter Tabs
    const tabButtons = document.querySelectorAll('.tab-btn');
    const bookCards = document.querySelectorAll('.book-card[data-category]');

    tabButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        tabButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const category = btn.getAttribute('data-filter');
        bookCards.forEach(card => {
          const cardCat = card.getAttribute('data-category');
          if (category === 'all' || cardCat === category) {
            card.style.display = 'flex';
          } else {
            card.style.display = 'none';
          }
        });
      });
    });

    // H. Scroll Reveal Observer
    const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    revealElements.forEach(el => revealObserver.observe(el));

    // Initial Cart UI Update
    updateCartUI();
  });

  // Expose Global Public API for Inline Event Handlers
  window.BookStore = {
    addCart: addToCart,
    updateQty: updateQuantity,
    removeItem: removeFromCart,
    data: BOOKS_DATA
  };

})();
