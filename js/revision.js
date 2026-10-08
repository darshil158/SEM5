/**
 * SEM 5 VIVA PLATFORM — Rapid Revision Engine
 * Formulas, Definitions, Algorithms, and Oral Viva Traps
 */

(function() {
  let activeTab = 'all';
  let activeCategory = 'all';

  window.initRevisionEngine = function() {
    renderRevisionFilters();
    renderRevisionCards();
  };

  function renderRevisionFilters() {
    const container = document.getElementById('revision-subject-filters');
    if (!container) return;

    const subjects = window.ACADEMIC_DATA.SUBJECTS;
    let html = `
      <button class="rev-filter-btn px-3.5 py-1.5 rounded-xl text-xs font-semibold font-mono border transition-all ${activeTab === 'all' ? 'bg-pink-500 text-slate-950 border-pink-400 font-bold shadow-lg shadow-pink-500/20' : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'}" data-subject="all">
        ALL CONCEPTS
      </button>
    `;

    subjects.forEach(s => {
      const isSelected = activeTab === s.id;
      html += `
        <button class="rev-filter-btn px-3.5 py-1.5 rounded-xl text-xs font-semibold font-mono border transition-all flex items-center gap-1.5 ${isSelected ? 'bg-pink-500 text-slate-950 border-pink-400 font-bold shadow-lg shadow-pink-500/20' : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'}" data-subject="${s.id}">
          <span>${s.icon}</span>
          <span>${s.shortName}</span>
        </button>
      `;
    });

    container.innerHTML = html;

    container.querySelectorAll('.rev-filter-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        activeTab = btn.dataset.subject;
        renderRevisionFilters();
        renderRevisionCards();
      });
    });

    // Category Buttons
    const catButtons = document.querySelectorAll('.rev-cat-btn');
    catButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        catButtons.forEach(b => b.classList.remove('bg-sky-500', 'text-slate-950', 'border-sky-400', 'font-bold'));
        catButtons.forEach(b => b.classList.add('bg-slate-900', 'text-slate-400', 'border-slate-800'));
        btn.classList.add('bg-sky-500', 'text-slate-950', 'border-sky-400', 'font-bold');
        btn.classList.remove('bg-slate-900', 'text-slate-400', 'border-slate-800');
        activeCategory = btn.dataset.cat;
        renderRevisionCards();
      });
    });
  }

  function renderRevisionCards() {
    const container = document.getElementById('revision-cards-list');
    const counterEl = document.getElementById('revision-counter');
    if (!container) return;

    const cards = window.ACADEMIC_DATA.REVISION_CARDS.filter(c => {
      const matchSubject = activeTab === 'all' || c.subjectId === activeTab;
      const matchCategory = activeCategory === 'all' || c.category.toLowerCase() === activeCategory.toLowerCase();
      return matchSubject && matchCategory;
    });

    if (counterEl) {
      counterEl.textContent = `${cards.length} revision item${cards.length === 1 ? '' : 's'}`;
    }

    if (cards.length === 0) {
      container.innerHTML = `
        <div class="glass-card rounded-2xl p-12 text-center border border-slate-800 space-y-3">
          <div class="text-3xl">📝</div>
          <div class="text-base font-semibold text-slate-300">No revision concepts for this filter</div>
          <p class="text-xs text-slate-400">Select "All Concepts" above to view formulas, definitions, and viva memory rules.</p>
        </div>
      `;
      return;
    }

    let html = '';
    cards.forEach(card => {
      const isFormula = card.category === 'Formula';
      const badgeColor = isFormula ? 'bg-pink-500/10 text-pink-400 border-pink-500/30' : 'bg-sky-500/10 text-sky-400 border-sky-500/30';
      const icon = isFormula ? '📐' : '📖';

      html += `
        <article class="glass-card rounded-2xl p-6 border border-slate-800/80 hover:border-slate-700 transition-all space-y-4" id="${card.id}">
          <div class="flex items-center justify-between border-b border-slate-800/60 pb-3">
            <div class="flex items-center gap-2">
              <span class="px-2 py-0.5 rounded font-mono text-[11px] font-bold border ${badgeColor}">
                ${icon} ${card.category.toUpperCase()}
              </span>
              <span class="px-2 py-0.5 rounded font-mono text-[11px] bg-slate-900 border border-slate-800 text-slate-400">
                ${card.subjectName}
              </span>
            </div>
            <button onclick="copyCardContent('${card.id}')" title="Copy text" class="text-xs text-slate-500 hover:text-sky-400 font-mono transition-colors">
              📋 Copy
            </button>
          </div>

          <h3 class="text-base font-bold text-slate-100">${card.title}</h3>

          <div class="text-sm text-slate-300 leading-relaxed space-y-2" id="text-${card.id}">
            ${card.content}
          </div>
        </article>
      `;
    });

    container.innerHTML = html;
  }

  window.copyCardContent = function(cardId) {
    const el = document.getElementById(`text-${cardId}`);
    if (el) {
      const text = el.innerText;
      navigator.clipboard.writeText(text).then(() => {
        window.showToast('Copied to clipboard!', 'success');
      });
    }
  };
})();
