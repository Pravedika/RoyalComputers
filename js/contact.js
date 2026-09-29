document.addEventListener('DOMContentLoaded', () => {
  initContactForm();
});

/* ==========================================
   CONTACT FORM SUBMISSIONS
   ========================================== */
function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  // Handle standard email form submit
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('contactName').value.trim();
    const phone = document.getElementById('contactPhone').value.trim();
    const email = document.getElementById('contactEmail').value.trim();
    const service = document.getElementById('contactService').value;
    const message = document.getElementById('contactMessage').value.trim();

    if (!name || !phone || !email || !message) {
      if (typeof window.showGlobalNotification === 'function') {
        window.showGlobalNotification('Please fill out all required fields.', 'error');
      } else {
        alert('Please fill out all required fields.');
      }
      return;
    }

    // Success response simulation
    if (typeof window.showGlobalNotification === 'function') {
      window.showGlobalNotification('Thank you! Your message has been sent successfully.', 'success');
    } else {
      alert('Thank you! Your message has been sent successfully.');
    }

    form.reset();
  });

  // Handle WhatsApp click
  const waBtn = document.getElementById('contactWhatsAppBtn');
  if (waBtn) {
    waBtn.addEventListener('click', () => {
      const name = document.getElementById('contactName').value.trim();
      const phone = document.getElementById('contactPhone').value.trim();
      const email = document.getElementById('contactEmail').value.trim();
      const service = document.getElementById('contactService').value;
      const message = document.getElementById('contactMessage').value.trim();

      if (!name || !phone) {
        if (typeof window.showGlobalNotification === 'function') {
          window.showGlobalNotification('Please fill in your Name and Phone first.', 'error');
        } else {
          alert('Please fill in your Name and Phone first.');
        }
        return;
      }

      // Compile WhatsApp details
      const whatsappNumber = '919999999999'; // Royal Computers support line
      const text = `*Inquiry from Royal Computers Website*\n\n` +
                   `*Name:* ${name}\n` +
                   `*Phone:* ${phone}\n` +
                   `*Email:* ${email || 'N/A'}\n` +
                   `*Service Required:* ${service}\n` +
                   `*Message:* ${message}`;

      const waUrl = `https://api.whatsapp.com/send?phone=${whatsappNumber}&text=${encodeURIComponent(text)}`;
      
      if (typeof window.showGlobalNotification === 'function') {
        window.showGlobalNotification('Redirecting to WhatsApp...', 'success');
      }
      
      setTimeout(() => {
        window.open(waUrl, '_blank');
      }, 800);
    });
  }
}
