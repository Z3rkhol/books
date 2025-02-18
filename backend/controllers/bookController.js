const Book = require('../models/book');
const Author = require('../models/author');
const Genre = require('../models/genre');

exports.createBook = async (req, res) => {
  try {
    const { title, releaseDate, authorId, genreId } = req.body;
    const book = await Book.create({
      title,
      releaseDate,
      authorId,
      genreId,
    });
    res.status(201).json(book);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error creating book.' });
  }
};

exports.getBooks = async (req, res) => {
  try {
    const { title, releaseDate, authorId, genreId } = req.query;
    const filter = {};
    if (title) filter.title = title;
    if (releaseDate) filter.releaseDate = releaseDate;
    if (authorId) filter.authorId = authorId;
    if (genreId) filter.genreId = genreId;

    const books = await Book.findAll({
      where: filter,
      include: [Author, Genre],
    });
    res.json(books);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error fetching books.' });
  }
};