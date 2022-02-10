const router = require('express').Router();
const { User, Post, Comment } = require('../../models')

router.post('/signup', async (req, res) => {
  const userData = await User.create({
    username: req.body.username,
    password: req.body.password,
    email: req.body.email
  });
  req.session.save(() => {
    req.session.user_id = userData.id;
    req.session.logged_in = true;
    
    res.json({ user: userData, message: 'You are now logged in!' });
  });

})

router.post('/login', async (req, res) => {
  try {
    const userData = await User.findOne({ where: { email: req.body.email } });

    if (!userData) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;
      
      res.json({ user: userData, message: 'You are now logged in!' });
    });

  } catch (err) {
    res.status(400).json(err);
  }
});

router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      document.location.reload();
    });
  } else {
    res.status(404).end();
  }
});

router.post('/post', async (req, res) => {
  try{
    const newPost = Post.create({
      title: req.body.title,
      content: req.body.content,
      user_id: req.session.user_id,
    });
    
    res.json(newPost);
  }catch(err){
    console.log(err);
    res.status(500).json(err);
  }
  
});

router.post('/comment/:id', async (req, res) => {
  try{
    const newComment = await Comment.create({
      content: req.body.content,
      user_id: req.session.user_id,
      post_id: req.params.id,

    });
    console.log(newComment);
    
    res.json(newComment);
  }catch(err){
    console.log(err);
    res.status(500).json(err);
  }
})

module.exports = router;
