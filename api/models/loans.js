const mongoose = require('mongoose');

const loanSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    date: { type: Date, required: true },
    expirationDate: {type: Date, required: true},
    bookId: { type: mongoose.Schema.Types.ObjectId, required: true}
})

module.exports = mongoose.model('Loan', loanSchema);