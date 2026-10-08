/**
 * SEM 5 VIVA PLATFORM — Core Application Utilities
 * App state, Toast Notifications, Bookmarking, Speech Synthesis, Shortcuts, 3D Tilt
 */

// Global State
window.AppState = {
  favorites: JSON.parse(localStorage.getItem('sem5_viva_favorites') || '[]'),
  completed: JSON.parse(localStorage.getItem('sem5_viva_completed') || '[]'),
  speechVoice: null
};

// 1. Toast Notification System
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

// 2. Favorite / Bookmark Toggle
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

// 3. Oral Viva Audio Reader (SpeechSynthesis)
window.speakQuestion = function(text) {
  if (!('speechSynthesis' in window)) {
    window.showToast('Speech synthesis not supported in this browser.', 'warning');
    return;
  }

  window.speechSynthesis.cancel(); // Stop any ongoing speech

  // Strip HTML tags for clean oral reading
  const cleanText = text.replace(/<[^>]*>?/gm, '').trim();
  const utterance = new SpeechSynthesisUtterance(cleanText);
  utterance.rate = 0.95; // Slightly slower for clear academic pronunciation
  utterance.pitch = 1.0;

  // Prefer natural English voices
  const voices = window.speechSynthesis.getVoices();
  const naturalVoice = voices.find(v => v.lang.startsWith('en') && (v.name.includes('Natural') || v.name.includes('Google') || v.name.includes('Samantha')));
  if (naturalVoice) utterance.voice = naturalVoice;

  window.showToast('🎙️ Speaking question aloud...', 'info');
  window.speechSynthesis.speak(utterance);
};

// 4. 3D Card Tilt Effect
window.initCardTilt = function() {
  document.querySelectorAll('.tilt-card').forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -6;
      const rotateY = ((x - centerX) / centerX) * 6;
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)';
    });
  });
};

// 5. Global Keyboard Shortcuts
document.addEventListener('keydown', e => {
  // Do not trigger if typing in input or textarea
  if (['INPUT', 'TEXTAREA', 'SELECT'].includes(document.activeElement.tagName)) return;

  const key = e.key.toLowerCase();
  
  if (key === '/') {
    e.preventDefault();
    const searchInput = document.getElementById('search-input') || document.querySelector('input[type="text"]');
    if (searchInput) {
      searchInput.focus();
      window.showToast('Quick search activated', 'info');
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

// Initialize after DOM load
document.addEventListener('DOMContentLoaded', () => {
  window.initCardTilt();
});
