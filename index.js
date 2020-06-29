const express = require('express');

const app = express();

const port = 3000;

app.set('view engine', 'pug');
app.set('views', './views');

app.listen(port, () => console.log('Server is listening on port: ', port));
