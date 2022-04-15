require('dotenv').config();

const config = {
  port: process.env.PORT || 3000,
  db: {
    uri: process.env.MONGODB_URI || 'mongodb://localhost:27017/librarium',
  },
  jwt: {
    secret: process.env.JWT_SECRET,
    exp: '30d',
  },
  node: {
    env: process.env.NODE_ENV,
  },
};

module.exports = config;
