const commentFormHandler = async (event) => {
    event.preventDefault();

    const content = document.querySelector('#post-comment').value.trim();
    console.log('current href: ', window.location.href);
    console.log('content: ',content);
    const href = window.location.href.split('/');
    console.log(href);
    const post_id = href[href.length-1];
    console.log('post_id: ', post_id);
    if (content) {
        
      const response = await fetch(`/api/users/comment/${post_id}`, {
        method: 'POST',
        body: JSON.stringify({ content }),
        headers: { 'Content-Type': 'application/json' },
      })

      if (response.ok) {
        document.location.reload();
      } else {
        console.log(response);
        alert('Failed to Comment');
      }
    }
  };
  
  document
    .querySelector('.comment-form')
    .addEventListener('submit', commentFormHandler);
  