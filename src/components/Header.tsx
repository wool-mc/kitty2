import { Link } from 'react-router-dom';

export const Header = () => {
  return (
    <header className="nav-bar">
      <nav className="nav">
        <Link className="nav-links" to="/">
          Котики
        </Link>
        <Link className="nav-links" to="/fav">
          Избранные Котики
        </Link>
      </nav>
    </header>
  );
};
