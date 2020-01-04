import React from 'react';

import { PageContextProvider } from './src/components/page-context';

export const wrapRootElement = ({ element }) => (
  <PageContextProvider>{element}</PageContextProvider>
);
