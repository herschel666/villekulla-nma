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

const page = {
  frontmatter: {
    title: 'Hi people',
  },
  html: `
<p>loremEt mollit do ipsum nisi nisi eiusmod tempor sit sint anim aliqua ut. Esse exercitation
pariatur commodo excepteur excepteur anim eu ipsum aliquip qui deserunt eu nostrud.</p>
<p>Magna non sunt aliquip esse Lorem tempor deserunt. Sint consequat in sunt do do.
Id occaecat nostrud minim veniam nostrud ex non ad minim minim veniam eu.</p>
`.trim(),
};

it('render the front page', async () => {
  const { getByText } = render(<IndexPage data={{ page }} />);

  getByText('Hi people');
});
