const router = require('express').Router();
const sequelize = require('../config/connection');
const { Post, User } = require('../models');

router.get('/', async (req, res) => {
    const postData = await Post.findall({
        include: { model: User }
    })

    const posts = postData.map((post) =>
        post.get({ plain: true })
    )

    res.render('homepage', {
        posts,
    })
});