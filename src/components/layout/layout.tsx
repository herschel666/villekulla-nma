import React, { useContext, useRef, useEffect } from 'react';
import { CSSTransition } from 'react-transition-group';
import { useStaticQuery, graphql } from 'gatsby';

import { Header } from '../header';
import { MainNav } from '../main-nav';
import { PageContext } from '../page-context';
import type { PageContextInterface } from '../page-context';

import styles from './layout.module.css';
import './layout.css';

const useHideInClickAnywhere = ({
  navigationVisible,
  toggleNavigation,
}: PageContextInterface) => {
  const navigation = useRef<HTMLDivElement>(null);
  const mousedownCallback = useRef<(_: MouseEvent) => void>();

  useEffect(() => {
    if (navigationVisible) {
      mousedownCallback.current = (evnt: MouseEvent) => {
        if (
          navigation.current &&
          !navigation.current.contains(evnt.target as Node)
        ) {
          toggleNavigation();
        }
      };
      document.addEventListener('mousedown', mousedownCallback.current);
    } else {
      if (mousedownCallback.current) {
        document.removeEventListener('mousedown', mousedownCallback.current);
        mousedownCallback.current = void 0;
      }
    }
  }, [navigationVisible]);

  return navigation;
};

const useHideOnEscapePress = ({
  navigationVisible,
  toggleNavigation,
}: PageContextInterface) => {
  const keyupCallback = useRef<(_: KeyboardEvent) => void>();

  useEffect(() => {
    if (navigationVisible) {
      keyupCallback.current = (evnt: KeyboardEvent) => {
        if (evnt.keyCode === 27) {
          toggleNavigation();
        }
      };
      document.addEventListener('keyup', keyupCallback.current);
    } else {
      if (keyupCallback.current) {
        document.removeEventListener('keyup', keyupCallback.current);
        keyupCallback.current = void 0;
      }
    }
  }, [navigationVisible]);
};

export const Layout: React.FC = ({ children }) => {
  const { navigationVisible, toggleNavigation } =
    useContext<PageContextInterface>(PageContext);
  const navigationRef = useHideInClickAnywhere({
    navigationVisible,
    toggleNavigation,
  });
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `);
  const navigationClassNames = {
    enter: styles.navigationEnter,
    enterActive: styles.navigationEnterActive,
    enterDone: styles.navigationEnterDone,
    exit: styles.navigationExit,
    exitActive: styles.navigationExitActive,
  };

  useHideOnEscapePress({ navigationVisible, toggleNavigation });

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <Header siteTitle={data.site.siteMetadata.title} />
      </div>
      <main className={styles.main}>{children}</main>
      <div className={styles.navigation} ref={navigationRef}>
        <CSSTransition
          classNames={navigationClassNames}
          in={navigationVisible}
          timeout={300}
        >
          <MainNav />
        </CSSTransition>
      </div>
      <footer className={styles.footer}>
        &copy;&nbsp;{new Date().getFullYear()} &middot; Villekulla&nbsp;
        <abbr title="Neue Mitte Altona">NMA</abbr>
      </footer>
    </div>
  );
};
