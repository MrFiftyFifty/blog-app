import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { articlesAPI, commentsAPI } from '../services/api';

function ArticleDetail() {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [commentForm, setCommentForm] = useState({
    author_name: '',
    content: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  useEffect(() => {
    loadArticle();
  }, [id]);

  async function loadArticle() {
    try {
      setLoading(true);
      const response = await articlesAPI.getOne(id);
      setArticle(response.data.data);
      setError(null);
    } catch (err) {
      setError('Не удалось загрузить статью');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  async function handleSubmitComment(e) {
    e.preventDefault();
    
    if (!commentForm.author_name || !commentForm.content) {
      alert('Заполните все поля');
      return;
    }

    try {
      setSubmitting(true);
      await commentsAPI.create(id, commentForm);
      setCommentForm({ author_name: '', content: '' });
      setSubmitSuccess(true);
      setTimeout(() => setSubmitSuccess(false), 3000);
      loadArticle();
    } catch (err) {
      alert('Не удалось добавить комментарий');
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  }

  function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('ru-RU', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  if (loading) {
    return <div className="loading">Загрузка статьи...</div>;
  }

  if (error || !article) {
    return (
      <div>
        <div className="error">{error || 'Статья не найдена'}</div>
        <Link to="/" className="back-link">← Вернуться к списку статей</Link>
      </div>
    );
  }

  return (
    <div>
      <Link to="/" className="back-link">← Вернуться к списку статей</Link>
      
      <div className="article-detail">
        <h1>{article.title}</h1>
        <div className="article-meta">
          <span>{formatDate(article.created_at)}</span>
        </div>
        <div className="article-content">
          {article.content}
        </div>

        <div className="comments-section">
          <h3>Комментарии ({article.comments?.length || 0})</h3>
          
          {article.comments && article.comments.length > 0 && (
            <div>
              {article.comments.map(comment => (
                <div key={comment.id} className="comment">
                  <div className="comment-author">
                    {comment.author_name}
                    <span className="comment-date">{formatDate(comment.created_at)}</span>
                  </div>
                  <div className="comment-content">{comment.content}</div>
                </div>
              ))}
            </div>
          )}

          <div style={{ marginTop: '2rem' }}>
            <h4 style={{ marginBottom: '1rem' }}>Добавить комментарий</h4>
            {submitSuccess && <div className="success">Комментарий успешно добавлен!</div>}
            <form onSubmit={handleSubmitComment}>
              <div className="form-group">
                <label>Ваше имя</label>
                <input
                  type="text"
                  value={commentForm.author_name}
                  onChange={(e) => setCommentForm({...commentForm, author_name: e.target.value})}
                  placeholder="Введите ваше имя"
                  required
                />
              </div>
              <div className="form-group">
                <label>Комментарий</label>
                <textarea
                  value={commentForm.content}
                  onChange={(e) => setCommentForm({...commentForm, content: e.target.value})}
                  placeholder="Напишите ваш комментарий"
                  required
                />
              </div>
              <button type="submit" className="btn" disabled={submitting}>
                {submitting ? 'Отправка...' : 'Отправить комментарий'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ArticleDetail;
