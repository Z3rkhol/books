const express = require('express');
const router = express.Router();
const authorController = require('../controllers/authorController');

// Přidání nového autora
router.post('/', authorController.createAuthor);
// Seznam autorů s filtrováním
router.get('/', authorController.getAuthors);
// Detail autora (včetně knih a oblíbeného žánru)
router.get('/:id', authorController.getAuthorDetails);

module.exports = router;