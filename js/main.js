/**
 * AKSHAT DOKANIA - PORTFOLIO JAVASCRIPT
 * Streamlined & honest logic: typewriter effect, theme toggle,
 * zip archive info modal, clipboard copy tools, and contact form.
 */

document.addEventListener('DOMContentLoaded', () => {
  initTypewriter();
  initThemeToggle();
  initMobileMenu();
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
    '1st Year Student @ JECRC University',
    'Passionate Coder Since Covid-19',
    'Tech & Hardware Enthusiast',
    'Dhanbad Native • DPS Hirak Alum'
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
    showToast(`Switched to ${newTheme === 'light' ? 'Light' : 'Dark'} mode`);
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

  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('mobile-active');
      menuToggle.innerHTML = '☰';
    });
  });
}

/* ==========================================================================
   4. MODALS (Zip Archive Details, Resume Preview, Certificates)
   ========================================================================== */
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

  // Zip Archive Info Modal
  const zipInfoBtns = document.querySelectorAll('.view-zip-info-btn');
  zipInfoBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      modalBody.innerHTML = `
        <span class="section-tag" style="font-size: 11px;">Archive Status</span>
        <h3 style="font-size: 22px; font-weight: 800; margin-top: 8px; margin-bottom: 8px;">Programming Tasks (Zip File)</h3>
        <p style="color: var(--text-secondary); font-size: 14.5px; line-height: 1.7; margin-bottom: 20px;">
          Contains tasks, code exercises, and scripts created during self-learning since the Covid-19 pandemic.
        </p>
        <div style="background: rgba(255,255,255,0.03); border: 1px solid var(--border-subtle); border-radius: 12px; padding: 20px; margin-bottom: 20px;">
          <h4 style="font-size: 15px; font-weight: 700; color: var(--cyan); margin-bottom: 6px;">📂 Upload Status</h4>
          <p style="font-size: 13.5px; color: var(--text-secondary); line-height: 1.6;">
            The zip file can be provided / placed in the workspace anytime. As soon as you upload or extract it, the individual tasks will be unpacked and showcased here!
          </p>
        </div>
        <div style="display: flex; gap: 12px; flex-wrap: wrap;">
          <a href="https://github.com/akshatd0212-dev" target="_blank" class="btn btn-primary btn-sm">
            Visit GitHub Profile ↗
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
          Akshat Dokania • 1st Year B.Tech @ JECRC University • Dhanbad
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

      modalBody.innerHTML = `
        <span class="section-tag" style="font-size: 11px;">Credential</span>
        <h3 style="font-size: 22px; font-weight: 800; margin-top: 8px; margin-bottom: 6px;">${certTitle}</h3>
        <p style="color: var(--cyan); font-size: 14px; font-weight: 600; margin-bottom: 20px;">Akshat Dokania</p>
        <div style="background: rgba(255,255,255,0.03); border: 1px solid var(--border-subtle); border-radius: 12px; padding: 24px; text-align: center; margin-bottom: 20px;">
          <div style="font-size: 40px; margin-bottom: 10px;">📜</div>
          <p style="font-size: 14.5px; color: var(--text-secondary); max-width: 450px; margin: 0 auto 16px auto;">
            Document for <strong>${certTitle}</strong>.
          </p>
          <a href="assets/docs/${certFile}" download="${certFile}" class="btn btn-primary btn-sm">
            ⬇️ Download File
          </a>
        </div>
        <button onclick="document.getElementById('modal-close-btn').click()" class="btn btn-secondary btn-sm">Close</button>
      `;
      modalOverlay.classList.add('active');
    });
  });
}

/* ==========================================================================
   5. CLIPBOARD ACTIONS (Copy Phone & Email)
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
   6. CONTACT FORM HANDLER
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

      const mailtoUrl = `mailto:akshatdokania@gmail.com?subject=Portfolio%20Message%20from%20${encodeURIComponent(name)}&body=${encodeURIComponent(message + '\n\nFrom: ' + name + ' (' + email + ')')}`;
      
      const promptEmail = confirm(`Message recorded! Would you also like to open your email app to send it directly to Akshat?`);
      if (promptEmail) {
        window.location.href = mailtoUrl;
      }
    }, 800);
  });
}

/* ==========================================================================
   7. TOAST NOTIFICATION UTILITY
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

  setTimeout(() => toast.classList.add('show'), 20);

  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 400);
  }, 3500);
}

/* ==========================================================================
   8. SCROLL SPY FOR NAVIGATION
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
