/**
 * AKSHAT DOKANIA - PORTFOLIO JAVASCRIPT
 * Handles typewriter effects, project filtering, modal dialogs,
 * clipboard tools, theme toggle, and interactive feedback.
 */

document.addEventListener('DOMContentLoaded', () => {
  initTypewriter();
  initThemeToggle();
  initMobileMenu();
  initProjectFilters();
  initModals();
  initClipboardActions();
  initContactForm();
  initScrollSpy();
});

/* ==========================================================================
   1. TYPEWRITER EFFECT
   ========================================================================== */
function initTypewriter() {
  const typewriterElement = document.getElementById('typewriter-text');
  if (!typewriterElement) return;

  const phrases = [
    '1st Year CS Student @ JECRC University',
    'Self-Taught Coder Since Covid-19 (2020)',
    'Hardware Tinkerer & Custom PC Builder',
    'Tech Enthusiast from Dhanbad & DPS Hirak',
    'Building Software from Silicon to Screen'
  ];

  let phraseIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 70;

  function type() {
    const currentPhrase = phrases[phraseIndex];

    if (isDeleting) {
      typewriterElement.textContent = currentPhrase.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = 35;
    } else {
      typewriterElement.textContent = currentPhrase.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 75;
    }

    if (!isDeleting && charIndex === currentPhrase.length) {
      // Pause at end of phrase
      typingSpeed = 2200;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      typingSpeed = 400;
    }

    setTimeout(type, typingSpeed);
  }

  type();
}

/* ==========================================================================
   2. THEME SWITCHER (Dark Neon / Light Prism)
   ========================================================================== */
function initThemeToggle() {
  const toggleBtn = document.getElementById('theme-toggle');
  if (!toggleBtn) return;

  const savedTheme = localStorage.getItem('theme') || 'dark';
  document.documentElement.setAttribute('data-theme', savedTheme);
  updateThemeIcon(savedTheme);

  toggleBtn.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';

    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
    showToast(`Switched to ${newTheme === 'light' ? 'Light Prism' : 'Dark Neon'} mode`);
  });
}

function updateThemeIcon(theme) {
  const toggleBtn = document.getElementById('theme-toggle');
  if (!toggleBtn) return;
  toggleBtn.innerHTML = theme === 'light' ? '🌙' : '☀️';
  toggleBtn.setAttribute('title', `Switch to ${theme === 'light' ? 'Dark' : 'Light'} Mode`);
}

/* ==========================================================================
   3. MOBILE NAVIGATION MENU
   ========================================================================== */
function initMobileMenu() {
  const menuToggle = document.getElementById('mobile-menu-toggle');
  const navLinks = document.getElementById('nav-links');

  if (!menuToggle || !navLinks) return;

  menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('mobile-active');
    const isOpen = navLinks.classList.contains('mobile-active');
    menuToggle.innerHTML = isOpen ? '✕' : '☰';
  });

  // Close when link clicked
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('mobile-active');
      menuToggle.innerHTML = '☰';
    });
  });
}

/* ==========================================================================
   4. PROJECT FILTERING
   ========================================================================== */
function initProjectFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filterValue === 'all' || category.includes(filterValue)) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 50);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(20px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 250);
        }
      });
    });
  });
}

/* ==========================================================================
   5. MODAL SYSTEM (Projects, Resume Preview, Certificates)
   ========================================================================== */
const projectData = {
  'covid-toolkit': {
    title: 'Covid-19 Pandemic Automation & Logic Suite',
    category: 'Python & Automation (2020 Awakening)',
    badge: 'Milestone Origin Project',
    desc: 'During the 2020 Covid-19 lockdown, this project marked the turning point of my programming journey. What started as exploring scripts turned into a comprehensive suite of utilities for file management, automated report generation, and solving algorithmic puzzles.',
    tags: ['Python 3', 'File I/O', 'Regex', 'Data Scripts', 'Algorithms'],
    highlights: [
      'Self-taught programming foundation built during lockdown from Dhanbad',
      'Automated repetitive school and computer file workflows',
      'Implemented foundational data parsing algorithms and interactive CLI menus',
      'Ignited the curiosity to dive deep into computer science at university level'
    ],
    github: 'https://github.com/akshatd0212-dev'
  },
  'hardware-rig': {
    title: 'Custom PC Architecture & Hardware Telemetry Hub',
    category: 'Hardware & Systems Engineering',
    badge: 'Hardware Hobby Craft',
    desc: 'Deep exploration into the physical layers of computing. Assembled and tuned high-performance personal computer architectures with custom component balancing, airflow analysis, thermal benchmarking, and system diagnosis.',
    tags: ['Hardware Architecture', 'Thermal Analysis', 'BIOS / UEFI', 'System Diagnostics', 'Overclocking'],
    highlights: [
      'Hands-on assembly, cable routing, and thermal paste application',
      'System stress testing using Cinebench, Prime95, and 3DMark benchmarks',
      'Troubleshooting RAM timings, XMP profiles, and VRM temperature dissipation',
      'Firm belief that great software engineers understand the hardware underneath'
    ],
    github: 'https://github.com/akshatd0212-dev'
  },
  'portfolio-app': {
    title: 'Interactive Developer Portfolio & Resume Engine',
    category: 'Modern Web Engineering',
    badge: 'Full Stack & UI/UX',
    desc: 'A responsive, high-performance portfolio featuring glassmorphism, dynamic typewriter mechanics, downloadable verified credentials, and interactive contact touchpoints designed for recruiters and tech enthusiasts.',
    tags: ['HTML5', 'CSS3 Variables', 'Modern Vanilla JS', 'Glassmorphism', 'Responsive UI'],
    highlights: [
      'Zero-dependency ultra fast loading with custom glowing aurora gradients',
      'Complete journey timeline connecting Dhanbad, DPS Hirak, and JECRC University',
      'Integrated PDF and HTML resume generation with one-click direct download',
      'Dynamic light and dark themes with localStorage persistence'
    ],
    github: 'https://github.com/akshatd0212-dev'
  },
  'dsa-hub': {
    title: 'JECRC Academic & Algorithmic Foundations Hub',
    category: 'Computer Science Core',
    badge: '1st Year University Project',
    desc: 'Curated repository of algorithmic problems, data structures (linked lists, stacks, queues, trees), and discrete computational mathematics written during my 1st year B.Tech coursework at JECRC University.',
    tags: ['C/C++', 'Data Structures', 'Algorithms', 'Time Complexity', 'JECRC University'],
    highlights: [
      'Implemented core linear and non-linear data structures from scratch',
      'Focused on memory management, pointer manipulation, and asymptotic analysis',
      'Active preparation for competitive programming and collegiate hackathons',
      'Collaborative code reviews with university peers'
    ],
    github: 'https://github.com/akshatd0212-dev'
  },
  'zip-tasks': {
    title: 'Programming Tasks & Code Labs (Uploaded Archive)',
    category: 'Coding Portfolio Tasks',
    badge: 'User Zip Archive Slot',
    desc: 'A dedicated showcase container for the collection of programming tasks, scripts, and mini-projects created throughout my self-learning journey.',
    tags: ['Zip Archive', 'Python', 'Web Labs', 'Experiments', 'Code Samples'],
    highlights: [
      'Ready to display unpacked tasks from the user zip archive',
      'Covers practical coding assignments, problem-solving scripts, and experiments',
      'Constantly updated as new university and personal projects are engineered'
    ],
    github: 'https://github.com/akshatd0212-dev'
  }
};

function initModals() {
  const modalOverlay = document.getElementById('main-modal');
  const modalCloseBtn = document.getElementById('modal-close-btn');
  const modalBody = document.getElementById('modal-body');

  if (!modalOverlay || !modalCloseBtn) return;

  function closeModal() {
    modalOverlay.classList.remove('active');
    setTimeout(() => {
      modalBody.innerHTML = '';
    }, 250);
  }

  modalCloseBtn.addEventListener('click', closeModal);
  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) closeModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalOverlay.classList.contains('active')) {
      closeModal();
    }
  });

  // Project detail click handlers
  document.querySelectorAll('.view-project-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const projectId = btn.getAttribute('data-project-id');
      const project = projectData[projectId];
      if (!project) return;

      modalBody.innerHTML = `
        <div style="margin-bottom: 12px;">
          <span class="section-tag" style="font-size: 11px; padding: 4px 10px;">${project.badge}</span>
        </div>
        <h2 style="font-size: 26px; font-weight: 800; margin-bottom: 8px;">${project.title}</h2>
        <p style="font-size: 13.5px; color: var(--cyan); font-weight: 600; margin-bottom: 16px;">${project.category}</p>
        <p style="color: var(--text-secondary); font-size: 15px; line-height: 1.7; margin-bottom: 20px;">${project.desc}</p>
        
        <h4 style="font-size: 15px; font-weight: 700; margin-bottom: 10px; color: var(--text-primary);">Key Highlights & Architecture:</h4>
        <ul style="padding-left: 20px; margin-bottom: 24px; color: var(--text-secondary); font-size: 14px; line-height: 1.8;">
          ${project.highlights.map(item => `<li>${item}</li>`).join('')}
        </ul>

        <h4 style="font-size: 15px; font-weight: 700; margin-bottom: 10px; color: var(--text-primary);">Technologies Employed:</h4>
        <div class="project-tech-tags" style="margin-bottom: 28px;">
          ${project.tags.map(tag => `<span class="tech-badge" style="font-size: 12px; padding: 4px 10px;">${tag}</span>`).join('')}
        </div>

        <div style="display: flex; gap: 12px; flex-wrap: wrap;">
          <a href="${project.github}" target="_blank" class="btn btn-primary btn-sm">
            <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
            View on GitHub
          </a>
          <button onclick="document.getElementById('modal-close-btn').click()" class="btn btn-secondary btn-sm">Close</button>
        </div>
      `;

      modalOverlay.classList.add('active');
    });
  });

  // Resume Preview Button
  const previewResumeBtn = document.getElementById('preview-resume-btn');
  if (previewResumeBtn) {
    previewResumeBtn.addEventListener('click', () => {
      modalBody.innerHTML = `
        <h3 style="font-size: 22px; font-weight: 800; margin-bottom: 8px;">Resume Preview</h3>
        <p style="color: var(--text-secondary); font-size: 13.5px; margin-bottom: 16px;">
          Akshat Dokania • JECRC University • Dhanbad
        </p>
        <div style="width: 100%; height: 500px; border-radius: 12px; overflow: hidden; border: 1px solid var(--border-subtle); margin-bottom: 20px;">
          <iframe src="assets/docs/Akshat_Dokania_Resume.html" style="width: 100%; height: 100%; border: none; background: white;"></iframe>
        </div>
        <div style="display: flex; gap: 12px;">
          <a href="assets/docs/Akshat_Dokania_Resume.pdf" download="Akshat_Dokania_Resume.pdf" class="btn btn-primary btn-sm">
            ⬇️ Download PDF
          </a>
          <a href="assets/docs/Akshat_Dokania_Resume.html" target="_blank" class="btn btn-secondary btn-sm">
            ↗️ Open Full Page
          </a>
        </div>
      `;
      modalOverlay.classList.add('active');
    });
  }

  // Certificate Modal Preview Buttons
  document.querySelectorAll('.view-cert-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const certTitle = btn.getAttribute('data-cert-title');
      const certFile = btn.getAttribute('data-cert-file');
      const certIssuer = btn.getAttribute('data-cert-issuer');

      modalBody.innerHTML = `
        <span class="section-tag" style="font-size: 11px;">Verified Credential</span>
        <h3 style="font-size: 22px; font-weight: 800; margin-top: 8px; margin-bottom: 6px;">${certTitle}</h3>
        <p style="color: var(--cyan); font-size: 14px; font-weight: 600; margin-bottom: 20px;">${certIssuer}</p>
        <div style="background: rgba(255,255,255,0.03); border: 1px solid var(--border-subtle); border-radius: 12px; padding: 24px; text-align: center; margin-bottom: 20px;">
          <div style="font-size: 40px; margin-bottom: 10px;">📜</div>
          <p style="font-size: 15px; font-weight: 700; margin-bottom: 6px;">Certificate for Akshat Dokania</p>
          <p style="font-size: 13px; color: var(--text-secondary); max-width: 450px; margin: 0 auto 16px auto;">
            Accreditation document verifying academic excellence and practical programming & hardware mastery.
          </p>
          <a href="assets/docs/${certFile}" download="${certFile}" class="btn btn-primary btn-sm">
            ⬇️ Download Certificate PDF
          </a>
        </div>
        <button onclick="document.getElementById('modal-close-btn').click()" class="btn btn-secondary btn-sm">Close</button>
      `;
      modalOverlay.classList.add('active');
    });
  });

  // Zip Upload Helper Modal
  const zipGuideBtn = document.getElementById('zip-guide-btn');
  if (zipGuideBtn) {
    zipGuideBtn.addEventListener('click', () => {
      modalBody.innerHTML = `
        <span class="section-tag" style="font-size: 11px;">Archive Integration</span>
        <h3 style="font-size: 24px; font-weight: 800; margin-top: 8px; margin-bottom: 8px;">Upload or Add Your Zip File Projects</h3>
        <p style="color: var(--text-secondary); font-size: 14px; line-height: 1.6; margin-bottom: 20px;">
          You can easily unpack or link your programming tasks from your zip archive into this portfolio.
        </p>

        <div style="background: rgba(255,255,255,0.03); border: 1px solid var(--border-subtle); border-radius: 12px; padding: 20px; margin-bottom: 16px;">
          <h4 style="font-size: 15px; font-weight: 700; color: var(--cyan); margin-bottom: 8px;">Option 1: Drop your Zip / Project Folder</h4>
          <p style="font-size: 13px; color: var(--text-secondary); line-height: 1.6;">
            Simply drop or extract your zip file into the workspace directory:<br>
            <code style="font-family: 'JetBrains Mono', monospace; background: rgba(0,0,0,0.3); padding: 3px 8px; border-radius: 4px; display: inline-block; margin-top: 5px;">f:/Akshat pc/Akshat/Code/AI BASED/projects/</code>
          </p>
        </div>

        <div style="background: rgba(255,255,255,0.03); border: 1px solid var(--border-subtle); border-radius: 12px; padding: 20px; margin-bottom: 20px;">
          <h4 style="font-size: 15px; font-weight: 700; color: var(--violet); margin-bottom: 8px;">Option 2: Push to GitHub</h4>
          <p style="font-size: 13px; color: var(--text-secondary); line-height: 1.6;">
            Push your tasks to your GitHub profile (<a href="https://github.com/akshatd0212-dev" target="_blank" style="color: var(--cyan);">@akshatd0212-dev</a>) and they can be linked directly to your interactive project cards!
          </p>
        </div>

        <button onclick="document.getElementById('modal-close-btn').click()" class="btn btn-primary btn-sm">Got it!</button>
      `;
      modalOverlay.classList.add('active');
    });
  }
}

/* ==========================================================================
   6. CLIPBOARD ACTIONS (Copy Phone & Email)
   ========================================================================== */
function initClipboardActions() {
  document.querySelectorAll('.copy-action-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const textToCopy = btn.getAttribute('data-copy-text');
      const label = btn.getAttribute('data-copy-label') || 'Information';

      if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(textToCopy).then(() => {
          showToast(`Copied ${label} to clipboard!`, 'success');
        }).catch(() => {
          fallbackCopy(textToCopy, label);
        });
      } else {
        fallbackCopy(textToCopy, label);
      }
    });
  });
}

function fallbackCopy(text, label) {
  const textArea = document.createElement('textarea');
  textArea.value = text;
  textArea.style.position = 'fixed';
  textArea.style.opacity = '0';
  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();
  try {
    document.execCommand('copy');
    showToast(`Copied ${label} to clipboard!`, 'success');
  } catch (err) {
    showToast(`Could not copy: ${text}`, 'error');
  }
  document.body.removeChild(textArea);
}

/* ==========================================================================
   7. CONTACT FORM HANDLER
   ========================================================================== */
function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const nameInput = document.getElementById('contact-name');
    const emailInput = document.getElementById('contact-email');
    const messageInput = document.getElementById('contact-message');

    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const message = messageInput.value.trim();

    if (!name || !email || !message) {
      showToast('Please fill out all fields before sending.', 'error');
      return;
    }

    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = 'Sending... ⏳';
    submitBtn.disabled = true;

    setTimeout(() => {
      submitBtn.innerHTML = originalText;
      submitBtn.disabled = false;
      form.reset();

      showToast(`Thank you, ${name}! Your message has been prepared for Akshat.`, 'success');

      // Also open pre-filled mailto as convenient direct communication
      const mailtoUrl = `mailto:akshatdokania@gmail.com?subject=Portfolio%20Inquiry%20from%20${encodeURIComponent(name)}&body=${encodeURIComponent(message + '\n\nFrom: ' + name + ' (' + email + ')')}`;
      
      const promptEmail = confirm(`Message recorded! Would you also like to open your email client to send it directly to Akshat?`);
      if (promptEmail) {
        window.location.href = mailtoUrl;
      }
    }, 900);
  });
}

/* ==========================================================================
   8. TOAST NOTIFICATION UTILITY
   ========================================================================== */
function showToast(message, type = 'info') {
  let toastContainer = document.getElementById('toast-container');
  if (!toastContainer) {
    toastContainer = document.createElement('div');
    toastContainer.id = 'toast-container';
    toastContainer.className = 'toast-container';
    document.body.appendChild(toastContainer);
  }

  const toast = document.createElement('div');
  toast.className = `toast ${type === 'success' ? 'toast-success' : ''}`;
  
  const icon = type === 'success' ? '✅' : 'ℹ️';
  toast.innerHTML = `<span>${icon}</span> <span>${message}</span>`;

  toastContainer.appendChild(toast);

  // Trigger animation
  setTimeout(() => toast.classList.add('show'), 20);

  // Auto remove
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 400);
  }, 3500);
}

/* ==========================================================================
   9. SCROLL SPY FOR NAVIGATION
   ========================================================================== */
function initScrollSpy() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    let current = '';
    const scrollPos = window.pageYOffset || document.documentElement.scrollTop;

    sections.forEach(section => {
      const sectionTop = section.offsetTop - 150;
      const sectionHeight = section.offsetHeight;
      if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });
}
