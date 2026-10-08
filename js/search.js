/**
 * SEM 5 VIVA PLATFORM — Global Client-Side Search Engine
 * Search across Questions, Answers, Syllabus Topics, Practicals & Revision Concepts
 */

(function() {
  let searchType = 'all';

  window.initGlobalSearch = function() {
    const searchInput = document.getElementById('global-search-input');
    const typeFilters = document.querySelectorAll('.search-type-btn');

    if (!searchInput) return;

    // Read query parameter if redirected from another page
    const urlParams = new URLSearchParams(window.location.search);
    const initialQuery = urlParams.get('q');
    if (initialQuery) {
      searchInput.value = initialQuery;
      performSearch(initialQuery);
    }

    searchInput.addEventListener('input', e => {
      performSearch(e.target.value);
    });

    typeFilters.forEach(btn => {
      btn.addEventListener('click', () => {
        typeFilters.forEach(b => b.classList.remove('bg-sky-500', 'text-slate-950', 'border-sky-400', 'font-bold'));
        typeFilters.forEach(b => b.classList.add('bg-slate-900', 'text-slate-400', 'border-slate-800'));
        btn.classList.add('bg-sky-500', 'text-slate-950', 'border-sky-400', 'font-bold');
        btn.classList.remove('bg-slate-900', 'text-slate-400', 'border-slate-800');
        searchType = btn.dataset.type;
        performSearch(searchInput.value);
      });
    });
  };

  function highlightMatches(text, query) {
    if (!query || !query.trim()) return text;
    const cleanQuery = query.trim().replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(`(${cleanQuery})`, 'gi');
    return text.replace(regex, '<mark class="bg-amber-400/30 text-amber-200 px-0.5 rounded font-semibold">$1</mark>');
  }

  function performSearch(query) {
    const resultsContainer = document.getElementById('search-results-list');
    const countBadge = document.getElementById('search-results-count');
    if (!resultsContainer) return;

    const trimmed = query.trim().toLowerCase();
    if (trimmed.length < 2) {
      resultsContainer.innerHTML = `
        <div class="glass-card rounded-2xl p-12 text-center border border-slate-800 space-y-3">
          <div class="text-3xl">⌨️</div>
          <div class="text-base font-semibold text-slate-300">Type at least 2 characters to search</div>
          <p class="text-xs text-slate-400">Search across 113+ viva questions, 37 syllabus modules, practicals, formulas, and definitions.</p>
        </div>
      `;
      if (countBadge) countBadge.textContent = '0 results';
      return;
    }

    const data = window.ACADEMIC_DATA;
    const results = [];

    // 1. Search Viva Questions
    if (searchType === 'all' || searchType === 'viva') {
      data.VIVA_QUESTIONS.forEach(q => {
        const textToSearch = `${q.question} ${q.answer} ${q.topic} ${q.unit} ${q.subjectName}`.toLowerCase();
        if (textToSearch.includes(trimmed)) {
          const subject = data.SUBJECTS.find(s => s.id === q.subjectId) || {};
          results.push({
            type: 'Viva Question',
            typeBadge: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/30',
            subject: subject.shortName || q.subjectId.toUpperCase(),
            subjectIcon: subject.icon || '📘',
            title: q.question,
            snippet: q.answer.replace(/<[^>]*>?/gm, '').substring(0, 180) + '...',
            link: `viva.html?subject=${q.subjectId}#${q.id}`
          });
        }
      });
    }

    // 2. Search Syllabus Topics
    if (searchType === 'all' || searchType === 'syllabus') {
      Object.keys(data.SYLLABUS).forEach(subId => {
        const sub = data.SYLLABUS[subId];
        const subjectObj = data.SUBJECTS.find(s => s.id === subId) || {};
        sub.units.forEach(u => {
          u.topics.forEach(t => {
            if (t.toLowerCase().includes(trimmed) || u.title.toLowerCase().includes(trimmed)) {
              results.push({
                type: 'Syllabus Topic',
                typeBadge: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
                subject: subjectObj.shortName || subId.toUpperCase(),
                subjectIcon: subjectObj.icon || '📋',
                title: `${u.title} — Unit ${u.unitNum}`,
                snippet: t,
                link: `subjects/${subId}.html#unit-${u.unitNum}`
              });
            }
          });
        });
      });
    }

    // 3. Search Revision Concepts
    if (searchType === 'all' || searchType === 'revision') {
      data.REVISION_CARDS.forEach(r => {
        if (`${r.title} ${r.content} ${r.subjectName}`.toLowerCase().includes(trimmed)) {
          results.push({
            type: `Revision (${r.category})`,
            typeBadge: 'bg-pink-500/10 text-pink-400 border-pink-500/30',
            subject: r.subjectName,
            subjectIcon: '🚀',
            title: r.title,
            snippet: r.content.replace(/<[^>]*>?/gm, '').substring(0, 180) + '...',
            link: `revision.html#${r.id}`
          });
        }
      });
    }

    // 4. Search Practicals
    if (searchType === 'all' || searchType === 'practicals') {
      Object.keys(data.PRACTICALS).forEach(subId => {
        const subjectObj = data.SUBJECTS.find(s => s.id === subId) || {};
        data.PRACTICALS[subId].forEach(p => {
          if (`${p.title} ${p.desc}`.toLowerCase().includes(trimmed)) {
            results.push({
              type: 'Lab Practical',
              typeBadge: 'bg-amber-500/10 text-amber-400 border-amber-500/30',
              subject: subjectObj.shortName || subId.toUpperCase(),
              subjectIcon: subjectObj.icon || '🧪',
              title: `Practical ${p.num}: ${p.title}`,
              snippet: p.desc,
              link: `subjects/${subId}.html#practicals`
            });
          }
        });
      });
    }

    if (countBadge) {
      countBadge.textContent = `${results.length} result${results.length === 1 ? '' : 's'}`;
    }

    if (results.length === 0) {
      resultsContainer.innerHTML = `
        <div class="glass-card rounded-2xl p-12 text-center border border-slate-800 space-y-3">
          <div class="text-3xl">🚫</div>
          <div class="text-base font-semibold text-slate-300">No results found for "${query}"</div>
          <p class="text-xs text-slate-400">Try searching for keywords like "8085", "TCP", "WBS", "Node", "Dijkstra", "NumPy", or "Assembler".</p>
        </div>
      `;
      return;
    }

    let html = '';
    results.forEach(res => {
      html += `
        <a href="${res.link}" class="glass-card rounded-2xl p-5 border border-slate-800 hover:border-sky-500/40 block transition-all group space-y-2">
          <div class="flex items-center justify-between text-xs">
            <div class="flex items-center gap-2">
              <span class="px-2 py-0.5 rounded-md font-mono font-bold bg-slate-900 border border-slate-800 text-sky-400 flex items-center gap-1">
                <span>${res.subjectIcon}</span>
                <span>${res.subject}</span>
              </span>
              <span class="px-2 py-0.5 rounded-md font-mono text-[10px] border ${res.typeBadge}">
                ${res.type}
              </span>
            </div>
            <span class="text-slate-400 group-hover:text-sky-400 transition-colors font-mono text-xs">Jump →</span>
          </div>

          <h3 class="text-sm font-semibold text-slate-100 group-hover:text-sky-300 transition-colors">
            ${highlightMatches(res.title, trimmed)}
          </h3>

          <p class="text-xs text-slate-400 leading-relaxed font-sans line-clamp-2">
            ${highlightMatches(res.snippet, trimmed)}
          </p>
        </a>
      `;
    });

    resultsContainer.innerHTML = html;
  }
})();
