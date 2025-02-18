import { useState, useEffect } from 'react';

function BooksPage() {
  const [books, setBooks] = useState([]);
  const [title, setTitle] = useState('');
  const [releaseDate, setReleaseDate] = useState('');
  const [authorId, setAuthorId] = useState('');
  const [genreId, setGenreId] = useState('');
  const [authors, setAuthors] = useState([]);
  const [genres, setGenres] = useState([]);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState({ title: '', authorId: '', genreId: '' });

  useEffect(() => {
    fetch('http://localhost:5000/api/books')
      .then(res => res.json())
      .then(data => setBooks(data))
      .catch(err => setError(err));

    fetch('http://localhost:5000/api/authors')
      .then(res => res.json())
      .then(data => setAuthors(data))
      .catch(err => setError(err));

    fetch('http://localhost:5000/api/genres')
      .then(res => res.json())
      .then(data => setGenres(data))
      .catch(err => setError(err));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newBook = { title, releaseDate, authorId, genreId };
    fetch('http://localhost:5000/api/books', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newBook),
    })
      .then(res => res.json())
      .then(data => {
        setBooks([...books, data]);
        setTitle('');
        setReleaseDate('');
        setAuthorId('');
        setGenreId('');
      })
      .catch(err => setError(err));
  };

  const filteredBooks = books.filter(book =>
    book.title.toLowerCase().includes(filter.title.toLowerCase()) &&
    (filter.authorId === '' || book.authorId === filter.authorId) &&
    (filter.genreId === '' || book.genreId === filter.genreId)
  );

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Seznam knih</h1>
      {error && <div className="text-red-500">{error.message}</div>}

      <div className="mb-4">
        <input
          type="text"
          placeholder="Hledat podle názvu"
          value={filter.title}
          onChange={(e) => setFilter({ ...filter, title: e.target.value })}
          className="border p-2 rounded w-full"
        />
        <select
          value={filter.authorId}
          onChange={(e) => setFilter({ ...filter, authorId: e.target.value })}
          className="border p-2 rounded w-full mt-2"
        >
          <option value="">Vyberte autora</option>
          {authors.map(author => (
            <option key={author.id} value={author.id}>
              {author.firstName} {author.lastName}
            </option>
          ))}
        </select>
        <select
          value={filter.genreId}
          onChange={(e) => setFilter({ ...filter, genreId: e.target.value })}
          className="border p-2 rounded w-full mt-2"
        >
          <option value="">Vyberte žánr</option>
          {genres.map(genre => (
            <option key={genre.id} value={genre.id}>
              {genre.name}
            </option>
          ))}
        </select>
      </div>

      <ul className="space-y-2 mb-4">
        {filteredBooks.map(book => (
          <li key={book.id} className="border p-2 rounded">
            <div><strong>{book.title}</strong></div>
            <div>Datum vydání: {book.releaseDate}</div>
            <div>
              Autor: {book.Author ? `${book.Author.firstName} ${book.Author.lastName}` : 'N/A'}
            </div>
            <div>
              Žánr: {book.Genre ? book.Genre.name : 'N/A'}
            </div>
          </li>
        ))}
      </ul>

      <h2 className="text-xl font-bold mb-2">Přidat novou knihu</h2>
      <form onSubmit={handleSubmit} className="space-y-2">
        <input
          type="text"
          placeholder="Název knihy"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border p-2 rounded w-full"
          required
        />
        <input
          type="date"
          value={releaseDate}
          onChange={(e) => setReleaseDate(e.target.value)}
          className="border p-2 rounded w-full"
          required
        />
        <select
          value={authorId}
          onChange={(e) => setAuthorId(e.target.value)}
          className="border p-2 rounded w-full"
          required
        >
          <option value="">Vyberte autora</option>
          {authors.map(author => (
            <option key={author.id} value={author.id}>
              {author.firstName} {author.lastName}
            </option>
          ))}
        </select>
        <select
          value={genreId}
          onChange={(e) => setGenreId(e.target.value)}
          className="border p-2 rounded w-full"
          required
        >
          <option value="">Vyberte žánr</option>
          {genres.map(genre => (
            <option key={genre.id} value={genre.id}>
              {genre.name}
            </option>
          ))}
        </select>
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          Přidat knihu
        </button>
      </form>
    </div>
  );
}

export default BooksPage;