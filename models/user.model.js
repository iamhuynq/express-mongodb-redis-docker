const mongoose = require('mongoose');

const userSchemal = new mongoose.Schema({
    email: String,
    password: String,
    avatar: String,
});

const User = mongoose.model('user', userSchemal);

module.exports = User;
