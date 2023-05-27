const router = require('express').Router();

const { addMyMovieValidation, deleteMyMovieValidation } = require('../utils/validation/movieValidation');

const { getMyMovies, addMyMovie, deleteMyMovie } = require('../controllers/movies');

router.get('/', getMyMovies);

router.post('/', addMyMovieValidation, addMyMovie);

router.delete('/:myMovieId', deleteMyMovieValidation, deleteMyMovie);

module.exports = router;
