const httpStatusCodes = require('./httpStatusCodes');
const BaseError = require('./BaseError');

class Api401Error extends BaseError {
  constructor(
    message = 'Not Authorized',
    statusCode = httpStatusCodes.NOT_AUTHORIZED,
    isOperational = true,
    name = 'NotAuthorized',
  ) {
    super(message, statusCode, isOperational, name);
  }
}

module.exports = Api401Error;
