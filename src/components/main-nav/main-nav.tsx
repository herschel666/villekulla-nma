import React from 'react';

import { Link } from '../link';
import styles from './main-nav.module.css';

export const MainNav: React.FC = () => (
  <nav className={styles.nav}>
    <Link className={styles.item} activeClassName={styles.active} to="/">
      Startseite
    </Link>
    <Link
      className={styles.item}
      activeClassName={styles.active}
      to="/ueber-uns/"
    >
      Über uns
    </Link>
  </nav>
);
