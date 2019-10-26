const mongoose = require('mongoose');

const commnentSchema  = new mongoose.Schema({
    userId: String,
    userName: String,
    comment: String,
    docId: String
})

const comment = mongoose.model('Comment', commnentSchema);

module.exports = comment;