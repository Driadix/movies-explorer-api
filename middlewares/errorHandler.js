const { errorsMessages } = require('../utils/constants');

const errorHandler = (error, req, res, next) => {
  const { statusCode = 500, message } = error;
  res.status(error.statusCode).send({
    message: statusCode === 500 ? errorsMessages.DefaultError : message,
  });
  next();
};

module.exports = errorHandler;
