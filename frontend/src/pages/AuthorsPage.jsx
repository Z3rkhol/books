import { useState, useEffect } from 'react';

function AuthorsPage() {
  const [authors, setAuthors] = useState([]);
  const [nameFilter, setNameFilter] = useState('');
  const [selectedAuthor, setSelectedAuthor] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('http://localhost:5000/api/authors')
      .then(res => res.json())
      .then(data => setAuthors(data))
      .catch(err => setError(err));
  }, []);

  const handleAuthorClick = (authorId) => {
    fetch(`http://localhost:5000/api/authors/${authorId}`)
      .then(res => res.json())
      .then(data => setSelectedAuthor(data))
      .catch(err => setError(err));
  };

  const filteredAuthors = authors.filter(author =>
    `${author.firstName} ${author.lastName}`.toLowerCase().includes(nameFilter.toLowerCase())
  );

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Seznam autorů</h1>
      {error && <div className="text-red-500">{error.message}</div>}

      <div className="mb-4">
        <input
          type="text"
          placeholder="Filtrovat podle jména a příjmení"
          value={nameFilter}
          onChange={(e) => setNameFilter(e.target.value)}
          className="border p-2 rounded w-full"
        />
      </div>

      <ul className="space-y-2">
        {filteredAuthors.map(author => (
          <li key={author.id} className="border p-2 rounded cursor-pointer" onClick={() => handleAuthorClick(author.id)}>
            {author.firstName} {author.lastName}
          </li>
        ))}
      </ul>

      {selectedAuthor && (
        <div className="mt-4 p-4 border rounded">
          <h2 className="text-xl font-bold">{selectedAuthor.firstName} {selectedAuthor.lastName}</h2>
          <p>Počet knih: {selectedAuthor.bookCount}</p>
          <p>Oblíbený žánr: {selectedAuthor.favoriteGenre}</p>
          <h3 className="font-bold mt-2">Seznam knih:</h3>
          <ul className="list-disc pl-4">
            {selectedAuthor.books.map(book => (
              <li key={book.id}>{book.title} ({book.releaseDate})</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default AuthorsPage;