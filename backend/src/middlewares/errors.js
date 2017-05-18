const logger = require('../config/logger');

const ErrorHandlerMiddleware = {
  notFound: (res, req, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
  },

  generic: (err, req, res, next) => {
    if (!err) return next();

    logger.error(err);

    res
      .status(err.status || 500)
      .send(err);
  },
};

module.exports = ErrorHandlerMiddleware;
