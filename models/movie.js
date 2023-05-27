const mongoose = require('mongoose');
const { URL_REGEX } = require('../utils/constants');

const movieSchema = new mongoose.Schema(
  {
    country: {
      type: String,
      required: [true, 'Необходимо передать поле country в запрос'],
    },
    director: {
      type: String,
      required: [true, 'Необходимо передать поле director в запрос'],
    },
    duration: {
      type: Number,
      required: [true, 'Необходимо передать поле duration в запрос'],
    },
    year: {
      type: String,
      required: [true, 'Необходимо передать поле year в запрос'],
    },
    description: {
      type: String,
      required: [true, 'Необходимо передать поле description  в запрос'],
    },
    image: {
      type: String,
      required: [true, 'Необходимо передать поле image в запрос'],
    },
    trailerLink: {
      type: String,
      required: [true, 'Необходимо передать поле trailerLink в запрос'],
      validate: URL_REGEX,
    },
    thumbnail: {
      type: String,
      required: [true, 'Необходимо передать поле thumbnail в запрос'],
      validate: URL_REGEX,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
      required: [true, 'Необходимо передать поле owner в запрос'],
    },
    movieId: {
      type: Number,
      required: [true, 'Необходимо передать поле movieId в запрос'],
    },
    nameRU: {
      type: String,
      required: [true, 'Необходимо передать поле nameRU в запрос'],
    },
    nameEN: {
      type: String,
      required: [true, 'Необходимо передать поле nameEN в запрос'],
    },
  },
  { versionKey: false },
);

module.exports = mongoose.model('movie', movieSchema);
