const router = require('express').Router();
const validateCreateBook = require('../middlewares/validate.book');
const authenticate = require('../middlewares/authenticate');
const Book = require('../models/book.model');

router.get('/create', authenticate, (req, res) => {
    res.render('create_book');
});

router.post('/create', validateCreateBook, (req, res) => {
    const { name, author } = req.body;
    const { image } = req.files;
    image.mv(`./public/upload/${req.files.image.name}`, (err) => {
        if (err) {
            return res.render('create_book', {
                errors: ['Upload failed, please try again!'],
                name,
                author,
            });
        }
        return Book.create({
            name,
            author,
            image: `/upload/${req.files.image.name}`,
        }).then(() => {
            res.redirect('/');
        });
    });
});

module.exports = router;
