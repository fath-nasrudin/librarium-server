const httpStatusCodes = require('./httpStatusCodes');
const BaseError = require('./BaseError');

class Api404Error extends BaseError {
  constructor(
    message,
    statusCode = httpStatusCodes.NOT_FOUND,
    isOperational = true,
    name = 'NotFound',
  ) {
    super(message, statusCode, isOperational, name);
  }
}

module.exports = Api404Error;
