const router = require('express').Router();

const UserController = require('./user.controller');
const { verifyToken, isAdmin } = require('../../middlewares/authHandler');

router.route('/')
  .get(verifyToken, UserController.getUsers) // get all user
  .put()
  .delete(verifyToken, isAdmin, UserController.deleteUser);

router.route('/register')
  .post(UserController.createUser);

router.route('/login')
  .post(UserController.authUser);

module.exports = router;
