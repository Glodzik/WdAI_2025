import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

interface Article {
  id: number;
  title: string;
  content: string;
}

export default function Article() {
  const { id } = useParams<{ id: string }>();
  const [article, setArticle] = useState<Article | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem('blogArticles');
    if (saved) {
      const articles: Article[] = JSON.parse(saved);
      setArticle(articles.find(a => a.id === Number(id)) || null);
    }
  }, [id]);

  if (!article) {
    return (
      <div>
        <h2>Artykuł nie znaleziony</h2>
        <Link to="/blog" className="btn btn-secondary">Wróć</Link>
      </div>
    );
  }

  return (
    <div className="article-detail">
      <h1>{article.title}</h1>
      <p>{article.content}</p>
      <div className="form-actions">
        <Link to="/blog" className="btn btn-secondary">Wróć</Link>
      </div>
    </div>
  );
}