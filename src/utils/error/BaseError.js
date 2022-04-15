class BaseError extends Error {
  /**
   *
   * @param {string} message
   * @param {integer} statusCode
   * @param {boolean} isOperational
   * @param {string} name
   */
  constructor(message, statusCode, isOperational, name) {
    super(name);

    Object.setPrototypeOf(this, new.target.prototype);
    this.name = name;
    this.message = message;
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    Error.captureStackTrace(this);
  }
}

module.exports = BaseError;
