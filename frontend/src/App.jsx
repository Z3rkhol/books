import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import AuthorsPage from './pages/AuthorsPage';
import BooksPage from './pages/BooksPage';

function App() {
  return (
    <Router>
      <div className="container mx-auto p-4">
        <nav className="mb-4">
          <Link to="/authors" className="mr-4 text-blue-500">Autoři</Link>
          <Link to="/books" className="text-blue-500">Knihy</Link>
        </nav>
        <Routes>
          <Route path="/authors" element={<AuthorsPage />} />
          <Route path="/books" element={<BooksPage />} />
          <Route path="/" element={<AuthorsPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;