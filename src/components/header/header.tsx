import React from 'react';

import { Link } from '../link';
import { MenuButton } from '../menu-button';
import styles from './header.module.css';

interface Props {
  siteTitle: string;
}

export const Header: React.FC<Props> = ({ siteTitle }) => (
  <header className={styles.header}>
    <Link to="/" className={styles.title}>
      {siteTitle}
    </Link>
    <MenuButton />
  </header>
);
