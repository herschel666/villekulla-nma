import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';

import { Link } from '../link';
import styles from './main-nav.module.css';

interface NavItem {
  title: string;
  slug: string;
}

interface StaticQueryResult {
  nav: NavItem[];
}

export const MainNav: React.FC = () => {
  const { nav } = useStaticQuery<StaticQueryResult>(
    graphql`
      query getMainNavigation {
        nav: mainNavigation {
          slug
          title
        }
      }
    `
  );

  return (
    <nav className={styles.nav}>
      <Link className={styles.item} activeClassName={styles.active} to="/">
        Startseite
      </Link>
      {nav.map(({ title, slug }) => (
        <Link
          className={styles.item}
          activeClassName={styles.active}
          to={slug}
          key={slug}
        >
          {title}
        </Link>
      ))}
    </nav>
  );
};
