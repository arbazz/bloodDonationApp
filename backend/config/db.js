const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://test:test@cluster0-ir0i4.mongodb.net/test?retryWrites=true&w=majority');

module.exports = mongoose;