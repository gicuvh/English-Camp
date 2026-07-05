// AOS initialization
AOS.init({
  duration: 900,
  once: true,
});

// Countdown timer
// 🔹 Data finală – 18 iulie 2026, ora 10:00:00
const countdownDate = new Date('2026-07-18T10:00:00').getTime();
function updateCountdown() {
  const now = new Date().getTime();
  const distance = countdownDate - now;

  if (distance < 0) {
    document.getElementById('countdown').innerHTML = '<p>Tabăra a început!</p>';
    clearInterval(timerInterval);
    return;
  }

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  document.getElementById('cd-days').textContent = days.toString().padStart(2, '0');
  document.getElementById('cd-hours').textContent = hours.toString().padStart(2, '0');
  document.getElementById('cd-mins').textContent = minutes.toString().padStart(2, '0');
  document.getElementById('cd-secs').textContent = seconds.toString().padStart(2, '0');
}

const timerInterval = setInterval(updateCountdown, 1000);
updateCountdown();

// Testimonials slider
const testiItems = document.querySelectorAll('.testi');
let currentTesti = 0;

function showTestimonial(index) {
  testiItems.forEach((item, i) => {
    item.classList.toggle('active', i === index);
  });
}

setInterval(() => {
  currentTesti = (currentTesti + 1) % testiItems.length;
  showTestimonial(currentTesti);
}, 7000);

// Nav toggle for mobile
const navToggle = document.querySelector('.nav-toggle');
navToggle.addEventListener('click', () => {
  document.body.classList.toggle('menu-open');
});

// Smooth scroll la click pe nav links
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const target = document.querySelector(link.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
      document.body.classList.remove('menu-open'); // închide meniul mobil dacă e deschis
      document.body.classList.remove('menu-open'); // închide meniul mobil dacă e deschis
    }
  });
});

// Galerie extensibilă + lightbox
const galleryGrid = document.querySelector('.gallery-grid');
const galleryItems = Array.from(document.querySelectorAll('.gallery-item'));
const galleryToggle = document.querySelector('.gallery-toggle');
const lightbox = document.getElementById('gallery-lightbox');
const lightboxImage = document.querySelector('.lightbox-image');
const lightboxCaption = document.querySelector('.lightbox-caption');
const lightboxClose = document.querySelector('.lightbox-close');
const lightboxPrev = document.querySelector('.lightbox-prev');
const lightboxNext = document.querySelector('.lightbox-next');
let currentGalleryIndex = 0;

galleryItems.forEach((item, index) => {
  if (index >= 4) {
    item.classList.add('is-extra');
  }

  item.addEventListener('click', () => {
    openLightbox(index);
  });
});

if (galleryToggle && galleryItems.length > 4) {
  galleryToggle.hidden = false;
  galleryToggle.addEventListener('click', () => {
    const isExpanded = galleryGrid.classList.toggle('is-expanded');
    galleryToggle.innerHTML = isExpanded
      ? '<i class="fa-solid fa-compress" aria-hidden="true"></i> Vezi mai puține poze'
      : '<i class="fa-solid fa-images" aria-hidden="true"></i> Vezi mai multe poze';
  });
}

function openLightbox(index) {
  currentGalleryIndex = index;
  updateLightboxImage();
  lightbox.classList.add('is-open');
  lightbox.setAttribute('aria-hidden', 'false');
  document.body.classList.add('lightbox-open');
  lightboxClose.focus();
}

function closeLightbox() {
  lightbox.classList.remove('is-open');
  lightbox.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('lightbox-open');
}

function updateLightboxImage() {
  const image = galleryItems[currentGalleryIndex].querySelector('img');
  lightboxImage.src = image.src;
  lightboxImage.alt = image.alt;
  lightboxCaption.textContent = image.alt;
}

function showGalleryImage(direction) {
  currentGalleryIndex = (currentGalleryIndex + direction + galleryItems.length) % galleryItems.length;
  updateLightboxImage();
}

if (lightbox) {
  lightboxClose.addEventListener('click', closeLightbox);
  lightboxPrev.addEventListener('click', () => showGalleryImage(-1));
  lightboxNext.addEventListener('click', () => showGalleryImage(1));

  lightbox.addEventListener('click', event => {
    if (event.target === lightbox) {
      closeLightbox();
    }
  });

  document.addEventListener('keydown', event => {
    if (!lightbox.classList.contains('is-open')) {
      return;
    }

    if (event.key === 'Escape') {
      closeLightbox();
    }

    if (event.key === 'ArrowLeft') {
      showGalleryImage(-1);
    }

    if (event.key === 'ArrowRight') {
      showGalleryImage(1);
    }
  });
}

// Update footer year
document.getElementById('year').textContent = new Date().getFullYear();


// Animatie la scroll pentru leaders
document.addEventListener("scroll", () => {
  const leaders = document.querySelectorAll(".leader-card");
  leaders.forEach(card => {
    const rect = card.getBoundingClientRect();
    if (rect.top < window.innerHeight - 100) {
      card.classList.add("visible");
    }
  });
});
