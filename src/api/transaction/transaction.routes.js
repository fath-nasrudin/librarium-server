const router = require('express').Router();

const TransactionController = require('./transaction.controller');
const { verifyToken, isAdmin } = require('../../middlewares/authHandler');
// get transaction: user: their own transaction, admin: all transaction
// create transaction: user: only booking, admin: all, cancelled automatic
// update transaction
// delete transaction
router.route('/')
  .get(verifyToken, isAdmin, TransactionController.getTransactions)
  .post(verifyToken, isAdmin, TransactionController.createTransaction)
  .put(verifyToken, isAdmin, TransactionController.updateTransaction)
  .delete(verifyToken, isAdmin, TransactionController.deleteTransaction);

// router.route('/{id}')
//   .get(verifyToken, TransactionController.getSpecificTransaction);

module.exports = router;
