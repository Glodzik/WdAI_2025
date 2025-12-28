import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import BlogList from './components/Blog';
import Article from './components/Article';
import AddArticle from './components/AddArticle';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <nav className="navbar">
          <div className="nav-content">
            <Link to="/" className="logo">Blog</Link>
            <div className="nav-links">
              <Link to="/" className="nav-link">Strona główna</Link>
              <Link to="/blog" className="nav-link">Artykuły</Link>
            </div>
          </div>
        </nav>

        <div className="container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/blog" element={<BlogList />} />
            <Route path="/article/:id" element={<Article />} />
            <Route path="/dodaj" element={<AddArticle />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;