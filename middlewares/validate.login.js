const validateLogin = (req, res, next) => {
    const { email, password } = req.body;
    const errors = [];
    if (!email) {
        errors.push('Have no email!');
    }
    if (!password) {
        errors.push('Have no password!');
    }
    if (errors.length) {
        res.render('login', {
            errors,
            email,
        });
        return;
    }
    next();
};

module.exports = validateLogin;
