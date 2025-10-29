import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { articlesAPI } from '../services/api';

function ArticleList() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadArticles();
  }, []);

  async function loadArticles() {
    try {
      setLoading(true);
      const response = await articlesAPI.getAll();
      setArticles(response.data.data);
      setError(null);
    } catch (err) {
      setError('Не удалось загрузить статьи');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('ru-RU', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }

  function getPreview(content) {
    return content.length > 200 ? content.substring(0, 200) + '...' : content;
  }

  if (loading) {
    return <div className="loading">Загрузка статей...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div>
      <h1 className="page-title">Все статьи</h1>
      {articles.length === 0 ? (
        <p>Пока нет статей. <Link to="/add">Добавьте первую!</Link></p>
      ) : (
        <div className="articles-list">
          {articles.map(article => (
            <Link 
              key={article.id} 
              to={`/article/${article.id}`} 
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              <div className="article-card">
                <h2>{article.title}</h2>
                <div className="article-meta">
                  <span>{formatDate(article.created_at)}</span>
                  <span>{article.comments?.length || 0} комментариев</span>
                </div>
                <p className="article-preview">{getPreview(article.content)}</p>
                <span className="read-more">Читать далее →</span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default ArticleList;
