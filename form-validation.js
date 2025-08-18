document.addEventListener('DOMContentLoaded', function() {
  const contactForm = document.getElementById('contact-form');
  
  if (contactForm) {
    // Telefonnummer-Validierung
    const phoneInput = document.getElementById('phone');
    if (phoneInput) {
      phoneInput.addEventListener('input', function() {
        // Nur Zahlen, Leerzeichen, +, - und / erlauben
        this.value = this.value.replace(/[^\d\s+\-/]/g, '');
      });
    }
    
    // Formular-Absenden-Animation
    contactForm.addEventListener('submit', function() {
      const submitButton = document.getElementById('submit-button');
      if (submitButton) {
        submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Wird gesendet...';
        submitButton.disabled = true;
      }
    });
  }
});
