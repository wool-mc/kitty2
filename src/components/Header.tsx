import { Link } from 'react-router-dom';

import styles from './Header.module.css'

export const Header = () => {
  return (
    <header className={styles.navBar}>
      <nav className={styles.nav}>
        <Link className={styles.navLinks} to="/">
          Котики
        </Link>
        <Link className={styles.navLinks} to="/fav">
          Избранные Котики
        </Link>
      </nav>
    </header>
  );
};
