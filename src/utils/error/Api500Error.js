const httpStatusCodes = require('./httpStatusCodes');
const BaseError = require('./BaseError');

class Api500Error extends BaseError {
  constructor(
    message = 'Internal Server Error',
    statusCode = httpStatusCodes.INTERNAL_SERVER,
    isOperational = true,
    name = 'InternalServer',
  ) {
    super(message, statusCode, isOperational, name);
  }
}

module.exports = Api500Error;
