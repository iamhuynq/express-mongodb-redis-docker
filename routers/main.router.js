const router = require('express').Router();
const authenticate = require('../middlewares/authenticate');
const Book = require('../models/book.model');

router.get('/', authenticate, (req, res) => {
    Book.find({}, (err, books) => {
        res.render('index', { books });
    });
});

module.exports = router;
