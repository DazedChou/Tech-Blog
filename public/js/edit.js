const editPostHandler = async (event) => {
    event.preventDefault();
  
    const post = document.querySelectorAll('[data-post]');

    console.log(post);
  
    if (username && password) {
  
      const response = await fetch('/api/users/login', {
        method: 'POST',
        body: JSON.stringify({ username, password }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        document.location.replace('/');
      } else {
        alert('Failed to log in');
      }
    }
  };
  
  document
    .querySelector('#edit')
    .addEventListener('submit', editPostHandler);
  