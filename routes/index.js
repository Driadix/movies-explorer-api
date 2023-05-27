const routes = require('express').Router();
const notFoundHandler = require('../middlewares/notFoundHandler');
const authHandler = require('../middlewares/auth');

const {
  loginValidation,
  registerValidation,
} = require('../utils/validation/authValidation');

const { login, register } = require('../controllers/auth');

routes.post('/signin', loginValidation, login);

routes.post('/signup', registerValidation, register);

routes.use('/users', authHandler, require('./users'));
routes.use('/movies', authHandler, require('./movies'));

routes.use(authHandler, notFoundHandler);

module.exports = routes;
