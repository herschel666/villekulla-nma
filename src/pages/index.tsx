import React from 'react';
import { graphql } from 'gatsby';

import { Layout } from '../components/layout';
import { Seo } from '../components/seo';

import styles from './index.module.css';

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
  query {
    page: markdownRemark(fields: { slug: { eq: "/" } }) {
      html
      frontmatter {
        title
      }
    }
  }
`;

const IndexPage: React.FC<Props> = ({ data }) => (
  <Layout>
    <Seo title="Home" />
    <h1 className={styles.heading}>{data.page.frontmatter.title}</h1>
    <div
      className={styles.content}
      dangerouslySetInnerHTML={{ __html: data.page.html }}
    />
  </Layout>
);

export default IndexPage;
