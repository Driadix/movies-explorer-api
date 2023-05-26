const User = require('../models/user');
const { NotFoundError } = require('../errors/NotFoundError');
const { tryCatch } = require('../utils/tryCatch');

module.exports.getMyUser = tryCatch(async (req, res) => {
  const { _id } = req.user;

  const user = await User.findById(req.user._id);
  if (!user) throw new NotFoundError('Пользователь не найден');

  res.status(200).send(user);
});

module.exports.updateProfile = tryCatch(async (req, res) => {
  const { name, email } = req.body;

  const user = await User.findByIdAndUpdate(
    req.user._id,
    { name, email },
    { new: true, runValidators: true },
  );
  if (!user) throw new NotFoundError('Пользователь не найден');

  res.status(200).send(user);
});