const Movie = require('../models/movie');
const { NotFoundError } = require('../errors/NotFoundError');
const { NotEnoughPermissionError } = require('../errors/NotEnoughPermissionError');
const { tryCatch } = require('../utils/tryCatch');

module.exports.getMyMovies = tryCatch(async (req, res) => {
  const movies = await Movie.find({}).populate('owner');

  res.status(200).send(movies);
});

module.exports.addMyMovie = tryCatch(async (req, res) => {
  console.log(req.user._id)
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
  if (!movie) throw new NotFoundError('Фильм с указанным _id не найдена');
  if (movie.owner.toString() !== req.user._id.toString()) throw new NotEnoughPermissionError('Вы не можете удалять чужие фильмы');

  await movie.deleteOne();
  res.status(200).send(movie);
});