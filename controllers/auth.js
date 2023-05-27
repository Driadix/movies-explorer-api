const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { NODE_ENV, JWT_SECRET } = require('../config');
const User = require('../models/user');
const { tryCatch } = require('../utils/tryCatch');

module.exports.register = tryCatch(async (req, res) => {
  const {
    name, email, password,
  } = req.body;

  const hashPsw = await bcrypt.hash(password, 16);

  const newUser = await User.create({
    name, email, password: hashPsw,
  });

  const newUserObject = newUser.toObject();
  delete newUserObject.password;

  res.status(201).send(newUserObject);
});

module.exports.login = tryCatch(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findUserByCredentials(email, password);
  res.send({ token: jwt.sign({ _id: user._id }, NODE_ENV === 'PRODUCTION' ? JWT_SECRET : 'secret-key', { expiresIn: '7d' }) });
});
