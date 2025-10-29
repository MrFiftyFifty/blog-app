import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { articlesAPI } from '../services/api';

function AddArticle() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: '',
    content: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();
    
    if (!form.title || !form.content) {
      setError('Заполните все поля');
      return;
    }

    try {
      setSubmitting(true);
      setError(null);
      const response = await articlesAPI.create(form);
      navigate(`/article/${response.data.data.id}`);
    } catch (err) {
      setError('Не удалось создать статью');
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="form">
      <h2>Добавить новую статью</h2>
      
      {error && <div className="error">{error}</div>}
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Заголовок</label>
          <input
            type="text"
            value={form.title}
            onChange={(e) => setForm({...form, title: e.target.value})}
            placeholder="Введите заголовок статьи"
            required
          />
        </div>
        
        <div className="form-group">
          <label>Содержание</label>
          <textarea
            value={form.content}
            onChange={(e) => setForm({...form, content: e.target.value})}
            placeholder="Введите текст статьи"
            style={{ minHeight: '300px' }}
            required
          />
        </div>
        
        <div>
          <button type="submit" className="btn" disabled={submitting}>
            {submitting ? 'Сохранение...' : 'Опубликовать'}
          </button>
          <Link to="/" className="btn btn-secondary">
            Отмена
          </Link>
        </div>
      </form>
    </div>
  );
}

export default AddArticle;
