// footer-content.js
const footerContent =`
  <div class="footer-content">
    <div class="footer-column contact-info">
      <h3>Kontakt</h3>
      <p><i class="fas fa-envelope"></i> stadttauben_mettmann@gmx.de </p>
      
      <div class="social-links">
        <a href="https://www.facebook.com/groups/400468505791432/" target="_blank" rel="noopener noreferrer" aria-label="Besuchen Sie uns auf Facebook"><i class="fab fa-facebook-f"></i></a>
      </div>
    </div>
    
    <div class="footer-column footer-nav">
      <h3>Navigation</h3>
      <ul>
        <li><a href="index.html">Startseite</a></li>
        <li><a href="ueber-uns.html">Über uns</a></li>
        <li><a href="aktuelles.html">Aktuelles</a></li>
        <li><a href="kontakt.html">Kontakt</a></li>
      </ul>
    </div>
  </div>

  <div class="copyright">
    <p>© 2025 Stadttauben Mettmann e.V. | <a href="impressum.html">Impressum</a> | <a href="datenschutz.html">Datenschutz</a></p>
  </div>
`;

// Warte, bis das DOM geladen ist
document.addEventListener('DOMContentLoaded', function() {
  // Hier war der Fehler: headerElement statt footerElement
  const footerElement = document.querySelector('footer');
  if (footerElement) {
    footerElement.innerHTML = footerContent;
  }
});

