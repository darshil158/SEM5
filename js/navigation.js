/**
 * SEM 5 VIVA PLATFORM — Unified Navigation Component
 * Header Topbar, Light/Dark Theme Toggle, Responsive Mobile Drawer, Breadcrumbs, and Footer
 */

(function() {
  function getPrefix() {
    return window.location.pathname.includes('/subjects/') ? '../' : '';
  }

  window.renderNavbar = function(activePage = '') {
    const p = getPrefix();
    const navPlaceholder = document.getElementById('navbar-container');
    if (!navPlaceholder) return;

    // Ensure the placeholder reserves the 64px (h-16) height in document flow
    navPlaceholder.className = 'h-16 block shrink-0';

    const navHTML = `
      <header id="main-navbar" class="fixed top-0 left-0 right-0 w-full z-50 glass-panel border-b border-slate-800/80 backdrop-blur-xl transition-all duration-200">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-2">
          
          <!-- Brand Logo -->
          <a href="${p}index.html" class="flex items-center gap-2.5 sm:gap-3 group shrink-0" aria-label="SEM 5 Viva Home">
            <div class="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-sky-500 to-emerald-400 p-[1.5px] shadow-lg shadow-indigo-500/20 group-hover:shadow-indigo-500/40 transition-all">
              <div class="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center font-black text-xs sm:text-sm tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-indigo-300">
                S5
              </div>
            </div>
            <div>
              <div class="font-bold text-slate-100 tracking-tight leading-none text-sm sm:text-base group-hover:text-sky-400 transition-colors">
                SEM 5 <span class="text-sky-400 font-extrabold">VIVA</span>
              </div>
              <div class="text-[9px] sm:text-[10px] font-mono uppercase tracking-wider text-slate-400">SSASIT • Computer Engg</div>
            </div>
          </a>

          <!-- Desktop Navigation Links -->
          <nav class="hidden lg:flex items-center gap-1 text-sm font-medium">
            <a href="${p}index.html" class="px-3 py-1.5 rounded-lg transition-all ${activePage === 'home' ? 'text-sky-400 bg-sky-950/40 border border-sky-800/50 font-bold' : 'text-slate-300 hover:text-white hover:bg-slate-800/50'}">Home</a>
            <a href="${p}subjects.html" class="px-3 py-1.5 rounded-lg transition-all ${activePage === 'subjects' ? 'text-sky-400 bg-sky-950/40 border border-sky-800/50 font-bold' : 'text-slate-300 hover:text-white hover:bg-slate-800/50'}">Subjects</a>
            <a href="${p}syllabus.html" class="px-3 py-1.5 rounded-lg transition-all ${activePage === 'syllabus' ? 'text-sky-400 bg-sky-950/40 border border-sky-800/50 font-bold' : 'text-slate-300 hover:text-white hover:bg-slate-800/50'}">Syllabus</a>
            <a href="${p}viva.html" class="px-3.5 py-1.5 rounded-lg transition-all font-semibold ${activePage === 'viva' ? 'text-white bg-gradient-to-r from-indigo-600 to-sky-600 shadow-lg shadow-indigo-500/25' : 'text-sky-300 bg-sky-500/10 hover:bg-sky-500/20 border border-sky-500/30'}">⚡ Viva Prep</a>
            <a href="${p}revision.html" class="px-3 py-1.5 rounded-lg transition-all ${activePage === 'revision' ? 'text-sky-400 bg-sky-950/40 border border-sky-800/50 font-bold' : 'text-slate-300 hover:text-white hover:bg-slate-800/50'}">Rapid Revision</a>
            <a href="${p}about.html" class="px-3 py-1.5 rounded-lg transition-all ${activePage === 'about' ? 'text-sky-400 bg-sky-950/40 border border-sky-800/50 font-bold' : 'text-slate-300 hover:text-white hover:bg-slate-800/50'}">Guidelines</a>
          </nav>

          <!-- Search, Theme Toggle & Mobile Menu -->
          <div class="flex items-center gap-1.5 sm:gap-2">
            
            <!-- Global Search Button -->
            <a href="${p}search.html" class="flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-700/80 hover:border-sky-500/50 text-slate-300 hover:text-white text-xs font-mono transition-all group" aria-label="Global Question Search">
              <span class="text-sm">🔍</span>
              <span class="hidden sm:inline">Search</span>
              <kbd class="hidden sm:inline px-1.5 py-0.5 rounded bg-slate-800 border border-slate-700 text-[10px] text-slate-400">/</kbd>
            </a>

            <!-- Light/Dark Mode Navbar Toggle Button (Desktop & Tablet) -->
            <button id="theme-toggle-desktop" class="theme-toggle-btn w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-slate-900 border border-slate-700/80 hover:border-sky-500/50 text-slate-300 hover:text-white transition-all flex items-center justify-center relative group focus:outline-none focus:ring-2 focus:ring-sky-500/50" aria-label="Switch between light and dark themes" title="Toggle Theme (Press T)">
              <span class="theme-icon-sun hidden text-amber-500 text-lg transition-transform duration-300 group-hover:rotate-45">☀️</span>
              <span class="theme-icon-moon text-sky-400 text-lg transition-transform duration-300 group-hover:-rotate-12">🌙</span>
            </button>

            <!-- Mobile Hamburger Menu Button -->
            <button id="mobile-menu-btn" class="lg:hidden w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white flex items-center justify-center text-lg focus:outline-none focus:ring-2 focus:ring-sky-500/50" aria-label="Toggle Mobile Navigation" aria-expanded="false" aria-controls="mobile-drawer">
              <span id="menu-icon-bar">☰</span>
            </button>
          </div>

        </div>

        <!-- Mobile Drawer -->
        <div id="mobile-drawer" class="hidden lg:hidden px-4 pt-2 pb-5 space-y-2 bg-slate-950/95 border-b border-slate-800 backdrop-blur-2xl transition-all duration-300 max-h-[calc(100vh-4.5rem)] overflow-y-auto">
          <nav class="space-y-1 font-medium text-sm">
            <a href="${p}index.html" class="mobile-nav-link flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-slate-300 hover:bg-slate-800/80 transition-colors ${activePage === 'home' ? 'text-sky-400 font-bold bg-slate-900 border border-sky-800/40' : ''}">
              <span>🏠</span><span>Home</span>
            </a>
            <a href="${p}subjects.html" class="mobile-nav-link flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-slate-300 hover:bg-slate-800/80 transition-colors ${activePage === 'subjects' ? 'text-sky-400 font-bold bg-slate-900 border border-sky-800/40' : ''}">
              <span>📚</span><span>All 7 Subjects</span>
            </a>
            <a href="${p}syllabus.html" class="mobile-nav-link flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-slate-300 hover:bg-slate-800/80 transition-colors ${activePage === 'syllabus' ? 'text-sky-400 font-bold bg-slate-900 border border-sky-800/40' : ''}">
              <span>📋</span><span>Syllabus Browser</span>
            </a>
            <a href="${p}viva.html" class="mobile-nav-link flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-sky-400 font-bold bg-sky-950/40 border border-sky-800/60 shadow-sm transition-colors">
              <span>⚡</span><span>Oral Viva Simulator (650+ Q&As)</span>
            </a>
            <a href="${p}revision.html" class="mobile-nav-link flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-slate-300 hover:bg-slate-800/80 transition-colors ${activePage === 'revision' ? 'text-sky-400 font-bold bg-slate-900 border border-sky-800/40' : ''}">
              <span>🚀</span><span>Rapid Revision & Formulas</span>
            </a>
            <a href="${p}about.html" class="mobile-nav-link flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-slate-300 hover:bg-slate-800/80 transition-colors ${activePage === 'about' ? 'text-sky-400 font-bold bg-slate-900 border border-sky-800/40' : ''}">
              <span>ℹ️</span><span>Timetable & Guidelines</span>
            </a>
            <a href="${p}search.html" class="mobile-nav-link flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-slate-300 hover:bg-slate-800/80 transition-colors ${activePage === 'search' ? 'text-sky-400 font-bold bg-slate-900 border border-sky-800/40' : ''}">
              <span>🔍</span><span>Global Search</span>
            </a>
          </nav>

          <!-- Mobile Theme Toggle Selector -->
          <div class="pt-3 border-t border-slate-800/80 flex items-center justify-between px-2 py-1">
            <span class="text-xs font-mono text-slate-400">Appearance</span>
            <button id="theme-toggle-mobile" class="theme-toggle-btn px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700/80 text-xs font-mono flex items-center gap-2 text-slate-300 hover:text-white transition-all" aria-label="Toggle Theme">
              <span class="theme-icon-sun hidden text-amber-500">☀️</span>
              <span class="theme-icon-moon text-sky-400">🌙</span>
              <span class="theme-label">Dark Mode</span>
            </button>
          </div>
        </div>
      </header>
    `;

    navPlaceholder.innerHTML = navHTML;

    // Attach Theme Toggle Click Handlers
    const deskToggle = document.getElementById('theme-toggle-desktop');
    const mobToggle = document.getElementById('theme-toggle-mobile');
    
    if (deskToggle) {
      deskToggle.addEventListener('click', () => {
        if (window.Theme) window.Theme.toggleTheme();
      });
    }
    if (mobToggle) {
      mobToggle.addEventListener('click', () => {
        if (window.Theme) window.Theme.toggleTheme();
      });
    }

    // Dynamic Scroll Elevation Handler
    const mainNav = document.getElementById('main-navbar');
    if (mainNav) {
      const handleScroll = () => {
        if (window.scrollY > 10) {
          mainNav.classList.add('navbar-scrolled');
        } else {
          mainNav.classList.remove('navbar-scrolled');
        }
      };
      window.addEventListener('scroll', handleScroll, { passive: true });
      handleScroll();
    }

    // Mobile Hamburger Toggle Behavior
    const mobileBtn = document.getElementById('mobile-menu-btn');
    const mobileDrawer = document.getElementById('mobile-drawer');
    const menuIcon = document.getElementById('menu-icon-bar');

    if (mobileBtn && mobileDrawer) {
      mobileBtn.addEventListener('click', () => {
        const isClosed = mobileDrawer.classList.contains('hidden');
        if (isClosed) {
          mobileDrawer.classList.remove('hidden');
          mobileBtn.setAttribute('aria-expanded', 'true');
          if (menuIcon) menuIcon.textContent = '✕';
        } else {
          mobileDrawer.classList.add('hidden');
          mobileBtn.setAttribute('aria-expanded', 'false');
          if (menuIcon) menuIcon.textContent = '☰';
        }
      });

      // Auto-close drawer when clicking any navigation link inside
      mobileDrawer.querySelectorAll('.mobile-nav-link').forEach(link => {
        link.addEventListener('click', () => {
          mobileDrawer.classList.add('hidden');
          mobileBtn.setAttribute('aria-expanded', 'false');
          if (menuIcon) menuIcon.textContent = '☰';
        });
      });
    }

    // Sync button visual state with current theme
    if (window.Theme) {
      window.Theme.updateToggleButtons(document.documentElement.classList.contains('dark'));
    }
  };

  window.renderBreadcrumbs = function(crumbs = []) {
    const container = document.getElementById('breadcrumbs-container');
    if (!container || crumbs.length === 0) return;

    const p = getPrefix();
    let html = `
      <nav class="flex items-center gap-2 text-xs text-slate-400 py-3 font-mono overflow-x-auto whitespace-nowrap scrollbar-none" aria-label="Breadcrumb">
        <a href="${p}index.html" class="hover:text-sky-400 transition-colors">Home</a>
    `;

    crumbs.forEach((crumb, idx) => {
      html += `<span class="text-slate-600">/</span>`;
      if (idx === crumbs.length - 1) {
        html += `<span class="text-sky-400 font-semibold" aria-current="page">${crumb.label}</span>`;
      } else {
        html += `<a href="${crumb.url}" class="hover:text-sky-400 transition-colors">${crumb.label}</a>`;
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
      <footer class="mt-20 border-t border-slate-800/80 bg-slate-950/80 backdrop-blur-xl py-12 text-slate-400 text-sm transition-colors duration-200">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          
          <!-- Column 1: Institute Info -->
          <div class="space-y-3 sm:col-span-2 md:col-span-1">
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
              <li><a href="${p}viva.html" class="hover:text-sky-400 transition-colors">⚡ Oral Viva Simulator (650+ Q&As)</a></li>
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
              <li><a href="${p}subjects/mpi.html" class="hover:text-sky-400 transition-colors">Microprocessor & Interfacing (MPI)</a></li>
              <li><a href="${p}subjects/cn.html" class="hover:text-sky-400 transition-colors">Computer Networks (CN)</a></li>
              <li><a href="${p}subjects/pds.html" class="hover:text-sky-400 transition-colors">Python for Data Science (PDS)</a></li>
              <li><a href="${p}subjects/ss.html" class="hover:text-sky-400 transition-colors">System Software (SS)</a></li>
              <li><a href="${p}subjects/wad.html" class="hover:text-sky-400 transition-colors">Web Application Dev (WAD)</a></li>
              <li><a href="${p}subjects/pm.html" class="hover:text-sky-400 transition-colors">Project Management (PM)</a></li>
              <li><a href="${p}subjects/internship.html" class="hover:text-sky-400 transition-colors">Societal Internship</a></li>
            </ul>
          </div>

          <!-- Column 4: Viva Instructions -->
          <div class="space-y-3 sm:col-span-2 md:col-span-1">
            <div class="text-xs font-mono uppercase tracking-wider text-slate-300 font-semibold">Viva Mandatory Rules</div>
            <div class="text-xs space-y-1.5 text-slate-400 bg-slate-900/60 p-3.5 rounded-xl border border-slate-800">
              <div class="flex items-start gap-1.5">
                <span class="text-emerald-400 shrink-0">✓</span>
                <span>College Uniform & ID Card Compulsory</span>
              </div>
              <div class="flex items-start gap-1.5">
                <span class="text-emerald-400 shrink-0">✓</span>
                <span>Verified Practical File Index & Certificate</span>
              </div>
              <div class="flex items-start gap-1.5">
                <span class="text-emerald-400 shrink-0">✓</span>
                <span>Signed copy of Subject Assignments</span>
              </div>
              <div class="flex items-start gap-1.5">
                <span class="text-emerald-400 shrink-0">✓</span>
                <span>Reporting time: 9:00 AM sharp</span>
              </div>
            </div>
          </div>

        </div>

        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 pt-6 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-3">
          <div>&copy; 2026 SSASIT Computer Engineering Department • Academic Year 2026</div>
          <div class="flex flex-wrap items-center gap-3 font-mono text-[11px]">
            <span>Press <kbd class="px-1.5 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-300">T</kbd> for Theme</span>
            <span>Press <kbd class="px-1.5 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-300">/</kbd> to search</span>
            <span>Press <kbd class="px-1.5 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-300">V</kbd> for Viva</span>
          </div>
        </div>
      </footer>
    `;
  };
})();
