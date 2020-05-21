import React from 'react';
import { graphql } from 'gatsby';

import { Layout } from '../components/layout';
import { Seo } from '../components/seo';

interface Props {
  data: {
    page: {
      frontmatter: {
        title: string;
      };
      html: string;
    };
  };
}

export const pageQuery = graphql`
  query($path: String!) {
    page: markdownRemark(fields: { slug: { eq: $path } }) {
      html
      frontmatter {
        title
      }
    }
  }
`;

const PageTemplate: React.FC<Props> = ({ data }) => (
  <Layout>
    <Seo title={data.page.frontmatter.title} />
    <h1>{data.page.frontmatter.title}</h1>
    <div dangerouslySetInnerHTML={{ __html: data.page.html }} />
  </Layout>
);

export default PageTemplate;
