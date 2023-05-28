const { Error } = require('mongoose');
const { isCelebrateError } = require('celebrate');
const { CastError } = require('../errors/CastError');
const { EntityExistsError } = require('../errors/EntityExistsError');
const { errorsMessages } = require('./constants');

module.exports.checkErrorType = (error) => {
  if (isCelebrateError(error)) {
    return new CastError(error.details.get('body').details[0].message);
  }
  if (error instanceof Error.CastError || error instanceof Error.ValidationError) {
    return new CastError(error.message);
  }
  if (error.code === 11000) {
    return new EntityExistsError(errorsMessages.EmailExists);
  }
  return error;
};
