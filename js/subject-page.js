/**
 * SEM 5 VIVA PLATFORM — Individual Subject Page Renderer
 * Dynamically builds syllabus, viva questions, practicals, and adjacent subject navigation
 */

(function() {
  window.renderSubjectDetail = function(subjectId) {
    const data = window.ACADEMIC_DATA;
    if (!data) return;

    const subject = data.SUBJECTS.find(s => s.id === subjectId);
    if (!subject) return;

    const syllabus = data.SYLLABUS[subjectId] || { units: [] };
    const questions = data.VIVA_QUESTIONS.filter(q => q.subjectId === subjectId);
    const practicals = data.PRACTICALS[subjectId] || [];

    // 1. Breadcrumbs
    window.renderBreadcrumbs([
      { label: 'Subjects', url: '../subjects.html' },
      { label: subject.name, url: '#' }
    ]);

    // 2. Hero Section
    const heroContainer = document.getElementById('subject-hero');
    if (heroContainer) {
      heroContainer.innerHTML = `
        <div class="glass-panel rounded-3xl p-6 sm:p-10 border border-slate-800 relative overflow-hidden">
          <div class="absolute -right-10 -bottom-10 w-64 h-64 rounded-full bg-gradient-to-tr ${subject.gradient} blur-3xl pointer-events-none"></div>
          
          <div class="relative z-10 space-y-6">
            <div class="flex flex-wrap items-center justify-between gap-4">
              <div class="flex items-center gap-3">
                <span class="text-4xl p-3 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl">${subject.icon}</span>
                <div>
                  <div class="flex items-center gap-2">
                    <span class="px-2.5 py-0.5 rounded-full font-mono text-xs font-bold bg-sky-500/10 text-sky-400 border border-sky-500/30">
                      ${subject.code}
                    </span>
                    <span class="px-2.5 py-0.5 rounded-full font-mono text-xs bg-slate-800 text-slate-300">
                      ${subject.category}
                    </span>
                    <span class="px-2 py-0.5 rounded-full font-mono text-xs bg-slate-800 text-slate-300">
                      ${subject.credits} Credits
                    </span>
                  </div>
                  <h1 class="text-2xl sm:text-4xl font-extrabold text-slate-100 tracking-tight mt-1">
                    ${subject.name}
                  </h1>
                </div>
              </div>

              <!-- Quick Viva Button -->
              <a href="../viva.html?subject=${subject.id}" class="btn-glow px-5 py-2.5 rounded-xl bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 text-slate-950 font-bold text-xs font-mono tracking-wide shadow-lg shadow-sky-500/25 flex items-center gap-2">
                <span>⚡</span>
                <span>Launch ${subject.shortName} Viva Mode (${questions.length} Q&A)</span>
              </a>
            </div>

            <p class="text-slate-300 text-sm sm:text-base leading-relaxed max-w-4xl">
              ${subject.description}
            </p>

            <!-- Faculty & Viva Schedule Info Box -->
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2 text-xs font-mono">
              <div class="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
                <span class="text-slate-400 uppercase tracking-wider">Faculty (SSASIT)</span>
                <p class="text-slate-200 font-semibold">${subject.faculty}</p>
              </div>
              <div class="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
                <span class="text-slate-400 uppercase tracking-wider">Term Work Submission & Viva</span>
                <p class="text-sky-400 font-bold">${subject.vivaDate} • ${subject.time || '9:00 AM'}</p>
              </div>
              <div class="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
                <span class="text-slate-400 uppercase tracking-wider">Classes & Mid Scope</span>
                <p class="text-emerald-400 font-bold">Class ${subject.classes || '31, 32, 33'} • Units ${subject.midExamUnits.join(', ')}</p>
              </div>
            </div>

          </div>
        </div>
      `;
    }

    // 3. Syllabus Units Explorer
    const syllabusContainer = document.getElementById('subject-syllabus-list');
    if (syllabusContainer) {
      let sylHTML = '';
      syllabus.units.forEach(u => {
        const isMid = u.inMidExam;
        const badge = isMid 
          ? '<span class="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">✓ Included in Mid Exam</span>'
          : '<span class="px-2 py-0.5 rounded text-[10px] font-mono text-slate-400 bg-slate-900 border border-slate-800">Post-Mid Syllabus</span>';

        sylHTML += `
          <div class="glass-card rounded-2xl p-5 border border-slate-800 space-y-3" id="unit-${u.unitNum}">
            <div class="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800/60 pb-3">
              <div class="flex items-center gap-2">
                <span class="w-7 h-7 rounded-lg bg-sky-500/10 border border-sky-500/30 text-sky-400 flex items-center justify-center font-mono font-bold text-xs">
                  ${u.unitNum}
                </span>
                <h3 class="text-base font-bold text-slate-100">${u.title}</h3>
              </div>
              <div class="flex items-center gap-2">
                ${badge}
                <span class="text-xs font-mono text-slate-400">${u.hours} Hours (${u.weightage})</span>
              </div>
            </div>

            <ul class="space-y-1.5 text-xs text-slate-300">
              ${u.topics.map(t => `<li class="flex items-start gap-2"><span class="text-sky-400 shrink-0">•</span><span>${t}</span></li>`).join('')}
            </ul>
          </div>
        `;
      });
      syllabusContainer.innerHTML = sylHTML;
    }

    // 4. Viva Questions List
    const vivaContainer = document.getElementById('subject-viva-list');
    if (vivaContainer) {
      let qHTML = '';
      questions.forEach((q, idx) => {
        const isStarred = window.AppState.favorites.includes(q.id);
        qHTML += `
          <article class="glass-card rounded-2xl p-5 border border-slate-800/80 hover:border-slate-700 space-y-3 group" id="${q.id}">
            <div class="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800/60 pb-2.5">
              <div class="flex items-center gap-2">
                <span class="px-2 py-0.5 rounded text-[10px] font-mono bg-slate-900 text-sky-400 border border-slate-800">${q.unit}</span>
                <span class="px-2 py-0.5 rounded text-[10px] font-mono bg-slate-900 text-slate-400 border border-slate-800">${q.topic}</span>
                ${q.isImportant ? '<span class="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-amber-500/10 text-amber-400 border border-amber-500/30">🔥 High Probability</span>' : ''}
              </div>
              <div class="flex items-center gap-2">
                <button onclick="speakQuestion('${q.question.replace(/'/g, "\\'")}')" class="p-1 rounded bg-slate-900 text-slate-400 hover:text-sky-400 text-xs" title="Speak question aloud">🎙️</button>
                <button onclick="toggleFavorite('${q.id}')" data-fav-btn="${q.id}" class="p-1 rounded bg-slate-900 ${isStarred ? 'text-amber-400' : 'text-slate-500'} hover:text-amber-400 text-xs" title="Star question">${isStarred ? '★' : '☆'}</button>
              </div>
            </div>

            <div class="flex items-start gap-2.5">
              <span class="text-sky-400 font-mono font-bold text-xs pt-0.5">Q${idx + 1}.</span>
              <h4 class="text-sm font-semibold text-slate-100 group-hover:text-sky-300 transition-colors">${q.question}</h4>
            </div>

            <div>
              <button class="sub-ans-toggle px-3 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 text-xs font-mono font-medium flex items-center gap-1.5" data-target="ans-${q.id}">
                <span>👁️</span><span>Toggle Model Answer</span>
              </button>
            </div>

            <div class="answer-content" id="ans-${q.id}">
              <div class="p-4 rounded-xl bg-slate-950/90 border border-slate-800 text-xs text-slate-300 leading-relaxed space-y-2 mt-2">
                <div class="prose prose-invert max-w-none text-slate-300">
                  ${q.answer}
                </div>
                <div class="text-[10px] font-mono text-slate-400 border-t border-slate-900 pt-2 flex justify-between">
                  <span>Source: ${q.sourceRef}</span>
                  <span>SSASIT Sem 5</span>
                </div>
              </div>
            </div>
          </article>
        `;
      });
      vivaContainer.innerHTML = qHTML;

      // Attach toggle listeners
      vivaContainer.querySelectorAll('.sub-ans-toggle').forEach(btn => {
        btn.addEventListener('click', () => {
          const targetEl = document.getElementById(btn.dataset.target);
          if (targetEl) targetEl.classList.toggle('revealed');
        });
      });
    }

    // 5. Practicals Section
    const pracContainer = document.getElementById('subject-practicals-list');
    if (pracContainer) {
      if (practicals.length === 0) {
        pracContainer.innerHTML = `<p class="text-xs text-slate-400">No laboratory practicals listed for this course.</p>`;
      } else {
        let pracHTML = '';
        practicals.forEach(p => {
          pracHTML += `
            <div class="p-4 rounded-xl bg-slate-900/60 border border-slate-800/80 space-y-1">
              <div class="flex items-center gap-2 font-mono text-xs text-sky-400 font-bold">
                <span>Lab Practical ${p.num}</span>
              </div>
              <h4 class="text-sm font-bold text-slate-200">${p.title}</h4>
              <p class="text-xs text-slate-400 leading-relaxed">${p.desc}</p>
            </div>
          `;
        });
        pracContainer.innerHTML = pracHTML;
      }
    }

    // 6. Next & Previous Subject Navigation
    const navContainer = document.getElementById('subject-prev-next');
    if (navContainer) {
      const allSubs = data.SUBJECTS;
      const currentIndex = allSubs.findIndex(s => s.id === subjectId);
      const prevSub = currentIndex > 0 ? allSubs[currentIndex - 1] : allSubs[allSubs.length - 1];
      const nextSub = currentIndex < allSubs.length - 1 ? allSubs[currentIndex + 1] : allSubs[0];

      navContainer.innerHTML = `
        <div class="flex items-center justify-between gap-4 pt-8 border-t border-slate-800">
          <a href="${prevSub.id}.html" class="glass-card px-4 py-2.5 rounded-xl border border-slate-800 text-xs font-mono text-slate-300 hover:text-sky-400 flex items-center gap-2">
            <span>←</span>
            <span>${prevSub.icon} ${prevSub.shortName}</span>
          </a>
          <a href="../subjects.html" class="text-xs font-mono text-slate-400 hover:text-white">All 7 Subjects</a>
          <a href="${nextSub.id}.html" class="glass-card px-4 py-2.5 rounded-xl border border-slate-800 text-xs font-mono text-slate-300 hover:text-sky-400 flex items-center gap-2">
            <span>${nextSub.icon} ${nextSub.shortName}</span>
            <span>→</span>
          </a>
        </div>
      `;
    }
  };
})();
