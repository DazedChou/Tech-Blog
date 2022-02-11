const commentFormHandler = async (event) => {
    event.preventDefault();

    const content = document.querySelector('#post-comment').value.trim();
    console.log(typeof content);
    const href = window.location.href.split('/');
    const post_id = href[href.length-1];

    if (content) {
        
      const response = await fetch(`/api/users/comment/${post_id}`, {
        method: 'POST',
        body: JSON.stringify({ content }),
        headers: { 'Content-Type': 'application/json' },
      })
      console.log(response);
      if (response.ok) {
        document.location.reload();
      } else {
        console.log(response);
        res.status(500).json(error);
        alert('Failed to Comment');
      }
    }
  };
  
  document
    .querySelector('.comment-form')
    .addEventListener('submit', commentFormHandler);
  