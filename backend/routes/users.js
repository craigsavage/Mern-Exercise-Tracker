const router = require('express').Router();
const User = require('../models/User');

router.route('/').get((req, res) => {
    User.find()
        .then(users => res.json(users))
        .catch(err => res.status(400).json(`Error: ${err}`));
});

router.route('/add').post((req, res) => {
    User.create({ username: req.body.username })
        .then(user => res.json(`New user: ${user.username} was successfully registered`))
        .catch(err => res.status(400).json(`Error: ${err}`));
});

module.exports = router;