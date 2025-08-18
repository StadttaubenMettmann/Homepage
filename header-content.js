// header-content.js
// Verwende DOM-Manipulation statt document.write
const headerContent = `
  <div class="logo-container">
    <img src="images/logo.jpg" alt="Taubenhilfe Mettmann Logo" class="logo-image">
    <div class="logo-text">
      <h1 class="site-title">Taubenhilfe Mettmann</h1>
      <p class="tagline">Hilfe und Schutz für Stadttauben</p>
    </div>
    <button class="mobile-menu-toggle" aria-label="Menü öffnen">
      <span class="hamburger-icon">
        <span class="bar"></span>
        <span class="bar"></span>
        <span class="bar"></span>
      </span>
    </button>
  </div>
  <nav class="main-nav" aria-label="Hauptnavigation">
    <ul>
      <li><a href="index.html" id="nav-home">Startseite</a></li>
      <li><a href="ueber-uns.html" id="nav-about">Über uns</a></li>
      <li><a href="aktuelles.html" id="nav-news">Aktuelles</a></li>
      <li><a href="kontakt.html" id="nav-contact">Kontakt</a></li>
    </ul>
  </nav>
`;

// Warte, bis das DOM geladen ist
document.addEventListener('DOMContentLoaded', function() {
  const headerElement = document.querySelector('header');
  if (headerElement) {
    headerElement.innerHTML = headerContent;
  }
});
