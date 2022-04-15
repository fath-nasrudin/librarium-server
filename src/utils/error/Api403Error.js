const httpStatusCodes = require('./httpStatusCodes');
const BaseError = require('./BaseError');

class Api403Error extends BaseError {
  constructor(
    message = 'Forbidden',
    statusCode = httpStatusCodes.FORBIDDEN,
    isOperational = true,
    name = 'Forbidden',
  ) {
    super(message, statusCode, isOperational, name);
  }
}

module.exports = Api403Error;
