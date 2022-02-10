const signupFormHandler = async (event) => {
    event.preventDefault();

    const title = document.querySelector('#post-title').value.trim();
    const content = document.querySelector('#post-content').value.trim();

    if (title && content) {
  
      const response = await fetch('/api/users/post', {
        method: 'POST',
        body: JSON.stringify({ title, content }),
        headers: { 'Content-Type': 'application/json' },
      })

      if (response.ok) {
        document.location.reload();
      } else {
        console.log(response);
        alert('Failed to sign up');
      }
    }
  };
  
  document
    .querySelector('.post-form')
    .addEventListener('submit', signupFormHandler);
  