const Movie = require('../models/movie');
const { NotFoundError } = require('../errors/NotFoundError');
const { NotEnoughPermissionError } = require('../errors/NotEnoughPermissionError');
const { errorsMessages } = require('../utils/constants');
const { tryCatch } = require('../utils/tryCatch');

module.exports.getMyMovies = tryCatch(async (req, res) => {
  const movies = await Movie.find({ owner: req.user._id });

  res.status(200).send(movies);
});

module.exports.addMyMovie = tryCatch(async (req, res) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
  } = req.body;
  let movie = await Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    owner: req.user._id,
    movieId,
    nameRU,
    nameEN,
  });

  movie = await movie.populate('owner');
  res.status(201).send(movie);
});

module.exports.deleteMyMovie = tryCatch(async (req, res) => {
  const { myMovieId } = req.params;

  const movie = await Movie.findById(myMovieId);
  if (!movie) throw new NotFoundError(errorsMessages.NoMovie);
  if (movie.owner.toString() !== req.user._id.toString()) {
    throw new NotEnoughPermissionError(errorsMessages.NoPermission);
  }
  await movie.deleteOne();
  res.status(200).send(movie);
});
