const Api400Error = require('./Api400Error');
const Api401Error = require('./Api401Error');
const Api403Error = require('./Api403Error');
const Api404Error = require('./Api404Error');

const Api500Error = require('./Api500Error');

const errors = {
  Api400Error,
  Api401Error,
  Api403Error,
  Api404Error,
  Api500Error,

};

module.exports = errors;
