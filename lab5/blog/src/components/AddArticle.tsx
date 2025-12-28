import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

interface Article {
  id: number;
  title: string;
  content: string;
}

export default function AddArticle() {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim() || !content.trim()) return;

    const saved = localStorage.getItem('blogArticles');
    const articles: Article[] = saved ? JSON.parse(saved) : [];
    
    const newId = articles.length > 0 ? Math.max(...articles.map(a => a.id)) + 1 : 1;
    
    const newArticle: Article = {
      id: newId,
      title: title.trim(),
      content: content.trim()
    };
    
    localStorage.setItem('blogArticles', JSON.stringify([...articles, newArticle]));
    navigate('/blog');
  };

  return (
    <div className="form-container">
      <h2>Dodaj nowy artykuł</h2>
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Tytuł</label>
          <input type="text" value={title} required
            onChange={(e) => setTitle(e.target.value)} />
        </div>
        
        <div className="form-group">
          <label>Treść</label>
          <textarea value={content} required
            onChange={(e) => setContent(e.target.value)} />
        </div>
        
        <div className="form-actions">
          <button type="submit" className="btn btn-primary">Dodaj</button>
          <Link to="/blog" className="btn btn-secondary">Anuluj</Link>
        </div>
      </form>
    </div>
  );
}