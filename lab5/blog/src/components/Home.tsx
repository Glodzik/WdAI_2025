import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="hero">
      <h1 className="hero-title">Witaj na blogu</h1>
      <p>Przeczytaj dostępne artykuły lub dodaj własny!</p>
      <div className="hero-btns">
        <Link to="/blog" className="btn btn-primary">Przeglądaj artykuły</Link>
        <Link to="/dodaj" className="btn btn-new">Dodaj artykuł</Link>
      </div>
    </div>
  );
}