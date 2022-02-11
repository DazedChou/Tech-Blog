const router = require('express').Router();
const { Post, User, Comment } = require('../models');
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
    try{
        const postData = await Post.findAll({
            where: { user_id: req.session.user_id },
            include: { model: User }
        });

        const posts = postData.map((post) => post.get({ plain: true }));

        res.render('dashboard', {
            user_id: req.session.user_id, posts, logged_in: req.session.logged_in
        })
    }catch(err){
        console.log(err);
        res.status(500).json(err);
    }
});

router.get('/post/:id', withAuth, async (req, res) => {
    const postData = await Post.findOne({
        where: {
            id: req.params.id
        },
        include: [{model: User},{ model: Comment, include: [User]}]
    });

    const post = postData.get({ plain: true});
    console.log("post: ", post);
    res.render('comment', {
        ...post, logged_in: req.session.logged_in 
    })

})

module.exports = router;