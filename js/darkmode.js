/* ==========================================================================
   BookHaven - Dark / Light Theme Controller
   ========================================================================== */

(function () {
  'use strict';

  const THEME_KEY = 'bookhaven_theme';
  const themeToggleBtns = document.querySelectorAll('.theme-toggle-btn');
  
  // Check stored theme or system preference
  function getPreferredTheme() {
    const storedTheme = localStorage.getItem(THEME_KEY);
    if (storedTheme) {
      return storedTheme;
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  // Apply theme to document element
  function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem(THEME_KEY, theme);
    updateToggleIcons(theme);
  }

  // Update button icons
  function updateToggleIcons(theme) {
    themeToggleBtns.forEach(btn => {
      const icon = btn.querySelector('i');
      if (icon) {
        if (theme === 'dark') {
          icon.className = 'fas fa-sun';
          btn.setAttribute('aria-label', 'Switch to Light Mode');
        } else {
          icon.className = 'fas fa-moon';
          btn.setAttribute('aria-label', 'Switch to Dark Mode');
        }
      }
    });
  }

  // Initial setup
  const currentTheme = getPreferredTheme();
  setTheme(currentTheme);

  // Event Listeners
  themeToggleBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const activeTheme = document.documentElement.getAttribute('data-theme');
      const newTheme = activeTheme === 'dark' ? 'light' : 'dark';
      setTheme(newTheme);
    });
  });
})();
