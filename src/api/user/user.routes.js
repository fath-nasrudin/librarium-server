const router = require('express').Router();

const UserController = require('./user.controller');
const { verifyToken, isAdmin } = require('../../middlewares/authHandler');

router.route('/')
  .get(verifyToken, isAdmin, UserController.getUsers) // get all user
  .put(verifyToken, isAdmin, UserController.updateUser)
  .delete(verifyToken, isAdmin, UserController.deleteUser);

// public access for temporary
router.route('/admin/register')
  .post(UserController.createAdmin);

router.route('/register')
  .post(UserController.createUser);

router.route('/login')
  .post(UserController.authUser);

module.exports = router;
