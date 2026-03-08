
// AOS
document.addEventListener('DOMContentLoaded', function() {
  AOS.init({ duration: 1000, once: false, offset: 100, easing: 'ease-in-out' });
});

// Dark Mode Toggle
const themeToggle = document.getElementById('theme-toggle');
const htmlElement = document.documentElement;

const currentTheme = localStorage.getItem('theme') || 'light';
htmlElement.setAttribute('data-theme', currentTheme);
updateThemeIcon(currentTheme);

themeToggle.addEventListener('click', function() {
  const theme = htmlElement.getAttribute('data-theme');
  const newTheme = theme === 'light' ? 'dark' : 'light';
  htmlElement.setAttribute('data-theme', newTheme);
  localStorage.setItem('theme', newTheme);
  updateThemeIcon(newTheme);
});

function updateThemeIcon(theme) {
  const icon = themeToggle.querySelector('i');
  icon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
}

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const href = this.getAttribute('href');
    if (href !== '#' && document.querySelector(href)) {
      e.preventDefault();
      document.querySelector(href).scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// Active nav on scroll
window.addEventListener('scroll', function() {
  let current = '';
  document.querySelectorAll('section').forEach(section => {
    if (pageYOffset >= section.offsetTop - 200) {
      current = section.getAttribute('id');
    }
  });
  document.querySelectorAll('.nav-link').forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === '#' + current) {
      link.classList.add('active');
    }
  });
});

// Animate progress bars
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('.progress-bar').forEach(bar => {
        const width = bar.style.width;
        bar.style.width = '0';
        setTimeout(() => { bar.style.width = width; }, 100);
      });
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

const skillsSection = document.querySelector('#skills');
if (skillsSection) observer.observe(skillsSection);

// Parallax hero
window.addEventListener('scroll', function() {
  const hero = document.querySelector('.hero');
  if (hero) hero.style.backgroundPosition = `0 ${window.scrollY * 0.5}px`;
});

// CV button placeholder
document.getElementById('cv-btn').addEventListener('click', function(e) {
  e.preventDefault();
  alert('Update the href on this button to point to your actual CV PDF file.');
});

console.log('Portfolio loaded successfully!');
