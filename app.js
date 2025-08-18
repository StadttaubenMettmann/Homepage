// app.js - Kombinierte und verbesserte Logik für die gesamte Website

document.addEventListener('DOMContentLoaded', function() {
  console.log('App.js geladen - Initialisierung startet.');

  // --- Dynamische Inhalte laden ---
  loadDynamicContent();

  // --- Modal-Funktionalität initialisieren ---
  initModals();

  // --- FAQ-Funktionalität initialisieren ---
  initFAQ();
  
  // --- Aktive Navigation markieren ---
  initActiveNav();
  
  // --- Mobiles Menü initialisieren ---
  initMobileMenu();

  setTimeout(handleAnchorNavigation, 500);
});

// INITIALISIERT MOBILES MENÜ
function initMobileMenu() {
  const menuToggle = document.querySelector('.mobile-menu-toggle');
  const mainNav = document.querySelector('.main-nav');
  const body = document.body;
  
  // Erstelle Overlay-Element für den Hintergrund
  const menuOverlay = document.createElement('div');
  menuOverlay.className = 'menu-overlay';
  body.appendChild(menuOverlay);
  
  if (menuToggle && mainNav) {
    menuToggle.addEventListener('click', function() {
      // Toggle Menü-Klassen
      this.classList.toggle('active');
      mainNav.classList.toggle('active');
      menuOverlay.classList.toggle('active');
      
      // Verhindere Scrollen des Hintergrunds, wenn Menü geöffnet ist
      if (mainNav.classList.contains('active')) {
        body.style.overflow = 'hidden';
      } else {
        body.style.overflow = '';
      }
    });
    
    // Schließe Menü beim Klick auf einen Link
    const navLinks = mainNav.querySelectorAll('a');
    navLinks.forEach(link => {
      link.addEventListener('click', function() {
        menuToggle.classList.remove('active');
        mainNav.classList.remove('active');
        menuOverlay.classList.remove('active');
        body.style.overflow = '';
      });
    });
    
    // Schließe Menü beim Klick auf das Overlay
    menuOverlay.addEventListener('click', function() {
      menuToggle.classList.remove('active');
      mainNav.classList.remove('active');
      this.classList.remove('active');
      body.style.overflow = '';
    });
    
    // Schließe Menü bei Escape-Taste
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && mainNav.classList.contains('active')) {
        menuToggle.classList.remove('active');
        mainNav.classList.remove('active');
        menuOverlay.classList.remove('active');
        body.style.overflow = '';
      }
    });
    
    // Schließe Menü bei Größenänderung des Fensters (wenn Desktop-Größe erreicht wird)
    window.addEventListener('resize', function() {
      if (window.innerWidth > 768 && mainNav.classList.contains('active')) {
        menuToggle.classList.remove('active');
        mainNav.classList.remove('active');
        menuOverlay.classList.remove('active');
        body.style.overflow = '';
      }
    });
  }
}

// Verarbeitet die Anker-Navigation
function handleAnchorNavigation() {
  if (window.location.hash) {
    const targetId = window.location.hash.substring(1);
    scrollToElement(targetId);
  }
}

// Scrollt zu einem Element mit der angegebenen ID
function scrollToElement(elementId) {
  console.log('Versuche zu Element zu scrollen:', elementId);
  const targetElement = document.getElementById(elementId);
  
  if (targetElement) {
    console.log('Element gefunden, scrolle zu:', elementId);
    
    // Berechne Position mit Offset für Header
    const headerHeight = document.querySelector('header')?.offsetHeight || 0;
    const scrollPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight - 20;
    
    // Sanftes Scrollen zum Element
    window.scrollTo({
      top: scrollPosition,
      behavior: 'smooth'
    });
    
    // Hervorheben des Elements für bessere Sichtbarkeit
    targetElement.classList.add('highlight-item');
    setTimeout(() => {
      targetElement.classList.remove('highlight-item');
    }, 3000);
    
    return true;
  } else {
    console.warn('Element mit ID nicht gefunden:', elementId);
    return false;
  }
}

// LÄDT ALLE DYNAMISCHEN INHALTE
function loadDynamicContent() {
  // Nachrichten-Vorschau auf der Startseite
  const newsPreview = document.querySelector('.news-preview');
  if (newsPreview) {
    displayNewsPreview(newsPreview);
  }

  // Vollständige Nachrichten auf der Aktuelles-Seite
  const newsSection = document.querySelector('.news-section');
  if (newsSection) {
    displayFullNews(newsSection);
  }

  // Veranstaltungen auf der Aktuelles-Seite
  const eventsGrid = document.querySelector('.events-grid');
  if (eventsGrid) {
    displayEvents(eventsGrid);
  }
}

// ZEIGT NEWS-VORSCHAU AN
function displayNewsPreview(container) {
  if (typeof newsItems === 'undefined' || newsItems.length === 0) {
    console.error('Keine News-Items gefunden');
    return;
  }
  
  // Nur die neueste Nachricht anzeigen
  const latestNews = newsItems[0];
  
  const newsHTML = `
    <h2 class="section-title">Aktuelles</h2>
    <article>
      <h3>${latestNews.title}</h3>
      <p>${latestNews.summary}</p>
      <a href="aktuelles.html#${latestNews.id}" class="read-more" onclick="localStorage.setItem('scrollToNews', '${latestNews.id}')">Weiterlesen</a>
    </article>
  `;
  
  container.innerHTML = newsHTML;
}


// ZEIGT ALLE NEWS AN
function displayFullNews(container) {
  if (typeof newsItems === 'undefined' || newsItems.length === 0) {
    console.error('Keine News-Items gefunden');
    return;
  }
  
  console.log('Fülle News-Section mit', newsItems.length, 'Artikeln');
  
  let newsHTML = '';
  
  newsItems.forEach(item => {
    newsHTML += `
      <article class="news-item" id="${item.id}">
        <div class="news-image"><img src="${item.image}" alt="${item.title}"></div>
        <div class="news-content">
          <div class="news-meta">
            <span class="news-date">${item.date}</span>
            <span class="news-category">${item.category}</span>
          </div>
          <h2>${item.title}</h2>
          <p>${item.content}</p>
          <div class="news-tags">${item.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}</div>
        </div>
      </article>
    `;
  });
  
  container.innerHTML = newsHTML;
  
  // Prüfen, ob wir zu einem bestimmten Artikel scrollen sollen
  const scrollToNewsId = localStorage.getItem('scrollToNews');
  if (scrollToNewsId) {
    setTimeout(() => {
      scrollToElement(scrollToNewsId);
      localStorage.removeItem('scrollToNews'); // Einmalig verwenden
    }, 300);
  }
  // Oder ob ein Hash in der URL ist
  else if (window.location.hash) {
    const targetId = window.location.hash.substring(1);
    setTimeout(() => scrollToElement(targetId), 300);
  }
}


// ZEIGT ALLE EVENTS AN
function displayEvents(container) {
  if (typeof eventItems === 'undefined' || !eventItems || eventItems.length === 0) {
    console.error('Keine Event-Items gefunden');
    return;
  }
  
  console.log('Fülle Events-Grid mit', eventItems.length, 'Veranstaltungen');
  
  let eventsHTML = '';
  
  eventItems.forEach(item => {
    eventsHTML += `
      <div class="event-card" id="${item.id}">
        <div class="event-date">
          <span class="event-day">${item.day}</span>
          <span class="event-month">${item.month}</span>
        </div>
        <div class="event-details">
          <h3>${item.title}</h3>
          <p><i class="far fa-clock"></i> ${item.time}</p>
          <p><i class="fas fa-map-marker-alt"></i> ${item.location}</p>
          <a href="#" class="event-link" data-event-id="${item.id}">Mehr Infos</a>
        </div>
      </div>
    `;
  });
  
  container.innerHTML = eventsHTML;
  
  // Überprüfen, ob die Links korrekt erstellt wurden
  console.log('Event-Links erstellt:', container.querySelectorAll('.event-link').length);
}


// INITIALISIERT ALLE MODALS
function initModals() {
  console.log('Initialisiere Modals');
  
  // Event Delegation für alle Klicks im Body
  document.body.addEventListener('click', function(e) {
    // Klick auf "Mehr Infos" bei Events
    if (e.target && e.target.matches('.event-link')) {
      e.preventDefault();
      console.log('Event-Link geklickt');
      const eventId = e.target.getAttribute('data-event-id');
      if (eventId) {
        showEventDetails(eventId);
      } else {
        console.error('Keine Event-ID gefunden');
      }
    }

    // Klick auf "Mehr erfahren" bei "Was wir tun"
    if (e.target && e.target.matches('.read-more[data-modal]')) {
      e.preventDefault();
      console.log('Modal-Link geklickt');
      const modalType = e.target.getAttribute('data-modal');
      if (modalType) {
        showInfoModal(modalType);
      } else {
        console.error('Kein Modal-Typ gefunden');
      }
    }
    
    // Klick auf einen Schließen-Button
    if (e.target && e.target.matches('.modal-close')) {
      const overlay = e.target.closest('.modal-overlay');
      closeModal(overlay);
    }
    
    // Klick auf das Overlay (außerhalb des Containers)
    if (e.target && e.target.classList.contains('modal-overlay')) {
      closeModal(e.target);
    }
  });
  
  // Schließen mit Escape-Taste für alle Modals
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      const openModals = document.querySelectorAll('.modal-overlay.modal-show');
      openModals.forEach(overlay => closeModal(overlay));
    }
  });
}

// ZEIGT "WAS WIR TUN"-DETAILS IM MODAL
function showInfoModal(modalType) {
  const overlay = document.getElementById('modal-overlay');
  if (!overlay) {
    console.error('Modal-Overlay nicht gefunden');
    return;
  }
  
  // Alle Modal-Inhalte ausblenden
  const allModals = overlay.querySelectorAll('.modal-content');
  allModals.forEach(modal => modal.style.display = 'none');
  
  // Das gewünschte Modal anzeigen
  const activeModal = document.getElementById(`${modalType}-modal`);
  if (activeModal) {
    activeModal.style.display = 'block';
    overlay.classList.add('modal-show');
    document.body.classList.add('modal-open');
    
    // Optimiere Modal für mobile Geräte
    setTimeout(optimizeModalForMobile, 50);
    
    // Anpassen der Modal-Höhe
    setTimeout(adjustModalHeight, 10);
  } else {
    console.error(`Modal mit ID ${modalType}-modal nicht gefunden`);
  }
}

// ZEIGT EVENT-DETAILS IM MODAL
function showEventDetails(eventId) {
  console.log('Zeige Details für Event:', eventId);
  
  // Event-Daten finden
  if (typeof eventItems === 'undefined') {
    console.error('eventItems ist nicht definiert');
    return;
  }
  
  const event = eventItems.find(item => item.id === eventId);
  
  if (!event) {
    console.error('Veranstaltung nicht gefunden:', eventId);
    return;
  }
  
  console.log('Event-Daten gefunden:', event);
  
  // Modal-Inhalt erstellen
  const modalContent = document.getElementById('event-modal-content');
  if (!modalContent) {
    console.error('Modal-Content-Element nicht gefunden');
    return;
  }
  
  modalContent.innerHTML = `
    <div class="event-modal-header">
      <div class="event-modal-date">
        <span class="event-day">${event.day}</span>
        <span class="event-month">${event.month}</span>
      </div>
      <h2>${event.title}</h2>
    </div>
    <div class="event-modal-body">
      <div class="event-info">
        <p><i class="far fa-clock"></i> <strong>Zeit:</strong> ${event.time}</p>
        <p><i class="fas fa-map-marker-alt"></i> <strong>Ort:</strong> ${event.location}</p>
        ${event.contact ? `<p><i class="fas fa-user"></i> <strong>Kontakt:</strong> ${event.contact}</p>` : ''}
      </div>
      <div class="event-description">
        <p>${event.description}</p>
      </div>
      ${event.image ? `<div class="event-image"><img src="${event.image}" alt="${event.title}"></div>` : ''}
    </div>
  `;
  
  // Modal anzeigen
  const overlay = document.getElementById('event-modal-overlay');
  if (!overlay) {
    console.error('Event-Modal-Overlay nicht gefunden');
    return;
  }
  
  overlay.classList.add('modal-show');
  document.body.classList.add('modal-open');
  
  // Optimiere Modal für mobile Geräte
  setTimeout(optimizeModalForMobile, 50);
  
  // Anpassen der Modal-Höhe
  setTimeout(adjustModalHeight, 10);
}

// SCHLIESST EIN BELIEBIGES MODAL
function closeModal(overlay) {
  console.log('Schließe Modal', overlay);
  
  if (!overlay) {
    // Alle Modals schließen
    document.querySelectorAll('.modal-overlay').forEach(modal => {
      modal.classList.remove('modal-show');
    });
  } else {
    // Nur das angegebene Modal schließen
    overlay.classList.remove('modal-show');
  }
  
  document.body.classList.remove('modal-open');
}

// INITIALISIERT FAQ-FUNKTIONALITÄT
function initFAQ() {
  const faqItems = document.querySelectorAll('.faq-question');
  if (faqItems.length > 0) {
    faqItems.forEach(item => {
      item.addEventListener('click', function() {
        const answer = this.nextElementSibling;
        const icon = this.querySelector('.faq-toggle i');
        
        // Hier wurde Optional Chaining hinzugefügt (Zeile 192)
        if (answer.style.maxHeight) {
          answer.style.maxHeight = null;
          icon?.classList.remove('fa-minus');
          icon?.classList.add('fa-plus');
        } else {
          answer.style.maxHeight = answer.scrollHeight + "px";
          // Hier wurde Optional Chaining hinzugefügt (Zeile 204)
          icon?.classList.remove('fa-plus');
          icon?.classList.add('fa-minus');
        }
      });
    });
  }
}

// MARKERT AKTIVEN NAV-LINK
function initActiveNav() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = {
        'index.html': document.getElementById('nav-home'),
        'ueber-uns.html': document.getElementById('nav-about'),
        'aktuelles.html': document.getElementById('nav-news'),
        'kontakt.html': document.getElementById('nav-contact')
    };
    
    // Hier wurde Optional Chaining hinzugefügt (Zeile 222)
    navLinks[currentPage]?.classList.add('active');
}

// Funktion zum Anpassen der Modal-Höhe
function adjustModalHeight() {
  const modalContainers = document.querySelectorAll('.modal-container');
  const windowHeight = window.innerHeight;
  
  modalContainers.forEach(container => {
    // Maximale Höhe auf 90% des Fensters setzen
    container.style.maxHeight = (windowHeight * 0.9) + 'px';
    
    // Überprüfen, ob das Modal größer als der Bildschirm ist
    if (container.offsetHeight > windowHeight * 0.9) {
      container.style.height = (windowHeight * 0.9) + 'px';
    }
  });
}

// Funktion zur Erkennung mobiler Geräte
function isMobileDevice() {
  return (window.innerWidth <= 768);
}

// Modal-Inhalte für mobile Geräte optimieren
function optimizeModalForMobile() {
  const aufklaerungModal = document.getElementById('aufklaerung-modal');
  
  if (aufklaerungModal && isMobileDevice()) {
    // Lange Listen in Akkordeon-Menüs umwandeln
    const longLists = aufklaerungModal.querySelectorAll('ul:not(.short-list)');
    longLists.forEach(list => {
      if (list.children.length > 4 && !list.classList.contains('processed')) {
        list.classList.add('processed'); // Markieren, dass diese Liste bereits verarbeitet wurde
        
        // Liste kürzen und "Mehr anzeigen"-Button hinzufügen
        const listItems = Array.from(list.children);
        const visibleItems = listItems.slice(0, 3);
        const hiddenItems = listItems.slice(3);
        
        // Sichtbare Elemente behalten
        list.innerHTML = '';
        visibleItems.forEach(item => list.appendChild(item));
        
        // Container für versteckte Elemente
        const hiddenContainer = document.createElement('div');
        hiddenContainer.className = 'hidden-content';
        hiddenContainer.style.display = 'none';
        
        const hiddenList = document.createElement('ul');
        hiddenItems.forEach(item => hiddenList.appendChild(item));
        hiddenContainer.appendChild(hiddenList);
        
        // "Mehr anzeigen"-Button
        const toggleButton = document.createElement('button');
        toggleButton.className = 'toggle-content-btn';
        toggleButton.textContent = 'Mehr anzeigen';
        toggleButton.onclick = function() {
          const isHidden = hiddenContainer.style.display === 'none';
          hiddenContainer.style.display = isHidden ? 'block' : 'none';
          toggleButton.textContent = isHidden ? 'Weniger anzeigen' : 'Mehr anzeigen';
        };
        
        // Elemente einfügen
        list.parentNode.insertBefore(hiddenContainer, list.nextSibling);
        list.parentNode.insertBefore(toggleButton, hiddenContainer);
      }
    });
    
    // Große Bilder mit Vorschaubildern ersetzen
    const largeImages = aufklaerungModal.querySelectorAll('img:not(.small-image):not(.processed-image)');
    largeImages.forEach(img => {
      img.classList.add('processed-image'); // Markieren, dass dieses Bild bereits verarbeitet wurde
      
      const originalSrc = img.src;
      const originalAlt = img.alt;
      
      // Vorschaubild-Container erstellen
      const previewContainer = document.createElement('div');
      previewContainer.className = 'image-preview';
      
      // Vorschaubild
      const previewImg = document.createElement('img');
      previewImg.src = originalSrc;
      previewImg.alt = originalAlt;
      previewImg.className = 'preview-image';
      previewImg.style.maxHeight = '120px';
      
      // "Bild vergrößern"-Text
      const expandText = document.createElement('span');
      expandText.className = 'expand-image-text';
      expandText.textContent = 'Tippen zum Vergrößern';
      
      // Zum Container hinzufügen
      previewContainer.appendChild(previewImg);
      previewContainer.appendChild(expandText);
      
      // Click-Event zum Vergrößern
      previewContainer.onclick = function() {
        const fullImage = document.createElement('div');
        fullImage.className = 'fullscreen-image';
        fullImage.innerHTML = `
          <div class="fullscreen-image-container">
            <img src="${originalSrc}" alt="${originalAlt}">
            <button class="close-fullscreen">×</button>
          </div>
        `;
        document.body.appendChild(fullImage);
        
        // Schließen-Button
        fullImage.querySelector('.close-fullscreen').onclick = function() {
          document.body.removeChild(fullImage);
        };
      };
      
      // Originalbild durch Vorschau ersetzen
      img.parentNode.replaceChild(previewContainer, img);
    });
  }
  
  // Scrollposition zurücksetzen
  const modalContents = document.querySelectorAll('.modal-content');
  modalContents.forEach(content => {
    if (content.style.display === 'block') {
      content.scrollTop = 0;
    }
  });
}

// Event-Listener für Fenstergrößenänderungen
window.addEventListener('resize', function() {
  adjustModalHeight();
});
