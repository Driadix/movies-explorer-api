const { celebrate, Joi } = require('celebrate');
const URL_REGEX = require('../constants');

const addMyMovieValidation = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().pattern(RegExp(URL_REGEX)).required(),
    trailerLink: Joi.string().pattern(RegExp(URL_REGEX)).required(),
    thumbnail: Joi.string().pattern(RegExp(URL_REGEX)).required(),
    movieId: Joi.number().required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
  }),
});

const deleteMyMovieValidation = celebrate({
  params: Joi.object().keys({
    myMovieId: Joi.string().length(24).hex().required(),
  }),
});

module.exports = {
  addMyMovieValidation,
  deleteMyMovieValidation,
};
