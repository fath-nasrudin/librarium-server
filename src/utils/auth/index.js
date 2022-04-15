const jwt = require('jsonwebtoken');
const config = require('../../config');
/**
 * Generate jwt token
 * @param {string} id
 * @returns {string} jwt string
 */
const generateToken = (id) => jwt.sign(
  { id },
  config.jwt.secret,
  {
    expiresIn: config.jwt.exp,
  },

);

module.exports = {
  generateToken,
};
