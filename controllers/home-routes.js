const router = require('express').Router();
const { Post, User } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
    const postData = await Post.findAll({
        include: { model: User }
    })

    const posts = postData.map((post) =>
        post.get({ plain: true })
    )
    console.log(posts);
    res.render('homepage', {
        posts,
    })
});

module.exports = router;