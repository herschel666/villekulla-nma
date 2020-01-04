import React, { useState, createContext, useCallback } from 'react';

interface PageContextState {
  navigationVisible: boolean;
}

export interface PageContextInterface extends PageContextState {
  toggleNavigation: () => boolean;
}

export const PageContext = createContext<PageContextInterface>({
  navigationVisible: false,
  toggleNavigation: () => false,
});

export const PageContextProvider: React.FC = ({ children }) => {
  const [state, setState] = useState<PageContextState>({
    navigationVisible: false,
  });
  const toggleNavigation = useCallback(() => {
    const navigationVisible = !state.navigationVisible;
    setState({
      ...state,
      navigationVisible,
    });
    return navigationVisible;
  }, [state.navigationVisible]);
  const context = {
    ...state,
    toggleNavigation,
  };

  return (
    <PageContext.Provider value={context}>{children}</PageContext.Provider>
  );
};
