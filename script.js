// Initialize AOS (Animate On Scroll)
document.addEventListener('DOMContentLoaded', function() {
  AOS.init({
    duration: 1000,
    once: false,
    offset: 100,
    easing: 'ease-in-out'
  });
});

// Dark Mode Toggle
const themeToggle = document.getElementById('theme-toggle');
const htmlElement = document.documentElement;

// Check for saved theme preference or default to light mode
const currentTheme = localStorage.getItem('theme') || 'light';
htmlElement.setAttribute('data-theme', currentTheme);
updateThemeIcon(currentTheme);

// Toggle theme on button click
themeToggle.addEventListener('click', function() {
  const theme = htmlElement.getAttribute('data-theme');
  const newTheme = theme === 'light' ? 'dark' : 'light';
  
  htmlElement.setAttribute('data-theme', newTheme);
  localStorage.setItem('theme', newTheme);
  updateThemeIcon(newTheme);
});

// Update icon based on theme
function updateThemeIcon(theme) {
  const icon = themeToggle.querySelector('i');
  if (theme === 'dark') {
    icon.className = 'fas fa-sun';
  } else {
    icon.className = 'fas fa-moon';
  }
}

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (href !== '#' && document.querySelector(href)) {
      e.preventDefault();
      document.querySelector(href).scrollIntoView({
        behavior: 'smooth'
      });
    }
  });
});

// Navbar active link on scroll
window.addEventListener('scroll', function() {
  let current = '';
  const sections = document.querySelectorAll('section');
  
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    if (pageYOffset >= sectionTop - 200) {
      current = section.getAttribute('id');
    }
  });

  document.querySelectorAll('.nav-link').forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href').slice(1) === current) {
      link.classList.add('active');
    }
  });
});

// Add active class styling
const style = document.createElement('style');
style.textContent = `
  .nav-link.active {
    color: #2563eb !important;
  }
  
  .nav-link.active::after {
    width: 100% !important;
  }
`;
document.head.appendChild(style);

// Animate progress bars when they come into view
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const progressBars = entry.target.querySelectorAll('.progress-bar');
      progressBars.forEach(bar => {
        const width = bar.style.width;
        bar.style.width = '0';
        setTimeout(() => {
          bar.style.width = width;
        }, 100);
      });
      observer.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.5
});

const skillsSection = document.querySelector('#skills');
if (skillsSection) {
  observer.observe(skillsSection);
}

// Add scroll reveal animation
const revealElements = document.querySelectorAll('[data-aos]');
revealElements.forEach(element => {
  element.style.opacity = '0';
  element.style.transform = 'translateY(30px)';
});

// Parallax effect for hero section
window.addEventListener('scroll', function() {
  const hero = document.querySelector('.hero');
  if (hero) {
    const scrollPos = window.scrollY;
    hero.style.backgroundPosition = `0 ${scrollPos * 0.5}px`;
  }
});

// Mobile menu close on link click
const navLinks = document.querySelectorAll('.nav-link');
const navMenu = document.querySelector('.collapse');

navLinks.forEach(link => {
  link.addEventListener('click', () => {
    const bsCollapse = new bootstrap.Collapse(navMenu, {
      toggle: false
    });
    bsCollapse.hide();
  });
});

// CV Download handler
const cvButton = document.querySelector('a[href="#"]');
if (cvButton && cvButton.innerHTML.includes('PDF')) {
  cvButton.addEventListener('click', function(e) {
    e.preventDefault();
    alert('Please replace the CV file path. Update the href in the HTML to point to your CV file.');
    // Example: window.location.href = 'path/to/your/cv.pdf';
  });
}

console.log('Portfolio script loaded successfully!');
