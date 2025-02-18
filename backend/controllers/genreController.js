const Genre = require('../models/genre');

exports.createGenre = async (req, res) => {
  try {
    const { name } = req.body;
    const genre = await Genre.create({ name });
    res.status(201).json(genre);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error creating genre.' });
  }
};

exports.getGenres = async (req, res) => {
  try {
    const genres = await Genre.findAll();
    res.json(genres);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error fetching genres.' });
  }
};