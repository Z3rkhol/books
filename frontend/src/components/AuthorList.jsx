import  { useEffect, useState } from 'react';

function AuthorList() {
  const [authors, setAuthors] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Předpokládáme, že backend běží na http://localhost:5000
    fetch('http://localhost:5000/api/authors')
      .then((res) => {
        if (!res.ok) {
          throw new Error('Chyba při načítání dat');
        }
        return res.json();
      })
      .then((data) => setAuthors(data))
      .catch((err) => setError(err));
  }, []);

  if (error) return <div>Error: {error.message}</div>;
  if (authors.length === 0) return <div>Loading...</div>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Seznam autorů</h1>
      <ul className="space-y-2">
        {authors.map((author) => (
          <li key={author.id} className="border p-2 rounded">
            {author.firstName} {author.lastName}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AuthorList;