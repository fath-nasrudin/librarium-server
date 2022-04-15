const jwt = require('jsonwebtoken');
const config = require('../config');
const User = require('../models/user');
const { Api401Error, Api400Error, Api403Error } = require('../utils/error');

const verifyToken = async (req, res, next) => {
  try {
    // if the authorization is not in the right format
    if (!req.headers.authorization || !req.headers.authorization.startsWith('Bearer')) {
      throw new Api401Error();
    }

    const [, token] = req.headers.authorization.split(' ');
    if (!token) {
      throw new Api401Error();
    }

    const decoded = await jwt.verify(token, config.jwt.secret);
    if (!decoded) throw new Api400Error('Wrong Token');
    const user = await User.findById(decoded.id).select('-password').populate('role');

    // is needed to check if user exist or not?
    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};

const isAdmin = (req, res, next) => {
  // take the req.user.role.name
  // if role === admin let it pass,
  // if not send 403 error
  try {
    if (req.user.role.name !== 'admin') {
      throw new Api403Error();
    }
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  verifyToken,
  isAdmin,
};
