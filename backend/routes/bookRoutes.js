const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');

// Přidání nové knihy
router.post('/', bookController.createBook);
// Seznam knih s filtrováním
router.get('/', bookController.getBooks);

module.exports = router;