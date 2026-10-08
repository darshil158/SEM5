/**
 * SEM 5 VIVA PLATFORM — Interactive Viva Preparation Engine
 * Filters, Question Cards, Answer Toggles, Audio Reader, Flashcards
 */

(function() {
  let activeSubject = 'all';
  let activeCategory = 'all';
  let activeSearch = '';
  let onlyStarred = false;
  let onlyImportant = false;

  window.initVivaEngine = function() {
    const data = window.ACADEMIC_DATA;
    if (!data) return;

    // Check URL parameters for pre-selected subject
    const urlParams = new URLSearchParams(window.location.search);
    const subjectParam = urlParams.get('subject');
    if (subjectParam && data.SUBJECTS.some(s => s.id === subjectParam)) {
      activeSubject = subjectParam;
    }

    renderSubjectFilters();
    bindVivaControls();
    renderVivaQuestions();
  };

  function renderSubjectFilters() {
    const filterContainer = document.getElementById('subject-filters');
    if (!filterContainer) return;

    const subjects = window.ACADEMIC_DATA.SUBJECTS;
    let html = `
      <button class="viva-filter-btn px-3.5 py-1.5 rounded-xl text-xs font-semibold font-mono transition-all border ${activeSubject === 'all' ? 'bg-sky-500 text-slate-950 border-sky-400 shadow-lg shadow-sky-500/20' : 'bg-slate-900/80 text-slate-400 border-slate-800 hover:border-slate-700 hover:text-white'}" data-subject="all">
        ALL (${window.ACADEMIC_DATA.VIVA_QUESTIONS.length})
      </button>
    `;

    subjects.forEach(s => {
      const isSelected = activeSubject === s.id;
      html += `
        <button class="viva-filter-btn px-3.5 py-1.5 rounded-xl text-xs font-semibold font-mono transition-all border flex items-center gap-1.5 ${isSelected ? 'bg-sky-500 text-slate-950 border-sky-400 shadow-lg shadow-sky-500/20 font-bold' : 'bg-slate-900/80 text-slate-400 border-slate-800 hover:border-slate-700 hover:text-white'}" data-subject="${s.id}">
          <span>${s.icon}</span>
          <span>${s.shortName}</span>
          <span class="text-[10px] px-1.5 py-0.2 rounded-full ${isSelected ? 'bg-slate-950/30 text-slate-950' : 'bg-slate-800 text-slate-400'}">${s.questionCount}</span>
        </button>
      `;
    });

    filterContainer.innerHTML = html;

    // Attach click events
    filterContainer.querySelectorAll('.viva-filter-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        activeSubject = btn.dataset.subject;
        renderSubjectFilters();
        renderVivaQuestions();
      });
    });
  }

  function getFilteredQuestions() {
    return window.ACADEMIC_DATA.VIVA_QUESTIONS.filter(q => {
      const matchSubject = activeSubject === 'all' || q.subjectId === activeSubject;
      const matchCategory = activeCategory === 'all' || q.category === activeCategory;
      const matchImportant = !onlyImportant || q.isImportant;
      const matchStarred = !onlyStarred || window.AppState.favorites.includes(q.id);
      
      const searchNeedle = activeSearch.toLowerCase().trim();
      const matchSearch = !searchNeedle || 
        q.question.toLowerCase().includes(searchNeedle) || 
        q.topic.toLowerCase().includes(searchNeedle) || 
        q.unit.toLowerCase().includes(searchNeedle) || 
        q.answer.toLowerCase().includes(searchNeedle);

      return matchSubject && matchCategory && matchImportant && matchStarred && matchSearch;
    });
  }

  window.renderVivaQuestions = function() {
    const container = document.getElementById('viva-questions-list');
    const counterEl = document.getElementById('viva-results-counter');
    if (!container) return;

    const questions = getFilteredQuestions();

    if (counterEl) {
      counterEl.textContent = `Showing ${questions.length} viva question${questions.length === 1 ? '' : 's'}`;
    }

    if (questions.length === 0) {
      container.innerHTML = `
        <div class="glass-card rounded-2xl p-12 text-center border border-slate-800 space-y-4">
          <div class="text-4xl">🔍</div>
          <div class="text-lg font-bold text-slate-200">No viva questions match your active filters</div>
          <p class="text-sm text-slate-400 max-w-md mx-auto">Try clearing search terms or selecting a different subject filter.</p>
          <button id="reset-viva-filters" class="px-4 py-2 rounded-xl bg-sky-500/20 text-sky-400 border border-sky-500/40 text-xs font-mono font-semibold hover:bg-sky-500 hover:text-slate-950 transition-all">
            Reset Filters
          </button>
        </div>
      `;
      const resetBtn = document.getElementById('reset-viva-filters');
      if (resetBtn) {
        resetBtn.addEventListener('click', () => {
          activeSubject = 'all';
          activeCategory = 'all';
          activeSearch = '';
          onlyStarred = false;
          onlyImportant = false;
          const searchInput = document.getElementById('viva-search-input');
          if (searchInput) searchInput.value = '';
          renderSubjectFilters();
          renderVivaQuestions();
        });
      }
      return;
    }

    let html = '';
    questions.forEach((q, idx) => {
      const isStarred = window.AppState.favorites.includes(q.id);
      const subject = window.ACADEMIC_DATA.SUBJECTS.find(s => s.id === q.subjectId) || {};

      html += `
        <article class="glass-card rounded-2xl p-6 border border-slate-800/80 hover:border-slate-700 transition-all space-y-4 group" id="${q.id}">
          
          <!-- Question Meta Header -->
          <div class="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800/60 pb-3">
            <div class="flex flex-wrap items-center gap-2">
              <span class="px-2.5 py-1 rounded-md text-[11px] font-mono font-semibold bg-slate-800/80 text-sky-400 border border-slate-700/60 flex items-center gap-1">
                <span>${subject.icon || '📘'}</span>
                <span>${subject.shortName || q.subjectId.toUpperCase()}</span>
              </span>
              <span class="px-2 py-0.5 rounded text-[11px] font-mono bg-slate-900 text-slate-400 border border-slate-800">
                ${q.unit}
              </span>
              <span class="px-2 py-0.5 rounded text-[11px] font-mono bg-slate-900 text-slate-400 border border-slate-800">
                ${q.topic}
              </span>
              ${q.isImportant ? '<span class="px-2 py-0.5 rounded text-[11px] font-mono font-bold bg-amber-500/10 text-amber-400 border border-amber-500/30">🔥 High Probability Viva</span>' : ''}
            </div>

            <!-- Actions: Speak & Star -->
            <div class="flex items-center gap-2">
              <button onclick="speakQuestion('${escapeForAttr(q.question)}')" title="Speak question aloud for oral practice" class="p-1.5 rounded-lg bg-slate-900 text-slate-400 hover:text-sky-400 hover:bg-slate-800 border border-slate-800 transition-colors text-xs">
                🎙️
              </button>
              <button onclick="toggleFavorite('${q.id}')" data-fav-btn="${q.id}" title="Star this question" class="p-1.5 rounded-lg bg-slate-900 ${isStarred ? 'text-amber-400' : 'text-slate-500'} hover:text-amber-400 hover:bg-slate-800 border border-slate-800 transition-colors text-xs">
                ${isStarred ? '★' : '☆'}
              </button>
            </div>
          </div>

          <!-- Question Content -->
          <div class="space-y-2">
            <div class="flex items-start gap-3">
              <span class="text-sky-400 font-mono font-bold text-sm shrink-0 pt-0.5">Q${idx + 1}.</span>
              <h3 class="text-base font-semibold text-slate-100 leading-snug group-hover:text-sky-300 transition-colors">
                ${q.question}
              </h3>
            </div>
          </div>

          <!-- Show/Hide Answer Toggle Button -->
          <div class="pt-1">
            <button class="answer-toggle-btn px-4 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700/80 text-xs font-mono font-semibold transition-all flex items-center gap-2" data-target="ans-${q.id}">
              <span class="toggle-icon">👁️</span>
              <span class="toggle-label">Reveal Model Answer</span>
            </button>
          </div>

          <!-- Collapsible Answer Area -->
          <div class="answer-content pt-2" id="ans-${q.id}">
            <div class="p-5 rounded-xl bg-slate-950/90 border border-slate-800/80 text-sm text-slate-300 leading-relaxed space-y-3">
              <div class="prose prose-invert max-w-none text-slate-300">
                ${q.answer}
              </div>
              <div class="text-[11px] font-mono text-slate-400 border-t border-slate-900 pt-2 flex items-center justify-between">
                <span>Ref: ${q.sourceRef}</span>
                <span class="text-slate-400">Class 31, 32, 33 • 2026</span>
              </div>
            </div>
          </div>

        </article>
      `;
    });

    container.innerHTML = html;

    // Attach answer toggle listeners
    container.querySelectorAll('.answer-toggle-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const targetId = btn.dataset.target;
        const answerEl = document.getElementById(targetId);
        const icon = btn.querySelector('.toggle-icon');
        const label = btn.querySelector('.toggle-label');

        if (answerEl) {
          const isOpen = answerEl.classList.contains('revealed');
          if (isOpen) {
            answerEl.classList.remove('revealed');
            label.textContent = 'Reveal Model Answer';
            icon.textContent = '👁️';
            btn.classList.remove('bg-sky-950/60', 'text-sky-300', 'border-sky-700/60');
          } else {
            answerEl.classList.add('revealed');
            label.textContent = 'Hide Answer';
            icon.textContent = '🙈';
            btn.classList.add('bg-sky-950/60', 'text-sky-300', 'border-sky-700/60');
          }
        }
      });
    });
  };

  function bindVivaControls() {
    const searchInput = document.getElementById('viva-search-input');
    if (searchInput) {
      searchInput.addEventListener('input', e => {
        activeSearch = e.target.value;
        renderVivaQuestions();
      });
    }

    const impFilterBtn = document.getElementById('filter-important-btn');
    if (impFilterBtn) {
      impFilterBtn.addEventListener('click', () => {
        onlyImportant = !onlyImportant;
        impFilterBtn.classList.toggle('bg-amber-500/20', onlyImportant);
        impFilterBtn.classList.toggle('text-amber-400', onlyImportant);
        impFilterBtn.classList.toggle('border-amber-500/40', onlyImportant);
        renderVivaQuestions();
      });
    }

    const starFilterBtn = document.getElementById('filter-starred-btn');
    if (starFilterBtn) {
      starFilterBtn.addEventListener('click', () => {
        onlyStarred = !onlyStarred;
        starFilterBtn.classList.toggle('bg-amber-500/20', onlyStarred);
        starFilterBtn.classList.toggle('text-amber-400', onlyStarred);
        starFilterBtn.classList.toggle('border-amber-500/40', onlyStarred);
        renderVivaQuestions();
      });
    }

    const expandAllBtn = document.getElementById('viva-expand-all');
    if (expandAllBtn) {
      expandAllBtn.addEventListener('click', () => {
        document.querySelectorAll('.answer-content').forEach(ans => ans.classList.add('revealed'));
        document.querySelectorAll('.answer-toggle-btn').forEach(btn => {
          btn.querySelector('.toggle-label').textContent = 'Hide Answer';
          btn.querySelector('.toggle-icon').textContent = '🙈';
        });
      });
    }

    const collapseAllBtn = document.getElementById('viva-collapse-all');
    if (collapseAllBtn) {
      collapseAllBtn.addEventListener('click', () => {
        document.querySelectorAll('.answer-content').forEach(ans => ans.classList.remove('revealed'));
        document.querySelectorAll('.answer-toggle-btn').forEach(btn => {
          btn.querySelector('.toggle-label').textContent = 'Reveal Model Answer';
          btn.querySelector('.toggle-icon').textContent = '👁️';
        });
      });
    }

    const randomBtn = document.getElementById('viva-random-btn');
    if (randomBtn) {
      randomBtn.addEventListener('click', () => {
        const questions = getFilteredQuestions();
        if (questions.length === 0) return;
        const randQ = questions[Math.floor(Math.random() * questions.length)];
        const cardEl = document.getElementById(randQ.id);
        if (cardEl) {
          cardEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
          cardEl.classList.add('ring-2', 'ring-sky-500');
          setTimeout(() => cardEl.classList.remove('ring-2', 'ring-sky-500'), 1500);
          // auto open answer
          const ansEl = document.getElementById(`ans-${randQ.id}`);
          if (ansEl) ansEl.classList.add('revealed');
        }
      });
    }
  }

  function escapeForAttr(str) {
    return str.replace(/"/g, '&quot;').replace(/'/g, "\\'");
  }

})();
