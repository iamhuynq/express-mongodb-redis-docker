const router = require('express').Router();
const { genSaltSync, hashSync } = require('bcrypt');
const User = require('../models/user.model');

router.get('/', (req, res) => {
    res.render('register');
});

router.post('/', (req, res) => {
    const { email, password1, password2 } = req.body;
    const errors = [];
    if (!email) {
        errors.push('Have no email!');
    }
    if (!password1 || !password2) {
        errors.push('Have no password!');
    }
    if (password1 !== password2) {
        errors.push('Passwords are not correct!');
    }
    if (errors.length) {
        res.render('register', {
            errors,
            email,
        });
        return;
    }
    User.findOne({ email }, '_id', (err, user) => {
        if (user) {
            res.render('register', {
                errors: ['Email already be registed!'],
                email,
            });
            return;
        }
        const salt = genSaltSync(10);
        User.create({ email, password: hashSync(password1, salt) }).then(() => {
            res.redirect('/login');
        });
    });
});

module.exports = router;
