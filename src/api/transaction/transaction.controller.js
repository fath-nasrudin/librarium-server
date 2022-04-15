const Transaction = require('../../models/transaction');
const Book = require('../../models/book');
const { Api400Error, Api404Error, Api500Error } = require('../../utils/error');
const User = require('../../models/user');

// helpers
const updateBookStock = async (model, transaction, stock) => {
  if (stock === null) {
    return;
  }
  await model.findByIdAndUpdate(
    transaction.book._id,
    { stock: transaction.book.stock + stock },
    { returnDocument: 'after' },
  );
};

class TransactionController {
  static async getTransactions(req, res, next) {
    try {
      let transactions;
      if (req.user.role.name === 'user') {
        transactions = await Transaction
          .find({ user: req.user._id })
          .populate('book', 'title')
          .select('-user');
      } else if (req.user.role.name === 'admin') {
        transactions = await Transaction
          .find()
          .populate('book', 'title')
          .populate('user', 'email');
      }
      if (!transactions) throw new Api500Error();
      res.send({ transactions });
    } catch (error) {
      next(error);
    }
  }

  /**
   * if user role is 'user', then fields is bookId*
   *
   * if the user role is 'admin',
   * the fields is bookId*, userId*, status
   *
   * asterisk (*) mean required
   */
  static async createTransaction(req, res, next) {
    try {
      const { bookId } = req.body;

      let userId;
      let status;

      // TODO: find the effective way to check is the id exist

      // check book availability
      const book = await Book.findById(bookId);
      if (!book) throw new Api404Error('Book not found');
      if (book.stock <= 0) throw new Api400Error('Book out of stock');

      if (req.user.role.name === 'admin') {
        // check user
        const user = await User.findById(req.body.userId);
        if (!user) throw new Api404Error('User not found');

        const statuses = ['booked', 'borrowed'];
        userId = user._id;
        status = req.body.status;

        // status validation
        if (!statuses.includes(status)) {
          throw new Api400Error(
            'When created status can only have value "booked" or "borrowed"',
          );
        }
      } else if (req.user.role.name === 'user') {
        userId = req.user._id;
      }

      // basic validation
      if (!userId || !bookId) throw new Api400Error('please fill all required field');

      const transaction = {
        user: userId,
        book: bookId,
        status,
      };

      const createdTransaction = await Transaction.create(transaction);
      if (!createdTransaction) throw new Api500Error();

      // if transaction success, decrement the book stock
      await Book.findByIdAndUpdate(book._id, { stock: book.stock - 1 });
      res.status(201).send({ transaction: createdTransaction });
    } catch (error) {
      next(error);
    }
  }

  // if status is cancelled or returned, increment the book stock
  static async updateTransaction(req, res, next) {
    // only take status changes
    const { id } = req.query;
    const { status } = req.body;
    const statuses = ['booked', 'borrowed', 'returned', 'cancelled'];

    let bookDate;
    let borrowDate;
    let returnDate;
    let changeStock = null;

    switch (status) {
      case 'booked': bookDate = Date.now();
        break;
      case 'borrowed': borrowDate = Date.now();
        break;
      case 'returned': returnDate = Date.now();
        break;
      default:
        break;
    }

    try {
      // input validation
      if (!status) throw new Api400Error('Please fill all required field');
      if (!statuses.includes(status)) {
        throw new Api400Error('Status only accept "booked", "borrowed", "returned", "cancelled"');
      }

      // take before-transaction
      const beforeTransaction = await Transaction.findById(id).populate('book', 'stock');

      if (!beforeTransaction) throw new Api404Error('Transaction not found');

      const beforeStatus = beforeTransaction.status;

      // is status changed
      if (beforeStatus === status) {
        return res.status(204).send();
      }

      if (beforeStatus === 'cancelled' || beforeStatus === 'returned') {
        if (status === 'booked' || status === 'borrowed') { // current status
          //     // check availability
          if (beforeTransaction.book.stock <= 0) {
            throw new Api400Error('Book is out of stock');
          }
        }
        // set the book to decrement
        changeStock = -1;
      } else
      // // increment
      if (beforeStatus === 'booked' || beforeStatus === 'borrowed') {
        if (status === 'cancelled' || status === 'returned') {
          changeStock = 1;
        }
      }

      const afterTransaction = await Transaction
        .findByIdAndUpdate(id, {
          status, bookDate, borrowDate, returnDate,
        }, { returnDocument: 'after' });

      if (!afterTransaction) throw new Api500Error();

      await updateBookStock(Book, beforeTransaction, changeStock);
      res.send({ transaction: afterTransaction });
    } catch (error) {
      next(error);
    }
  }

  // if deleted, increment the book stock
  static async deleteTransaction(req, res, next) {
    // take id query
    // if transaction is booked or borrowed
    // increment
    const { id } = req.query;
    let changeStock = null;

    try {
      const transaction = await Transaction.findByIdAndDelete(id)
        .populate('book', 'stock totalBook');
      if (!transaction) throw new Api404Error('Transaction not found');

      if (
        transaction.status === 'booked'
        || transaction.status === 'borrowed') {
        changeStock = 1;
      }

      await updateBookStock(Book, transaction, changeStock);

      res.send({ id: transaction._id });
      // res.send({ transaction });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = TransactionController;
