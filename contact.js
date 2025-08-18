// Funktion zum Auslesen von URL-Parametern
function getUrlParameter(name) {
  // Einfache Ersetzung ohne unnötige Zeichenklassen oder Escape-Zeichen
  name = name.replace(/\[/g, '\\[').replace(/\]/g, '\\]');
  const regex = new RegExp('[?&]' + name + '=([^&#]*)');
  const results = regex.exec(location.search);
  return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
}

// Funktion zum Ausfüllen des Betreff-Felds auf der Kontaktseite
function fillContactForm() {
  const betreff = getUrlParameter('betreff');
  const betreffFeld = document.getElementById('subject');
  
  if (betreff && betreffFeld) {
    // Betreff-Texte für verschiedene Anfragen
    const betreffTexte = {
      'Mitgliedschaft': 'Anfrage zur Mitgliedschaft',
      'Spende': 'Informationen zu Spendenmöglichkeiten',
      'Ehrenamt': 'Ich möchte ehrenamtlich helfen'
    };
    
    // Betreff setzen, wenn bekannt, sonst den Parameter direkt verwenden
    betreffFeld.value = betreffTexte[betreff] || betreff;
    
    // Optional: Auch eine Nachricht vorausfüllen
    const nachrichtFeld = document.getElementById('message');
    if (nachrichtFeld) {
      const nachrichtTexte = {
        'Mitgliedschaft': 'Ich interessiere mich für eine Mitgliedschaft bei der Taubenhilfe Mettmann und bitte um weitere Informationen.',
        'Spende': 'Ich möchte die Taubenhilfe Mettmann mit einer Spende unterstützen und bitte um Informationen zu den Spendenmöglichkeiten.',
        'Ehrenamt': 'Ich möchte mich ehrenamtlich bei der Taubenhilfe Mettmann engagieren und bitte um weitere Informationen zu den Möglichkeiten.'
      };
      
      if (nachrichtTexte[betreff]) {
        nachrichtFeld.value = nachrichtTexte[betreff];
      }
    }
  }
}

// Ausführen, wenn die Seite geladen ist
document.addEventListener('DOMContentLoaded', function() {
  // Nur auf der Kontaktseite ausführen
  if (window.location.pathname.includes('kontakt.html')) {
    fillContactForm();
  }
});
