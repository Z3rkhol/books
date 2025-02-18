const Author = require('../models/author');
const Book = require('../models/book');
const Genre = require('../models/genre');

exports.createAuthor = async (req, res) => {
  try {
    const { firstName, lastName } = req.body;
    const author = await Author.create({ firstName, lastName });
    res.status(201).json(author);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error creating author.' });
  }
};

exports.getAuthors = async (req, res) => {
  try {
    const { firstName, lastName } = req.query;
    const filter = {};
    if (firstName) filter.firstName = firstName;
    if (lastName) filter.lastName = lastName;

    const authors = await Author.findAll({ where: filter });
    res.json(authors);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error fetching authors.' });
  }
};

exports.getAuthorDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const author = await Author.findByPk(id, {
      include: {
        model: Book,
        include: Genre,
      },
    });

    if (!author) {
      return res.status(404).json({ error: 'Author not found.' });
    }

    // Spočítáme počet knih a určíme oblíbený žánr
    const bookCount = author.Books ? author.Books.length : 0;
    let favoriteGenre = null;
    if (author.Books && author.Books.length > 0) {
      const genreCount = {};
      author.Books.forEach(book => {
        if (book.Genre) {
          const genreName = book.Genre.name;
          genreCount[genreName] = (genreCount[genreName] || 0) + 1;
        }
      });
      let maxCount = 0;
      for (const genre in genreCount) {
        if (genreCount[genre] > maxCount) {
          maxCount = genreCount[genre];
          favoriteGenre = genre;
        }
      }
    }

    res.json({
      author,
      bookCount,
      books: author.Books,
      favoriteGenre
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error fetching author details.' });
  }
};