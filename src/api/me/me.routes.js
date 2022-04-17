const router = require('express').Router();

const { verifyToken } = require('../../middlewares/authHandler');

const UserController = require('../user/user.controller');
const TransactionController = require('../transaction/transaction.controller');

// for user with role "user"

router.route('/')
  .get(verifyToken, UserController.getUsers)
  .put(verifyToken, UserController.updateUser)
  .delete(verifyToken, UserController.deleteUser);

router.route('/transactions')
  .get(verifyToken, TransactionController.getTransactions)
  .post(verifyToken, TransactionController.createTransaction);

module.exports = router;
