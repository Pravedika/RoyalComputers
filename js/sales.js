document.addEventListener('DOMContentLoaded', () => {
  initProductFilter();
});

/* ==========================================
   PRODUCT FILTER LOGIC
   ========================================== */
function initProductFilter() {
  const filterButtons = document.querySelectorAll('.filter-btn');
  const productCards = document.querySelectorAll('.product-card-wrapper');
  const grid = document.querySelector('.product-grid');

  if (!filterButtons.length || !productCards.length || !grid) return;

  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Remove active class from all buttons
      filterButtons.forEach(btn => btn.classList.remove('active'));
      // Add active class to clicked button
      button.classList.add('active');

      const filterValue = button.getAttribute('data-filter');

      productCards.forEach(card => {
        const productCategory = card.getAttribute('data-category');

        if (filterValue === 'all' || productCategory === filterValue) {
          // Show card
          card.classList.remove('fade-out');
          card.style.display = 'block';
          // Trigger a small layout reveal animation
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'scale(1) translateY(0)';
          }, 50);
        } else {
          // Hide card
          card.classList.add('fade-out');
          card.style.opacity = '0';
          card.style.transform = 'scale(0.9) translateY(15px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 350); // Matches CSS transition duration
        }
      });

      // Refresh custom cursor handlers for visible elements
      if (typeof window.refreshHoverEffects === 'function') {
        setTimeout(() => {
          window.refreshHoverEffects();
        }, 400);
      }
    });
  });
}
