const { Post } = require ('../models');

const postData = [
    {
        title: 'Full Stack Web Development',
        content: 'This sure is difficult',
        user_id: 1,
    },
    {
        title: 'Full Stack Web Development',
        content: 'This sure is difficult',
        user_id: 2,
    }
];

const seedPost = () => Post.bulkCreate(postData);

module.exports = seedPost;