const signupFormHandler = async (event) => {
    event.preventDefault();

    const username = document.querySelector('#username-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();
    const email = document.querySelector('#email-signup').value.trim();
  
    var newUser = {
        username: username,
        password: password,
        email: email,
    }
    console.log('new user: ',newUser);

    if (username && email && password) {
  
      const response = await fetch('/api/users/signup', {
        method: 'POST',
        body: JSON.stringify({ newUser }),
        headers: { 'Content-Type': 'application/json' },
      })
      .then(response => response.json());
  
      if (response.ok) {
        document.location.replace('/');
      } else {
        console.log(response);
        alert('Failed to sign up');
      }
    }
  };
  
  document
    .querySelector('.signup-form')
    .addEventListener('submit', signupFormHandler);
  