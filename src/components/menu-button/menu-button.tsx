import React, { useContext } from 'react';
import classNames from 'classnames';

import { PageContext } from '../page-context';
import type { PageContextInterface } from '../page-context';
import styles from './menu-button.module.css';

export const MenuButton: React.FC = () => {
  const { navigationVisible, toggleNavigation } = useContext<
    PageContextInterface
  >(PageContext);
  const showNavigation = (evnt: React.SyntheticEvent<HTMLButtonElement>) => {
    if (evnt.type === 'keydown' || !navigationVisible) {
      evnt.stopPropagation();
      toggleNavigation();
    }
  };
  const handleOnMouseUp = (evnt: React.SyntheticEvent<HTMLButtonElement>) =>
    evnt.currentTarget.blur();

  return (
    <button
      className={classNames(styles.button, {
        [styles.inactive]: navigationVisible,
      })}
      onClick={showNavigation}
      onKeyDown={showNavigation}
      onMouseUp={handleOnMouseUp}
    >
      <i className={styles.burger} aria-hidden={true} />
      <i className={styles.label}>Navigation</i>
    </button>
  );
};
