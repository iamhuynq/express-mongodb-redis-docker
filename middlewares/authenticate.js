const User = require('../models/user.model');

const authenticate = (req, res, next) => {
    if (!req.signedCookies.userEmail) {
        res.redirect('/login');
        return;
    }
    User.findOne({ email: req.signedCookies.userEmail }, '_id', (err, user) => {
        if (user) {
            res.locals.userEmail = req.signedCookies.userEmail;
            next();
        }
        res.redirect('/login');
        return;
    });
};

module.exports = authenticate;
