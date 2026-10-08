# GTU Semester 5 Viva & Academic Preparation Portal

> **Department of Computer Engineering**  
> **Shree Swami Atmanand Saraswati Institute of Technology (SSASIT), Surat**  
> *Affiliated with Gujarat Technological University (GTU) • Academic Year 2026 • Class 31, 32, 33*

---

## 📖 Overview

The **SEM 5 VIVA Preparation Portal** is a production-grade, highly structured, responsive academic platform engineered to prepare students for their official GTU Semester 5 Term Work Submissions, Oral Viva Examinations, and Mid-Semester Exams.

Built with **HTML5, Tailwind CSS, and pure Vanilla JavaScript**, the platform contains **zero external framework bloat** (no React, Vue, Angular, or jQuery), loads instantaneously, works offline, and is 100% grounded in authentic departmental circulars, GTU curriculum sheets, faculty allocations, and subject question banks.

---

## 🏛️ Academic Context & Administration

- **Institute:** Shree Swami Atmanand Saraswati Institute of Technology (SSASIT), Surat
- **Department:** Computer Engineering
- **Head of Department (HOD):** Prof. Chirag R. Patel
- **Class Coordinators:**
  - **Class 31:** Prof. Dipali S. Masalia
  - **Class 32:** Prof. Mehul B. Patel
  - **Class 33:** Prof. Trupti R. Dilhiwala
- **Reporting Time:** 9:00 AM sharp for all viva & submission dates
- **Dress Code:** Formal College Uniform & Student Identity Card Compulsory

---

## 📅 Official Term Work & Viva Examination Schedule (AY 2026)

| Date & Day | Course Code | Subject Name | Evaluation Mode | Faculty In-Charge |
| :--- | :--- | :--- | :--- | :--- |
| **07/10/2026 (Wednesday)** | `BE05000011` | Societal Internship | Report Submission & Presentation | Faculty Mentor |
| **07/10/2026 (Wednesday)** | `BE05000481` | Project Management (PM) | MCQ Examination | Class Coordinator |
| **08/10/2026 (Thursday)** | `BE05000231` | Python for Data Science (PDS) | Oral Viva & MCQ Exam | Prof. Trupti R. Dilhiwala |
| **09/10/2026 (Friday)** | `BE05000281` | Web Application Development (WAD) | Oral Viva & MCQ Exam | Prof. Chirag R. Patel |
| **12/10/2026 (Monday)** | `BE05000551` | Microprocessor and Interfacing (MPI) | Oral Viva & MCQ Exam | Prof. Mehul B. Patel |
| **13/10/2026 (Tuesday)** | `BE05000261` | System Software (SS) | Oral Viva & MCQ Exam | Prof. Hardik N. Patel |
| **14/10/2026 (Wednesday)** | `BE05000171` | Computer Networks (CN) | Oral Viva & MCQ Exam | Prof. Dipali S. Masalia |

---

## 📚 Complete Semester 5 Courses Covered

1. **Microprocessor and Interfacing (MPI)** — `BE05000551` (5 Credits)
   - 8085 Microprocessor Architecture, Pinout & Signals, Bus Organization, Instruction Set & Addressing Modes, T-states & Machine Cycles, Interrupts, 8255 PPI & Peripheral Interfacing.
2. **Computer Networks (CN)** — `BE05000171` (5 Credits)
   - OSI & TCP/IP Reference Models, Physical Media, Data Link Layer & Framing, Flow & Error Control (Sliding Window, CRC), Network Layer (IPv4/IPv6, Subnetting, CIDR, Distance Vector & Link State Routing, Dijkstra), Transport Layer (TCP 3-Way Handshake, UDP, Congestion Control), Application Layer (DNS, HTTP, SMTP).
3. **Python for Data Science (PDS)** — `BE05000231` (4 Credits)
   - Python Fundamentals, NumPy Ndarrays & Vectorization, Pandas Series & DataFrames, Handling Missing Data, GroupBy & Pivot Tables, Matplotlib & Seaborn Visualizations, Exploratory Data Analysis (EDA).
4. **System Software (SS)** — `BE05000261` (4 Credits)
   - Language Processors & Translators, Two-Pass Assembler Architecture & Data Structures (OPTAB, SYMTAB, LITTAB, POOLTAB), Macro Processors & Macro Definition/Expansion Tables (MNT, MDT, ALA), Linkers & Loaders (Absolute, Relocatable, Direct Linking), Compilers & Lexical/Syntax Analysis (LEX, YACC).
5. **Web Application Development (WAD)** — `BE05000281` (5 Credits)
   - Semantic HTML5 & CSS3 Responsive Layouts, Client-side JavaScript & DOM Manipulation, Asynchronous Fetch API & JSON, Server-side PHP & Form Handling, MySQL Database Connectivity & Prepared Statements, State Management (Sessions vs Cookies), Modern Node.js & RESTful API architectures.
6. **Project Management (PM)** — `BE05000481` (3 Credits)
   - Project Life Cycle & Feasibility Studies, Work Breakdown Structure (WBS), Network Scheduling (CPM & PERT Calculations), Risk Management & Mitigation, Cost Estimation (COCOMO), Resource Allocation, Quality Assurance, Agile Scrum Framework.
7. **Societal Internship** — `BE05000011` (2 Credits)
   - Community Engagement, Social Problem Identification, 60-Hour Fieldwork Logbook, NGO/Government Organization Collaboration, Project Documentation, Sustainable Development Goals (SDGs) alignment.

---

## 🗂️ Platform Structure & Directory Tree

```
SEM5-VIVA/
├── index.html                   # Executive Dashboard & Mission Control
├── subjects.html                # Complete 7-Course Directory & GTU Matrix
├── syllabus.html                # GTU Syllabus Browser with Mid-Exam Tags
├── viva.html                    # Interactive Oral Viva Simulator (113+ Q&As)
├── search.html                  # Global Multi-Index Search Engine
├── revision.html                # Rapid Revision & Formula Cheat-Sheets
├── about.html                   # Department Regulations & Faculty Directory
│
├── subjects/                    # Dedicated Individual Course Portals
│   ├── mpi.html                 # Microprocessor & Interfacing Hub
│   ├── cn.html                  # Computer Networks Hub
│   ├── pds.html                 # Python for Data Science Hub
│   ├── ss.html                  # System Software Hub
│   ├── wad.html                 # Web Application Development Hub
│   ├── pm.html                  # Project Management Hub
│   └── internship.html          # Societal Internship Hub
│
├── css/
│   └── style.css                # Tech-Dark Design System & Print Styles
│
└── js/
    ├── data.js                  # Master Academic Database (313 KB, 113+ Q&As)
    ├── app.js                   # State, SpeechSynthesis, Favorites, Shortcuts
    ├── navigation.js            # Unified Topbar, Breadcrumbs & Footer
    ├── viva.js                  # Interactive Viva Filter Engine
    ├── search.js                # Instant Regex Search & <mark> Highlighter
    ├── revision.js              # Revision Cards & Clipboard Utility
    └── subject-page.js          # Dynamic Subject Course Renderer
```

---

## 🚀 Key Interactive Features

1. **Oral Viva Simulator (`viva.html`):**
   - Filter by subject, high-probability tags, and starred items.
   - 🎙️ **Speech Synthesis (Web Speech API):** Reads the question aloud in an examiner's cadence to practice oral listening comprehension.
   - 👁️ **Collapsible Model Answers:** Reveals structured, point-by-point answers, reference textbooks, and examiner tips.
   - 🎲 **Random Question Launcher:** Simulates real viva stress by picking questions at random across subjects.
2. **Instant Multi-Index Search (`search.html`):**
   - Real-time client-side search across all 113+ questions, 37 syllabus modules, practical manuals, and formulas with keyword highlighting (`<mark>`).
3. **Rapid Revision Hub (`revision.html`):**
   - Formula calculators, PERT/CPM equations, 8085 timing formulas, TCP handshake summaries, and clipboard copy buttons.
4. **Syllabus Explorer (`syllabus.html`):**
   - GTU teaching hours, percentage weightage, and clear badges indicating which units are included in the Mid-Semester examination.
5. **Global Keyboard Shortcuts:**
   - Press <kbd>/</kbd> anywhere to focus search.
   - Press <kbd>V</kbd> to open the Viva simulator.
   - Press <kbd>S</kbd> to open Subjects directory.
   - Press <kbd>R</kbd> to open Rapid Revision.
   - Press <kbd>H</kbd> to return to Home.

---

## 💻 How to Run Locally

Because this project is built using standard HTML5, CSS, and vanilla JavaScript without server dependencies, it can be hosted on any static file server or opened directly:

1. **Option 1: Using VS Code Live Server**
   - Right-click `index.html` and select **"Open with Live Server"**.
2. **Option 2: Using Node `npx serve`**
   ```bash
   npx serve .
   ```
3. **Option 3: Using Python HTTP server**
   ```bash
   python -m http.server 8080
   ```
   Open `http://localhost:8080` in your web browser.

---

*Designed and engineered with strict fidelity to Gujarat Technological University (GTU) academic standards and SSASIT Computer Engineering Department guidelines.*
