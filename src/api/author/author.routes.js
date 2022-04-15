const router = require('express').Router();

const { verifyToken, isAdmin } = require('../../middlewares/authHandler');
const AuthorController = require('./author.controller');

router.route('/')
  .post(verifyToken, isAdmin, AuthorController.createAuthor)
  .get(verifyToken, isAdmin, AuthorController.getAuthors)
  .post(verifyToken, isAdmin, AuthorController.createAuthor)

  .put(verifyToken, isAdmin, AuthorController.updateAuthor)
  .delete(verifyToken, isAdmin, AuthorController.deleteAuthor);

module.exports = router;
