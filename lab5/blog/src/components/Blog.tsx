import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

interface Article {
  id: number;
  title: string;
  content: string;
}

export default function Blog() {
  const [articles, setArticles] = useState<Article[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('blogArticles');
    if (saved) setArticles(JSON.parse(saved));
  }, []);

  return (
    <div>
      <div className="blog-header">
        <h2>Artykuły</h2>
        <Link to="/dodaj" className="btn btn-new">Nowy artykuł</Link>
      </div>

      <div className="articles-list">
        {articles.length === 0 ? (
          <p>Brak artykułów</p>
        ) : (
          articles.map(article => (
            <div key={article.id} className="article-card">
              <h3>{article.title}</h3>
              <p>{article.content.substring(0, 100)}...</p>
              <Link to={`/article/${article.id}`} className="btn btn-secondary">
                Czytaj więcej
              </Link>
            </div>
          ))
        )}
      </div>
    </div>
  );
}