const Book = require('../../models/book');
const { Api500Error, Api400Error } = require('../../utils/error');

class BookController {
  /**
   * public
   */
  static async getBooks(req, res, next) {
    // next update: implement filter, sortation, categories, pagination, dst.

    try {
      const books = await Book
        .find()
        .populate('authors', 'name')
        .populate('categories', 'name');

      if (!books) throw new Api500Error();
      res.send({ books });
    } catch (error) {
      next(error);
    }
  }

  static async createBook(req, res, next) {
    // validate
    // take book data
    // try to create
    // send current data to client

    try {
      // validation
      const { isbn, title } = req.body;
      if (!isbn || !title) throw new Api400Error('validation failed. please fill the mandatory field');

      const existBook = await Book.findOne({ isbn });
      if (existBook) throw new Api400Error('Book already registered');
      // create book
      const createdBook = await Book.create(req.body);

      if (!createdBook) throw new Api500Error();

      res.status(201).send({ book: createdBook });
    } catch (error) {
      next(error);
    }
  }

  static async updateBook(req, res, next) {
    // take the id
    // update based on its id
    try {
      const { id } = req.query;
      const updatedBook = await Book.findByIdAndUpdate(id, req.body, { returnDocument: 'after' });
      if (!updatedBook) throw new Api500Error();

      res.send({ book: updatedBook });
    } catch (error) {
      next(error);
    }
  }

  static async deleteBook(req, res, next) {
    try {
      const { id } = req.query;

      await Book.findByIdAndDelete(id);
      res.send({ bookId: id });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = BookController;
