const mongoose = require('mongoose');

const bookSchemal = new mongoose.Schema({
    name: String,
    author: String,
    image: String,
});

const Book = mongoose.model('book', bookSchemal);

module.exports = Book;
