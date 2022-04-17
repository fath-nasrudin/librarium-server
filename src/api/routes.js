const router = require('express').Router();
const userRoutes = require('./user/user.routes');
const bookRoutes = require('./book/book.routes');
const transactionRoutes = require('./transaction/transaction.routes');
const authorRoutes = require('./author/author.routes');
const categoryRoutes = require('./category/category.routes');
const meRoutes = require('./me/me.routes');

router.use('/users', userRoutes);
router.use('/me', meRoutes);
router.use('/books', bookRoutes);
router.use('/transactions', transactionRoutes);
router.use('/authors', authorRoutes);
router.use('/categories', categoryRoutes);

module.exports = router;
