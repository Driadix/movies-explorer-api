const { NotFoundError } = require('../errors/NotFoundError');
const { errorsMessages } = require('../utils/constants');

const notFoundHandler = (req, res, next) => next(new NotFoundError(errorsMessages.NotFound));

module.exports = notFoundHandler;
