const express = require('express');
const router = express.Router();
const genreController = require('../controllers/genreController');

// Přidání nového žánru
router.post('/', genreController.createGenre);
// Seznam žánrů
router.get('/', genreController.getGenres);

module.exports = router;