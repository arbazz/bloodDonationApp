const mongoose = require('mongoose');

const volunteerSchema  = new mongoose.Schema({
    userId: String,
    userName: String,
    bloodGroup: String,
    status: String,
    docId: String,
    donated: Boolean
})

const volunteers = mongoose.model('Volunteer', volunteerSchema);

module.exports = volunteers;