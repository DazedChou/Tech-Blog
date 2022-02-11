const editPostHandler = async (event) => {
  event.preventDefault();

  const title = document.querySelector('#post-title').value.trim();
  const content = document.querySelector('#post-content').value.trim();

  const href = window.location.href.split('/');
  const post_id = href[href.length - 1];

  if (title && content) {

    const response = await fetch(`/api/users/post/${post_id}`, {
      method: 'PUT',
      body: JSON.stringify({ title, content }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert('Failed to edit');
    }
  }
};

document
  .querySelector('.edit-form')
  .addEventListener('submit', editPostHandler);


const deletePostHandler = async (event) => {
  event.preventDefault();

  const href = window.location.href.split('/');
  const post_id = href[href.length - 1];

  const response = await fetch(`/api/users/post/${post_id}`, {
    method: 'DELETE',
  });

  if (response.ok) {
    document.location.replace('/dashboard');
  } else {

    alert('Failed to edit');
  }

};

document
  .querySelector('#deletePost')
  .addEventListener('click', deletePostHandler);
