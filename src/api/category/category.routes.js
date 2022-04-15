const router = require('express').Router();

const { verifyToken, isAdmin } = require('../../middlewares/authHandler');
const CategoryController = require('./category.controller');

router.route('/')
  .get(verifyToken, isAdmin, CategoryController.getCategories)
  .post(verifyToken, isAdmin, CategoryController.createCategory)
  .put(verifyToken, isAdmin, CategoryController.updateCategory)
  .delete(verifyToken, isAdmin, CategoryController.deleteCategory);

module.exports = router;
