const themeToggle = document.getElementById('theme-toggle');
const themeIcon = document.getElementById('theme-icon');
const body = document.body;

const openContactModalBtn = document.getElementById('open-contact-modal');
const contactModal = document.getElementById('contact-modal');
const closeContactModalBtn = document.getElementById('close-contact-modal');

// Function to set the theme
function setTheme(theme) {
    if (theme === 'light') {
        body.classList.add('light-mode');
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
        localStorage.setItem('theme', 'light');
    } else {
        body.classList.remove('light-mode');
        themeIcon.classList.remove('fa-sun');
        themeIcon.classList.add('fa-moon');
        localStorage.setItem('theme', 'dark');
    }
}

// Check for saved theme preference on load
document.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme') || 'dark'; // Default to dark if no preference
    setTheme(savedTheme);

    // Initialize Intersection Observer for sections (fade-in/slide-up)
    // Note: Hero section elements have fixed animation delays for initial load sequence.
    const sections = document.querySelectorAll('.animated-section');
    const observerOptions = {
        root: null, // relative to the viewport
        rootMargin: '0px',
        threshold: 0.1 // Trigger when 10% of the section is visible
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target); // Stop observing once animated
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        observer.observe(section);
    });
});

// Toggle theme on button click
themeToggle.addEventListener('click', () => {
    if (body.classList.contains('light-mode')) {
        setTheme('dark');
    } else {
        setTheme('light');
    }
});

// Modal functionality
openContactModalBtn.addEventListener('click', () => {
    contactModal.classList.add('is-visible');
});

closeContactModalBtn.addEventListener('click', () => {
    contactModal.classList.remove('is-visible');
});

// Close modal if clicking outside the content
contactModal.addEventListener('click', (e) => {
    if (e.target === contactModal) {
        contactModal.classList.remove('is-visible');
    }
});

// Basic form submission prevention for demo (replace with actual backend)
const contactForm = contactModal.querySelector('form');
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Message sent! (Note: This is a demo. Form submission requires backend integration.)');
    contactModal.classList.remove('is-visible');
    contactForm.reset(); // Clear form fields
});