// Swiper Configuration
const swiper = new Swiper('.slider-container', {
  loop: true,

  // If we need pagination
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
    dynamicBullets: true
  },

  // Navigation arrows
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  breakpoints: {
    0: {
        slidesPerView: 1
    },
    768: {
        slidesPerView: 2
    },
    1024: {
        slidesPerView: 3
    },
  }
});

// ==== EMAIL FUNCTIONALITY USING EMAILJS ====
function sendEmail(event) {
  event.preventDefault(); // Prevent form from refreshing page

  // Get form values
  const theName = document.getElementById('name').value;
  const theEmail = document.getElementById('email').value;
  const thePhone = document.getElementById('phoneNo').value;
  const theMessage = document.getElementById('message').value;

  // Validate fields
  if (!theName || !theEmail || !theMessage) {
    alert('Please fill in Name, Email, and Message fields (REQUIRED)');
    return;
  }

  // Show loading state
  const submitBtn = document.getElementById('submitBtn');
  const originalText = submitBtn.textContent;
  submitBtn.textContent = 'Sending...';
  submitBtn.disabled = true;

  // Prepare email parameters
  const templateParams = {
    name: theName,
    email: theEmail,
    cellNo: thePhone || 'Not provided',
    message: theMessage,
  };

  // Send email using EmailJS
  emailjs.send('service_6pki1rn', 'template_gp6ekt5', templateParams)
    .then(function(response) {
      console.log('SUCCESS!', response.status, response.text);
      alert('Message sent successfully! I will get back to you soon.');
      
      // Clear form
      document.getElementById('name').value = '';
      document.getElementById('email').value = '';
      document.getElementById('phoneNo').value = '';
      document.getElementById('message').value = '';
      
      // Reset button
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;
    }, function(error) {
      console.error('FAILED...', error);
      alert('Failed to send message. Please try again or email me directly at mondli46401@gmail.com');
      
      // Reset button
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;
    });
}

// Attach event listener to form submit button
document.addEventListener('DOMContentLoaded', function() {
  const submitBtn = document.getElementById('submitBtn');
  if (submitBtn) {
    submitBtn.addEventListener('click', sendEmail);
  }
});