import React from 'react';

import { Layout } from '../components/layout';
import { Seo } from '../components/seo';

const AboutPage: React.FC = () => (
  <Layout>
    <Seo title="Über uns" />
    <h1>Über uns</h1>
    <p>Reprehenderit nisi exercitation in duis Lorem.</p>
    <p>laboris voluptate aliqua ut sint excepteur nisi.</p>
  </Layout>
);

export default AboutPage;
