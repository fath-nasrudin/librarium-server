const mongoose = require('mongoose');

// id *
// isbn *
// title *
// description
// images
// total_book
// stock
// published_year
// categories[id]
// authors[id]
// timestamp
const bookSchema = new mongoose.Schema({
  isbn: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    images: [{
      type: String,
    }],
  },
  totalBook: {
    type: Number,
    default: 0,
  },
  stock: {
    type: Number,
    default: 0,
  },
  publishedYear: {
    type: Number,
    default: null,
  },
  authors: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Author',
  }],
  categories: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
  }],
}, { timestamps: true });

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;
