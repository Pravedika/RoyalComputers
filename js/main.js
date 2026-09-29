document.addEventListener('DOMContentLoaded', () => {
  // Initialize UI features
  initLoader();
  initCustomCursor();
  initStickyHeader();
  initMobileMenu();
  initScrollAnimations();
  initInquiryModal();
  initHoverEffects();
});

/* ==========================================
   GLOBAL LOADING SCREEN
   ========================================== */
function initLoader() {
  const loader = document.querySelector('.loader-wrapper');
  if (!loader) return;

  // Fade out loader after content is ready
  window.addEventListener('load', () => {
    fadeOutLoader(loader);
  });

  // Fallback in case load event takes too long
  setTimeout(() => {
    if (!loader.classList.contains('fade-out')) {
      fadeOutLoader(loader);
    }
  }, 2500);
}

function fadeOutLoader(loader) {
  loader.classList.add('fade-out');
  document.body.classList.remove('no-scroll');
}

/* ==========================================
   CUSTOM CURSOR WITH INTERPOLATION (LERP)
   ========================================== */
function initCustomCursor() {
  const dot = document.querySelector('.custom-cursor-dot');
  const circle = document.querySelector('.custom-cursor-circle');
  
  if (!dot || !circle) return;

  let mouseX = 0, mouseY = 0; // Mouse coords
  let circleX = 0, circleY = 0; // Circle coords (lagging)
  
  // Track mouse coordinates
  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    
    // Position dot immediately
    dot.style.left = `${mouseX}px`;
    dot.style.top = `${mouseY}px`;
  });

  // LERP logic for the outer circle
  const tick = () => {
    // Circle follows mouse with 0.15 interpolation factor
    circleX += (mouseX - circleX) * 0.15;
    circleY += (mouseY - circleY) * 0.15;
    
    circle.style.left = `${circleX}px`;
    circle.style.top = `${circleY}px`;
    
    requestAnimationFrame(tick);
  };
  
  tick();

  // Handle cursor visibility
  document.addEventListener('mouseenter', () => {
    dot.style.opacity = '1';
    circle.style.opacity = '1';
  });

  document.addEventListener('mouseleave', () => {
    dot.style.opacity = '0';
    circle.style.opacity = '0';
  });
}

/* ==========================================
   HOVER EFFECTS (CURSOR SCALING)
   ========================================== */
function initHoverEffects() {
  const hoverables = document.querySelectorAll('a, button, .btn, .interactive-card, .service-card, .product-card, input, select, textarea, .hamburger, .modal-close');
  
  hoverables.forEach(el => {
    el.addEventListener('mouseenter', () => {
      document.body.classList.add('hovering-link');
    });
    el.addEventListener('mouseleave', () => {
      document.body.classList.remove('hovering-link');
    });
  });
}

// Re-run hover effects after dynamic DOM changes
window.refreshHoverEffects = initHoverEffects;

/* ==========================================
   STICKY HEADER
   ========================================== */
function initStickyHeader() {
  const header = document.querySelector('.header-nav');
  if (!header) return;

  const checkScroll = () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', checkScroll);
  checkScroll(); // Run once on load
}

/* ==========================================
   MOBILE MENU
   ========================================== */
function initMobileMenu() {
  const hamburger = document.querySelector('.hamburger');
  const navMenu = document.querySelector('.nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (!hamburger || !navMenu) return;

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('open');
    document.body.classList.toggle('no-scroll');
  });

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      navMenu.classList.remove('open');
      document.body.classList.remove('no-scroll');
    });
  });
}

/* ==========================================
   SCROLL REVEAL ANIMATIONS
   ========================================== */
function initScrollAnimations() {
  const reveals = document.querySelectorAll('.reveal');
  
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          observer.unobserve(entry.target); // Animates only once
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -40px 0px'
    });

    reveals.forEach(reveal => {
      observer.observe(reveal);
    });
  } else {
    // Fallback
    reveals.forEach(reveal => {
      reveal.classList.add('active');
    });
  }
}

/* ==========================================
   GLOBAL QUICK INQUIRY MODAL & WHATSAPP
   ========================================== */
function initInquiryModal() {
  const modal = document.getElementById('inquiryModal');
  const closeBtn = document.querySelector('.modal-close');
  const overlay = document.getElementById('inquiryModal');
  const form = document.getElementById('modalInquiryForm');
  
  if (!modal) return;

  // Close handlers
  if (closeBtn) {
    closeBtn.addEventListener('click', () => closeInquiryModal());
  }

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeInquiryModal();
    }
  });

  // Handle Form Submission
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const name = document.getElementById('modalName').value.trim();
      const phone = document.getElementById('modalPhone').value.trim();
      const email = document.getElementById('modalEmail').value.trim();
      const service = document.getElementById('modalServiceSelect').value;
      const message = document.getElementById('modalMessage').value.trim();
      
      if (!name || !phone || !email || !message) {
        showGlobalNotification('Please fill in all fields.', 'error');
        return;
      }
      
      // Simulate Email Inquiry Success
      showGlobalNotification('Inquiry submitted successfully! We will contact you shortly.', 'success');
      form.reset();
      setTimeout(() => {
        closeInquiryModal();
      }, 1000);
    });
  }

  // Setup WhatsApp redirect trigger
  const waBtn = document.getElementById('modalWhatsAppBtn');
  if (waBtn && form) {
    waBtn.addEventListener('click', () => {
      const name = document.getElementById('modalName').value.trim();
      const phone = document.getElementById('modalPhone').value.trim();
      const email = document.getElementById('modalEmail').value.trim();
      const service = document.getElementById('modalServiceSelect').value;
      const message = document.getElementById('modalMessage').value.trim();
      
      if (!name || !phone) {
        showGlobalNotification('Please enter your Name and Phone first.', 'error');
        return;
      }

      // Build WhatsApp URL
      const whatsappNumber = '919999999999'; // Royal Computers support number (change as needed)
      const text = `*Inquiry from Royal Computers Website*\n\n` +
                   `*Name:* ${name}\n` +
                   `*Phone:* ${phone}\n` +
                   `*Email:* ${email || 'N/A'}\n` +
                   `*Subject:* ${service}\n` +
                   `*Message:* ${message}`;
      
      const waUrl = `https://api.whatsapp.com/send?phone=${whatsappNumber}&text=${encodeURIComponent(text)}`;
      window.open(waUrl, '_blank');
      closeInquiryModal();
    });
  }

  // Bind globals
  window.openInquiryModal = openInquiryModal;
  window.closeInquiryModal = closeInquiryModal;
}

function openInquiryModal(type = 'General Inquiry', name = '') {
  const modal = document.getElementById('inquiryModal');
  const serviceSelect = document.getElementById('modalServiceSelect');
  const messageInput = document.getElementById('modalMessage');
  
  if (!modal) return;
  
  // Set values
  if (serviceSelect && type) {
    let found = false;
    for (let i = 0; i < serviceSelect.options.length; i++) {
      if (serviceSelect.options[i].value.toLowerCase() === type.toLowerCase() || 
          serviceSelect.options[i].text.toLowerCase() === type.toLowerCase()) {
        serviceSelect.selectedIndex = i;
        found = true;
        break;
      }
    }
    if (!found) {
      serviceSelect.value = 'General Inquiry';
    }
  }
  
  if (messageInput) {
    if (name) {
      messageInput.value = `Hello Royal Computers, I would like to inquire about: "${name}". Please provide details on pricing and availability.`;
    } else {
      messageInput.value = '';
    }
  }
  
  modal.classList.add('open');
  document.body.classList.add('no-scroll');
}

function closeInquiryModal() {
  const modal = document.getElementById('inquiryModal');
  if (!modal) return;
  
  modal.classList.remove('open');
  document.body.classList.remove('no-scroll');
}

/* ==========================================
   GLOBAL NOTIFICATIONS
   ========================================== */
function showGlobalNotification(message, type = 'success') {
  const notification = document.createElement('div');
  notification.className = 'global-notification';
  
  const icon = type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle';
  const color = type === 'success' ? 'var(--gold-accent)' : '#ff3333';
  const border = type === 'success' ? 'var(--gold-primary)' : '#ff3333';
  
  notification.innerHTML = `
    <div style="background-color: var(--bg-dark); border: 1px solid ${border}; border-left: 4px solid ${color}; padding: 14px 28px; position: fixed; bottom: 30px; right: 30px; z-index: 2000; font-family: var(--font-subheading); font-weight: 500; font-size: 0.9rem; letter-spacing: 0.5px; box-shadow: 0 15px 35px rgba(0,0,0,0.6); display: flex; align-items: center; gap: 12px; animation: slideInUp 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards; color: #fff;">
      <i class="fas ${icon}" style="color: ${color}; font-size: 1.1rem;"></i>
      <span>${message}</span>
    </div>
  `;
  
  document.body.appendChild(notification);
  
  // Custom CSS keyframes injected if not exists
  if (!document.getElementById('notifKeyframes')) {
    const style = document.createElement('style');
    style.id = 'notifKeyframes';
    style.innerHTML = `
      @keyframes slideInUp {
        0% { transform: translateY(100px); opacity: 0; }
        100% { transform: translateY(0); opacity: 1; }
      }
      @keyframes fadeOutDown {
        0% { transform: translateY(0); opacity: 1; }
        100% { transform: translateY(50px); opacity: 0; }
      }
    `;
    document.head.appendChild(style);
  }

  setTimeout(() => {
    notification.firstElementChild.style.animation = 'fadeOutDown 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards';
    setTimeout(() => {
      notification.remove();
    }, 300);
  }, 4000);
}

// Bind to window for other scripts to use
window.showGlobalNotification = showGlobalNotification;
