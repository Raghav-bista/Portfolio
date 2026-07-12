// ===== Mobile nav toggle =====
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

navToggle.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', isOpen);
});

// Close mobile menu after clicking a link
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
  });
});

// ===== Skill bars: animate fill when scrolled into view =====
const skills = document.querySelectorAll('.skill');

const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;
      const level = el.getAttribute('data-level');
      el.style.setProperty('--fill', `${level}%`);
      el.classList.add('in-view');
      skillObserver.unobserve(el);
    }
  });
}, { threshold: 0.4 });

skills.forEach(skill => skillObserver.observe(skill));

// ===== Contact form (front-end only demo) =====
const contactForm = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');

contactForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const name = contactForm.name.value.trim();
  const email = contactForm.email.value.trim();
  const message = contactForm.message.value.trim();

  if (!name || !email || !message) {
    formStatus.textContent = 'Please fill in every field before sending.';
    formStatus.style.color = '#E3A23B';
    return;
  }

  // No backend is connected yet — this just confirms the form works.
  // Swap this block for a fetch() call to your email service or API.
  formStatus.textContent = `Thanks, ${name} — your message is ready to send once a backend is connected.`;
  formStatus.style.color = '#3E7C6B';
  contactForm.reset();
});