const express = require('express');
const mongoose = require('mongoose');
const fileUpload = require('express-fileupload');
const cookieParser = require('cookie-parser');
const bookRouter = require('./routers/book.router');
const registerRouter = require('./routers/register.router');
const loginRouter = require('./routers/login.router');
const mainRouter = require('./routers/main.router');

mongoose.connect('mongodb://mongo/my_database', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const app = express();

const port = 3000;

app.use(cookieParser('iamhuynq'));
app.use(fileUpload());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('./public'));
app.set('view engine', 'pug');
app.set('views', './views');

app.use('/book', bookRouter);
app.use('/register', registerRouter);
app.use('/login', loginRouter);
app.use('/', mainRouter);
app.listen(port, () => console.log('Server is listening on port: ', port));
