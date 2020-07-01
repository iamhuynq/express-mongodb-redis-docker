const authenticate = (req, res, next) => {
    if (!req.session.email) {
        res.redirect('/login');
        return;
    }
    res.locals.email = req.session.email;
    next();
};

module.exports = authenticate;
