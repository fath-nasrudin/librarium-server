const winston = require('winston');
const config = require('../../config');

// option setting for transports
const options = {
  file: {
    level: 'info',
    filename: './logs/app.log',
    handleExeptions: true,
    json: true,
    maxsize: 5242880, // 5MB
    maxFiles: 5,
    colorize: false,
  },
  console: {
    level: 'info',
    handleExeptions: true,
    json: false,
    colorize: true,
  },
};

// create logger
const logger = winston.createLogger({
  levels: winston.config.npm.levels, // levelling
  transports: [
    new winston.transports.File(options.file),

  ],
  exitOnError: false,
});

if (config.node.env !== 'production') {
  logger.add(new winston.transports.Console(options.console));
}

module.exports = logger;
