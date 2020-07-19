import React, { useContext } from 'react';
import { navigate, Link as GatsbyLink } from 'gatsby';
import type { GatsbyLinkProps } from 'gatsby';

import { PageContext } from '../page-context';
import type { PageContextInterface } from '../page-context';

export const Link: React.FC<GatsbyLinkProps<Record<string, unknown>>> = ({
  children,
  // eslint-disable-next-line no-unused-vars
  ref,
  ...props
}) => {
  const { navigationVisible, toggleNavigation } = useContext<
    PageContextInterface
  >(PageContext);
  const handleClick = (evnt: React.SyntheticEvent<HTMLAnchorElement>) => {
    evnt.preventDefault();
    navigate(props.to);
    if (navigationVisible) {
      toggleNavigation();
    }
  };

  return (
    <GatsbyLink {...props} onClick={handleClick}>
      {children}
    </GatsbyLink>
  );
};
