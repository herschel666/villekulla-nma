import React from 'react';
import { render } from '@testing-library/react';
import type { GatsbyLinkProps } from 'gatsby';

import IndexPage from '../../pages/index';

jest.mock('gatsby', () => ({
  useStaticQuery: () => ({
    site: {
      siteMetadata: {
        title: 'Villekulla NMA',
        description: 'Lustige Beschreibung.',
      },
    },
    nav: [{ slug: '/ueber-uns/', title: 'Über uns' }],
  }),
  graphql: jest.fn(),
  Link({ to, children, activeClassName, ...props }: GatsbyLinkProps<{}>) {
    return (
      <a href={to} {...props}>
        {children}
      </a>
    );
  },
}));

it('render the front page', async () => {
  const { getByText } = render(<IndexPage />);

  getByText('Hi people');
});
