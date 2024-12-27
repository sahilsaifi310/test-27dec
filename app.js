// Function to generate a random 16-byte access token
function generateRandomToken() {
    const array = new Uint8Array(16);
    window.crypto.getRandomValues(array);
    return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
  }
  
  // Signup Form Handling
  document.getElementById('signup-form')?.addEventListener('submit', function(event) {
    event.preventDefault();
  
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();
  
    if (!name || !email || !password) {
      document.getElementById('error-message').textContent = "All fields are mandatory!";
      return;
    }
  
    const user = {
      name,
      email,
      password,
      accessToken: generateRandomToken()
    };
  
    // Save user data to localStorage
    localStorage.setItem('user', JSON.stringify(user));
  
    document.getElementById('success-message').textContent = "Successfully Signed Up ! ";
    document.getElementById('error-message').textContent = "";
  
    // Redirect to profile page after a short delay
    setTimeout(() => {
      window.location.href = 'profile.html';
    }, 2000);
  });
  
  // Display User Details on Profile Page
  window.onload = function() {
    if (window.location.pathname === '/profile.html') {
      const user = JSON.parse(localStorage.getItem('user'));
  
      if (!user || !user.accessToken) {
        // Redirect to signup page if no user is found in localStorage
        window.location.href = 'index.html';
        return;
      }
  
      const userDetailsDiv = document.getElementById('user-details');
      userDetailsDiv.innerHTML = `
        <p><strong>Name:</strong> ${user.name}</p>
        <p><strong>Email:</strong> ${user.email}</p>
      `;
    }
  
    // Handle logout button click
    if (document.getElementById('logout-button')) {
      document.getElementById('logout-button').addEventListener('click', function() {
        // Clear user data from localStorage and redirect to signup page
        localStorage.removeItem('user');
        window.location.href = 'index.html';
      });
    }
  };
  
  // Redirection Logic to Handle Authentication
  (function() {
    if (window.location.pathname === '/index.html' && localStorage.getItem('user')) {
      // If user is already logged in, redirect to profile page
      window.location.href = 'profile.html';
    }
  
    if (window.location.pathname === '/profile.html' && !localStorage.getItem('user')) {
      // If no user is found, redirect to signup page
      window.location.href = 'index.html';
    }
  })();
  