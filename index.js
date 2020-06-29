const express = require('express');

const app = express();

const port = 3000;

app.set('view engine', 'pug');
app.set('views', './views');

app.get('/', (req, res) => {
    res.render('index');
});

app.get('/login', (req, res) => {
    res.render('login');
});

app.get('/register', (req, res) => {
    res.render('register');
});

app.listen(port, () => console.log('Server is listening on port: ', port));
