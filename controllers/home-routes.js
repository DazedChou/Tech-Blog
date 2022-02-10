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
        logged_in: req.session.logged_in,
    })
});

router.get('/signup', async (req, res) => {
    res.render('signup',{ logged_in: req.session.logged_in,});
});

router.get('/login', async (req, res) => {
    if (req.session.logged_in) {
        res.redirect('/');
        return;
    }

    res.render('login', {logged_in: req.session.logged_in});
});

router.get('/dashboard', withAuth, async (req, res) => {
    const postData = await Post.findAll({
        where: { id: req.session.user_id },
        include: { model: User }
    });

    const posts = postData.map((post) =>
        post.get({ plain: true })
    );
    res.render('dashboard', {
        user_id: req.session.user_id, posts
    })
})

module.exports = router;