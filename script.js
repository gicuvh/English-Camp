// AOS initialization
AOS.init({
  duration: 900,
  once: true,
});

// Countdown timer
const countdownDate = new Date('2026-07-01T10:00:00').getTime();

function updateCountdown() {
  const now = new Date().getTime();
  const distance = countdownDate - now;

  if (distance < 0) {
    document.getElementById('countdown').innerHTML = '<p>Tabăra a început!</p>';
    clearInterval(timerInterval);
    return;
  }

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
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
      document.body.classList.remove('menu-open'); // inchide meniu mobil daca e deschis
    }
  });
});

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
