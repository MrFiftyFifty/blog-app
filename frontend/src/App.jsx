import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import ArticleList from './pages/ArticleList';
import ArticleDetail from './pages/ArticleDetail';
import AddArticle from './pages/AddArticle';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app">
        <header className="header">
          <div className="container">
            <h1><Link to="/" className="logo">Блог</Link></h1>
            <nav>
              <Link to="/" className="nav-link">Главная</Link>
              <Link to="/add" className="nav-link add-btn">Добавить статью</Link>
            </nav>
          </div>
        </header>

        <main className="main">
          <div className="container">
            <Routes>
              <Route path="/" element={<ArticleList />} />
              <Route path="/article/:id" element={<ArticleDetail />} />
              <Route path="/add" element={<AddArticle />} />
            </Routes>
          </div>
        </main>

        <footer className="footer">
          <div className="container">
            <p>© 2025 Блог. Все права защищены.</p>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;
