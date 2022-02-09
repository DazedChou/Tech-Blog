const signupFormHandler = async (event) => {
    event.preventDefault();

    const username = document.querySelector('#username-login').value.trim();
    const password = document.querySelector('#password-login').value.trim();
    const email = document.querySelector('#email-login').value.trim();
  
    var newUser = {
        username: username,
        password: password,
        email: email,
    }

    if (username && email && password) {
  
      const response = await fetch('/api/users/signup', {
        method: 'POST',
        body: JSON.stringify({ newUser }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        document.location.replace('/');
      } else {
        alert('Failed to sign up');
      }
    }
  };
  
  document
    .querySelector('.signup-form')
    .addEventListener('submit', signupFormHandler);
  