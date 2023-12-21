const mongoose = require('mongoose');

const bookSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    ISBN: {
        type: String,
        unique: true
    },
    publicationYear: {
        type: Number,
        required: true
    },
    genre: {
        type: String,
        required: true
    },
    publisher: {
        type: String
    },
    url: {
        type: String
    }

})

module.exports = mongoose.model('Book', bookSchema);