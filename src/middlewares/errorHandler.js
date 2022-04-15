const BaseError = require('../utils/error/BaseError');
// const logger = require('../utils/logger/logger');

const isOperationalError = (err) => {
  if (err instanceof BaseError) {
    return err.isOperational;
  }
  return false;
};

const logError = (err) => {
  console.log(err);
};

const logErrorMiddleware = (err, req, res, next) => {
  if (!isOperationalError(err)) {
    logError(err);
  }
  next(err);
};

const returnError = (err, req, res, next) => {
  res.status(err.statusCode || 500).send({
    message: err.message,
  });
  next();
};

module.exports = {
  logError,
  logErrorMiddleware,
  returnError,
  isOperationalError,
};
