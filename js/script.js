console.log("Welcome to Sumter Ads!");
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
const contactForm = document.getElementById('contact-form');

if (contactForm) {
  contactForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const formData = new FormData(contactForm);
    const submitButton = contactForm.querySelector('button[type="submit"]');
    submitButton.textContent = 'Sending...';
    submitButton.disabled = true;

    fetch(contactForm.action, {
      method: 'POST',
      body: formData,
      headers: { 'Accept': 'application/json' }
    })
    .then(response => {
      if (response.ok) {
        document.getElementById('contact-form-wrapper').innerHTML = `
          <div class="text-center py-12 fade-in visible">
            <h3 class="text-3xl font-bold text-orange-500 mb-4">Thanks!</h3>
            <p class="text-gray-300 text-lg">Your message has been sent. We'll be in touch soon.</p>
          </div>
        `;
      } else {
        submitButton.textContent = 'Send Message';
        submitButton.disabled = false;
        alert('Something went wrong. Please try again or email us directly.');
      }
    })
    .catch(() => {
      submitButton.textContent = 'Send Message';
      submitButton.disabled = false;
      alert('Something went wrong. Please try again or email us directly.');
    });
  });
}