const mongoose = require('mongoose');

// id *
// user:id *
// book: id *
// status: str * next update be an id
// book_date: date
// borrow_date: date
// return_date: date
// timestamps
const transactionSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  book: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Book',
  },
  status: { // booked borrowed returned cancelled
    type: String,
    default: 'booked',
  },
  bookDate: {
    type: Date,
    default: null,
  },
  borrowDate: {
    type: Date,
    default: null,
  },
  returnDate: {
    type: Date,
    default: null,
  },

}, { timestamps: true });

const Transaction = mongoose.model('Transaction', transactionSchema);

module.exports = Transaction;
