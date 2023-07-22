const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minLength: 5
    },
    username: {
        type: String,
        required: true
    }
})

const Users = mongoose.model('Users', UserSchema);

module.exports = { Users }