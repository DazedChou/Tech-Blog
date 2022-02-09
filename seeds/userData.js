const { User } = require ('../models/User');

const userData = [
    {
        username: 'Farley',
        email: 'Bacon@gmail.com',
        password: 'password',
    },
    {
        username: 'Chicken',
        email: 'Foo@gmail.com',
        password: 'password',
    }
];

const seedUser = () => User.bulkCreate(userData);

module.exports = seedUser;