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

//  ===== BELOW IS FOR THE SLIDER  ======



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
      showNotification('Message sent successfully!');
      
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
      showNotification('Failed to send message. Please try again or email me directly at mondli46401@gmail.com', true);
      
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


//===== Bellow is the Notification funnctions =======

// Notification System Functions
function showNotification(message, isError = false) {
  const notification = document.getElementById('notification');
  const messageElement = notification.querySelector('.notification-message');
  
  // Set message
  messageElement.textContent = message;
  
  // Set type (success or error)
  if (isError) {
    notification.classList.add('error');
  } else {
    notification.classList.remove('error');
  }
  
  // Show notification with animation
  notification.style.display = 'flex';
  notification.style.animation = 'slideIn 0.3s ease-out';
  
  // Auto-hide after 5 seconds (for success messages only)
  if (!isError) {
    setTimeout(() => {
      hideNotification();
    }, 5000);
  }
}

function hideNotification() {
  const notification = document.getElementById('notification');
  
  // Add slide-out animation
  notification.style.animation = 'slideOut 0.3s ease-out';
  
  // Hide after animation completes
  setTimeout(() => {
    notification.style.display = 'none';
    notification.style.animation = '';
  }, 300);
}

// Close notification when X button is clicked
document.addEventListener('DOMContentLoaded', function() {
  const closeBtn = document.querySelector('.notification-close');
  if (closeBtn) {
    closeBtn.addEventListener('click', hideNotification);
  }
  
  // Also close notification when clicking outside (optional)
  const notification = document.getElementById('notification');
  if (notification) {
    notification.addEventListener('click', function(e) {
      if (e.target === notification) {
        hideNotification();
      }
    });
  }
});
