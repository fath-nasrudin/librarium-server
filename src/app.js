const express = require('express');
const swaggerUI = require('swagger-ui-express');

const apiDocumentation = require('../docs/apidoc');
const routes = require('./api/routes');
const config = require('./config');
const { returnError, logErrorMiddleware } = require('./middlewares/errorHandler');
const connectDB = require('./utils/db');
const httpLogger = require('./utils/logging/httpLogger');
const logger = require('./utils/logging/logger');

const app = express();

// try to making connection to database
connectDB();

// body parser
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// api-documentation
app.use('/documentation', swaggerUI.serve, swaggerUI.setup(apiDocumentation));

// logging http request
app.use(httpLogger);

// all routes
app.use('/api', routes);

// catch all error
app.use(logErrorMiddleware);
app.use(returnError);

app.listen(config.port, () => {
  logger.info(`listening on port ${config.port}`);
});
