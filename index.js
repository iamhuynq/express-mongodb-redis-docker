const express = require('express');
const mongoose = require('mongoose');
const fileUpload = require('express-fileupload');
const cookieParser = require('cookie-parser');
const redis = require('redis');
const session = require('express-session');
const RedisStore = require('connect-redis')(session);
const bookRouter = require('./routers/book.router');
const registerRouter = require('./routers/register.router');
const loginRouter = require('./routers/login.router');
const mainRouter = require('./routers/main.router');
const logoutRouter = require('./routers/logout.router');

const redisClient = redis.createClient({ host: 'session', port: 6379 });

mongoose.connect('mongodb://mongo/my_database', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const app = express();

const port = 3000;

app.use(
    session({
        store: new RedisStore({
            client: redisClient,
        }),
        secret: 'somethingSecret',
        resave: false,
    })
);
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
app.use('/logout', logoutRouter);

app.listen(port, () => console.log('Server is listening on port: ', port));
