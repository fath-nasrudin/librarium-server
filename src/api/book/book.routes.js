const router = require('express').Router();

const BookController = require('./book.controller');
const { verifyToken, isAdmin } = require('../../middlewares/authHandler');

router.route('/')
  .get(BookController.getBooks) // public
  .post(verifyToken, isAdmin, BookController.createBook) // admin
  .put(verifyToken, isAdmin, BookController.updateBook) // admin
  .delete(verifyToken, isAdmin, BookController.deleteBook); // admin

module.exports = router;
