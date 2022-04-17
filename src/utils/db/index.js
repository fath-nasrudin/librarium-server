const mongoose = require('mongoose');

const config = require('../../config');
const logger = require('../logging/logger');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(config.db.uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    // change the console.log to winston logger
    logger.info(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    logger.error(error);
    process.exit(1);
  }
};

const disconnectDB = async () => {
  try {
    await mongoose.disconnect();
    logger.info('db disconnected');
  } catch (error) {
    logger.error(error);
    process.exit(1);
  }
};
module.exports = {
  connectDB,
  disconnectDB,
};
