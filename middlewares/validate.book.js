const validateCreateBook = (req, res, next) => {
    const errors = [];
    const { name, author } = req.body;
    if (!req.files || Object.keys(req.files).length === 0) {
        errors.push('Have no image uploaded!');
    }
    if (!name) {
        errors.push('Have no book name!');
    }
    if (!author) {
        errors.push('Have no book author!');
    }
    if (errors.length) {
        res.render('create_book', {
            errors,
            name,
            author,
        });
        return;
    }
    next();
};

module.exports = validateCreateBook;
