const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const { EntityExistsError } = require('../errors/EntityExistsError');
const { UnauthorizedError } = require('../errors/UnauthorizedError');
const { errorsMessages } = require('../utils/constants');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      minlength: [2, 'Длина строки должна составлять минимум 2 символа, получена строка {VALUE}'],
      maxlength: [30, 'Длина строки должна составлять максимум 30 символов, получена строка {VALUE}'],
      required: [true, 'Необходимо передать поле name в запрос'],
    },
    email: {
      type: String,
      required: [true, 'Необходимо передать поле email в запрос'],
      unique: [true, 'Данный email уже зарегистрирован в системе'],
      validate: [validator.isEmail, 'Переданное поле не является валидной электронной почтой'],
    },
    password: {
      type: String,
      required: [true, 'Необходимо передать поле password в запрос'],
      select: false,
    },
  },
  { versionKey: false },
);

userSchema.post('save', (error, res, next) => {
  if (error.code === 11000) {
    next(new EntityExistsError(errorsMessages.EmailExists));
  } else {
    next();
  }
});

userSchema.statics.findUserByCredentials = async function checkUser(email, password) {
  const user = await this.findOne({ email }).select('+password');
  if (!user) {
    throw new UnauthorizedError(errorsMessages.InvalidCredentials);
  }
  const isMatched = await bcrypt.compare(password, user.password);
  if (!isMatched) {
    throw new UnauthorizedError(errorsMessages.InvalidCredentials);
  }
  return user;
};

module.exports = mongoose.model('user', userSchema);
