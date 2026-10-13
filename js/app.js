/**
 * SEM 5 VIVA PLATFORM — Core Application Utilities
 * Theme Controller, App State, Toast Notifications, Bookmarking, Speech Synthesis, Shortcuts, 3D Tilt
 */

// 1. Theme Controller & Persistence
window.Theme = {
  STORAGE_KEY: 'sem5_theme',

  getTheme() {
    try {
      const saved = localStorage.getItem(this.STORAGE_KEY);
      if (saved === 'dark' || saved === 'light') return saved;
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    } catch (e) {
      return 'dark';
    }
  },

  setTheme(theme, showToast = true) {
    const isDark = theme === 'dark';
    
    if (isDark) {
      document.documentElement.classList.add('dark');
      document.documentElement.setAttribute('data-theme', 'dark');
      document.documentElement.style.colorScheme = 'dark';
    } else {
      document.documentElement.classList.remove('dark');
      document.documentElement.setAttribute('data-theme', 'light');
      document.documentElement.style.colorScheme = 'light';
    }

    try {
      localStorage.setItem(this.STORAGE_KEY, theme);
    } catch (e) {}

    // Update all theme toggle buttons across the UI
    this.updateToggleButtons(isDark);

    // Dispatch event for any component listeners
    window.dispatchEvent(new CustomEvent('themechange', { detail: { theme, isDark } }));

    if (showToast && window.showToast) {
      const msg = isDark ? '🌙 Switched to Dark Mode (Original Blue)' : '☀️ Switched to Light Mode (White & Red)';
      window.showToast(msg, 'info');
    }
  },

  toggleTheme() {
    const current = document.documentElement.classList.contains('dark') ? 'dark' : 'light';
    const next = current === 'dark' ? 'light' : 'dark';
    this.setTheme(next, true);
  },

  updateToggleButtons(isDark) {
    document.querySelectorAll('.theme-toggle-btn').forEach(btn => {
      const sunIcon = btn.querySelector('.theme-icon-sun');
      const moonIcon = btn.querySelector('.theme-icon-moon');
      const label = btn.querySelector('.theme-label');
      
      if (sunIcon && moonIcon) {
        sunIcon.classList.toggle('hidden', isDark);
        moonIcon.classList.toggle('hidden', !isDark);
      }
      if (label) {
        label.textContent = isDark ? 'Dark Mode' : 'Light Mode';
      }
      btn.setAttribute('aria-label', isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode');
      btn.setAttribute('title', isDark ? 'Switch to Light Mode (Press T)' : 'Switch to Dark Mode (Press T)');
    });
  },

  init() {
    const theme = this.getTheme();
    this.setTheme(theme, false);

    // Sync with system preferences only if user hasn't explicitly set a preference
    try {
      window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
        if (!localStorage.getItem(this.STORAGE_KEY)) {
          this.setTheme(e.matches ? 'dark' : 'light', false);
        }
      });
    } catch (e) {}
  }
};

// Global App State
window.AppState = {
  favorites: JSON.parse(localStorage.getItem('sem5_viva_favorites') || '[]'),
  completed: JSON.parse(localStorage.getItem('sem5_viva_completed') || '[]'),
  speechVoice: null
};

// 2. Toast Notification System
window.showToast = function(message, type = 'info') {
  let container = document.getElementById('toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = 'toast-msg flex items-center gap-2';
  
  let icon = 'ℹ️';
  if (type === 'success') icon = '✅';
  if (type === 'warning') icon = '⚠️';
  if (type === 'favorite') icon = '⭐';

  toast.innerHTML = `<span>${icon}</span><span class="text-sm font-medium">${message}</span>`;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.transition = 'opacity 0.4s, transform 0.4s';
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(20px)';
    setTimeout(() => toast.remove(), 400);
  }, 2200);
};

// 3. Favorite / Bookmark Toggle
window.toggleFavorite = function(questionId) {
  const index = window.AppState.favorites.indexOf(questionId);
  let isFav = false;
  if (index > -1) {
    window.AppState.favorites.splice(index, 1);
    window.showToast('Removed from Starred Questions', 'info');
  } else {
    window.AppState.favorites.push(questionId);
    window.showToast('Saved to Starred Questions!', 'favorite');
    isFav = true;
  }
  localStorage.setItem('sem5_viva_favorites', JSON.stringify(window.AppState.favorites));

  // Update UI stars
  document.querySelectorAll(`[data-fav-btn="${questionId}"]`).forEach(btn => {
    btn.innerHTML = isFav ? '★' : '☆';
    btn.classList.toggle('text-amber-400', isFav);
    btn.classList.toggle('text-slate-500', !isFav);
  });

  return isFav;
};

// 4. Oral Viva Audio Reader (SpeechSynthesis)
window.speakQuestion = function(text) {
  if (!('speechSynthesis' in window)) {
    window.showToast('Speech synthesis not supported in this browser.', 'warning');
    return;
  }

  window.speechSynthesis.cancel();

  const cleanText = text.replace(/<[^>]*>?/gm, '').trim();
  const utterance = new SpeechSynthesisUtterance(cleanText);
  utterance.rate = 0.95;
  utterance.pitch = 1.0;

  const voices = window.speechSynthesis.getVoices();
  const naturalVoice = voices.find(v => v.lang.startsWith('en') && (v.name.includes('Natural') || v.name.includes('Google') || v.name.includes('Samantha')));
  if (naturalVoice) utterance.voice = naturalVoice;

  window.showToast('🎙️ Speaking question aloud...', 'info');
  window.speechSynthesis.speak(utterance);
};

// 5. 3D Card Tilt Effect (Respects reduced motion)
window.initCardTilt = function() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  document.querySelectorAll('.tilt-card').forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -5;
      const rotateY = ((x - centerX) / centerX) * 5;
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)';
    });
  });
};

// 6. Global Keyboard Shortcuts
document.addEventListener('keydown', e => {
  if (['INPUT', 'TEXTAREA', 'SELECT'].includes(document.activeElement.tagName)) return;

  const key = e.key.toLowerCase();
  
  if (key === 't') {
    e.preventDefault();
    window.Theme.toggleTheme();
  } else if (key === '/') {
    e.preventDefault();
    const searchInput = document.getElementById('search-input') || document.getElementById('global-search-input') || document.querySelector('input[type="text"]');
    if (searchInput) {
      searchInput.focus();
      window.showToast('Search activated', 'info');
    } else {
      window.location.href = window.getRelativePrefix() + 'search.html';
    }
  } else if (key === 'v') {
    window.location.href = window.getRelativePrefix() + 'viva.html';
  } else if (key === 's') {
    window.location.href = window.getRelativePrefix() + 'subjects.html';
  } else if (key === 'r') {
    window.location.href = window.getRelativePrefix() + 'revision.html';
  } else if (key === 'h') {
    window.location.href = window.getRelativePrefix() + 'index.html';
  }
});

// Helper for relative links
window.getRelativePrefix = function() {
  return window.location.pathname.includes('/subjects/') ? '../' : '';
};

// Initialize early
window.Theme.init();

document.addEventListener('DOMContentLoaded', () => {
  window.Theme.updateToggleButtons(document.documentElement.classList.contains('dark'));
  window.initCardTilt();
});
