const express = require('express');
const mongoose = require('mongoose');
const { genSaltSync, hashSync, compareSync } = require('bcrypt');
const User = require('./models/user.model');

mongoose.connect('mongodb://mongo/my_database', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
const app = express();

const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'pug');
app.set('views', './views');

app.get('/', (req, res) => {
    res.render('index');
});

app.get('/login', (req, res) => {
    res.render('login');
});

app.post('/login', (req, res) => {
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
    User.findOne({ email }, (err, user) => {
        if (user) {
            const check = compareSync(password, user.password);
            if (check) {
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

app.get('/register', (req, res) => {
    res.render('register');
});

app.post('/register', (req, res) => {
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

app.listen(port, () => console.log('Server is listening on port: ', port));
