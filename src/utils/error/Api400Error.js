const httpStatusCodes = require('./httpStatusCodes');
const BaseError = require('./BaseError');

class Api400Error extends BaseError {
  constructor(
    message,
    statusCode = httpStatusCodes.BAD_REQUEST,
    isOperational = true,
    name = 'BadRequest',
  ) {
    super(message, statusCode, isOperational, name);
  }
}

module.exports = Api400Error;
