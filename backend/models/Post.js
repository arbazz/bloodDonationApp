const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    bloodGroup: String,
    units: String,
    urgency: String,
    country: String,
    state: String,
    city: String,
    hospital: String,
    relation: String,
    contact: String,
    instruction: String,
    userId: String,
    userName: String,
    volunteer: Number,
    fulfilled: Boolean
});

const post = mongoose.model('Posts', postSchema);

module.exports = post;