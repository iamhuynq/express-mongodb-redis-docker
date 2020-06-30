const router = require('express').Router();
const { compareSync } = require('bcrypt');
const User = require('../models/user.model');
const validateLogin = require('../middlewares/validate.login');

router.get('/', (req, res) => {
    res.render('login');
});

router.post('/', validateLogin, (req, res) => {
    const { email, password } = req.body;

    User.findOne({ email }, (err, user) => {
        if (user) {
            const check = compareSync(password, user.password);
            if (check) {
                res.cookie('userEmail', user.email, {
                    signed: true,
                });
                res.redirect('/');
            }
            res.render('login', {
                errors: ['Password is not correct!'],
                email,
            });
            return;
        }
        res.render('login', {
            errors: ['Email has not been registed!'],
            email,
        });
    });
});

module.exports = router;
