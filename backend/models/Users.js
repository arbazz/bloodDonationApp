const mongoose = require('mongoose');

const usersSchema = new mongoose.Schema({
    lastName: String,
    bloodGroup: String,
    email: {
        type: String,
        required: true
    },
    password: {
     type: String,
     required: true,
    },
    firstName: String,
    pushToken: String
});

const Users = mongoose.model('Users', usersSchema);

module.exports = Users;