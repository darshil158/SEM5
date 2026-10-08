/**
 * SEM 5 VIVA PLATFORM — Unified Navigation Component
 * Header Topbar, Mobile Drawer, Breadcrumbs, and Footer
 */

(function() {
  function getPrefix() {
    return window.location.pathname.includes('/subjects/') ? '../' : '';
  }

  window.renderNavbar = function(activePage = '') {
    const p = getPrefix();
    const navPlaceholder = document.getElementById('navbar-container');
    if (!navPlaceholder) return;

    const navHTML = `
      <header class="sticky top-0 z-50 glass-panel border-b border-slate-800/80 backdrop-blur-xl">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          
          <!-- Brand Logo -->
          <a href="${p}index.html" class="flex items-center gap-3 group">
            <div class="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-sky-500 to-emerald-400 p-[1.5px] shadow-lg shadow-indigo-500/20 group-hover:shadow-indigo-500/40 transition-all">
              <div class="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center font-black text-sm tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-indigo-300">
                S5
              </div>
            </div>
            <div>
              <div class="font-bold text-slate-100 tracking-tight leading-none text-base group-hover:text-sky-400 transition-colors">
                SEM 5 <span class="text-sky-400 font-extrabold">VIVA</span>
              </div>
              <div class="text-[10px] font-mono uppercase tracking-wider text-slate-400">SSASIT • Computer Engg</div>
            </div>
          </a>

          <!-- Desktop Navigation Links -->
          <nav class="hidden md:flex items-center gap-1 text-sm font-medium">
            <a href="${p}index.html" class="px-3 py-1.5 rounded-lg transition-colors ${activePage === 'home' ? 'text-sky-400 bg-sky-950/40 border border-sky-800/50' : 'text-slate-300 hover:text-white hover:bg-slate-800/50'}">Home</a>
            <a href="${p}subjects.html" class="px-3 py-1.5 rounded-lg transition-colors ${activePage === 'subjects' ? 'text-sky-400 bg-sky-950/40 border border-sky-800/50' : 'text-slate-300 hover:text-white hover:bg-slate-800/50'}">Subjects</a>
            <a href="${p}syllabus.html" class="px-3 py-1.5 rounded-lg transition-colors ${activePage === 'syllabus' ? 'text-sky-400 bg-sky-950/40 border border-sky-800/50' : 'text-slate-300 hover:text-white hover:bg-slate-800/50'}">Syllabus</a>
            <a href="${p}viva.html" class="px-3.5 py-1.5 rounded-lg transition-all font-semibold ${activePage === 'viva' ? 'text-white bg-gradient-to-r from-indigo-600 to-sky-600 shadow-lg shadow-indigo-500/25' : 'text-sky-300 bg-sky-500/10 hover:bg-sky-500/20 border border-sky-500/30'}">⚡ Viva Prep</a>
            <a href="${p}revision.html" class="px-3 py-1.5 rounded-lg transition-colors ${activePage === 'revision' ? 'text-sky-400 bg-sky-950/40 border border-sky-800/50' : 'text-slate-300 hover:text-white hover:bg-slate-800/50'}">Rapid Revision</a>
            <a href="${p}about.html" class="px-3 py-1.5 rounded-lg transition-colors ${activePage === 'about' ? 'text-sky-400 bg-sky-950/40 border border-sky-800/50' : 'text-slate-300 hover:text-white hover:bg-slate-800/50'}">Guidelines</a>
          </nav>

          <!-- Search & Action Buttons -->
          <div class="flex items-center gap-2">
            <a href="${p}search.html" class="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700/80 hover:border-sky-500/50 text-slate-300 hover:text-white text-xs font-mono transition-all group">
              <span>🔍</span>
              <span class="hidden sm:inline">Search</span>
              <kbd class="px-1.5 py-0.5 rounded bg-slate-800 border border-slate-700 text-[10px] text-slate-400">/</kbd>
            </a>

            <!-- Mobile Menu Toggle -->
            <button id="mobile-menu-btn" class="md:hidden p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-white" aria-label="Toggle Navigation">
              ☰
            </button>
          </div>

        </div>

        <!-- Mobile Drawer -->
        <div id="mobile-drawer" class="hidden md:hidden px-4 pt-2 pb-4 space-y-2 bg-slate-950/95 border-b border-slate-800 backdrop-blur-2xl">
          <a href="${p}index.html" class="block px-3 py-2 rounded-lg text-slate-300 hover:bg-slate-800 ${activePage === 'home' ? 'text-sky-400 font-bold bg-slate-900' : ''}">🏠 Home</a>
          <a href="${p}subjects.html" class="block px-3 py-2 rounded-lg text-slate-300 hover:bg-slate-800 ${activePage === 'subjects' ? 'text-sky-400 font-bold bg-slate-900' : ''}">📚 All 7 Subjects</a>
          <a href="${p}syllabus.html" class="block px-3 py-2 rounded-lg text-slate-300 hover:bg-slate-800 ${activePage === 'syllabus' ? 'text-sky-400 font-bold bg-slate-900' : ''}">📋 Syllabus Browser</a>
          <a href="${p}viva.html" class="block px-3 py-2 rounded-lg text-sky-400 font-bold bg-sky-950/40 border border-sky-800/60">⚡ Oral Viva Simulator</a>
          <a href="${p}revision.html" class="block px-3 py-2 rounded-lg text-slate-300 hover:bg-slate-800 ${activePage === 'revision' ? 'text-sky-400 font-bold bg-slate-900' : ''}">🚀 Rapid Revision</a>
          <a href="${p}about.html" class="block px-3 py-2 rounded-lg text-slate-300 hover:bg-slate-800 ${activePage === 'about' ? 'text-sky-400 font-bold bg-slate-900' : ''}">ℹ️ Timetable & Guidelines</a>
        </div>
      </header>
    `;

    navPlaceholder.innerHTML = navHTML;

    // Mobile menu toggle event
    const mobileBtn = document.getElementById('mobile-menu-btn');
    const mobileDrawer = document.getElementById('mobile-drawer');
    if (mobileBtn && mobileDrawer) {
      mobileBtn.addEventListener('click', () => {
        mobileDrawer.classList.toggle('hidden');
      });
    }
  };

  window.renderBreadcrumbs = function(crumbs = []) {
    const container = document.getElementById('breadcrumbs-container');
    if (!container || crumbs.length === 0) return;

    const p = getPrefix();
    let html = `<nav class="flex items-center gap-2 text-xs text-slate-400 py-3 font-mono">
      <a href="${p}index.html" class="hover:text-sky-400">Home</a>`;

    crumbs.forEach((crumb, idx) => {
      html += `<span>/</span>`;
      if (idx === crumbs.length - 1) {
        html += `<span class="text-sky-400 font-semibold">${crumb.label}</span>`;
      } else {
        html += `<a href="${crumb.url}" class="hover:text-sky-400">${crumb.label}</a>`;
      }
    });

    html += `</nav>`;
    container.innerHTML = html;
  };

  window.renderFooter = function() {
    const footerPlaceholder = document.getElementById('footer-container');
    if (!footerPlaceholder) return;

    const p = getPrefix();
    const info = (window.ACADEMIC_DATA && window.ACADEMIC_DATA.DEPARTMENT_INFO) || {};

    footerPlaceholder.innerHTML = `
      <footer class="mt-20 border-t border-slate-800/80 bg-slate-950/80 backdrop-blur-xl py-12 text-slate-400 text-sm">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8">
          
          <!-- Column 1: Institute Info -->
          <div class="space-y-3 md:col-span-1">
            <div class="flex items-center gap-2 font-bold text-slate-100 text-base">
              <span class="text-sky-400 font-black">SSASIT</span> Computer Engg.
            </div>
            <p class="text-xs text-slate-400 leading-relaxed">
              Third Year (5th Semester) Viva Preparation Portal.
              Grounded strictly in official GTU syllabus sheets and SSASIT departmental materials.
            </p>
            <div class="text-[11px] font-mono text-slate-400 pt-1">
              HOD: ${info.hod || 'Prof. Chirag R. Patel'}
            </div>
          </div>

          <!-- Column 2: Quick Links -->
          <div class="space-y-2">
            <div class="text-xs font-mono uppercase tracking-wider text-slate-300 font-semibold">Quick Study</div>
            <ul class="space-y-1.5 text-xs">
              <li><a href="${p}viva.html" class="hover:text-sky-400 transition-colors">⚡ Oral Viva Simulator</a></li>
              <li><a href="${p}subjects.html" class="hover:text-sky-400 transition-colors">📚 All 7 Semester Subjects</a></li>
              <li><a href="${p}revision.html" class="hover:text-sky-400 transition-colors">🚀 Rapid Revision & Formulas</a></li>
              <li><a href="${p}syllabus.html" class="hover:text-sky-400 transition-colors">📋 Official GTU Syllabus</a></li>
              <li><a href="${p}search.html" class="hover:text-sky-400 transition-colors">🔍 Global Question Search</a></li>
            </ul>
          </div>

          <!-- Column 3: Subjects -->
          <div class="space-y-2">
            <div class="text-xs font-mono uppercase tracking-wider text-slate-300 font-semibold">Subjects</div>
            <ul class="space-y-1 text-xs">
              <li><a href="${p}subjects/mpi.html" class="hover:text-sky-400">Microprocessor & Interfacing (MPI)</a></li>
              <li><a href="${p}subjects/cn.html" class="hover:text-sky-400">Computer Networks (CN)</a></li>
              <li><a href="${p}subjects/pds.html" class="hover:text-sky-400">Python for Data Science (PDS)</a></li>
              <li><a href="${p}subjects/ss.html" class="hover:text-sky-400">System Software (SS)</a></li>
              <li><a href="${p}subjects/wad.html" class="hover:text-sky-400">Web Application Dev (WAD)</a></li>
              <li><a href="${p}subjects/pm.html" class="hover:text-sky-400">Project Management (PM)</a></li>
              <li><a href="${p}subjects/internship.html" class="hover:text-sky-400">Societal Internship</a></li>
            </ul>
          </div>

          <!-- Column 4: Viva Instructions -->
          <div class="space-y-3">
            <div class="text-xs font-mono uppercase tracking-wider text-slate-300 font-semibold">Viva Mandatory Rules</div>
            <div class="text-xs space-y-1.5 text-slate-400 bg-slate-900/60 p-3 rounded-xl border border-slate-800">
              <div class="flex items-start gap-1.5">
                <span class="text-emerald-400">✓</span>
                <span>College Uniform & ID Card Compulsory</span>
              </div>
              <div class="flex items-start gap-1.5">
                <span class="text-emerald-400">✓</span>
                <span>Verified Practical File Index & Certificate</span>
              </div>
              <div class="flex items-start gap-1.5">
                <span class="text-emerald-400">✓</span>
                <span>Signed copy of Subject Assignments</span>
              </div>
              <div class="flex items-start gap-1.5">
                <span class="text-emerald-400">✓</span>
                <span>Reporting time: 9:00 AM sharp</span>
              </div>
            </div>
          </div>

        </div>

        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 pt-6 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400">
          <div>&copy; 2026 SSASIT Computer Engineering Department • Academic Year 2026</div>
          <div class="flex gap-4 mt-2 sm:mt-0 font-mono text-[11px]">
            <span>Press <kbd class="px-1 py-0.5 rounded bg-slate-900 border border-slate-800">/</kbd> to search</span>
            <span>Press <kbd class="px-1 py-0.5 rounded bg-slate-900 border border-slate-800">V</kbd> for Viva</span>
          </div>
        </div>
      </footer>
    `;
  };
})();
