const jwt = require('jsonwebtoken');
const { UnauthorizedError } = require('../errors/UnauthorizedError');
const { errorsMessages } = require('../utils/constants');

const { NODE_ENV, JWT_SECRET } = process.env;

const extractToken = (header) => header.replace('Bearer ', '');

const authHandler = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer')) {
    return next(new UnauthorizedError(errorsMessages.NoAuth));
  }
  const token = extractToken(authorization);
  let payload;
  try {
    payload = jwt.verify(token, NODE_ENV === 'PRODUCTION' ? JWT_SECRET : 'secret-key');
  } catch (error) {
    return next(new UnauthorizedError(errorsMessages.NoAuth));
  }
  req.user = payload;
  return next();
};

module.exports = authHandler;
